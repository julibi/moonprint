import React, { useCallback, useMemo } from "react";
import styled from "styled-components";
import { Editable, withReact, useSlate, Slate } from "slate-react";
import {
  Editor,
  Node,
  Transforms,
  createEditor,
  Element as SlateElement,
} from "slate";
import { withHistory } from "slate-history";
import EditorToolButton from "./EditorToolButton";

const StyledEditable = styled(Editable)`
  // otherwise it shrinks to 24px height somehow
  border: 1px solid grey;
  border-radius: 5px;
  margin-bottom: 24px;
  min-height: 500px !important;
  max-height: 1000px !important;
  margin-block-start: 1rem;
  padding: 1rem;
  overflow-wrap: anywhere;
  overflow-y: auto;
  font-family: monospace;
  font-size: 16px;
  width: 100%;
`;

const LIST_TYPES = ["numbered-list", "bulleted-list"];
const TEXT_ALIGN_TYPES = ["left", "center", "right", "justify"];
const Toolbar = styled.div`
  @media (max-width: 900px) {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
`;

const RichText = ({ onKeyDown, text, isDisabled = false }) => {
  const renderElement = useCallback((props) => <Element {...props} />, []);
  const renderLeaf = useCallback((props) => <Leaf {...props} />, []);
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);

  return (
    <Slate editor={editor} value={text || initialValue} onChange={onKeyDown}>
      <Toolbar>
        <MarkButton format="bold" icon="format_bold" />
        <MarkButton format="italic" icon="format_italic" />
        <MarkButton format="underline" icon="format_underlined" />
        {/* <MarkButton format="code" icon="code" /> */}
        <BlockButton format="heading-one" icon="looks_one" />
        <BlockButton format="heading-two" icon="looks_two" />
        <BlockButton format="block-quote" icon="format_quote" />
        <BlockButton format="numbered-list" icon="format_list_numbered" />
        <BlockButton format="bulleted-list" icon="format_list_bulleted" />
        <BlockButton format="left" icon="format_align_left" />
        <BlockButton format="center" icon="format_align_center" />
        <BlockButton format="right" icon="format_align_right" />
        <BlockButton format="justify" icon="format_align_justify" />
      </Toolbar>
      <StyledEditable
        readOnly={isDisabled}
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        placeholder="Enter some text…"
        spellCheck
        autoFocus
        onKeyDown={(e) => {
          if (e.key === "Enter" && e.shiftKey) {
            const selectedElement = Node.descendant(
              editor,
              editor.selection.anchor.path.slice(0, -1)
            );
            if (
              // @ts-expect-error type does not exist on Node or Descendant
              selectedElement.type === "list-item" ||
              // @ts-expect-error type does not exist on Node or Descendant
              selectedElement.type === "title"
            ) {
              e.preventDefault();
              const selectedLeaf = Node.descendant(
                editor,
                editor.selection.anchor.path
              );
              // @ts-expect-error type does not exist on Descendant
              if (selectedLeaf.text.length === editor.selection.anchor.offset) {
                Transforms.insertNodes(editor, {
                  type: "paragraph",
                  // @ts-expect-error marks, text not assignable to Descendant
                  children: [{ text: "", marks: [] }],
                });
              } else {
                Transforms.splitNodes(editor, { always: true });
                Transforms.setNodes(editor, { type: "paragraph" });
              }
            }
          }
        }}
      />
    </Slate>
  );
};

const toggleBlock = (editor, format) => {
  const isActive = isBlockActive(
    editor,
    format,
    TEXT_ALIGN_TYPES.includes(format) ? "align" : "type"
  );
  const isList = LIST_TYPES.includes(format);

  Transforms.unwrapNodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) &&
      SlateElement.isElement(n) &&
      LIST_TYPES.includes(n.type) &&
      !TEXT_ALIGN_TYPES.includes(format),
    split: true,
  });
  let newProperties;
  if (TEXT_ALIGN_TYPES.includes(format)) {
    newProperties = {
      align: isActive ? undefined : format,
    };
  } else {
    newProperties = {
      type: isActive ? "paragraph" : isList ? "list-item" : format,
    };
  }
  Transforms.setNodes < SlateElement > (editor, newProperties);

  if (!isActive && isList) {
    const block = { type: format, children: [] };
    Transforms.wrapNodes(editor, block);
  }
};

const toggleMark = (editor, format) => {
  const isActive = isMarkActive(editor, format);

  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
};

const isBlockActive = (editor, format, blockType = "type") => {
  const { selection } = editor;
  if (!selection) return false;

  const [match] = Array.from(
    Editor.nodes(editor, {
      at: Editor.unhangRange(editor, selection),
      match: (n) =>
        !Editor.isEditor(n) &&
        SlateElement.isElement(n) &&
        n[blockType] === format,
    })
  );

  return !!match;
};

const isMarkActive = (editor, format) => {
  const marks = Editor.marks(editor);
  return marks ? marks[format] === true : false;
};

const Element = ({ attributes, children, element }) => {
  const style = { textAlign: element.align };
  switch (element.type) {
    case "block-quote":
      return (
        <blockquote style={style} {...attributes}>
          {children}
        </blockquote>
      );
    case "bulleted-list":
      return (
        <ul style={style} {...attributes}>
          {children}
        </ul>
      );
    case "heading-one":
      console.log("heading one");
      return (
        <h1 style={{ fontSize: "36px" }} {...attributes}>
          {children}
        </h1>
      );
    case "heading-two":
      return (
        <h2 style={{ fontSize: "24px" }} {...attributes}>
          {children}
        </h2>
      );
    case "list-item":
      return (
        <li style={style} {...attributes}>
          {children}
        </li>
      );
    case "numbered-list":
      return (
        <ol style={style} {...attributes}>
          {children}
        </ol>
      );
    default:
      return (
        <p style={style} {...attributes}>
          {children}
        </p>
      );
  }
};

const Leaf = ({ attributes, children, leaf }) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>;
  }

  // if (leaf.code) {
  //   children = <code>{children}</code>;
  // }

  if (leaf.italic) {
    children = <em>{children}</em>;
  }

  if (leaf.underline) {
    console.log("underline");
    children = <u>{children}</u>;
  }

  return <span {...attributes}>{children}</span>;
};

const BlockButton = ({ format, icon }) => {
  const editor = useSlate();
  return (
    <EditorToolButton
      active={isBlockActive(
        editor,
        format,
        TEXT_ALIGN_TYPES.includes(format) ? "align" : "type"
      )}
      onMouseDown={(event) => {
        event.preventDefault();
        toggleBlock(editor, format);
      }}
    >
      <span className="material-icons">{icon}</span>
    </EditorToolButton>
  );
};

const MarkButton = ({ format, icon }) => {
  const editor = useSlate();
  return (
    <EditorToolButton
      active={isMarkActive(editor, format)}
      onMouseDown={(event) => {
        event.preventDefault();
        toggleMark(editor, format);
      }}
    >
      <span className="material-icons">{icon}</span>
    </EditorToolButton>
  );
};

const initialValue = [
  {
    type: "paragraph",
    children: [{ text: "" }],
  },
];

export default RichText;

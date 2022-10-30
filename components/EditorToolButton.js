import React, { FormEvent, ReactChild } from "react";
import styled from "styled-components";

export const Root = styled.button`
  padding: 10px;
  margin: 5px;
  background-color: ${({ active }) => (active ? "lightgrey" : "white")};
  border: 1px solid grey;
  border-radius: 5px;

  :hover {
    cursor: pointer;
  }
`;

const EditorToolButton = ({ active, children, onMouseDown }) => {
  return (
    <Root active={active} onMouseDown={onMouseDown}>
      {children}
    </Root>
  );
};

export default EditorToolButton;

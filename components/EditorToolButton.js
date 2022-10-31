import React, { FormEvent, ReactChild } from "react";
import styled from "styled-components";

export const Root = styled.button`
  padding: 10px;
  margin: 5px;
  background-color: ${({ active }) => (active ? "lightgrey" : "white")};
  border: 1px solid grey;
  border-radius: 5px;
  color: ${({ isDisabled }) => (isDisabled ? "grey" : "black")};

  :hover {
    cursor: ${({ isDisabled }) => (isDisabled ? "default" : "pointer")};
  }
`;

const EditorToolButton = ({ active, children, onMouseDown, isDisabled }) => {
  return (
    <Root active={active} onMouseDown={onMouseDown} isDisabled={isDisabled}>
      {children}
    </Root>
  );
};

export default EditorToolButton;

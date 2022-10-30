import React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  width: 100%;
  background-color: black;
  color: white;
  height: 50px;
  border-radius: 5px;
  border: none;

  :hover {
    cursor: pointer;
  }
`;

const MintConnectButton = ({ onClick }) => {
  return <StyledButton onClick={onClick}>Connect Button</StyledButton>;
};

export default MintConnectButton;

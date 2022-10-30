import React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  width: 100%;
  background-color: ${({ isDisabled }) => (isDisabled ? "grey" : "black")};
  color: white;
  height: 50px;
  border-radius: 5px;
  border: none;

  :hover {
    cursor: pointer;
  }
`;

const MintConnectButton = ({ onClick, isConnected, isDisabled }) => {
  console.log({ isDisabled });
  return isConnected ? (
    <StyledButton onClick={onClick} isDisabled={isDisabled}>
      MINT
    </StyledButton>
  ) : (
    <StyledButton onClick={onClick} isDisabled={isDisabled}>
      Connect Button
    </StyledButton>
  );
};

export default MintConnectButton;

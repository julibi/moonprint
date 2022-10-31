import React from "react";
import styled from "styled-components";
import { Rings } from "react-loader-spinner";

const StyledButton = styled.button`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ isDisabled }) => (isDisabled ? "grey" : "black")};
  color: white;
  height: 50px;
  border-radius: 5px;
  border: none;

  :hover {
    cursor: ${({ isDisabled }) => (isDisabled ? "default" : "pointer")};
  }
`;

const MintConnectButton = ({ onClick, isConnected, isDisabled, isLoading }) => {
  if (isLoading) {
    return (
      <StyledButton isDisabled>
        <Rings
          height="40"
          width="40"
          color="#fff"
          radius="6"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
          ariaLabel="rings-loading"
        />
      </StyledButton>
    );
  }
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

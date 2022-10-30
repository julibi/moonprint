import React, { FormEvent } from "react";
import styled from "styled-components";

const Root = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledLabel = styled.label`
  display: inline-block;
  margin-block-end: 0.5rem;
`;

export const StyledInput = styled.input`
  display: inline-block;
  font-size: 16px;
  border-radius: 5px;
  border: 1px solid grey;
  box-shadow: 5px;
  padding: 1rem;
  outline: none;
  -webkit-appearance: none;
  ::-webkit-outer-spin-button,
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  display: inline-block;
  margin-block-end: 1rem;
  font-family: monospace;
`;

export const StyledInputError = styled.span`
  color: red;
  margin-block-end: 1rem;
  text-align: left;
  height: 24px;
`;

const InputField = ({
  disabled = false,
  value,
  onChange,
  onFocus,
  error,
  placeholder = "",
  label,
  style,
  type = "text",
}) => {
  return (
    <Root>
      <StyledLabel>{label}</StyledLabel>
      <StyledInput
        onFocus={onFocus}
        type={type}
        disabled={disabled}
        value={value}
        onChange={onChange}
        placeholder={placeholder.toString()}
        style={style}
      />
      <StyledInputError>{error ?? " "}</StyledInputError>
    </Root>
  );
};

export default InputField;

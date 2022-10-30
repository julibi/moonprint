import { TezosToolkit } from "@taquito/taquito";
import { BeaconWallet } from "@taquito/beacon-wallet";
import { useState } from "react";
import styled from "styled-components";
import * as Yup from "yup";
import InputField from "../components/InputField";
import MintConnectButton from "../components/MintConnectButton";
import RichText from "../components/RichText";

const StyledForm = styled.div`
  border-radius: 10px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  padding: 24px;
  width: 500px;
`;

export const PageWrapper = styled.section`
  &,
  & * {
    box-sizing: border-box;
    display: block;
  }

  hr {
    display: block;
    border: none;
    border-top: 1px solid lightgrey;

    margin-top: 1.5rem;
    margin-bottom: 1.5rem;
  }

  font-family: system-ui;
  font-size: 1rem;
  line-height: 1.5rem;
  max-width: 35em;
  margin-left: auto;
  margin-right: auto;
  margin-top: 1.5rem;
  padding: 1rem 0.75rem;
  border: 1px solid lightgrey;
  border-radius: 4px;
`;

export const CodeWrapper = styled.pre`
  font-family: monospace;
  font-size: 0.875rem;
  line-height: 1.25rem;
  background-color: hsl(210, 4%, 96%);
  overflow: auto;
  padding: 0.75rem;
  margin: 0;
  border-radius: 4px;

  & strong {
    margin-top: 1.5rem;

    &:first-child {
      margin-top: 0;
    }
  }
`;

export const Title = styled.h1`
  font-size: 1rem;
  line-height: 1.25rem;
  margin-top: 0;
`;

export const Label = styled.label`
  margin-top: 1.5rem;
  width: 100%;
`;

export const StyledInlineErrorMessage = styled.div`
  background-color: rgb(255, 245, 245);
  color: rgb(120, 27, 0);
  display: block;

  padding: 0.5rem 0.75rem;
  margin-top: 0.5rem;
  white-space: pre-line;
`;

export const Submit = styled.button`
  width: 100%;
  margin-top: 1.5rem;

  background-color: rgb(24, 81, 187);
  display: block;
  text-align: center;
  font-size: 1rem;
  line-height: 1.5rem;
  font-style: normal;
  font-weight: 700;
  height: 3rem;
  white-space: nowrap;
  color: rgb(232, 243, 255) !important;
  padding: 0.5rem 1rem;

  &:active,
  &:focus,
  &:hover {
    cursor: pointer;
  }

  &:disabled {
    cursor: pointer;
    background-color: rgb(163, 168, 173);
    box-shadow: none;
    color: rgb(255, 255, 255) !important;

    &:hover,
    &:focus {
      cursor: not-allowed;
    }
  }
`;

export default function Home() {
  const Tezos = new TezosToolkit("https://mainnet-tezos.giganode.io");
  const wallet = new BeaconWallet({ name: "Beacon Docs Taquito" });
  const [address, setAddress] = useState();

  const [authorName, setAuthorName] = useState("");
  const [title, setTitle] = useState("");
  const [isAuthorNameFocused, setIsAuthorNameFocued] = useState(false);
  const [isTitleFocuesd, setIsTitleFocused] = useState(false);
  const [text, setText] = useState();

  Tezos.setWalletProvider(wallet);

  const connectToWallet = async () => {
    try {
      console.log("Requesting permissions...");
      const permissions = await wallet.client.requestPermissions();
      setAddress(permissions.address);
      console.log("Got permissions:", permissions.address);
    } catch (error) {
      console.log("Got error:", error);
    }
  };

  const handleSubmit = () => {};

  return (
    <StyledForm>
      {/* {address && (
        <div>{`Awesome, you are connected with wallet: ${address}`}</div>
      )} */}
      {/* <StyledForm
            onSubmit={(e) => {
              e.preventDefault();
              submitForm(email);
            }}
          > */}

      <InputField
        disabled={false}
        value={authorName}
        onFocus={() => setIsAuthorNameFocued(true)}
        onChange={(e) => setAuthorName(e.target.value)}
        error={
          isAuthorNameFocused && authorName.length <= 1 && "Bit too short, bae"
        }
        placeholder="Princess "
        label="Author"
        type="text"
      />
      <InputField
        disabled={false}
        onFocus={() => setIsTitleFocused(true)}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        error={isTitleFocuesd && title.length <= 1 && "Bit too short, bae"}
        placeholder="My great poem"
        label="Title"
        type="text"
      />
      <div>
        <RichText
          onKeyDown={(val) => setText(val)}
          text={text}
          isDisabled={false}
        />
      </div>
      <MintConnectButton onClick={connectToWallet} />
    </StyledForm>
  );
}

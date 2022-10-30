import { TezosToolkit } from "@taquito/taquito";
import { BeaconWallet } from "@taquito/beacon-wallet";
import { useState, useEffect } from "react";
import Image from "next/image";
import styled from "styled-components";
import * as Yup from "yup";
import InputField from "../components/InputField";
import MintConnectButton from "../components/MintConnectButton";
import RichText from "../components/RichText";

const Root = styled.div`
  display: flex;
`;

const ColoredDiv = styled.div`
  width: 50%;
  background-color: blue;
  height: 100vh;

  postition: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledForm = styled.div`
  border-radius: 10px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  padding: 24px;
  width: 50%;
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

const ImageWrapper = styled.div``;

export default function Home() {
  const Tezos = new TezosToolkit("https://mainnet-tezos.giganode.io");
  const wallet = new BeaconWallet({ name: "Beacon Docs Taquito" });
  const [address, setAddress] = useState();

  const [authorName, setAuthorName] = useState("");
  const [title, setTitle] = useState("");
  const [isAuthorNameFocused, setIsAuthorNameFocued] = useState(false);
  const [isTitleFocuesd, setIsTitleFocused] = useState(false);
  const [text, setText] = useState();
  const [isStopped, setIsStopped] = useState(false);
  const [color, setColor] = useState();

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

  const randColor = () => {
    return (
      "#" +
      Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, "0")
        .toUpperCase()
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (isStopped) return;
      // put this back
      // setColor(randColor());
    }, 300);

    return () => {
      clearInterval(interval);
    };
  }, [isStopped]);

  return (
    <Root>
      <ColoredDiv style={{ backgroundColor: color ?? "blue" }}>
        <ImageWrapper>
          <Image height={400} width={300} src={`/test.svg`} alt={"test"} />
        </ImageWrapper>
      </ColoredDiv>
      <StyledForm>
        {/* {address && (
        <div>{`Awesome, you are connected with wallet: ${address}`}</div>
      )} */}

        <InputField
          disabled={false}
          value={authorName}
          onFocus={() => setIsAuthorNameFocued(true)}
          onChange={(e) => setAuthorName(e.target.value)}
          error={
            isAuthorNameFocused &&
            authorName.length <= 1 &&
            "Bit too short, bae"
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
        <MintConnectButton
          onClick={connectToWallet}
          isConnected={!!address}
          isDisabled={
            authorName.length < 2 ||
            title.length < 2 ||
            !text?.[0]?.children?.[0]?.text?.length
          }
        />
      </StyledForm>
    </Root>
  );
}

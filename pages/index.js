import { ContractAbstraction, TezosToolkit } from "@taquito/taquito";
import { BeaconWallet } from "@taquito/beacon-wallet";
import { useState, useEffect, createRef } from "react";
import styled from "styled-components";
import Image from "next/image";
import { useScreenshot } from "use-react-screenshot";
import { toast } from "react-toastify";
// import { fromString } from "uint8arrays/from-string";
import InputField from "../components/InputField";
import MintConnectButton from "../components/MintConnectButton";
import RichText from "../components/RichText";
import { useIpfsClient } from "../hooks/useIpfsClient";
import { generateMetadataJson } from "../utils/generateMetadataJson";
import { truncateAddress } from "../utils/truncateAddress";

const Root = styled.div`
  display: flex;

  @media (max-width: 900px) {
    flex-direction: column;
  }
`;

const ColoredDiv = styled.div`
  width: 50%;
  background-color: blue;
  postition: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 900px) {
    width: 100%;
  }
`;

const AuthorName = styled.span`
  position: absolute;
  bottom: 12px;
  right: 12px;
`;

const TextName = styled.span`
  position: absolute;
  bottom: 12px;
  left: 12px;
`;

const TestBook = styled.div`
  height: 400px;
  width: 350px;
  border: 5px solid black;
  text-align: center;
  position: relative;
`;

const StyledForm = styled.div`
  border-radius: 10px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  padding: 24px;
  width: 50%;

  @media (max-width: 900px) {
    width: 100%;
  }
`;

export const Title = styled.h1`
  line-height: 1.25rem;
  margin-bottom: 3rem;
`;

const WalletInfo = styled.span`
  position: absolute;
  top: 3rem;
  right: 3rem;
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

const StyledLabel = styled.label`
  display: inline-block;
  margin-block-end: 0.5rem;
`;

const ImageWrapper = styled.div`
  margin-right: 1rem;
`;

const ToastWrapper = styled.div`
  display: flex;
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
  const [isStopped, setIsStopped] = useState(false);
  const [color, setColor] = useState();
  const [font, setFont] = useState();
  const [image, takeScreenshot] = useScreenshot();
  const [imageCID, setImageCID] = useScreenshot();
  const [isLoading, setIsLoading] = useState(false);
  const [metaDataCID, setMetaDataCID] = useState();
  const client = useIpfsClient();
  const mockImageCID = "QmQwfjMrC8Wfa1MdtTV1r9HRAXhMAqh4z5Kgo6L68hMdw8";
  const CONTRACT_ADDRESS = "KT1TezoooozzSmartPyzzSTATiCzzzwwBFA";
  const FONTS = ["Times New Roman", "monospace", "Arial"];

  const ref = createRef(null);
  const getImage = () => takeScreenshot(ref.current);
  Tezos.setWalletProvider(wallet);

  // const downloadScreenshot = () => takeScreenshot(ref.current).then(download);

  const connectToWallet = async () => {
    try {
      setIsLoading(true);
      const permissions = await wallet.client.requestPermissions();
      setAddress(permissions.address);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log("Got error:", error);
    }
  };

  const handleClick = async () => {
    if (!address) {
      connectToWallet();
    } else {
      // TODO uploading the image on ipfs does not work atm somehow
      // so we are mocking the screenshotted image saved under this CID on ipfs:
      // QmQwfjMrC8Wfa1MdtTV1r9HRAXhMAqh4z5Kgo6L68hMdw8
      setIsLoading(true);
      setColor("#eac08c");
      setFont("Arial");
      setIsStopped(true);
      setImageCID(mockImageCID);
      // getImage();
      // if (image) {
      try {
        // const buffer = Buffer.from(image, "base64");
        // const imageCID = (await client.add(buffer)).path;
        // console.log({ imageCID });
        const metadata = generateMetadataJson({
          name: title,
          minterAddress: address,
          imageIPFSHash: mockImageCID,
        });

        const metadataHash = (await client.add(metadata)).path;
        setMetaDataCID(metadataHash);
        setIsLoading(false);
        // const contract = await Tezos.contract.at(CONTRACT_ADDRESS);
        // console.log({ contract });
        // const bla = await contract.methods.mint({});
        toast.success(
          <ToastWrapper>
            <ImageWrapper>
              <Image
                height={"45px"}
                width={"36px"}
                src={`/thumbnail.png`}
                alt={"nft image"}
              />
            </ImageWrapper>
            <span>{"Yay you minted your text NFT!"}</span>
          </ToastWrapper>
        );
      } catch (e) {
        setIsLoading(false);
        console.log({ e });
      }
      // }
    }
  };

  const randColor = () => {
    return (
      "#" +
      Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, "0")
        .toUpperCase()
    );
  };

  const randomIntFromInterval = (min, max) => {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  const randFont = () => {
    const number = randomIntFromInterval(1, 3);
    return FONTS[number];
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (isStopped) return;
      // put this back
      setColor(randColor());
      setFont(randFont());
    }, 300);

    return () => {
      clearInterval(interval);
    };
  }, [isStopped, randFont]);

  return (
    <Root>
      <ColoredDiv style={{ backgroundColor: color ?? "blue" }} ref={ref}>
        <TestBook>
          <h1 style={{ fontFamily: font ?? "Times New Roman" }}>{title}</h1>
          <AuthorName>{`by ${authorName}`}</AuthorName>
          <TextName>#textNFT</TextName>
        </TestBook>
      </ColoredDiv>
      <StyledForm>
        <Title>MoonPrint</Title>
        <WalletInfo>
          {address
            ? `Connected with: ${truncateAddress(address)}`
            : "Not connected"}
        </WalletInfo>
        <InputField
          disabled={isLoading}
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
          disabled={isLoading}
          onFocus={() => setIsTitleFocused(true)}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          error={isTitleFocuesd && title.length <= 1 && "Bit too short, bae"}
          placeholder="My great poem"
          label="Title"
          type="text"
        />
        <div>
          <StyledLabel>Text</StyledLabel>
          <RichText
            onKeyDown={(val) => setText(val)}
            text={text}
            isDisabled={isLoading}
          />
        </div>
        <MintConnectButton
          onClick={handleClick}
          isConnected={!!address}
          isDisabled={
            authorName.length < 2 ||
            title.length < 2 ||
            !text?.[0]?.children?.[0]?.text?.length
          }
          isLoading={isLoading}
        />
      </StyledForm>
    </Root>
  );
}

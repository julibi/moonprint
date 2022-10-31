export const generateMetadataJson = ({
  name,
  minterAddress,
  imageIPFSHash,
}) => {
  return JSON.stringify({
    symbol: "NFT",
    name: name,
    decimals: "0", //token
    artifactUri: `ipfs://${imageIPFSHash}`,
    thumbnailUri: `ipfs://${imageIPFSHash}`,
    displayUri: `ipfs://${imageIPFSHash}`,
    // tags: "?",
    // formats: "?",
    description: "This is a MoonPrint text NFT",
    creators: minterAddress, // wallet address of person minting th e NFT
  });
};

// all string, just interfaces is an array - hehe, fuck typescript :P
// e.g.: ["TZIP-007-2021-04-17", "TZIP-016-2021-04-17"]
export const generateMetadataJson = ({
  symbol,
  name,
  icon,
  description,
  author,
  interfaces,
}) => {
  const metadata = {
    symbol: symbol,
    name: name,
    decimals: "0",
    icon: icon,
    description: "Token description",
    authors: "author",
    interfaces: interfaces,
  };

  return JSON.stringify(metadata);
};

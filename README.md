## MoonPrint

### Vision and Product

Currently, text NFTs are indistinguishable from the more common image-token. But writers should not have to create separate visual art in order to secure their work via blockchain access, and even if they did, it’s still difficult to convey key information.
MoonPrint solves current problems for creators, fans, collectors, consumers, and supporters of the emerging world of text-NFTs
The solution is two-fold:
Create ea visual brand to standardize key information about the underlying text such as title, author, and the fact that it is in fact text
Provide a simple and enjoyable way for authors to use this visual language on their works
For the brand, it is the simplified image of a book cover. Recognisable but not intrusive or restrictive, this clean design leaves room for countless future customisable features that can reflect the metadata of the underlying text
The creation of the cover NFT itself, we created a webpage that stimulates the web3 excitement and randomness of a mint while retaining control and customisation necessary for uniqueness. Once key information is collected in fields, the creator can choose when to PRINT/MINT. The page randomizes fonts, background colours to create a generative NFT that’s one of a kind.
This tool will:
Integrate handily into the pre-eminent text-NFT collection site: Moonpage.io. Moonpage provides security, control and payment to creators
Bring new Web3 people like NFT collectors into the space by making NFTs more visible and collectible
Incentivise the metadata infrastructure creation of text NFTs by making desirable visual features
Bring non Web3 creators, writers into the space by advertising the beauty, security and usability of Web3 for creators

## User Guide

When an author accesses the MoonPrint page, they are able to connect with a wallet of their choice or create a Kukai wallet on the fly with google mail. Once logged in, on the top right, the author will see which wallet they connected to.

![WalletConnection](https://github.com/julibi/moonprint/blob/main/public/WalletConnection.png)

![WalletConnection in another tab](https://github.com/julibi/moonprint/blob/main/public/WalletConnectionII.png)

They then will see a page as below to start creating their text NFT cover page.
On the right side, the author has flexibility to input name, title and the text. They can format fonts, sizes, and positions. The image on the left will display the outputs as they type. The code will run random background colours and fonts will be changed randomly.
Once the author clicks PRINT, the image gets captured, a NFT gets created and minted to the author’s wallet.

![Typing, short before creation](https://github.com/julibi/moonprint/blob/main/public/Typing.png)

## Tech

### Backend

We are using the amazing tezos blockchain! We created NFT and Minting NFT smart contracts using Ligo with FA2 interface for the contract to represent the range of token id. and converted that to Michelson language to deploy the contract. For deploying we have used Taquito environment. And integrated with Metadata, which is already deployed with IPFS.

### Frontend

We are using Next.js in the Frontend and styled the UI with styled component. For Wallet connection, we are using taquito beacon-wallet. For taking the screenshot, we are using use-react-screenshot npm package. We are using Infura to post image and the metadata json to IPFS. And would establish a connection to the deployed smart contracts in the future via taquito also. The UI is mobile friendly.

## Running it locally

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

The App lets you create a text NFT with a beautiful cover image. The color and font of the cover image keeps changing quickly. The moment you hit on mint, it snapshots the current image and sets it as your NFT image.

## Deployment

Merging into main triggers the deployment of the UI with Vercel. The link is [Vercel App Link](moonprint-8zxipwdwx-julibi.vercel.app). Unfortunately we had issues with deployment at some time because of localStorage. So for now, you will have to use this beautiful app in Localhost :)

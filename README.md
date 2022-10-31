This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Running it locally

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

The App lets you create a text NFT with a beautiful cover image. The color and font of the cover image keeps changing quickly. The moment you hit on mint, it snapshots the current image and sets it as your NFT image.
https://github.com/julibi/moonprint/blob/main/public/favicon.ico
![Screenshot](https://github.com/julibi/moonprint/blob/main/Screenshot.png?raw=true)

## Prerequisites

You need to connect to your tezos wallet of choice. If you have not created a wallet before, we recommend using kukai. It is super simple: You log in to your Google Account in another tab and that is it. You go back to the app's tab and are connected!

## Deployment

Merging into main triggers the deployment of the UI with Vercel. The link is [Vercel App Link](moonprint-8zxipwdwx-julibi.vercel.app). Unfortunately we had issues with deployment at some time because of localStorage. So for now, you will have to use this beautiful app in Localhost :)

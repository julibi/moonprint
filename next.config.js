/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    NEXT_PUBLIC_IPFS_INFURA_PROJECT_ID: process.env.IPFS_INFURA_PROJECT_ID,
    NEXT_PUBLIC_IPFS_INFURA_SECRET: process.env.IPFS_INFURA_SECRET,
  },
};

module.exports = nextConfig;

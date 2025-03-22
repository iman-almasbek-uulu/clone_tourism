/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "13.61.147.8",
      },
    ],
  },
};

module.exports = nextConfig;

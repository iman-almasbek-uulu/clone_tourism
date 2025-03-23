const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.sitetrevel.online",
      },
      {
        protocol: "https",
        hostname: "*.api.sitetrevel.online",
      },
    ],
  },
};

module.exports = nextConfig;
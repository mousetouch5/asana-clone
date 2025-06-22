/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath: "/asana-clone",
  assetPrefix: "/asana-clone/",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;

/** @type {import('next').NextConfig} */

const runtimeCaching = require("next-pwa/cache");
const withPWA = require("next-pwa")({
  dest: "public",
  // disable: process.env.NODE_ENV === "development",
  buildExcludes: [/middleware-manifest.json$/],
  runtimeCaching,
  register: true,
});

module.exports = withPWA({
  reactStrictMode: true,
  images: {
    domains: ["res.cloudinary.com"],
  },
});

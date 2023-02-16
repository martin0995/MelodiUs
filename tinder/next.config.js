/** @type {import('next').NextConfig} */

const runtimeCaching = require("next-pwa/cache");
const withPWA = require("next-pwa")({
  dest: "public",
});
// const withPWA = require("next-pwa")({
//   pwa: {
//     dest: "public",
//     register: true,
//     skipWaiting: true,
//     scope: "/app",
//     sw: "service-worker.js",
//     runtimeCaching,
//     buildExcludes: [/middleware-manifest.json$/],
//     disable: process.env.NODE_ENV === "development",
//   },
// });

// const nextConfig = withPWA({
//   reactStrictMode: true,
//   images: {
//     domains: ["res.cloudinary.com"],
//   },
// });

module.exports = withPWA({
  nextConfig: {
    reactStrictMode: true,
    images: {
      domains: ["res.cloudinary.com"],
    },
  },
  pwa: {
    dest: "public",
    disable: process.env.NODE_ENV === "development",
    buildExcludes: [/middleware-manifest.json$/],
    runtimeCaching,
    register: true,
  },
});

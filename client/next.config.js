/** @type {import('next').NextConfig} */

module.exports = {
   reactStrictMode: true,
   swcMinify: true,
   webpack5: true,
   images: {
      domains: ["localhost"],
   },
    async rewrites() {
      return [
         {
            source: "/api/:path*",
            destination: "http://localhost:8080/:path*", // Proxy to Backend
         },
      ];
   },
};

// module.exports = nextConfig

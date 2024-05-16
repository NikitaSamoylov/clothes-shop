/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.google*.com',
        port: '',
      },
    ],
  },
};

export default nextConfig;

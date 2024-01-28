/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "public.linear.app",
        port: "",
      },
    ],
  },
};

export default nextConfig;

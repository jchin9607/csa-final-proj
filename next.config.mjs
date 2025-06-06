/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["i.scdn.co"],
  },
  experimental: {
    useCache: true,
  },
};

export default nextConfig;

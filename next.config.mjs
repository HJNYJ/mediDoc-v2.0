/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    // domains: [
    //   "ifh.cc",
    //   "search.pstatic.net",
    //   "zxmfaufazajrwupitcjr.supabase.co",
    //   "img1.kakaocdn.net"
    // ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ifh.cc"
      },
      {
        protocol: "https",
        hostname: "search.pstatic.net"
      },
      {
        protocol: "https",
        hostname: "zxmfaufazajrwupitcjr.supabase.co"
      },
      {
        protocol: "https",
        hostname: "img1.kakaocdn.net"
      }
    ],
    imageSizes: [24, 45, 128, 375],
    deviceSizes: [640, 768, 1024, 1280, 1536]
  }
};
export default nextConfig;

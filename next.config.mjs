/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "zxmfaufazajrwupitcjr.supabase.co",
      "icxxtjvkfjgebycacdab.supabase.co"
    ]
  }
  // webpack: (config) => {
  //   // URL 파일로더
  //   const fileLoaderRule = config.module.rules.find((rule) =>
  //     rule.test?.test?.(".svg")
  //   );

  //   // @svgr/webpack 규칙 추가
  //   config.module.rules.push(
  //     {
  //       ...fileLoaderRule,
  //       test: /\.svg$/i,
  //       // 후에 설명할 리소스 쿼리입니다.
  //       resourceQuery: { not: /components/ }
  //     },
  //     {
  //       test: /\.svg$/i,
  //       issuer: /\.[jt]sx?$/,
  //       resourceQuery: /components/,
  //       use: ["@svgr/webpack"]
  //     }
  //   );
  //   return config;
  // }
};
export default nextConfig;

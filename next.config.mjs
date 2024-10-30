/** @type {import('next').NextConfig} */
const nextConfig = {
   images: {
      remotePatterns: [
         {
            hostname: "irapardaz-chatbots.storage.iran.liara.space",
            protocol: "https",
            pathname: "/**",
         },
      ],
   },
}

export default nextConfig

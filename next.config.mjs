/** @type {import('next').NextConfig} */
const nextConfig = {
    redirects: async () => {
      return [
        {
          source: "/",
          destination: "/builder",
          permanent: true,
        },
      ];
    },
  };

export default nextConfig;

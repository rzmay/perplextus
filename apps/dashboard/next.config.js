module.exports = {
  reactStrictMode: true,
  transpilePackages: ['ui'],
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: { ignoreDuringBuilds: true },
  images: {
    domains: ['localhost', 'lh3.googleusercontent.com', 'bucket-cdn-production.up.railway.app', 'cdn.zippin.dev'],
  },
  async redirects() {
    return [
      {
        source: '/(.*\\/\\/.*)',
        destination: '/',
        permanent: false,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: '/ajax/:path*',
        destination: `${process.env.API_BASE_URL}/ajax/:path*`,
      },
      {
        source: '/api/:path*',
        destination: `${process.env.API_BASE_URL}/:path*`,
      },
    ];
  },
};

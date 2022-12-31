/** @type {import('next').NextConfig} */
const nextConfig = {
images: {
    loader: 'akamai',
    path: '',
  },
exportPathMap: async function (
    defaultPathMap,
    { dev, dir, outDir, distDir, buildId }
  ) {
    return {
      '/': { page: '/' },
      '/about': { page: '/about' },
      '/p/signinpage': { page: '/signinpage' },
    }
  },
  reactStrictMode: false,
}

module.exports = nextConfig

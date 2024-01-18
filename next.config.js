const million = require('million/compiler')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  experimental: {
    serverComponentsExternalPackages: ['bcrypt', 'sharp', 'crypto', "uuid"],
  }
}

// module.exports = million.next(nextConfig, {
//   mute: true,
//   auto: true,
// })

module.exports = nextConfig

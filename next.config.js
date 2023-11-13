const million = require('million/compiler')

/** @type {import('next').NextConfig} */
const nextConfig = {

}

const millionConfig = {
  auto: true,
  mute: 'info'
  // if you're using RSC:
  // auto: { rsc: true },
}

module.exports = million.next(nextConfig, millionConfig)

// module.exports = nextConfig

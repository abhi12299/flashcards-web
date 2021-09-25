const path = require('path')
const removeImports = require('next-remove-imports')();

module.exports = removeImports({
  reactStrictMode: true,
  images: {
    domains: ['avatars.dicebear.com'],
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
})

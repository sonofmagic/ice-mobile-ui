// const autoImport = require('unplugin-auto-import/webpack')

const withNextra = require('nextra')({
  theme: '@icebreakers/nextra-theme-docs',
  themeConfig: './theme.config.jsx',
  defaultShowCopyCode: true,
})

const i18n = require('./i18n')
/**
 * @type {import('next').NextConfig}
 */
const opt = {
  i18n,
  // output: process.env.NEXT_OUTPUT,
  webpack: (config) => {
    // console.log(config.module.rules)
    config.module.rules.push({
      resourceQuery: /raw/,
      type: 'asset/source',
    })
    // config.resolve.fallback = { fs: false, path: false, module: false, v8: false, perf_hooks: false }
    // config.plugins.push(
    //   autoImport({
    //     imports: ['react'],
    //     eslintrc: {
    //       enabled: true
    //     }
    //     // dirs: ['./components']
    //   })
    // )
    // console.log(config)
    return config
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },

  //  redirects() {
  //     return [
  //       {
  //         source: '/',
  //         destination: '/index',
  //         permanent: true,
  //       },
  //     ];
  //   },
}
module.exports = withNextra(opt) // nextTranslate(opt))

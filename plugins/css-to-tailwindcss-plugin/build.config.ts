import path from 'node:path'
import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig([
  {
    entries: ['./src/index', './src/cli', './src/tailwindcss.ts'],
    rollup: {
      // 内联，相当于 nodeResolve
      inlineDependencies: true,
      // cjs
      emitCJS: true,
      // 添加 cjs 注入
      cjsBridge: true,
      dts: {
        // https://github.com/unjs/unbuild/issues/135
        respectExternal: false,
      },
    },
    alias: {
      // 别名
      '@': path.resolve(__dirname, './src'),
    },
    // dts
    declaration: true,
    externals: [/^tailwindcss/, 'sass'],
    failOnWarn: false,
  },
  {
    entries: ['./src/browser.ts'],
    rollup: {
      // 内联，相当于 nodeResolve
      inlineDependencies: true,
      // cjs
      emitCJS: true,
      // 添加 cjs 注入
      // cjsBridge: true,
      dts: {
        // https://github.com/unjs/unbuild/issues/135
        respectExternal: false,
      },
    },
    alias: {
      // 别名
      '@': path.resolve(__dirname, './src'),
    },

    // dts
    declaration: true,
    externals: [/^tailwindcss/, 'sass', '@babel/standalone'],
  },
])

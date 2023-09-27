import fs from 'node:fs/promises'
import path from 'node:path'
import tailwindcss, { Config } from 'tailwindcss'
import defu from 'defu'
import postcss from 'postcss'
import { createContext } from '@/core'

const fixturesPath = path.resolve(__dirname, 'fixtures')

export function fixturesResolve(...args: string[]) {
  return path.resolve(fixturesPath, ...args)
}

export function getCase(...args: string[]) {
  return fs.readFile(fixturesResolve(...args))
}

export const defaultTailwindConfig = require(fixturesResolve('config/tailwind.config.js'))

export const withPluginTailwindConfigPath = fixturesResolve('config/tailwind-with-plugin.config.js')

export function mergeConfig(cfg: Config): Config {
  return Object.assign<Config, Config>(cfg, defaultTailwindConfig)
}

export function getTwCtx(config?: Config) {
  return createContext({
    tailwindcssConfig: defu(config, defaultTailwindConfig)
  })
}

export function getCssByConfigPath(config: string) {
  return postcss([
    tailwindcss({
      config
    })
  ])
    .process('@tailwind base;@tailwind components;@tailwind utilities;')
    .async()
}

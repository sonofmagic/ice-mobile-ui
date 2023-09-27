import path from 'node:path'
import fs from 'node:fs'
import md5 from 'md5'
import { createContext } from './core'
import { TailwindcssPluginOptions } from './types'
import { ensureDir } from './utils'
// https://tailwindcss.com/docs/plugins

function generateTempPlugin(entry: string, p: string) {
  const ctx = createContext()
  ctx.processSync(entry)
  const code = ctx.generate()
  fs.writeFileSync(p, code, 'utf8')
  return code
}

function getDefaultCacheDir() {
  return path.resolve(process.cwd(), 'node_modules', '.css-to-tailwindcss-plugin')
}
// https://github.com/tailwindlabs/tailwindcss/blob/master/src/lib/setupContextUtils.js#L784

// https://github.com/tailwindlabs/tailwindcss/blob/master/src/lib/setupContextUtils.js#L784
export default (options: TailwindcssPluginOptions) => {
  const cacheDir = options.cacheDir ?? getDefaultCacheDir()
  ensureDir(cacheDir)

  const indexFilePath = path.resolve(cacheDir, 'index.json')
  // css filename hash and content hash
  let hashMap: Record<string, string> = {}
  function loadCache() {
    if (fs.existsSync(indexFilePath)) {
      try {
        hashMap = JSON.parse(fs.readFileSync(indexFilePath, 'utf8'))
      } catch {
        console.log(`parse json: ${indexFilePath} failed!`)
      }
    }
  }

  function writeCacheIndexFile(data: Record<string, string>) {
    fs.writeFileSync(indexFilePath, JSON.stringify(data), 'utf8')
  }

  loadCache()

  const targetPlugins: string[] = []
  for (const entry of options.entries) {
    const fileHash = md5(entry)
    const cssHash = md5(fs.readFileSync(entry))
    const p = path.resolve(cacheDir, fileHash) + '.js'
    // plugin existed
    if (fs.existsSync(p)) {
      // css entry content changed
      if (hashMap[fileHash] !== cssHash) {
        generateTempPlugin(entry, p)
        hashMap[fileHash] = cssHash
      }
    } else {
      // css entry content add
      generateTempPlugin(entry, p)
      hashMap[fileHash] = cssHash
    }
    targetPlugins.push(p)
  }
  // process.nextTick(() => {

  // })
  // for (const tmpPlugin of targetPlugins) {
  //   const fn = require(tmpPlugin)
  //   if (typeof fn === 'function') {
  //     fn()
  //   }
  // }
  writeCacheIndexFile(hashMap)

  return targetPlugins.map((x) => require(x))
}

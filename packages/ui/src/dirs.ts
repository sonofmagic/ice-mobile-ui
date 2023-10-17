import path from 'node:path'

const assetsDir = path.resolve(__dirname, '../assets')
const scssDir = path.resolve(assetsDir, 'scss')
const jsDir = path.resolve(assetsDir, 'js')
const cssDir = path.resolve(assetsDir, 'css')
const cssResolvedDir = path.resolve(assetsDir, 'css-resolved')
const pluginsDir = path.resolve(assetsDir, 'plugins')

function getCssPath(relPath: string) {
  const cssPath = path.resolve(cssDir, relPath)
  return cssPath.replace(/scss$/, 'css')
}

function getJsPath(relPath: string) {
  const jsPath = path.resolve(jsDir, relPath)
  return jsPath.replace(/scss$/, 'js')
}

function getPluginsPath(relPath: string) {
  const jsPath = path.resolve(pluginsDir, relPath)
  return jsPath.replace(/scss$/, 'js')
}

function getCssResolvedpath(relPath: string) {
  const jsPath = path.resolve(cssResolvedDir, relPath)
  return jsPath.replace(/scss$/, 'css')
}

export { assetsDir, scssDir, jsDir, cssDir, cssResolvedDir, pluginsDir, getCssPath, getJsPath, getPluginsPath, getCssResolvedpath }

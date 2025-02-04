import type { Config, PluginsConfig } from 'tailwindcss/types/config'
import merge from 'merge'
import plugin from 'tailwindcss/plugin'

export interface UserDefinedOptions {}
// https://github.com/tailwindlabs/tailwindcss/blob/master/src/lib/setupContextUtils.js#L736
// https://github.com/tailwindlabs/tailwindcss/blob/master/src/util/resolveConfig.js#L237

// type PluginItem = PluginsConfig[number]

export function composePlugins(...plugins: PluginsConfig | PluginsConfig[]): ReturnType<typeof plugin.withOptions> {
  const _plugins = plugins.flat()
  const allConfigs: Partial<Config>[] = []
  const userPlugins = _plugins.map((plugin) => {
    // @ts-ignore
    if (plugin.__isOptionsFunction) {
      // @ts-ignore
      plugin = plugin()
    }
    // @ts-ignore
    allConfigs.push(plugin.config)
    return typeof plugin === 'function' ? plugin : plugin.handler
  })

  return plugin.withOptions(
    () => {
      return (api) => {
        try {
          for (const p of userPlugins) {
            p(api)
          }
        }
        catch (error) {
          console.log('[compose-tailwindcss-plugins]', error)
        }
      }
    },
    () => {
      const config = merge.recursive(true, ...allConfigs)
      return config
    },
  )
}

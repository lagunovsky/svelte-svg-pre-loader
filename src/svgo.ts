import type { CustomPlugin, DefaultPlugin, DefaultPlugins, DefaultPresetPlugins, OptimizeOptions, Plugin, PresetDefault } from 'svgo'


type ProcessedPlugin = DefaultPlugins | CustomPlugin
type ProcessedPluginMap = Map<ProcessedPlugin['name'], ProcessedPlugin>


const necessaryDefaultPresetPlugins: DefaultPresetPlugins['name'][] = [
  'removeDoctype',
  'removeComments',
  'removeXMLProcInst',
  'removeMetadata',
  'removeEditorsNSData',
]

const necessaryPlugins: DefaultPlugins['name'][] = [
  'removeStyleElement',
  'removeDimensions',
]

export function validateAndFixSvgoOptions(opts: OptimizeOptions = {}) {
  if (!Array.isArray(opts.plugins)) {
    opts.plugins = [ 'preset-default', ...necessaryPlugins ]
    return opts
  }

  const plugins: ProcessedPluginMap = new Map()

  opts.plugins.forEach(plugin => {
    if (typeof plugin === 'string') {
      plugins.set(plugin, { name: plugin } as ProcessedPlugin)
    } else {
      plugins.set(plugin.name, plugin)
    }
  })

  if (plugins.has('preset-default')) {
    const plugin = plugins.get('preset-default') as PresetDefault
    if (plugin.params !== undefined && plugin.params.overrides !== undefined) {
      for (const necessaryPlugin of necessaryDefaultPresetPlugins) {
        if (plugin.params.overrides[necessaryPlugin] === false) {
          delete plugin.params.overrides[necessaryPlugin]
        }
      }
    }
    for (const necessaryPlugin of necessaryPlugins) {
      if (!plugins.has(necessaryPlugin)) {
        plugins.set(necessaryPlugin, { name: necessaryPlugin as any })
      }
    }
  } else {
    for (const necessaryPlugin of [ ...necessaryDefaultPresetPlugins, ...necessaryPlugins ]) {
      const plugin = plugins.get(necessaryPlugin) as DefaultPlugin<string, object>
      if (!plugin) {
        plugins.set(necessaryPlugin, { name: necessaryPlugin } as ProcessedPlugin)
      } else if (Object.prototype.hasOwnProperty.call(plugin, 'active')) {
        delete plugin.active
      }
    }
  }

  opts.plugins = Array.from(plugins.values()) as Plugin[]
  return opts
}

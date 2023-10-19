import { Types, expandColorsMap } from './shared'

function generateDefault(typeName: string) {
  return `border-${typeName} bg-${typeName} text-${typeName}-content`
}

function generateOutline(typeName: string) {
  return `text-${typeName}`
}

const colorsMap = expandColorsMap(Types, (cur) => {
  return {
    default: generateDefault(cur),
    outline: generateOutline(cur)
  }
})

const defaults = {
  styled: {
    default: 'rounded-badge border border-base-200 bg-base-100 text-base-content',
    outline: 'border-current border-opacity-50 bg-transparent text-current',
    ghost: 'border-base-200 bg-base-200 text-base-content'
  },
  unstyled: {
    default: 'inline-flex items-center justify-center transition duration-200 ease-out h-5 text-sm leading-5 w-[fit-content] pl-[0.563rem] pr-[0.563rem]'
  }
}

// const injectName = createInjectName('badge')
// const sassColors = transformJsToSass(colorsMap)
// const sassDefaults = transformJsToSass(defaults)
// export const inject = {
//   [injectName.colors]: () => {
//     return sassColors
//   },
//   [injectName.defaults]: () => {
//     return sassDefaults
//   }
// }

export const options = {
  colors: colorsMap,
  defaults
}

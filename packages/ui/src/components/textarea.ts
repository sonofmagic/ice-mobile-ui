import { IDefaults, Types, expandColorsMap } from './shared'

const colorsMap = expandColorsMap(Types, (cur) => {
  return {
    default: `border-${cur}`,
    focus: `outline-${cur}`
  }
})
// const injectName = createInjectName('textarea')
// const sassColors = transformJsToSass(colorsMap)
// // const sassDefaults = transformJsToSass(defaults)
// export const inject = {
//   [injectName.colors]: () => {
//     return sassColors
//   }
// }

const defaults: IDefaults = {
  styled: {
    default: 'border-base-content bg-base-100 rounded-btn border border-opacity-0',
    bordered: 'border-opacity-20',
    focus: 'outline-base-content/20 outline outline-2 outline-offset-2',
    ghost: 'bg-opacity-5',
    ghostFocus: {
      apply: 'text-base-content bg-opacity-100',
      css: {
        'box-shadow': 'none'
      }
    },
    disabled: 'border-base-200 bg-base-200 placeholder-base-content cursor-not-allowed text-opacity-20 placeholder-opacity-20'
  },
  unstyled: {
    default: 'min-h-12 flex-shrink px-4 py-2 text-sm leading-loose'
  }
}

export const options = {
  colors: colorsMap,
  defaults
}

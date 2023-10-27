import { IDefaults, expandColorsMap } from './shared'
import { CreatePresetOptions } from '@/sass/functions'
function generateDefault(typeName: string) {
  return `border-${typeName} [@media(hover:hover)]:hover:border-${typeName}`
}

function generateFocus(typeName: string) {
  return `outline-${typeName}`
}

function generateChecked(typeName: string) {
  return `border-${typeName} bg-${typeName} text-${typeName}-content`
}

const defaults: IDefaults = {
  styled: {
    default: 'border-base-content rounded-btn h-6 w-6 cursor-pointer appearance-none border border-opacity-20',
    checked: {
      apply: 'bg-base-content bg-no-repeat',
      css: {
        animation: 'checkmark var(--animation-input, 0.2s) ease-out'
      }
    },
    indeterminate: {
      apply: 'bg-base-content bg-no-repeat',
      css: {
        animation: 'checkmark var(--animation-input, 0.2s) ease-out'
      }
    },
    disabled: 'bg-base-content cursor-not-allowed border-transparent opacity-20',
    focusVisible: 'outline-base-content outline outline-2 outline-offset-2'
  }
}
export const options = (opts: CreatePresetOptions) => {
  const d = {
    colors: expandColorsMap(opts.types, (cur) => {
      return {
        default: generateDefault(cur),
        focusVisible: generateFocus(cur),
        checked: generateChecked(cur)
      }
    }),
    defaults
  }
  return d
}

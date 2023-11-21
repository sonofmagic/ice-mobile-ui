import { GetSchemaFn, getSelector, expandTypes } from './shared'

export const schema: GetSchemaFn = (opts) => {
  const { selector, types } = opts
  return {
    selector,
    defaults: {
      styled: {
        [selector]: {
          apply: 'border-base-content bg-base-100 rounded-btn border border-opacity-0',
          '&-bordered': {
            apply: 'border-opacity-20'
          },
          '&:focus': {
            apply: 'outline-base-content/20 outline outline-2 outline-offset-2'
          },
          '&-ghost': {
            apply: 'bg-opacity-5',
            '&:focus': {
              apply: 'text-base-content bg-opacity-100',
              css: {
                'box-shadow': 'none'
              }
            }
          },
          ...expandTypes(types, (type) => {
            return {
              key: `&${getSelector(type)}`,
              value: {
                apply: `border-${type}`,
                '&:focus': {
                  apply: `outline-${type}`
                }
              }
            }
          }),
          [`&-disabled,
          &:disabled,
          &[disabled]`]: {
            apply: 'border-base-200 bg-base-200 placeholder-base-content cursor-not-allowed text-opacity-20 placeholder-opacity-20'
          }
        }
      },
      base: {
        [selector]: {
          apply: 'min-h-12 flex-shrink px-4 py-2 text-sm leading-loose'
        }
      },
      utils: {
        [selector]: {
          [`&${getSelector('xs')}`]: {
            apply: 'px-2 py-1 text-xs leading-relaxed'
          },
          [`&${getSelector('sm')}`]: {
            apply: 'px-3 py-1 text-sm leading-8'
          },
          [`&${getSelector('md')}`]: {
            apply: 'px-4 py-3 text-sm leading-loose'
          },
          [`&${getSelector('lg')}`]: {
            apply: 'px-6 py-4 text-lg leading-loose'
          }
        }
      }
    }
  }
}

import type { CodegenOptions, DeepPartial } from './types'
import { defaultVarPrefix } from './constants'

const shareVars = {
  'rounded-box': '1rem',
  'rounded-btn': '0.5rem',
  'rounded-badge': '1.9rem',
  'animation-btn': '0.25s',
  'animation-input': '0.2s',
  // 'btn-text-case': 'uppercase',
  // 'btn-active-scale': '0.95',
  'border-btn': '1px',
  'tab-border': '1px',
  'tab-radius': '0.5rem'
}

export function getDefaultBase(raw?: boolean) {
  const types = raw
    ? {}
    : {
        primary: {
          light: {
            // blue-6
            primary: '#1677ff',
            // blue-5
            'primary-hover': '#4096ff',
            // blue-7
            'primary-active': '#0958d9',
            // white
            'primary-content': '#ffffff'
          },
          dark: {
            // blue-6
            primary: '#1668dc',
            // blue-5
            'primary-hover': '#1554ad',
            'primary-active': '#3c89e8',
            'primary-content': '#ffffff'
          }
        },
        success: {
          light: {
            success: '#52c41a',
            'success-hover': '#73d13d',
            'success-active': '#389e0d',
            'success-content': '#ffffff'
          },
          dark: {
            // green-6
            success: '#49aa19',
            // green-5
            'success-hover': '#3c8618',
            'success-active': '#6abe39',
            'success-content': '#ffffff'
          }
        },
        warning: {
          light: {
            // gold-6
            warning: '#faad14',
            // gold-5
            'warning-hover': '#ffc53d',
            'warning-active': '#d48806',
            'warning-content': '#ffffff'
          },
          dark: {
            warning: '#d89614',
            // gold-5
            'warning-hover': '#aa7714',
            'warning-active': '#e8b339',
            'warning-content': '#ffffff'
          }
        },
        error: {
          light: {
            // red-6
            error: '#f5222d',
            // red-5
            'error-hover': '#ff4d4f',
            'error-active': '#cf1322',
            'error-content': '#ffffff'
          },
          dark: {
            error: '#d32029',
            // red-5
            'error-hover': '#a61d24',
            'error-active': '#e84749',
            'info-content': '#ffffff'
          }
        },
        info: {
          light: {
            info: '#1677ff',
            // blue-5
            'info-hover': '#4096ff',
            'info-active': '#0958d9',
            'info-content': '#ffffff'
          },
          dark: {
            info: '#1668dc',
            // blue-5
            'info-hover': '#1554ad',
            'info-active': '#3c89e8',
            'info-content': '#ffffff'
          }
        },
        neutral: {
          light: {
            // gray-10
            neutral: '#262626',
            'neutral-hover': '#434343',
            'neutral-active': '#1f1f1f',
            'neutral-content': '#ffffff'
          },
          dark: {
            neutral: '#262626',
            'neutral-hover': '#434343',
            'neutral-active': '#1f1f1f',
            'neutral-content': '#ffffff'
          }
        }
      }
  return {
    themes: {
      light: {
        selector: ':root'
      },
      dark: {
        selector: '[data-theme="dark"]'
      }
    },
    types,
    extraColors: {
      light: {
        'base-100': '#ffffff',
        'base-200': '#fafafa',
        'base-300': '#f5f5f5',
        'base-400': '#f0f0f0',
        'base-500': '#d9d9d9',
        'base-600': '#bfbfbf',
        'base-700': '#8c8c8c',
        'base-800': '#595959',
        'base-900': '#434343',
        'base-1000': '#262626',
        'base-1100': '#1f1f1f',
        'base-1200': '#141414',
        'base-1300': '#000000',
        'base-content': '#000000' // 'rgb(31, 41, 55)'
      },
      dark: {
        'base-1300': '#ffffff',
        'base-1200': '#fafafa',
        'base-1100': '#f5f5f5',
        'base-1000': '#f0f0f0',
        'base-900': '#d9d9d9',
        'base-800': '#bfbfbf',
        'base-700': '#8c8c8c',
        'base-600': '#595959',
        'base-500': '#434343',
        'base-400': '#262626',
        'base-300': '#1f1f1f',
        'base-200': '#141414',
        'base-100': '#000000',
        'base-content': '#ffffff' // 'rgb(166, 173, 186)'
      }
    },
    extraVars: {
      light: {
        ...shareVars
      },
      dark: {
        ...shareVars
      }
    }
  }
}

export function getCodegenDefaults(raw?: boolean): DeepPartial<CodegenOptions> {
  const base = getDefaultBase(raw)
  return {
    mode: 'styled',
    varPrefix: defaultVarPrefix,
    log: true,
    autobuild: true,
    dryRun: false,
    // rtl: false,
    // styled: true,
    global: {
      atMedia: {
        hover: false
      },
      selector: {
        universal: '*',
        globalKeyword: 'global'
      }
      // pseudo: {
      //   where: true
      // }
    },
    base,
    runtime: {
      atMedia: {},
      selector: {}
    }
  }
}

// export const Types = ['primary', 'info', 'success', 'warning', 'error', 'neutral']

// const defaultColorVars = {
//   // primary
//   // blue-6
//   primary: '#1677ff',
//   // blue-5
//   'primary-hover': '#4096ff',
//   // blue-7
//   'primary-active': '#0958d9',
//   // white
//   'primary-content': '#ffffff',
//   // success

//   // green-6
//   success: '#52c41a',
//   'success-hover': '#73d13d',
//   'success-active': '#389e0d',
//   'success-content': '#ffffff',
//   // warning
//   // gold-6
//   warning: '#faad14',
//   // gold-5
//   'warning-hover': '#ffc53d',
//   'warning-active': '#d48806',
//   'warning-content': '#ffffff',
//   // error
//   // red-6
//   error: '#f5222d',
//   // red-5
//   'error-hover': '#ff4d4f',
//   'error-active': '#cf1322',
//   'error-content': '#ffffff',
//   // info
//   // blue-6
//   info: '#1677ff',
//   // blue-5
//   'info-hover': '#4096ff',
//   'info-active': '#0958d9',
//   'info-content': '#ffffff',
//   // neutral
//   neutral: '#bfbfbf',
//   'neutral-hover': '#d9d9d9',
//   'neutral-active': '#8c8c8c',
//   'neutral-content': '#ffffff',
//   // base
//   'base-100': '#ffffff',
//   'base-200': 'rgb(242, 242, 242)',
//   'base-300': 'rgb(229, 230, 230)',
//   'base-content': 'rgb(31, 41, 55)'
// }

// const defaultDarkColorVars: Record<keyof typeof defaultColorVars, string> = {
//   // primary
//   // blue-6
//   primary: '#1668dc',
//   // blue-5
//   'primary-hover': '#1554ad',
//   'primary-active': '#3c89e8',
//   'primary-content': '#000000',
//   // success

//   // green-6
//   success: '#49aa19',
//   // green-5
//   'success-hover': '#3c8618',
//   'success-active': '#6abe39',
//   'success-content': '#000000',
//   // warning
//   // gold-6
//   warning: '#d89614',
//   // gold-5
//   'warning-hover': '#aa7714',
//   'warning-active': '#e8b339',
//   'warning-content': '#000000',
//   // error
//   // red-6
//   error: '#d32029',
//   // red-5
//   'error-hover': '#a61d24',
//   'error-active': '#e84749',
//   'error-content': '#000000',
//   // info
//   // blue-6
//   info: '#1668dc',
//   // blue-5
//   'info-hover': '#1554ad',
//   'info-active': '#3c89e8',
//   'info-content': '#000000',
//   // neutral
//   neutral: '#bfbfbf',
//   'neutral-hover': '#d9d9d9',
//   'neutral-active': '#8c8c8c',
//   'neutral-content': '#ffffff',
//   // neutral: 'rgb(42, 50, 60)',
//   // 'neutral-active': 'rgb(36, 43, 51)',
//   // 'neutral-content': 'rgb(166, 173, 186)',
//   // base
//   'base-100': 'rgb(29, 35, 42)',
//   'base-200': 'rgb(25, 30, 36)',
//   'base-300': 'rgb(21, 25, 30)',
//   'base-content': 'rgb(166, 173, 186)'
// }

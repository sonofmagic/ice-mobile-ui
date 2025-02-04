import type { Config } from '@/index'
import type { DeepPartial } from '@/types'
import { removeDefaultComponents } from '@/components'
import { createContext } from '@/index'
import { omitRoot } from './utils'

describe('options merge', () => {
  it('merge case 0', async () => {
    const options = {
      components: {
        ...removeDefaultComponents,
        xxx: {
          extend: () => {
            return {
              base: `.xxx{
                @apply bg-red-300 text-sm leading-4 #{!important};
                color: red;
              }`,
            }
          },
        },
      },
      dryRun: true,
      // outdir
    }
    const ctx = createContext(options)

    await ctx.buildComponents()
    const xa = omitRoot(ctx.components)
    expect(xa).toMatchSnapshot()
  })

  it('merge case 1', async () => {
    const options: DeepPartial<Config> = {
      components: {
        ...removeDefaultComponents,
        button: {
          extend: ({ selector }) => {
            return {
              utils: `
              ${selector}::after{
                border: none;
              }

              ${selector}{
                border-style: solid;
              }
              `,
            }
          },
        },
      },
      dryRun: true,
      // outdir
    }
    const ctx = createContext(options)

    await ctx.buildComponents()
    expect(omitRoot(ctx.components)).toMatchSnapshot()
  })

  it('merge case 2', async () => {
    const options = {
      components: {
        ...removeDefaultComponents,
        button: {
          extend: [
            ({ selector }) => {
              return {
                utils: `
                ${selector}::after{
                  border: none;
                }
  
                ${selector}{
                  border-style: solid;
                }
                `,
              }
            },
          ],
        },
      },
      dryRun: true,
      // outdir
    }
    const ctx = createContext(options)

    await ctx.buildComponents()
    expect(omitRoot(ctx.components)).toMatchSnapshot()
  })

  it('merge case 3', async () => {
    const selector = '.btn'
    const options = {
      components: {
        ...removeDefaultComponents,
        button: {
          extend: [
            {
              utils: `
              ${selector}::after{
                border: none;
              }

              ${selector}{
                border-style: solid;
              }
              `,
            },
          ],
        },
      },
      dryRun: true,
    }
    const ctx = createContext(options)

    await ctx.buildComponents()
    expect(omitRoot(ctx.components)).toMatchSnapshot()
  })

  it('merge case 4', async () => {
    const options = {
      components: {
        ...removeDefaultComponents,
        button: {
          extend: `
          .btn::after{
            border:none;
          }
          .btn{
            border-style:solid;
          }
          `,
        },
      },
      dryRun: true,
    }
    const ctx = createContext(options)

    await ctx.buildComponents()
    expect(omitRoot(ctx.components)).toMatchSnapshot()
  })

  it('merge case 5', async () => {
    const options = {
      components: {
        ...removeDefaultComponents,
        button: {
          extend: [
            `
          .btn::after{
            border:none;
          }
          .btn{
            border-style:solid;
          }
          `,
          ],
        },
      },
      dryRun: true,
    }
    const ctx = createContext(options)

    const cssObj = await ctx.buildComponents()
    expect(cssObj).toMatchSnapshot()
  })

  it('merge case 6', async () => {
    const options = {
      components: {
        ...removeDefaultComponents,
        button: {
          extend: [
            `
          .btn::after{
            border:none;
          }
          
          `,
            {
              utils: `
             .btn{
                border-style: solid;
              }
              `,
            },
          ],
        },
      },
      dryRun: true,
    }
    const ctx = createContext(options)

    await ctx.buildComponents()
    expect(omitRoot(ctx.components)).toMatchSnapshot()
  })

  it('merge case 7', async () => {
    const options = {
      components: {
        ...removeDefaultComponents,
        button: {
          extend: [
            `
          .btn::after{
            border:none;
          }
          
          `,
            `.btn{
            border-style:solid;
          }`,
          ],
        },
      },
      dryRun: true,
    }
    const ctx = createContext(options)

    await ctx.buildComponents()
    expect(omitRoot(ctx.components)).toMatchSnapshot()
  })

  it('merge case 8', async () => {
    const options = {
      components: {
        ...removeDefaultComponents,
        button: {
          extend: [
            `
          .btn::after{
            border:none;
          }
          
          `,
            ({ selector }) => {
              return {
                utils: `
                ${selector}{
                  border-style: solid;
                }
                `,
              }
            },
          ],
        },
      },
      dryRun: true,
    }
    const ctx = createContext(options)

    await ctx.buildComponents()
    expect(omitRoot(ctx.components)).toMatchSnapshot()
  })

  it('merge case 9', async () => {
    const options = {
      components: {
        ...removeDefaultComponents,
        xxx: {
          selector: '.xxx',
          extend: [
            `
          .btn::after{
            border:none;
          }
          
          `,
            ({ selector }) => {
              return {
                utils: `
                ${selector}{
                  border-style: solid;
                }
                `,
              }
            },
          ],
        },
      },
      dryRun: true,
    }
    const ctx = createContext(options)

    await ctx.buildComponents()
    expect(omitRoot(ctx.components)).toMatchSnapshot()
  })

  it('merge case 10', async () => {
    const options = {
      components: {
        ...removeDefaultComponents,
        xxx: {
          selector: '.xxx',
          extend: {
            utils: [
              `
            .btn::after{
              border:none;
            }
            
            `,
              ({ selector }) => {
                return `
                ${selector}{
                  border-style: solid;
                }
                `
              },
            ],
          },
        },
      },
      dryRun: true,
    }
    const ctx = createContext(options)

    const cssObj = await ctx.buildComponents()
    expect(cssObj).toMatchSnapshot()
  })

  it('merge case 11', async () => {
    const options = {
      components: {
        ...removeDefaultComponents,
        xxx: {
          selector: '.xxx',
          extend: {
            utils: [
              ({ selector }) => {
                return `
                .btn::after{
                  border:none;
                }

                .btn{
                  border-style:solid;
                }
                
                `
              },
            ],
          },
        },
      },
      dryRun: true,
    }
    const ctx = createContext(options)

    await ctx.buildComponents()
    expect(omitRoot(ctx.components)).toMatchSnapshot()
  })

  it('merge case 12', async () => {
    const options = {
      components: {
        ...removeDefaultComponents,
        xxx: {
          selector: '.xxx',
          extend: {
            utils: ({ selector }) => {
              return `
              .btn::after{
                border:none;
              }

              .btn{
                border-style:solid;
              }
              
              `
            },
          },
        },
      },
      dryRun: true,
    }
    const ctx = createContext(options)

    await ctx.buildComponents()
    expect(omitRoot(ctx.components)).toMatchSnapshot()
  })

  it('merge case 13', async () => {
    const options = {
      components: {
        ...removeDefaultComponents,
        xxx: {
          selector: '.xxx',
          extend: {
            utils: `.content-area {
              height: calc(100vh - theme(spacing.12));
            }`,
          },
        },
      },
      dryRun: true,
    }
    const ctx = createContext(options)

    await ctx.buildComponents()
    expect(omitRoot(ctx.components)).toMatchSnapshot()
  })

  it('merge case 14', async () => {
    const options = {
      components: {
        ...removeDefaultComponents,
        xxx: {
          selector: '.xxx',
          extend: {
            utils: `.content-area {
              height: calc(100vh - theme(spacing[2.5]));
            }`,
          },
        },
      },
      dryRun: true,
    }
    const ctx = createContext(options)

    await ctx.buildComponents()
    expect(omitRoot(ctx.components)).toMatchSnapshot()
  })

  it('merge case 15', async () => {
    const options = {
      components: {
        ...removeDefaultComponents,
        xxx: {
          selector: '.xxx',
          extend: {
            utils: `.btn-blue {
              background-color: theme(colors.blue.500);
            }`,
          },
        },
      },
      dryRun: true,
    }
    const ctx = createContext(options)

    await ctx.buildComponents()
    expect(omitRoot(ctx.components)).toMatchSnapshot()
  })

  it('merge case 16', async () => {
    const options = {
      components: {
        ...removeDefaultComponents,
        xxx: {
          selector: '.xxx',
          extend: {
            utils: `.btn-blue {
              background-color: theme(colors.blue.500 / 75%);
            }`,
          },
        },
      },
      dryRun: true,
    }
    const ctx = createContext(options)

    await ctx.buildComponents()
    expect(omitRoot(ctx.components)).toMatchSnapshot()
  })
})

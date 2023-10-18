import * as t from '@babel/types'
import _babelGenerate from '@babel/generator'

// https://github.com/babel/babel/issues/15269
function _interopDefaultCompat(e: any) {
  return e && typeof e === 'object' && 'default' in e ? e.default : e
}
export const babelGenerate = _interopDefaultCompat(_babelGenerate) as typeof _babelGenerate

export function generateIndexCode(basenames: string[]) {
  // const booleanMap: Record<string, boolean> = {}
  const props = Object.entries(
    basenames
      .map((basename) => {
        const s = basename.split('/')
        return {
          key: s[1],
          type: s[0],
          path: basename
        }
      })
      .reduce<Record<string, t.ObjectProperty[]>>((acc, { key, path, type }) => {
        const node = t.objectProperty(t.stringLiteral(type), t.callExpression(t.identifier('require'), [t.stringLiteral(`./${path}.js`)]))
        if (acc[key]) {
          acc[key].push(node)
        } else {
          acc[key] = [node]
        }
        return acc
      }, {})
  ).map(([key, props]) => {
    return t.objectProperty(t.stringLiteral(key), t.objectExpression(props))
  })

  const ast = t.file(
    t.program([t.expressionStatement(t.assignmentExpression('=', t.memberExpression(t.identifier('module'), t.identifier('exports')), t.objectExpression(props)))])
  )

  return babelGenerate(ast).code
}

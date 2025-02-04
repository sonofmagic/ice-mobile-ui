import type { FC, PropsWithChildren, ReactElement } from 'react'
import { groupBy, upperFirst } from 'lodash-es'
import { Tabs } from 'nextra/components'
import { useMemo } from 'react'

export const CodePreview: FC = (props: PropsWithChildren) => {
  const { children } = props

  const dic = useMemo(() => {
    let c = children
    if (!Array.isArray(c)) {
      c = [children]
    }
    return groupBy<ReactElement>(c as ReactElement[], (x) => {
      return x.props['data-language'] ?? 'preview'
    })
  }, [children])

  const tabItems = useMemo(() => {
    return Object.keys(dic).map(x => upperFirst(x))
  }, [dic])

  return (
    <Tabs items={tabItems}>
      {dic.preview
        ? (
            <Tabs.Tab>
              <div className="space-x-2">{dic.preview}</div>
            </Tabs.Tab>
          )
        : undefined}
      {dic.html ? <Tabs.Tab>{dic.html}</Tabs.Tab> : undefined}
      {dic.jsx ? <Tabs.Tab>{dic.jsx}</Tabs.Tab> : undefined}
    </Tabs>
  )
}

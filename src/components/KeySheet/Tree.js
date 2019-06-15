import React, { memo, useState } from 'react'
import { useSpring, a } from 'react-spring'
import { useMeasure, usePrevious } from './helpers'
import { Global, Frame, Title, Content, toggle } from './treestyles'
import * as Icons from './icons'

export const TreeStuff = ({ children, name, style, defaultOpen = false }) => {
  const [isOpen, setOpen] = useState(defaultOpen)
  const previous = usePrevious(isOpen)
  const [bind, { height: viewHeight }] = useMeasure()
  const { height, opacity, transform } = useSpring({
    from: { height: 0, opacity: 0, transform: 'translate3d(20px,0,0)' },
    to: { height: isOpen ? viewHeight : 0, opacity: isOpen ? 1 : 0, transform: `translate3d(${isOpen ? 0 : 20}px,0,0)` }
  })
  const Icon = Icons[`${children ? (isOpen ? 'Minus' : 'Plus') : 'Close'}SquareO`]
  return (
    <Frame>
      <Icon style={{ ...toggle, opacity: children ? 1 : 0.3 }} onClick={() => setOpen(!isOpen)} />
      <Title style={style}>{name}</Title>
      <Content style={{ opacity, height: isOpen && previous === isOpen ? 'auto' : height }}>
        <a.div style={{ transform }} {...bind} children={children} />
      </Content>
    </Frame>
  )
}
export const Tree = ( )=> (

    <div>

    <Tree name="main" defaultOpen>
      <Tree name="hello" />
      <Tree name="subtree with children">
        <Tree name="hello" />
        <Tree name="sub-subtree with children">
          <Tree name="child 1" style={{ color: '#37ceff' }} />
          <Tree name="child 2" style={{ color: '#37ceff' }} />
          <Tree name="child 3" style={{ color: '#37ceff' }} />
          <Tree name="custom content">
            <div style={{ position: 'relative', width: '100%', height: 200, padding: 10 }}>
              <div style={{ width: '100%', height: '100%', background: 'black', borderRadius: 5 }} />
            </div>
          </Tree>
        </Tree>
        <Tree name="hello" />
      </Tree>
      <Tree name="world" />
      <Tree name={<span>something something</span>} />
    </Tree>
  </div>

)
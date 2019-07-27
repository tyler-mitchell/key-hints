import React from 'react'
import ReactDOM from 'react-dom'

import { useSpring, config } from 'react-spring'
import { useGesture } from 'react-use-gesture'
import { a, animated } from 'react-spring'
import {Modal} from '@material-ui/core';

import {useGlobalState} from '../../../state'
import styled from 'styled-components';
import { useMeasure } from '../../hooks/helpers';






const OFFSET = 160
const INITIAL = 780
// const SLOW = config.gentle
const SLOW = 	{ mass: 1, tension: 200, friction: 14 }
const FAST = { tension: 1000, friction: 100 }

export const AnimatedPanel = ({children})  => {
  const [{ y }, set] = useSpring(() => ({ y: INITIAL }))
  
  // const bind = useGesture(({ delta: [, y], down }) => set({ y: y > 400 ? 780 : !down ? OFFSET : y + OFFSET, config: !down || y > 400 ? SLOW : FAST }))
  const opacity = y.interpolate([180, 400], [0.2, 1], 'clamp')
  const [addMode] = useGlobalState('addMode')

  // const [boxShadow, setBoxShadow] = React.useState({boxShadow:  "0 0px 0px rgba(0,0,0,0.25), 0 0px 0px rgba(0,0,0,0.22)"})
  // const boxShadowProp = useSpring({
  //   revese: addMode,
  //   from: { boxShadow: boxShadow  },
  //   to:{ boxShadow: boxShadow}
  // })
  const [{boxShadow}, setBoxShadow] = useSpring(() => ({ boxShadow: "0 0px 2px 2px rgba(0,0,0,0.25), 0 0px 2px 2px  rgba(0,0,0,0.22)" })); 
  const transform = y.interpolate([OFFSET, 250], [40, 0], 'clamp').interpolate(val => `translate3d(0,${val}px,0)`)

  React.useEffect(() => {
    if (addMode) {
      set({ y: OFFSET, config: SLOW })
      // setBoxShadow({boxShadow: "0 0px 0px rgba(0,0,0,0.25), 0 0px 0px rgba(0,0,0,0.22)"})
    } else {
      setBoxShadow({boxShadow: "0 0px 5px -3px  rgba(0,0,0,0.25), 0 0px 5px -3px  rgba(0,0,0,0.22)"})
      set({ y: 590, config: FAST })
    }
    
  },[addMode])
  return (
    <>
      <View  style={{ boxShadow, transform: y.interpolate(y => `translate3d(0,${y}px,0)`) }}>
        {children}
      </View>
    </>
  )
}




export const View = props => {
  return (
    // <div style={{ position: 'relative', clipPath: 'polygon(-50% -50%, 150% -50%, 100% 10%, 0% 10%)'}}>
    
      <a.div
      {...props}
     
        style={{
          position: 'absolute',
          pointerEvents: 'auto',
          left: 0,
          right: 0,
          bottom: 0,
          top: 0,
          margin: "0 21px",
          flex: 1,
          fontSize: '0.8em',
          zIndex: 5000,
          
          borderTopRightRadius: 15,
          background: 'white',
          borderTopLeftRadius: 15,
          borderBottomRightRadius: '100px',
          borderBottomLeftRadius: '100px',
          // padding: 24,
          userSelect: 'none',
          color: '#ffffffc0',
        
          
  
          
          // clipPath: "inset(10px 20px 30px 40px)",
          alignItems: 'center',
          
          ...props.style
        }}>
        {/* <div
          style={{
            position: 'absolute',
            width: 50,
            height: 4,
            backgroundColor: 'rgba(220,220,220,0.4)',
            top: 12,
            borderRadius: 4,
            margin: '0 auto',
            left: 0,
            right: 0
          }}
        /> */}
        {props.children}
      </a.div>

  )
}

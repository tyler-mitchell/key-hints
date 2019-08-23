import React from 'react';

import { useSpring } from 'react-spring';
import { a } from 'react-spring';

import { useGlobalState } from '../../../state';

// const OFFSET = 420;
const OFFSET = 103;
const INITIAL = 780;
// const SLOW = config.gentle
const SLOW = { mass: 1, tension: 200, friction: 14 };
const FAST = { tension: 1000, friction: 100 };

export const AnimatedPanel = ({ children }) => {
  const [{ y }, set] = useSpring(() => ({ y: INITIAL }));
  const [addMode] = useGlobalState('addMode');

  React.useEffect(() => {
    if (addMode) {
      set({ y: OFFSET, config: SLOW });
      // setBoxShadow({boxShadow: "0 0px 0px rgba(0,0,0,0.25), 0 0px 0px rgba(0,0,0,0.22)"})
    } else {
      set({ y: 545, config: FAST });
    }
  }, [addMode, set]);
  return (
    <>
      <View
        style={{ transform: y.interpolate(y => `translate3d(0,${y}px,0)`) }}
      >
        {children}
      </View>
    </>
  );
};

export const View = props => (
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
        margin: '0 21px',
        flex: 1,
        fontSize: '0.8em',
        zIndex: 5000,
        height: '600px',
        background: 'transparent',
        borderTopRightRadius: 15,
        borderTopLeftRadius: 15,
        borderBottomRightRadius: 15,
        borderBottomLeftRadius: 15,
        // padding: 24,
        userSelect: 'none',
        color: '#ffffffc0',

        // clipPath: "inset(10px 20px 30px 40px)",
        alignItems: 'center',

        ...props.style
      }}
    >
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
  );

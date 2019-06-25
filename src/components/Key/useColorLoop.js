import React from 'react';
import { useGlobalState } from '../../state';
import { useSpring, animated, config } from 'react-spring';
import {BufferContext} from '../KeyBuffer/BufferContext'

const useColorLoop = () => {
  const [editMode] = useGlobalState('editMode');
 
  const not = x => !x;
  const useSpringLoop = ({ from, to }) => {
    const [reverse, setReverse] = React.useState(false);

    return useSpring({
      reset: true,
      reverse,
      from,
      to,

      onRest: () => setReverse(not)
    });
  };

  return useSpringLoop(
    editMode
      ? {
          from: { opacity: 0.75 },
          to: { opacity: 1 },
          config: config.gentle
        }
      : {}
  );
};




export const FlashingKey = () => {
  const [flashLoop] = React.useContext(BufferContext)
  console.log("⭐: FlashingKey -> flashLoop", flashLoop)
 
  return <animated.div styles={flashLoop}/>;
};



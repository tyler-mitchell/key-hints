import React from 'react';
import { useGlobalState } from '../../state';
import { useSpring, animated, config } from 'react-spring';
import {FlashingContext} from './FlashingContext'



export const FlashingKey = () => {
  const [flashLoop] = React.useContext(FlashingContext)
  console.log("⭐: FlashingKey -> flashLoop", flashLoop)
 
  return <animated.div styles={flashLoop}/>;
};



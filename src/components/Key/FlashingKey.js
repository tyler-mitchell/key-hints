import React from 'react';
import { useGlobalState } from '../../state';
import { useSpring, animated, config } from 'react-spring';
import {FlashingContext} from './FlashingContext'



export const FlashingKey = () => {
  const [flashLoop] = React.useContext(FlashingContext)
 
 
  return <animated.div styles={flashLoop}/>;
};



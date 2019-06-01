import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { render } from 'react-dom';
import clamp from 'lodash-es/clamp';
import swap from 'lodash-move';
import { useGesture } from 'react-use-gesture';
import { useSprings, animated, interpolate } from 'react-spring';
import styled from 'styled-components';
import Box from '@material-ui/core/Box';

import Grid from '@material-ui/core/Grid';
//import { Test } from './KeyBuffer.styles';
const fn = (order, down, originalIndex, curIndex, x) => index =>
  down && index === originalIndex
    ? {
        x: curIndex * 100 + x,
        scale: 1.1,
        zIndex: '1',
        shadow: 15,
        immediate: n => n === 'x' || n === 'zIndex'
      }
    : { x: order.indexOf(index) * 100, scale: 1, zIndex: '0', shadow: 1, immediate: false };


const BuffStyle = styled(animated.div)`

`;

// const BuffContainer = styled.div`
// position: relative;
// margin: 0;
//   padding: 0;
//   height: 100%;
//   width: 100%;
//   overflow: hidden;
//   user-select: none;
//   font-family: 'Raleway', sans-serif;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   background: #f0f0f0;
// `;
const BuffWrapper = styled.div`


  /* cursor: url('https://uploads.codesandbox.io/uploads/user/b3e56831-8b98-4fee-b941-0e27f39883ab/Ad1_-cursor.png') 39 39,
    auto; */
`;


const KeyBuffer = ({ items }) => {
  const order = useRef(items.map((_, index) => index)); // Store indicies as a local ref, this represents the item order
  const [springs, setSprings] = useSprings(items.length, fn(order.current)); // Create springs, each corresponds to an item, controlling its transform, scale, etc.
  const bind = useGesture(({ args: [originalIndex], down, delta: [x,] }) => {
    const curIndex = order.current.indexOf(originalIndex);
    const curRow = clamp(Math.round((curIndex * 100 + x) / 100), 0, items.length - 1);
    const newOrder = swap(order.current, curIndex, curRow);
    setSprings(fn(newOrder, down, originalIndex, curIndex, x)); // Feed springs new style data, they'll animate the view without causing a single render
    if (!down) order.current = newOrder;
  });
  return (
    // <BuffWrapper>
    //   <BuffContainer  style={{ height: items.length * 100 }}>

          <BuffWrapper >
            {springs.map(({ zIndex, shadow, x, scale }, i) => (

                <animated.div
                  {...bind(i)}
                  key={i}
                  style={{
                  display: 'flex',
                  flexOverflow: 'wrap',
                  position: 'absolute',
                    zIndex,
                    // boxShadow: shadow.interpolate(s => `rgba(0, 0, 0, 0.15) 0px ${s}px ${2 * s}px 0px`),
                    transform: interpolate([x, scale], (x, s) => `translate3d(${x}px,0,0) scale(${s})`)
                  }}
                  children={items[i]}
                />

            ))}
          </BuffWrapper>

    //   </BuffContainer>
    // </BuffWrapper>
  );
};

export default KeyBuffer;

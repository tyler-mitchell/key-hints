import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { render } from 'react-dom';
import clamp from 'lodash-es/clamp';
import swap from 'lodash-move';
import { useGesture } from 'react-use-gesture';
import { useSprings, animated, interpolate } from 'react-spring';
import styled from 'styled-components';
import Box from '@material-ui/core/Box';
import { lighten, darken, shade } from 'polished';
import { FlashingContext } from '../../src/components/Key/FlashingContext';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Collapse from '@material-ui/core/Collapse';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';

//import { Test } from './KeyBuffer.styles';

const BuffStyle = styled(animated.div)`
  /* display: flex; */
  /* justify-content: center;
  position: absolute;
  user-select: none;
  background: linear-gradient(135deg, #f6d365 0%, #fda085 100%);
  overflow: visible;
  pointer-events: auto;
  transform-origin: 50% 50% 0px;

  height: 50px;
  width: 50px;
  line-height: 50px; */
  display: grid;
  position: relative;
  width: 170px;
`;

const CharStyle = styled.div`
  justify-content: center;
  user-select: none;
  position: absolute;
  width: 60px;
  height: 60px;

  overflow: visible;
  pointer-events: auto;
  transform-origin: 50% 50% 0px;
  border-radius: 7px;

  line-height: 40px;
  /* font-family: 'Roboto', sans-serif; */

  font-size: 11px;
  font-family: Roboto;
  font-weight: bold;
  color: rgba(0, 0, 0, 0.45);
  border: solid 1px;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 2px;
  background: linear-gradient(180deg, #ffffff 0%, #ffff 100%);

  border-width: 10px 10px 14px 10px;
  border-top-color: ${shade(0.15, '#f9f9f9')};
  border-bottom-color: ${shade(0.3, '#f9f9f9')};
  border-left-color: ${shade(0.2, '#f9f9f9')};
  border-right-color: ${shade(0.2, '#f9f9f9')};
  border-radius: 10px;
`;

const BuffWrapper = styled.div`
  /* cursor: url('https://uploads.codesandbox.io/uploads/user/b3e56831-8b98-4fee-b941-0e27f39883ab/Ad1_-cursor.png') 39 39,
    auto; */
  /* position: relative;
    display: flex;
    height: 100px;
    width: 200px; */

  /* width: 220px; */

  height: 70px;
  width: 435px;
  padding-left: 10px;
  padding-top: 4px;
  justify-content: center;
  align-items: center;

  border-radius: 8px;

  /* background: linear-gradient(180deg, #FFFF 0%, #FFFF 100%); */
  background: '#f0f5f9';

  /* box-shadow: inset 0 3px 5px rgba(255,255,255,0.3), inset 0 1px 3px rgba(255,255,255,0.5), 0 5px 0 #AFAFAF; */
  border-radius: 7px;
  /* background: linear-gradient(135deg, #f6d365 0%, #fda085 100%); */
`;

const BuffContainer = styled(Card)`
  position: relative;
  display: inline-block;
  jusitfy-content: center;
  padding: 10px;
  width: auto;
`;
const BufferContent = styled(CardContent)`
  position: relative;
  display: inline-block;
  jusitfy-content: center;
  width: 1170px;
`;

const fn = (order, down, originalIndex, curIndex, x) => index =>
  down && index === originalIndex
    ? {
        x: curIndex * 70 + x,
        scale: 1.1,
        zIndex: '1',
        shadow: 15,
        immediate: n => n === 'x' || n === 'zIndex'
      }
    : { x: order.indexOf(index) * 70, scale: 1, zIndex: '0', shadow: 1, immediate: false };

const KeyBuffer = () => {
  const [items, setKeys] = React.useContext(FlashingContext);

  let order = items.map((_, index) => index); // Store indicies as a local ref, this represents the item order

  const [springs, setSprings] = useSprings(items.length, fn(order)); // Create springs, each corresponds to an item, controlling its transform, scale, etc.

  const bind = useGesture(({ args: [originalIndex], down, delta: [x] }) => {
    const curIndex = order.indexOf(originalIndex);
    const curRow = clamp(Math.round((curIndex * 100 + x) / 100), 0, items.length - 1);
    const newOrder = swap(order, curIndex, curRow);
    setSprings(fn(newOrder, down, originalIndex, curIndex, x)); // Feed springs new style data, they'll animate the view without causing a single render
    if (!down) {
      order = newOrder;
    }
  });

  const handleOK = () => {
    return order.map(i => items[i]);
  };

  const [checked, setChecked] = React.useState(false);
  function handleChange() {
    setChecked(prev => !prev);
  }

  // const itms = React.useContext(Bu)
  return (
    // <BuffWrapper>
    //   <BuffContainer  style={{ height: items.length * 100 }}>
    <div>
      <FormControlLabel
        control={<Switch checked={checked} onChange={handleChange} />}
        label="Show"
      />
      <Collapse in={checked}>
        <BuffContainer>
          <BuffWrapper>
            {springs.map(({ zIndex, shadow, x, scale }, i) => (
              <BuffStyle
                {...bind(i)}
                key={i}
                style={{
                  zIndex,
                  boxShadow: shadow.interpolate(
                    s => `rgba(0, 0, 0, 0.15) 0px ${s}px ${2 * s}px 0px`
                  ),
                  transform: interpolate(
                    [x, scale],
                    (x, s) => `translate3d(${x}px,0,0) scale(${s})`
                  )
                }}
              >
                <CharStyle>{items[i]}</CharStyle>
              </BuffStyle>
            ))}
          </BuffWrapper>
        </BuffContainer>
      </Collapse>
    </div>

    //   </BuffContainer>
    // </BuffWrapper>
  );
};

export default KeyBuffer;

import styled, { keyframes, css } from 'styled-components';
import { findAll } from 'styled-components/test-utils';
import React from 'react';
import { Box } from '@rebass/grid';
import { shade, linearGradient, lighten } from 'polished';
import Layer from '@material-ui/core/Box';
import { FlashingContext } from './FlashingContext';
import { Card, Grid, Paper } from '@material-ui/core';
import { useSpring, animated, useTransition, config, interpolate, extrapolate } from 'react-spring';
import Typography from '@material-ui/core/Typography';
import {
  ArrowBack as LeftArrowIcon,
  ArrowForward as RightArrowIcon,
  ArrowUpward as UpArrowIcon,
  ArrowDownward as DownArrowIcon
} from '@material-ui/icons';
import './key.css';
import { FlashingKey } from './FlashingKey';

import { useGlobalState } from '../../state';
import _ from 'lodash';

import flatMap from 'lodash/flatMap';

const Column = props => <Box {...props} />;

const keypress = keyframes`

	0% {
		transform: translateY(0%);
	}

	16% {
		transform: translateY(-40.27%);
	}

	28% {
		transform: translateY(-30.88%);
	}

	44% {
		transform: translateY(-35.63%);
	}

	59% {
		transform: translateY(-32.36%);
	}

	73% {
		transform: translateY(-38.58%);
	}

	88% {
		transform: translateY(-25.8%);
	}

	100% {
		transform: translateY(-6%);
	}


`;
const Container = styled.ul`
  opacity: 1;
  visibility: hidden;
  transform: translateY(20px);
  transition: all 0.3s ease-in-out;
`;

export const KeyContainer = styled(animated.div)`

  margin: 0 1.5px;
  box-sizing: border-box;

  width: ${props => props.wt}px;
  height: ${props => props.ht}px;
  cursor: pointer;
  border-width: 10px 10px 20px 10px;

  /* transition: background-color 2s, color 300ms; */

 


  height: ${props => props.height};
  /* border-top-color: ${props => shade(0.02, props.color)};
  border-bottom-color: ${props => shade(0.3, props.color)};
  border-left-color: ${props => shade(0.09, props.color)};
  border-right-color: ${props => shade(0.09, props.color)}; */

  

  border-radius: 8px;


  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;


  transition: filter .3s;


  &:hover {
    background-position: 0 0, 0 0;
    transition-duration: 0.5s;
    /* background: inherit; */

   filter: contrast(140%);

  }

  border-style: solid;
  /* transition: transform 300ms cubic-bezier(0.075, 0.82, 0.165, 1); */

  /* &:active {
    transition: transform 300ms cubic-bezier(0.075, 0.82, 0.165, 1);
    transform: translateY(2px) scaleX(0.98);
    /* transform-origin: -100, 200; */
    /* animation: ${keypress} 2s ; */
  /* } */ 
  &:last-child {
    border-width: 10px 12px 20px 10px;

  }

  &:first-child {
    /* margin-bottom: 3px; */
    border-width: 10px 10px 20px 10px;
  }

  &:hover::after {
    background-color:${props => shade(0.05, '#1fe3ac')};
    opacity: 0.5;
    transition: all 0.4s ease-in-out;
  }

`;

KeyContainer.defaultProps = {};

export const ActiveKeyContainer = styled(KeyContainer)`
  border-top-color: ${props => shade(0.02, props.color)};
  border-bottom-color: ${props => shade(0.3, props.color)};
  border-left-color: ${props => shade(0.09, props.color)};
  border-right-color: ${props => shade(0.09, props.color)};

  &:hover {
    animation: ${keypress} 3s ease-out infinite;
    animation-delay: 2s;
  }
  /* ${keypress} */
  /* ${({ active }) =>
    active &&
    `

    animation: 2s keypress 0.3 0s both;


  `} */
`;

const KeyTop = styled(animated.div)`
  height: ${props => props.ht * 0.7}px;
  width: ${props => props.wt - 17}px;
 
  margin: -30px;
  position: relative;
  border-radius: 8px;
  /* background:  ${props =>
    linearGradient({
      colorStops: [`${shade(0.05, props.color)} 0%`, `${lighten(0.2, props.color)} 50%`],
      toDirection: '-30deg',
      fallback: '#FFF'
    })}; */
  overflow: hidden;

  /* vertical & horizontal centering children */
  display: flex;
  justify-content: center;
  align-items: center;
  /* background-image: ${props =>
    linearGradient({
      colorStops: [`${shade(0.05, props.color)} 0%`, `${lighten(0.2, props.color)} 50%`],
      toDirection: '-30deg',
      fallback: '#FFF'
    })}; */

  /* transition: all 0.3s; */
  /* z-index: 1; */
`;

export const KeyChar = styled.div`
  font-size: 15px;
  font-family: 'Nunito';
  font-weight: bold;
  color: rgba(0, 0, 0, 0.45);
  user-select: none;
  /* text-align: center; */
`;

export const Span = styled.div`

  top: 0;
  position: relative;
  padding-top: 5px;
  border-radius: 8px;
  height: ${props => props.ht * 0.7}px;
  width: ${props => props.wt - 18}px;

  /* background-color: red; */
  /* background: red;
  background: ${props =>
    linearGradient({
      colorStops: [`${shade(0.05, props.color)} 0%`, `${lighten(0.2, props.color)} 50%`],
      toDirection: '-30deg',
      fallback: '#FFF'
    })}; */
  
  /* background: ${props =>
    linearGradient({
      colorStops: [`${shade(0.05, props.color)} 0%`, `${lighten(0.09, props.color)} 50%`],
      toDirection: '-30deg',
      fallback: '#FFF'
    })}; */

  transition: 1s ease;


`;

const ConditionalWrap = ({ condition, wrap, children }) => {
  const [flashing] = React.useContext(FlashingContext);
  return condition ? wrap(children, flashing) : <>{children}</>;
};
export const Key = ({ label, keyName, uniqueKeyName, wt, ht, m, amin, key }) => {
  const defaultColor = '#FFFFFF';
  const activeColor = '#1fe3ac';
  const editColor = '#FFB822';
  const [keyColor, changeColor] = React.useState(defaultColor);

  const [active, setActive] = React.useState(false);
  const [editableKey, setEditableKey] = React.useState(false);

  const [editMode, setEditMode] = useGlobalState('editMode');
  const [activeKeys, setActiveKeys] = useGlobalState('activeKeys');

  const [addMode] = useGlobalState('addMode');
  const [newKeys, setNewKeys] = useGlobalState('newKeys');

  const iconLabels = {
    LeftArrow: <LeftArrowIcon>{label}</LeftArrowIcon>,
    RightArrow: <RightArrowIcon>{label}</RightArrowIcon>,
    UpArrow: <UpArrowIcon>{label}</UpArrowIcon>,
    DownArrow: <DownArrowIcon>{label}</DownArrowIcon>
  };

  React.useEffect(() => {
    if (flatMap(activeKeys).includes(uniqueKeyName)) {
      if (editMode) {
        setNewKeys(p => ({ ...p, keys: { key1: activeKeys } }));

        changeColor(editColor);
        setActive(true);
      } else {
        changeColor(activeColor);
        setActive(true);
      }
    }
    return () => {
      changeColor(defaultColor);
      setEditableKey(false);
      setActive(false);
    };
  }, [activeKeys, addMode, editMode, setNewKeys, uniqueKeyName]);

  const addItem = key => {
    const keyXLength = _.size(newKeys.keys.key1);

    // setNewKeys(p => ({ ...p, [keysLength]: key }));
    const individualKeys = { ...newKeys.keys['key1'], [keyXLength]: key };
    const keys = { key1: individualKeys };

    setNewKeys(p => ({ ...p, keys }));
  };
  const removeItem = key => {
    const key1 = newKeys.keys.key1;
    const newObj = _.filter(key1, function(v, k) {
      return v !== key;
    });

    const keys = { key1: newObj };

    setNewKeys(p => ({ ...p, keys }));
  };

  const toggleKey = isActive => {
    if (isActive) {
      // addMode && removeItem(label);
      removeItem(label);
      changeColor(defaultColor);
      setActive(false);
    } else {
      // addMode && addItem(label);
      addItem(label);
      changeColor(editColor);
      setActive(true);
    }
  };
  const keyClicked = () => {
    if (editMode) {
      toggleKey(active);
    }

    if (addMode) {
      toggleKey(active);
    }
  };

  const {
    freq,
    scale,
    x,
    y,
    transform,
    opacity,
    borderTopColor,
    borderBottomColor,
    borderLeftColor,
    borderRightColor,
    background
  } = useSpring({
    reverse: active,
    from: {
      x: 0,
      y: 0,
      scale: 10,
      opacity: 0,
      // transform: 'translateY(-38.58%) scale(1.02)',
      // transform: 'scale(1)',

      transform: 'translateY(1.5px) scaleX(0.98)',
      freq: '0.0175, 0.0',
      borderTopColor: `${shade(0.02, activeColor)}`,
      borderBottomColor: `${shade(0.3, activeColor)}`,
      borderLeftColor: `${shade(0.09, activeColor)}`,
      borderRightColor: `${shade(0.09, activeColor)}`,
      background: `linear-gradient(-30deg, ${shade(0.05, activeColor)} 0%, ${lighten(
        0.2,
        activeColor
      )} 50%)`
      // background:  `${
      //   linearGradient(
      //     colorStops: [shade(0.05, activeColor) '0%', lighten(0.2, activeColor) 50%],
      //     toDirection: '-30deg',
      //     fallback: '#FFF'
      //   )}`,

      // border: {
      //   borderTopColor: `${shade(0.02, defaultColor)}`,
      //   borderBottomColor: `${shade(0.3, defaultColor)}`,
      //   borderLeftColor: `${shade(0.09, defaultColor)}`,
      //   borderRightColor: `${shade(0.09, defaultColor)}`
      // }
    },
    to: [
      {
        x: 1,
        y: 1,
        scale: 150,
        opacity: 1,

        transform: 'translateY(0px) scaleX(1)',
        // transform: 'translateY(-0.58%) scale(1)',
        // transform: 'scale(0.98)',
        freq: '0.0, 0.0',
        // border: {
        //   borderTopColor: `${shade(0.02, activeColor)}`,
        //   borderBottomColor: `${shade(0.3, activeColor)}`,
        //   borderLeftColor: `${shade(0.09, activeColor)}`,
        //   borderRightColor: `${shade(0.09, activeColor)}`
        // }

        borderTopColor: `${shade(0.02, defaultColor)}`,
        borderBottomColor: `${shade(0.3, defaultColor)}`,
        borderLeftColor: `${shade(0.09, defaultColor)}`,
        borderRightColor: `${shade(0.09, defaultColor)}`,
        background: `linear-gradient(-30deg, ${shade(0.05, defaultColor)} 0%, ${lighten(
          0.2,
          defaultColor
        )} 50%)`
        // background: `${
        //   linearGradient({
        //     colorStops: [`${shade(0.05, defaultColor)} 0%`, `${lighten(0.2, defaultColor)} 50%`],
        //     toDirection: '-30deg',
        //     fallback: '#FFF'
        //   })}`,
      },
      {}
    ],

    x: active ? 1 : 0,
    config: config.wobbly
  });

  console.log('⭐: Key -> borderBottomColor', borderBottomColor);
  
  return (
    <React.Fragment>
      <ConditionalWrap
        condition={editMode && active}
        wrap={(children, flashing) => (
          <animated.div key={key} style={flashing}>
            {children}
          </animated.div>
        )}
      >
        {/* <animated.div style={{ transform, scale }}> */}
        <animated.div
          style={
            {
              // opacity: x.interpolate({ range: [0, 1], output: [0.3, 1] }),
              // @-webkit-keyframes pulsate-bck {
              //   0% {
              //     -webkit-transform: scale(1);
              //             transform: scale(1);
              //   }
              //   50% {
              //     -webkit-transform: scale(0.9);
              //             transform: scale(0.9);
              //   }
              //   100% {
              //     -webkit-transform: scale(1);
              //             transform: scale(1);
              //   }
              // }
              // @keyframes pulsate-bck {
              //   0% {
              //     -webkit-transform: scale(1);
              //             transform: scale(1);
              //   }
              //   50% {
              //     -webkit-transform: scale(0.9);
              //             transform: scale(0.9);
              //   }
              //   100% {
              //     -webkit-transform: scale(1);
              //             transform: scale(1);
              //   }
            }
          }
        >
          <KeyContainer
            editableKey={editableKey}
            active={active}
            // active={active}
            defaultColor={defaultColor}
            activeColor={activeColor}
            style={{
              borderTopColor,
              borderBottomColor,
              borderLeftColor,
              borderRightColor,
              transform
              // transform: x
              //   .interpolate({
              //     range: [0, 0.5, 1],
              //     output: [1, 0.98, 1]
              //   })
              //   .interpolate(x => `scaleX(${x})`)
            }}
            label={label}
            wt={wt}
            ht={ht}
            color={keyColor}
            onClick={keyClicked}
          >
            <KeyTop wt={wt} ht={ht} color={keyColor} style={{ background }}>
              <KeyChar>{keyName in iconLabels ? iconLabels[keyName] : label}</KeyChar>
            </KeyTop>
          </KeyContainer>
        </animated.div>
      </ConditionalWrap>
    </React.Fragment>
  );
};

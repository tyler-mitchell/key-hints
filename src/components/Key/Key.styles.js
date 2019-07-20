/* eslint-disable react-hooks/exhaustive-deps */
import styled, { keyframes, css } from 'styled-components';
import { findAll } from 'styled-components/test-utils';
import React from 'react';
import { Box } from '@rebass/grid';
import { shade, linearGradient, lighten } from 'polished';
import Layer from '@material-ui/core/Box';
import { FlashingContext } from './FlashingContext';
import { Card, Grid, Paper } from '@material-ui/core';
import { Textfit } from 'react-textfit';
import {
  useSpring,
  animated,
  useTransition,
  config,
  interpolate,
  extrapolate,
  Easing
} from 'react-spring';
import fitty from 'fitty';
import Typography from '@material-ui/core/Typography';
import {
  ArrowBack as LeftArrowIcon,
  ArrowForward as RightArrowIcon,
  ArrowUpward as UpArrowIcon,
  ArrowDownward as DownArrowIcon
} from '@material-ui/icons';
import './key.css';

import { FlashingKey } from './FlashingKey';

import { useGlobalState, setGlobalState } from '../../state';
import _ from 'lodash';

import flatMap from 'lodash/flatMap';
import KeyText from './KeyText/KeyText';
import { motion } from 'framer-motion';
import { TextField } from '@material-ui/core';

const Column = props => <Box {...props} />;

export const KeyContainer = styled(animated.div)`
  /* transform: scaleX(0.95); */
  /* padding: 0 1.5px; */
  margin: ${props => props.margin};
  /* margin-right: 3px; */
  box-sizing: border-box;

  display: block;
  position: absolute;
  width: ${props => props.wt}px;
  height: ${props => props.ht}px;
  cursor: pointer;
  border-width: 10px 10px 20px 10px;

  /* transition: background-color 2s, color 300ms; */

  border-radius: 8px;

  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  /* transition: filter .3s; */

  &:hover {
    background-position: 0 0, 0 0;
    /* transition-duration: 0.5s; */
    /* background: inherit; */

    filter: contrast(140%);
  }

  border-style: solid;
  transition: transform 300ms cubic-bezier(0.075, 0.82, 0.165, 1), filter 0.5s;

  &:active {
    /* transition: transform 300ms cubic-bezier(0.075, 0.82, 0.165, 1); */
    transform: translateY(2px) scaleX(0.98);
    /* transform-origin: -100, 200; */
  }
  &:last-child {
    /* border-width: 10px 12px 20px 10px; */
  }

  &:first-child {
    /* margin-bottom: 3px; */
    /* border-width: 10px 10px 20px 10px; */
  }

  &:hover::after {
    background-color: ${props => shade(0.05, '#1fe3ac')};
    opacity: 0.5;
    transition: all 0.4s ease-in-out;
  }
`;

KeyContainer.defaultProps = {};
const AnimatedKeyContainer = animated(KeyContainer);

export const ActiveKeyContainer = styled(KeyContainer)`
  border-top-color: ${props => shade(0.02, props.color)};
  border-bottom-color: ${props => shade(0.3, props.color)};
  border-left-color: ${props => shade(0.09, props.color)};
  border-right-color: ${props => shade(0.09, props.color)};

  &:hover {
    animation-delay: 2s;
  }
`;

const KeyTop = styled(animated.div)`
  height: ${props => props.ht * 0.7}px;
  width: ${props => props.wt - 17}px;
  margin: -30px;
  position: relative;
  border-radius: 8px;
`;

export const BottomKeyChar = styled.div`
  font-size: 15px;
  position: absolute;
  z-index: 4;

  font-family: 'Hammersmith One', sans-serif;

  font-weight: bold;
  color: rgba(0, 0, 0, 0.45);
  user-select: none;
  width: auto;
  height: auto;
  /* position: 'relative'; */
  transform: rotateX(8deg) translateY(34px) scale(1);

  /* text-align: center; */
`;
export const KeyChar = styled.div`
  display: flex;
  width: inherit;
  align-items: center;
  justify-content: center;
  height: inherit;
  margin: 0 auto;
  overflow: hidden;
  font-size: 20px;
  font-family: 'Nunito';
  font-weight: bold;
  color: rgba(0, 0, 0, 0.45);
  user-select: none;

  text-align: center;
`;

export const Span = styled.div`
  top: 0;
  position: relative;
  padding-top: 5px;
  border-radius: 8px;
  ${'1200px'};
  transition: 1s ease;
`;

const ConditionalWrap = ({ condition, wrap, children }) => {
  const [flashing] = React.useContext(FlashingContext);
  return condition ? wrap(children, flashing) : <>{children}</>;
};
export const Key = ({ label, keyName, margin, uniqueKeyName, wt, ht, m, amin, key }) => {
  const defaultColor = '#FFFFFF';
  // const activeColor = '#1fe3ac';
  const defaultActiveColor = '#1fe3ac';
  const [activeColor, setActiveColor] = React.useState(defaultActiveColor);
  const editColor = '#FFB822';
  const [keyColor, changeColor] = React.useState(defaultColor);

  const [active, setActive] = React.useState(false);
  const [editableKey, setEditableKey] = React.useState(false);

  const [editMode, setEditMode] = useGlobalState('editMode');
  const [keyMapMode, setKeyMapMode] = useGlobalState('keyMapMode');
  const [activeKeys, setActiveKeys] = useGlobalState('activeKeys');

  const [addMode] = useGlobalState('addMode');
  const [newKeys, setNewKeys] = useGlobalState('newKeys');

  const iconLabels = {
    LeftArrow: <LeftArrowIcon>{label}</LeftArrowIcon>,
    RightArrow: <RightArrowIcon>{label}</RightArrowIcon>,
    UpArrow: <UpArrowIcon>{label}</UpArrowIcon>,
    DownArrow: <DownArrowIcon>{label}</DownArrowIcon>
  };
  const [activeLayers, setActiveLayers] = useGlobalState('activeLayers');
  const keyMapColors = [
    '#FF0B00',
    '#3cb44b',
    '#FFE433',
    '#21A6FF',
    '#f58231',
    '#911eb4',
    '#46f0f0',
    '#f032e6',
    '#bcf60c',
    '#fabebe',
    '#008080',
    '#e6beff',
    '#9a6324',
    '#fffac8',
    '#800000',
    '#aaffc3',
    '#808000',
    '#ffd8b1',
    '#000075',
    '#808080'
  ];
  const [activeKeyMapKeys, setActiveKeyMapKeys] = useGlobalState('activeKeyMapKeys');
  const [keyTopText, setKeyTopText] = React.useState('');
  const [modifierStyle, setModifierStyle] = React.useState({
    transform: 'translateY(0px) scale(1)',
    opacity: 1
  });
  React.useEffect(() => {
    if (keyMapMode && !editMode && activeLayers && uniqueKeyName) {
      _.forEach(activeLayers, (layer, colorIndex) => {
        const mainKeyIndex = _.indexOf(layer.mainKeys, label);
        const isMod = _.includes(layer.layer, label);
        const isSingleKey = layer.keyArr[0].length === 1;

        if (mainKeyIndex >= 0) {
          setActiveColor(layer.color);
          setKeyTopText(layer.keyDescription[mainKeyIndex]);
          setActive(true);
        } else if (isMod) {
          setIsModifier(true);
          setKeyTopText(label);
          setActiveColor(layer.color);
          setActive(true);
          setModifierStyle({ opacity: 0.75, transform: 'translateY(1.5px) scale(0.98)' });
        }
      });
      // colorIndex += 1;
    }
    if (flatMap(activeKeys).includes(uniqueKeyName)) {
      if (editMode) {
        console.log(`⭐:-------------- Key -> EDIT MODE ---------------`, editMode)
        setNewKeys(p => ({ ...p, keys: { key1: activeKeys } }));
        changeColor(editColor);
        setActive(true);
      } else {
        changeColor(activeColor);
        setActive(true);
      }
    }
    return () => {
      setKeyTopText('');

      changeColor(defaultColor);
      setEditableKey(false);
      setActive(false);
    };
  }, [activeKeys, addMode, editMode, keyMapMode, activeLayers,  activeColor]);

  React.useLayoutEffect(() => {
    if (active && addMode) {
      setGlobalState('lastKeyRef', label);
    }
  }, [active]);
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
    fontOpacity,
    borderTopColor,
    borderBottomColor,
    borderLeftColor,
    borderRightColor,
    background,
    boxShadow
  } = useSpring({
    reverse: active,
    from: {
      x: 0,
      y: 0,
      scale: 10,
      opacity: modifierStyle.opacity,
      fontOpacity: 1, 
      // transform: 'translateY(-38.58%) scale(1.02)',
      // transform: 'scale(1)',

      transform: modifierStyle.transform,
      freq: '0.0175, 0.0',
      borderTopColor: `${shade(0.02, activeColor)}`,
      borderBottomColor: `${shade(0.3, activeColor)}`,
      borderLeftColor: `${shade(0.09, activeColor)}`,
      borderRightColor: `${shade(0.09, activeColor)}`,
      boxShadow: 'inset 0px 0px 10px rgba(0,0,0,0.5)',

      background: `linear-gradient(-30deg, ${shade(0.05, activeColor)} 0%, ${lighten(
        0.2,
        activeColor
      )} 50%)`
    },
    to: [
      {
        x: 1,
        y: 1,
        fontOpacity: 0, 
        scale: 150,
        opacity: 1,
        transform: 'translateY(0px) scale(1)',
        freq: '0.0, 0.0',
        borderTopColor: `${shade(0.02, defaultColor)}`,
        borderBottomColor: `${shade(0.3, defaultColor)}`,
        borderLeftColor: `${shade(0.09, defaultColor)}`,
        borderRightColor: `${shade(0.09, defaultColor)}`,
        boxShadow: 'inset 0px 0px 10px rgba(0,0,0,0.5)',
        background: `linear-gradient(-30deg, ${shade(0.05, defaultColor)} 0%, ${lighten(
          0.2,
          defaultColor
        )} 50%)`
      }
    ],
    // transform: keyMapMode ? 'translateY(1.5px) scale(0.98)' :'translateY(0px) scale(1)',
    // x: active ? 1 : 0,
    config: { mass: 1, tension: 180, friction: 12, duration: 1000 }
  });

  const keyTopTextRef = React.useRef(null);
  //   React.useLayoutEffect(() => {
  //     fitty(keyTopTextRef.current, {
  //         maxSize: 15,
  //         minSize: 5,
  //         multiLine: false
  //     });
  // });

  setGlobalState('keyTopTextRefs', v => ({ ...v, [label]: keyTopTextRef }));

  const [testInput, setTestInput] = React.useState('');
  // let keyTopRef = React.useRef(null);
  const [isModifier, setIsModifier] = React.useState(false);

  const [font] = useGlobalState('currentFont');

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
              // transform,
            }
          }
        >
          <AnimatedKeyContainer
            editableKey={editableKey}
            active={active}
            // active={active}
            margin={margin}
            defaultColor={defaultColor}
            activeColor={activeColor}
            style={{
              opacity,
              borderTopColor,
              borderBottomColor,
              borderLeftColor,
              borderRightColor,
              boxShadow

              // transform
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
            <KeyTop  wt={wt} ht={ht} color={keyColor} style={{ background, }}>
              {/* <KeyChar ref={keyTopTextRef}>Basic Editing the view port</KeyChar> */}

              <div
                ref={keyTopTextRef}
                style={{
                  // color: x.interpolate(x=>`rgba(0, 0, 0, ${x})`),
                  height: ht * 0.7 * 0.95,
                  width: (wt - 17) * 0.95,
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden',
                  fontFamily: 'Karla, sans-serif'
                }}
              >
                <KeyText keyTopText={keyTopText}/>
                {/* {!addMode && <KeyText keyTopText={keyTopText} style={{opacity: 0}} />} */}
              </div>

              {/* {(!keyMapMode) && <KeyChar>{keyName in iconLabels ? iconLabels[keyName] : label}</KeyChar>} */}
            </KeyTop>
            {((active && !isModifier) || !keyMapMode) && (
              <BottomKeyChar>{keyName in iconLabels ? iconLabels[keyName] : label}</BottomKeyChar>
            )}
          </AnimatedKeyContainer>
        </animated.div>
      </ConditionalWrap>
    </React.Fragment>
  );
};

/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { AnimatedKeyContainer, KeyTop, BottomKeyChar } from './Key.styles';
import styled, { keyframes, css } from 'styled-components';
import { findAll } from 'styled-components/test-utils';
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
import useMethods from 'use-methods';

import { FlashingKey } from './FlashingKey';

import { useGlobalState, setGlobalState } from '../../state';
import _ from 'lodash';

import flatMap from 'lodash/flatMap';
import KeyText from './KeyText/KeyText';
import { motion } from 'framer-motion';
import { TextField } from '@material-ui/core';

const ConditionalWrap = ({ condition, wrap, children }) => {
  const [flashing] = React.useContext(FlashingContext);
  return condition ? wrap(children, flashing) : <>{children}</>;
};

const initialState = {
  active: false,
  activeColor: '#1fe3ac',
  defaultColor: '#FFFFFF',
  keyTopText: ''
};

const methods = state => {
  const defaultActiveColor = '#1fe3ac';
  const defaultColor = '#FFFFFF';
  return {
    setActive() {
      state.keyColor = defaultActiveColor;
      state.active = true;
    },
    setInactive() {
      state.keyColor = defaultColor;
      state.keyTopText = '';
      state.active = false;
    },
    setActiveMapKey(keyColor, keyTopText) {
      console.log(`⭐: setActiveMapKey -> keyColor`, keyColor);
      state.activeColor = keyColor;
      state.keyTopText = keyTopText;
      state.active = true;
    },
    resetActiveColor() {
      state.activeColor = defaultActiveColor;
      this.setInactive();
    }
  };
};

export const Key = ({ label, keyName, margin, uniqueKeyName, wt, ht, m, amin, key }) => {
  // global mode state
  const [keyMapMode] = useGlobalState('keyMapMode');
  const [editMode] = useGlobalState('editMode');
  const [addMode] = useGlobalState('addMode');

  // global key state
  const [activeLayers] = useGlobalState('activeLayers');
  const [newKeys, setNewKeys] = useGlobalState('newKeys');
  const [activeKeys] = useGlobalState('activeKeys');

  // use methods hook
  const [
    { active, activeColor, defaultColor, keyTopText }, // <- latest state
    { setActive, setInactive, setActiveMapKey, resetActiveColor } // <- callbacks for modifying state
  ] = useMethods(methods, initialState);

  const iconLabels = {
    LeftArrow: <LeftArrowIcon>{label}</LeftArrowIcon>,
    RightArrow: <RightArrowIcon>{label}</RightArrowIcon>,
    UpArrow: <UpArrowIcon>{label}</UpArrowIcon>,
    DownArrow: <DownArrowIcon>{label}</DownArrowIcon>
  };

  // Use Effect Hook
  React.useEffect(() => {
    if (flatMap(activeKeys).includes(uniqueKeyName)) {
      if (editMode) {
        console.log(`⭐:-------------- Key -> EDIT MODE ---------------`, editMode);
        
        setNewKeys(p => ({ ...p, keys: { key1: activeKeys } }));
        setActive();
      } else {
        setActive();
      }
    } else if (keyMapMode && !editMode && activeLayers && uniqueKeyName) {
      _.forEach(activeLayers, (layer, colorIndex) => {
        const mainKeyIndex = _.indexOf(layer.mainKeys, label);
        const isMod = _.includes(layer.layer, label);
        const isSingleKey = layer.keyArr[0].length === 1;

        if (mainKeyIndex >= 0) {
          setActiveMapKey(layer.color, layer.keyDescription[mainKeyIndex]);
        } else if (isMod) {
          setIsModifier(true);
          setActiveMapKey(layer.color, label);
        }
      });
    }

    return () => {

      resetActiveColor();
    };
  }, [activeKeys, addMode, editMode, keyMapMode, activeLayers]);

  // UseLayoutEffect Hook
  React.useLayoutEffect(() => {
    if (active && addMode) {
      setGlobalState('lastKeyRef', label);
    }
  }, [active]);

  // Functions
  const addItem = key => {
    const index = _.size(newKeys.keys.key1);
    const individualKeys = { ...newKeys.keys['key1'], [index]: key };
    const keys = { key1: individualKeys };
    setNewKeys(p => ({ ...p, keys }));
  };
  const removeItem = key => {
    const key1 = newKeys.keys.key1;
    const newObj = _.filter(key1, function(v) {
      return v !== key;
    });

    const keys = { key1: newObj };

    setNewKeys(p => ({ ...p, keys }));
  };

  const toggleKey = isActive => {
    if (isActive) {
      removeItem(label);
      setInactive();
    } else {
      addItem(label);
      setActive();
    }
  };

  const keyClicked = () => {
    if (editMode || addMode) {
      toggleKey(active)
    }
  };

  const {
    borderTopColor,
    borderBottomColor,
    borderLeftColor,
    borderRightColor,
    background
  } = useSpring({
    reverse: active,
    from: {
      // transform: 'translateY(-38.58%) scale(1.02)',
      // transform: 'scale(1)',
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
        transform: 'translateY(0px) scale(1)',
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
    config: { mass: 1, tension: 180, friction: 12, duration: 300 }
  });

  const keyTopTextRef = React.useRef(null);
  setGlobalState('keyTopTextRefs', v => ({ ...v, [label]: keyTopTextRef }));
  const [isModifier, setIsModifier] = React.useState(false);

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
        <AnimatedKeyContainer
          active={active}
          // active={active}
          margin={margin}
          style={{
            borderTopColor,
            borderBottomColor,
            borderLeftColor,
            borderRightColor
          }}
          label={label}
          wt={wt}
          ht={ht}
          onClick={keyClicked}
        >
          <KeyTop wt={wt} ht={ht} style={{ background }}>
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
              <KeyText keyTopText={keyTopText} />
              {/* {!addMode && <KeyText keyTopText={keyTopText} style={{opacity: 0}} />} */}
            </div>

            {/* {(!keyMapMode) && <KeyChar>{keyName in iconLabels ? iconLabels[keyName] : label}</KeyChar>} */}
          </KeyTop>
          {((active && !isModifier) || !keyMapMode) && (
            <BottomKeyChar>{keyName in iconLabels ? iconLabels[keyName] : label}</BottomKeyChar>
          )}
        </AnimatedKeyContainer>
      </ConditionalWrap>
    </React.Fragment>
  );
};

/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import {
  AnimatedKeyContainer,
  BottomKeyChar,
  KeyTop,
  KeyCharCenter
} from './Key.styles';
import styled, { keyframes, css } from 'styled-components';
import { findAll } from 'styled-components/test-utils';
import { Box } from '@rebass/grid';
import {
  shade,
  linearGradient,
  lighten,
  transparentize,
  grayscale
} from 'polished';
import Layer from '@material-ui/core/Box';
import produce from 'immer';

import { FlashingContext } from './FlashingContext';
import { Card, Grid, Paper } from '@material-ui/core';
import { Textfit } from 'react-textfit';
import { MouseIcon } from './Icons';
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
import {
  motion,
  useAnimation,
  useMotionValue,
  useTransform,
  transform
} from 'framer-motion';
import { TextField } from '@material-ui/core';
import { useBoolean } from 'react-hanger';
import theme from '../design-system/theme';

const ConditionalWrap = ({ condition, wrap, children }) => {
  const [flashing] = React.useContext(FlashingContext);
  return condition ? wrap(children, flashing) : <>{children}</>;
};

const initialState = {
  active: false,
  activeColor: theme.palette.keyColors.active,
  defaultColor: theme.palette.keyColors.default,
  keyTopText: ''
};

const methods = state => {
  const defaultActiveColor = theme.palette.keyColors.active;
  const defaultColor = theme.palette.keyColors.default;
  return {
    setActive() {
      state.keyColor = defaultActiveColor;
      // state.active = true;
    },
    setInactiveMapKey() {
      state.keyColor = defaultColor;
      state.keyTopText = '';
      state.activeColor = defaultActiveColor;
      // state.active = false;
    },
    setActiveMapKey(keyColor, keyTopText) {
      state.activeColor = keyColor;
      state.keyTopText = keyTopText;

      // state.active = true;
    },
    resetActiveColor() {
      state.activeColor = defaultActiveColor;
      // this.setInactive();
    }
  };
};

export const Key = ({
  label,
  keyName,
  margin,
  uniqueKeyName,
  wt,
  ht,
  m,
  amin,
  key,
  KeyComponent,
  KeyChar
}) => {
  // global mode state
  const [keyMapMode] = useGlobalState('keyMapMode');
  const [editMode] = useGlobalState('editMode');
  const [addMode] = useGlobalState('addMode');
  const [keyLabelAdded] = useGlobalState('keyLabelAdded');

  // global key state
  const [activeLayers] = useGlobalState('activeLayers');

  const [index, setIndex] = React.useState(null);

  const [newKeys, setNewKeys] = useGlobalState('newKeys');
  const [activeKeys] = useGlobalState('activeKeys');
  const [isThenSequence, setIsThenSequence] = React.useState({
    hasSequence: false,
    isSequenceKey: false
  });
  // use methods hook
  const [
    { activeColor, defaultColor, keyTopText }, // <- latest state
    { setActiveMapKey, setInactiveMapKey } // <- callbacks for modifying state
  ] = useMethods(methods, initialState);

  const active = useBoolean(false);
  const iconLabels = {
    LeftArrow: <LeftArrowIcon>{label}</LeftArrowIcon>,
    RightArrow: <RightArrowIcon>{label}</RightArrowIcon>,
    UpArrow: <UpArrowIcon>{label}</UpArrowIcon>,
    DownArrow: <DownArrowIcon>{label}</DownArrowIcon>
    // LeftClick: <UpArrowIcon>{label}</UpArrowIcon>,
    // RightClick: <MouseIcon>{label}</MouseIcon>,
    // MiddleMouseButton: <UpArrowIcon>{label}</UpArrowIcon>,
    // ScrollUp: <UpArrowIcon>{label}</UpArrowIcon>,
    // ScrollDown: <UpArrowIcon>{label}</UpArrowIcon>,
    // DragMouse: <UpArrowIcon>{label}</UpArrowIcon>
  };

  // Use Effect Hook
  React.useEffect(() => {
    if (flatMap(activeKeys).includes(uniqueKeyName)) {
      if (editMode) {
        setNewKeys(p => ({ ...p, keys: { key1: activeKeys } }));
        active.setTrue();
      } else if (!keyMapMode) {
        active.setTrue();
      }
      // Check for 'THEN' key sequence
      if (activeKeys['THEN']) {
        setIsThenSequence(v => ({ ...v, hasSequence: true }));
        if (activeKeys['THEN'].includes(uniqueKeyName)) {
          setIsThenSequence(v => ({ ...v, isSequenceKey: true }));
        } else {
          setIsThenSequence(v => ({ ...v, isSequenceKey: false }));
        }
      }
    }

    if (keyMapMode && !editMode && activeLayers && uniqueKeyName) {
      _.forEach(activeLayers, (layer, colorIndex) => {
        const mainKeyIndex = _.indexOf(layer.mainKeys, label);
        const isMod = _.includes(layer.layer, label);

        if (mainKeyIndex >= 0) {
          setActiveMapKey(layer.color, layer.keyDescription[mainKeyIndex]);
          active.setTrue();
        } else if (isMod) {
          setIsModifier(true);
          setActiveMapKey(layer.color, label);
          active.setTrue();
        }
      });
    }

    return () => {
      active.setFalse();
      setInactiveMapKey();
      // setInactive();
    };
  }, [activeKeys, addMode, editMode, keyMapMode, activeLayers]);

  // UseLayoutEffect Hook
  React.useLayoutEffect(() => {
    if (active.value && addMode) {
      setGlobalState('lastKeyRef', label);
    }
  }, [active.value]);

  // Functions
  const addItem = key => {
    const endIndex = _.size(newKeys.keys.key1);
    // const individualKeys = { ...newKeys.keys['key1'], [index]: key };
    // const keys = { key1: individualKeys };
    // setNewKeys(p => ({ ...p, keys }));
    setIndex(endIndex);
    setNewKeys(
      produce(v => {
        v.keys['key1'][endIndex] = key;
      })
    );
  };
  const removeItem = targetKey => {
    // const key1 = newKeys.keys.key1;
    // const newObj = _.filter(key1, function(v) {
    //   return v !== key;
    // });

    setNewKeys(
      produce(v => {
        delete v.keys['key1'][index];
        // v.splice(v.findIndex(todo => todo.id === "id1"), 1)
      })
    );
    setIndex(null);
    // const keys = { key1: newObj };

    // setNewKeys(p => ({ ...p, keys }));
  };

  const toggleKey = isActive => {
    if (isActive) {
      removeItem(label);
      active.setFalse();
    } else {
      addItem(label);
      active.setTrue();
    }
  };

  const keyClicked = () => {
    if ((editMode || addMode) && keyLabelAdded === false) {
      toggleKey(active.value);
    }
  };

  const keyTopTextRef = React.useRef(null);
  setGlobalState('keyTopTextRefs', v => ({ ...v, [label]: keyTopTextRef }));
  const [isModifier, setIsModifier] = React.useState(false);

  const controls = useAnimation();

  React.useEffect(() => {
    let activeVariant = 'active';
    if (isThenSequence.isSequenceKey) {
      activeVariant = ['active', 'sequence2'];
    } else if (isThenSequence.hasSequence) {
      activeVariant = ['active', 'sequence1'];
    }
    controls.start(active.value ? activeVariant : 'inactive');
  }, [activeColor, activeLayers, active]);

  return (
    <ConditionalWrap
      condition={editMode && active.value}
      style={{ backfaceVisibility: 'hidden', filter: 'blur(0)' }}
      wrap={(children, flashing) => (
        <animated.div key={key} style={flashing}>
          {children}
        </animated.div>
      )}
    >
      {/* <motion.div animate={controls} style={{ backfaceVisibility: "hidden" }}> */}
      {/* <ShadowOverlay
        width={wt}
        height={ht}
        custom={{ activeColor, defaultColor }}
        animate={controls}
        variants={keyTopVariants}
      /> */}

      <AnimatedKeyContainer
        // active={setActive.value}
        // active={active}
        // style={{ filter: `opacity(${grayscale})` }}
        margin={margin}
        custom={{ activeColor, defaultColor, i: 5 }}
        animate={controls}
        variants={variants}
        // transition={{ duration: 0.3 }}
        label={label}
        wt={wt}
        ht={ht}
        onClick={keyClicked}
      >
        <KeyTop
          color={defaultColor}
          wt={wt}
          ht={ht}
          // style={{
          //   background

          //   // backgroundClip: 'content-box',
          // }}
        >
          {/* <KeyChar ref={keyTopTextRef}>Basic Editing the view port</KeyChar> */}

          {!keyMapMode && (
            <KeyChar>
              {keyName in iconLabels ? iconLabels[keyName] : label}
            </KeyChar>
          )}
          {/* {keyMapMode && (
              <KeyCharCenter
                ref={keyTopTextRef}
                // style={{ transform }}
  
                // style={{
                //   // color: x.interpolate(x=>`rgba(0, 0, 0, ${x})`),
                //   // height: ht * 0.7 * 0.95,
                //   // width: (wt - 17) * 0.95,
                //   position: "absolute",
                //   textAlign: "center",
                //   alignItems: "center",
                //   justifyContent: "center",
                //   overflow: "hidden",
                //   fontFamily: "Karla, sans-serif"
                // }}
              >
                <KeyText active={active.value} keyTopText={keyTopText} />
              </KeyCharCenter>
            )} */}

          {/* {(!keyMapMode) && <KeyChar>{keyName in iconLabels ? iconLabels[keyName] : label}</KeyChar>} */}
        </KeyTop>
        {/* {((setActive.value && !isModifier) || !keyMapMode) && (
            <BottomKeyChar>
              {keyName in iconLabels ? iconLabels[keyName] : label}
            </BottomKeyChar>
          )} */}
      </AnimatedKeyContainer>
      {/* </motion.div> */}
    </ConditionalWrap>
  );
};

const variants = {
  active: ({ activeColor }) => ({
    // borderRadius: ["20%", "20%", "50%", "50%", "20%"],
    // rotateY: 180,
    // rotateX: -160,
    borderTopColor: `${shade(0.02, activeColor)}`,
    // scale: [1.02, 1, 0.95, 1.1, 1],
    // opacity: [0.8, 0.9, 1],
    borderBottomColor: `${shade(0.3, activeColor)}`,
    borderLeftColor: `${shade(0.09, activeColor)}`,
    borderRightColor: `${shade(0.09, activeColor)}`,
    // transition: { type: "spring", mass: 0.5 },
    // boxShadow: " 0px 0px 0px 3px rgba(0,0,0,0.5)",
    // boxShadow: " 0px 0px 8px 0px black",
    transition: { duration: 0.3 },
    y: 0,
    filter: `grayscale(${[300, 200, 400]})`,
    backgroundImage: `linear-gradient(-30deg, ${shade(
      0.05,
      activeColor
    )} 0%, ${lighten(0.1, activeColor)} 50%)`
  }),
  sequence1: ({ activeColor, i }) => ({
    y: 5,

    transition: { yoyo: Infinity, duration: 1 }
  }),
  sequence2: ({ activeColor, i }) => ({
    y: 5,
    transition: {
      // elapsed: 1,
      type: 'spring',
      // restSpeed: 0.5,
      velocity: 5,
      // flip: Infinity,
      from: 30,
      to: 0

      // duration: 1
    }
  }),

  inactive: ({ defaultColor }) => ({
    // y: 0,
    // rotateY: 180,
    // rotateX: 0,
    y: 0,
    borderTopColor: `${shade(0.02, defaultColor)}`,
    borderBottomColor: `${shade(0.3, defaultColor)}`,
    borderLeftColor: `${shade(0.09, defaultColor)}`,
    borderRightColor: `${shade(0.09, defaultColor)}`,
    // boxShadow: " 0px 0px 0px 0px rgba(0,0,0,0.5)",
    // boxShadow: " 0px 0px 0px 0px black",
    backgroundImage: `linear-gradient(-30deg, ${shade(
      0.05,
      defaultColor
    )} 0%, ${lighten(0.2, defaultColor)} 50%)`
  })
};

const keyTopVariants = {
  active: ({ activeColor }) => ({
    backgroundImage: transparentize(0.3, activeColor)
  }),

  inactive: ({ defaultColor }) => ({
    backgroundImage: transparentize(0.3, defaultColor),
    y: 0
  })
};

const ShadowOverlay = styled(motion.div)`
  position: absolute;
  /* background: rgba(255, 255, 255, 0.8); */

  border-radius: 8px;
  backface-visibility: hidden;
  backdrop-filter: blur(1px);
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
  z-index: 5;
  transform: translateZ(0);
`;

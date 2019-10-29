/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import {
  AnimatedKeyContainer,
  BottomKeyChar,
  KeyTop,
  KeyCharCenter
} from "./Key.styles";
import styled, { keyframes, css } from "styled-components";
import { findAll } from "styled-components/test-utils";
import { Box } from "@rebass/grid";
import {
  shade,
  linearGradient,
  lighten,
  transparentize,
  grayscale,
  readableColor
} from "polished";
import Layer from "@material-ui/core/Box";
import produce from "immer";

import { FlashingContext } from "./FlashingContext";
import { Card, Grid, Paper } from "@material-ui/core";
import { Textfit } from "react-textfit";
import { MouseIcon } from "./Icons";
import {
  useSpring,
  animated,
  useTransition,
  config,
  interpolate,
  extrapolate,
  Easing
} from "react-spring";

import useMethods from "use-methods";

import { useGlobalState, setGlobalState } from "../../state";
import _ from "lodash";

import flatMap from "lodash/flatMap";
import KeyText from "./KeyText/KeyText";
import { motion, useAnimation } from "framer-motion";
import { TextField } from "@material-ui/core";
import { useBoolean } from "react-hanger";
import theme from "../design-system/theme";
import { StatusBar } from "../KeySheet/NewKeyPanel/NewKeyPanel";
import { useTheme } from "@material-ui/core";

const ConditionalWrap = ({ condition, wrap, children }) => {
  const [flashing] = React.useContext(FlashingContext);
  return condition ? wrap(children, flashing) : <>{children}</>;
};

const initialState = {
  active: false,
  activeColor: theme.palette.keyColors.active,
  defaultColor: theme.palette.keyColors.default,
  keyTopText: ""
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
      state.keyTopText = "";
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
  const [mode] = useGlobalState("mode");
  // const [lastKey] = useGlobalState("lastKey");

  const [keyLabel] = useGlobalState("keyLabel");
  const [isMod, setIsMod] = React.useState(false);
  // global key state
  const [activeLayers] = useGlobalState("activeLayers");
  const [newKeys, setNewKeys] = useGlobalState("newKeys");
  const isMapKey = React.useMemo(() => {
    const isLabelKey =
      label === newKeys.keys.key1[newKeys.keys.key1.length - 1] &&
      mode &&
      keyLabel &&
      uniqueKeyName;
    if (mode === "KEYMAP_MODE" || isLabelKey) {
      return true;
    } else {
      return false;
    }
  }, [mode, keyLabel]);

  const [activeKeys] = useGlobalState("activeKeys");
  const [
    { activeColor, defaultColor, keyTopText }, // <- latest state
    { setActiveMapKey, setInactiveMapKey } // <- callbacks for modifying state
  ] = useMethods(methods, initialState);

  const [active, setActive] = React.useState(false);

  // Use Effect Hook
  const [isIncluded, setIsIncluded] = React.useState(false);
  React.useEffect(() => {
    setIsIncluded(flatMap(activeKeys).includes(uniqueKeyName));
    return () => {
      setIsIncluded(false);
    };
  }, [activeKeys]);

  React.useEffect(() => {
    if (isIncluded) {
      if (mode === "EDIT_MODE") {
        setNewKeys(p => ({ ...p, keys: { key1: activeKeys } }));
        setActive(true);
      } else if (mode !== "KEYMAP_MODE") {
        setActive(true);
      }
    }

    if (mode === "KEYMAP_MODE" && activeLayers && uniqueKeyName) {
      _.forEach(activeLayers, (layer, colorIndex) => {
        const mainKeyIndex = _.indexOf(layer.mainKeys, label);
        const curIsMod = !layer.isSingleKey && _.includes(layer.layer, label);

        if (curIsMod) {
          setIsMod(true);
          setActiveMapKey(layer.color, label);
          setActive(true);
        } else if (mainKeyIndex >= 0) {
          const keyLabel =
            layer.keyDescription[mainKeyIndex] ||
            layer.data[layer.keys[mainKeyIndex]].description;
          setActiveMapKey(layer.color, keyLabel);
          console.log(`⭐:  layer`, layer);

          setActive(true);
        }
      });
    }

    return () => {
      setInactiveMapKey();
      setActive(false);
    };
  }, [isIncluded, mode, activeLayers]);

  // UseLayoutEffect Hook

  // Functions
  const addItem = key => {
    setNewKeys(
      produce(v => {
        v.keys.key1.push(key);
      })
    );
  };
  const removeItem = key => {
    setNewKeys(
      produce(v => {
        v.keys.key1.splice(v.keys.key1.findIndex(k => k === key), 1);
      })
    );
  };
  const toggleKey = isActive => {
    if (isActive) {
      removeItem(label);
      setActive(false);
    } else {
      addItem(label);
      setActive(true);
    }
  };

  const keyClicked = () => {
    if ((mode === "EDIT_MODE" || mode === "ADD_MODE") && !keyLabel) {
      toggleKey(active);
    }
  };

  const controls = useAnimation();

  React.useEffect(() => {
    controls.start(active ? "active" : "inactive");
  }, [activeColor, activeLayers, active]);
  return (
    <AnimatedKeyContainer
      margin={margin}
      initial={false}
      custom={{ activeColor, defaultColor, i: 5 }}
      animate={controls}
      variants={variants}
      label={label}
      wt={wt}
      ht={ht}
      onClick={keyClicked}
    >
      <KeyTop
        // animate={isMod && active ? { backgroundPosition: "10px 10px" } : {}}
        transition={{ loop: Infinity, ease: "linear", duration: 0.5 }}
        defaultColor={defaultColor}
        activeColor={activeColor}
        // bg={
        //   isMapKey &&
        //   !isMod &&
        //   `linear-gradient(-30deg, ${shade(0.05, defaultColor)} 0%, ${lighten(
        //     0.2,
        //     defaultColor
        //   )} 50%)`
        // }
        isMod={isMod && active}
        wt={wt}
        ht={ht}
      >
        {isMapKey ? (
          <>
            <KeyCharCenter>
              {mode === "KEYMAP_MODE" ? (
                <KeyText
                  isMod={isMod}
                  color={readableColor(activeColor)}
                  keyTopText={keyTopText}
                />
              ) : (
                <StatusBar.Target
                  style={{
                    width: "100%",
                    display: "flex",
                    height: "100%",
                    overflow: "hidden",
                    boxSizing: "content-box",
                    borderRadius: "5px"
                  }}
                />
              )}
            </KeyCharCenter>
          </>
        ) : (
          <KeyChar>{label}</KeyChar>
        )}

        {/* {(!keyMapMode) && <KeyChar>{keyName in iconLabels ? iconLabels[keyName] : label}</KeyChar>} */}
      </KeyTop>
      {isMapKey && !isMod && active && <BottomKeyChar>{label}</BottomKeyChar>}
    </AnimatedKeyContainer>
  );
};

const variants = {
  active: ({ activeColor }) => ({
    borderTopColor: `${shade(0.02, activeColor)}`,
    borderBottomColor: `${shade(0.3, activeColor)}`,
    borderLeftColor: `${shade(0.09, activeColor)}`,
    borderRightColor: `${shade(0.09, activeColor)}`,
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
      type: "spring",
      velocity: 5,
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
    )} 0%, ${lighten(0.2, defaultColor)} 50%)`,
    transition: { duration: 0.3 }
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

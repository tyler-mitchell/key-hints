import React from "react";

import { useSpring } from "react-spring";
import { a } from "react-spring";

import { useGlobalState } from "../../../state";
import { motion, useAnimation } from "framer-motion";
import { Grid } from "@material-ui/core";
import { Paper } from "@material-ui/core";
import styled from "styled-components";
import { NewKeyPanel } from "./NewKeyPanel";
const variants = {
  opened: i => ({
    y: i * 0.4,
    transition: {
      type: "spring",
      // damping: 50,
      stiffness: 250,
      // velocity: 800
      damping: 20,
      mass: 2

      // mass: 0.1
    }
  }),
  closed: i => ({
    y: i + i * 0.15,
    transition: {
      type: "spring",

      stiffness: 200,
      velocity: 150,
      damping: 20,
      mass: 2,
      delay: 0.1
      // restSpeed: 0.3
      // mass: 0.1
    }
  }),
  openedMap: i => ({
    y: -10,
    transition: {
      type: "spring",
      // damping: 50,
      stiffness: 250,
      // velocity: 800
      damping: 50,
      mass: 2

      // mass: 0.1
    }
  }),
  closedMap: i => ({
    y: -145,
    transition: {
      type: "spring",

      stiffness: 200,
      velocity: 150,
      damping: 20,
      mass: 2,
      delay: 0.1
      // restSpeed: 0.3
      // mass: 0.1
    }
  }),
  mapInitial: i => ({
    y: 0
  })
};
const TabIndicator = styled.div`
  width: 50px;
  height: 4px;
  background-color: rgba(220, 220, 220, 0.2);
  top: 9px;
  border-radius: 4px;
  position: absolute;
  margin: 0 auto;
  left: 0;
  z-index: 300;
  right: 0;
`;

export const NewKeyPanelContainer = ({ parentHeight, saveClicked }) => {
  return (
    <div
      style={{
        bottom: 0,
        pointerEvents: "none",
        alignItems: "center",
        position: "absolute",
        height: "120%",
        width: "100%",
        paddingBottom: "100px",
        overflow: "hidden",
        left: 0,
        right: 0
      }}
    >
      {parentHeight && (
        <AnimatedPanel
          variantType="NewKeyPanel"
          padding="25px"
          variantInfo={{
            type: "NewKeyPanel",
            opened: "opened",
            closed: "closed",
            mode: "ADD_MODE"
          }}
          parentHeight={parentHeight}
        >
          <NewKeyPanel saveClicked={saveClicked} />
        </AnimatedPanel>
      )}
    </div>
  );
};

export const AnimatedPanel = ({
  parentHeight,
  customStyle,
  GridProps,
  children,
  variantInfo,
  padding,
  height
}) => {
  const [mode] = useGlobalState("mode");

  const margin = variantInfo.type === "KeyMapPanel" ? "0 90px 0 5px" : "0 21px";

  return (
    <motion.div
      // initial={{ y: yINITIAL }}
      custom={parentHeight}
      // initial={{ y: 900 }}
      animate={
        variantInfo.mode === mode ? variantInfo.opened : variantInfo.closed
      }
      variants={variants}
      style={{
        position: "absolute",
        pointerEvents: "auto",
        left: 0,
        right: 0,
        bottom: 0,
        top: 0,
        margin,
        flex: 1,
        zIndex: 6,
        background: "transparent",
        borderTopRightRadius: 15,
        borderTopLeftRadius: 15,
        borderBottomRightRadius: 15,
        borderBottomLeftRadius: 15,
        userSelect: "none",
        alignItems: "center"
      }}
    >
      <Paper
        elevation={3}
        raised
        style={{
          // height: parentHeight * 0.61,
          borderRadius: 15,

          padding,
          height,
          ...customStyle
        }}
      >
        <TabIndicator />
        {children}
      </Paper>
    </motion.div>
  );
};

export const View = props => (
  <motion.div
    style={{
      position: "absolute",
      pointerEvents: "auto",
      left: 0,
      right: 0,
      bottom: 0,
      top: 0,
      margin: "0 21px",
      flex: 1,

      zIndex: 5,
      // height: "600px",
      background: "transparent",
      borderTopRightRadius: 15,
      borderTopLeftRadius: 15,
      borderBottomRightRadius: 15,
      borderBottomLeftRadius: 15,
      // padding: 24,
      userSelect: "none",
      color: "#ffffffc0",

      // clipPath: "inset(10px 20px 30px 40px)",
      alignItems: "center"

      // ...props.style
    }}
  >
    {props.children}
  </motion.div>
);

/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { motion, useCycle, useMotionValue } from "framer-motion";
import { useMeasure } from "../../hooks/helpers";
import { Grid } from "@material-ui/core";
import { Textfit } from "react-textfit";
import { useGlobalState } from "../../../state";

const KeyText = ({
  keyTopHeight,
  testText,
  keyTopWidth,
  keyTopText,
  fontOpacity,
  children,
  active
}) => {
  return (
    <Textfit
      style={{
        pointerEvents: "none",
        display: "flex",
        // width: '90%',
        // height: '90%',
        width: "inherit",
        height: "inherit",
        alignItems: "center",
        justifyContent: "center",
        margin: "0 auto",
        overflow: "hidden",
        fontFamily: "Karla, sans-serif"
      }}
      min={10}
      max={18}
      mode="multi"
    >
      <motion.div
        // initial={{ opacity: 0 }}
        // animate={active ? { opacity: 1 } : { opacity: 0 }}
        // transition={{ duration: 2 }}
        style={{
          display: "-webkit-box",
          textAlign: "center",
          lineHeight: "1",
          WebkitLineClamp: "5",
          WebkitBoxOrient: "vertical",
          textOverflow: "ellipsis"
        }}
      >
        {keyTopText}
      </motion.div>
    </Textfit>
  );
};

export default KeyText;

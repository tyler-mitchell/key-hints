import React from "react";

import { useSpring } from "react-spring";
import { a } from "react-spring";

import { useGlobalState } from "../../../state";
import { motion } from "framer-motion";

// const OFFSET = 420;
const OFFSET = 103;
const INITIAL = 780;
// const SLOW = config.gentle
const SLOW = { mass: 1, tension: 200, friction: 14 };
const FAST = { tension: 1000, friction: 100 };

const variants = {
  opened: i => ({
    y: i * 0.22,
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
  })
};
export const AnimatedPanel = ({ parentHeight, children }) => {
  console.log(`⭐: AnimatedPanel -> parentHeight`, parentHeight);
  const [{ y }, set] = useSpring(() => ({ y: INITIAL }));
  const [addMode] = useGlobalState("addMode");
  const yINITIAL = parentHeight + parentHeight * 0.15;
  const yOFFSET = 103;

  return (
    <>
      {parentHeight && (
        <motion.div
          // initial={{ y: yINITIAL }}
          custom={parentHeight}
          initial={false}
          animate={addMode ? "opened" : "closed"}
          variants={variants}
          // transition={{
          //   type: "spring",
          //   // damping: 50,
          //   stiffness: 200,
          //   // velocity: 800
          //   restDelta: 0.5,
          //   restSpeed: 0.5
          //   // mass: 0.1
          // }}
          style={{
            position: "absolute",
            pointerEvents: "auto",
            left: 0,
            right: 0,
            bottom: 0,
            top: 0,
            margin: "0 21px",
            flex: 1,

            zIndex: 5000,
            // height: "600px",
            background: "transparent",
            borderTopRightRadius: 15,
            borderTopLeftRadius: 15,
            borderBottomRightRadius: 15,
            borderBottomLeftRadius: 15,
            // padding: 24,
            userSelect: "none",

            // clipPath: "inset(10px 20px 30px 40px)",
            alignItems: "center"

            // ...props.style
          }}

          // style={{ transform: y.interpolate(y => `translate3d(0,${y}px,0)`) }}
        >
          {children}
        </motion.div>
      )}
    </>
  );
};

export const View = props => (
  // <div style={{ position: 'relative', clipPath: 'polygon(-50% -50%, 150% -50%, 100% 10%, 0% 10%)'}}>

  <motion.div
    // {...props}
    style={{
      position: "absolute",
      pointerEvents: "auto",
      left: 0,
      right: 0,
      bottom: 0,
      top: 0,
      margin: "0 21px",
      flex: 1,

      zIndex: 5000,
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
    {/* <div
            style={{
              position: 'absolute',
              width: 50,
              height: 4,
              backgroundColor: 'rgba(220,220,220,0.4)',
              top: 12,
              borderRadius: 4,
              margin: '0 auto',
              left: 0,
              right: 0
            }}
          /> */}

    {props.children}
  </motion.div>
);

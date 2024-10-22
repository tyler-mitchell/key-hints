/* eslint-disable react-hooks/exhaustive-deps */
import { motion } from "framer-motion";
import { lighten, shade } from "polished";
import { animated } from "react-spring";
import styled from "styled-components";

export const AnimatedKeyContainer = styled(motion.div)`
  /* transform: scaleX(0.95); */
  /* padding: 0 1.5px; */
  /* margin: ${props => props.margin}; */
  
  /* margin-right: 3px; */


  

  /* background: #ddd; */
 
  position: relative;
  backface-visibility: hidden;
  width: ${props => props.wt}px;
  height: ${props => props.ht}px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border-width: 8px 8px 15px 8px;

  /* transition: background-color 2s, color 300ms; */

  border-radius: 8px;

  
  /* transition: filter .3s; */
  border-style: solid;
  /* transition: transform 300ms cubic-bezier(0.075, 0.82, 0.165, 1), filter 0.5s; */
  
  &:hover {
    /* background-position: 0 0, 0 0; */
    /* transition-duration: 0.5s; */
    /* background: inherit; */

    /* filter: contrast(140%); */
  }

  

  

  /* &:hover::after {
    background-color: ${props => shade(0.05, "#1fe3ac")};
    opacity: 0.5;
    transition: all 0.4s ease-in-out;
    
  } */
  
`;

const MiscKeyContainer = styled(AnimatedKeyContainer)``;
export const AnimatedMiscKeyContainer = animated(MiscKeyContainer);
// export const AnimatedKeyContainer = animated(KeyContainer);

export const ActiveKeyContainer = styled(AnimatedKeyContainer)`
  border-top-color: ${props => shade(0.02, props.color)};
  border-bottom-color: ${props => shade(0.3, props.color)};
  border-left-color: ${props => shade(0.09, props.color)};
  border-right-color: ${props => shade(0.09, props.color)};

  /* &:hover {
    animation-delay: 2s;
  } */
`;

export const KeyTop = styled(motion.div)`
  position: absolute;
  display: flex;
  user-select: none;
  height: ${props => props.ht * 0.73}px;
  width: ${props => props.wt - 12}px;
  box-sizing: border-box;
  border-radius: 8px;
  backface-visibility: hidden;
  /* background-image: inherit; */
  background-image: ${({
    isMod,
    defaultColor,
    isActive,
    isKeymapMode,
    activeColor
  }) =>
    isMod
      ? `linear-gradient(-45deg, ${lighten(
          0.08,
          activeColor
        )} 25%, ${activeColor} 25%,
          ${activeColor} 50%, ${lighten(0.08, activeColor)} 50%, ${lighten(
          0.08,
          activeColor
        )} 75%,
          ${activeColor} 75%, ${activeColor})`
      : isKeymapMode && isActive
      ? "linear-gradient(to top right, rgb(250, 250, 250), rgb(250, 250, 250), rgb(251, 251, 251), rgb(251, 251, 251), rgb(252, 252, 252), rgb(252, 252, 252), rgb(253, 253, 253), rgb(253, 253, 253), rgb(254, 254, 254), rgb(254, 254, 254), rgb(255, 255, 255), rgb(255, 255, 255));"
      : "inherit"};

  background-size: ${({ isMod }) => (isMod ? "20px 20px" : "initial")};

  z-index: 10;
  /* padding: 5px; */
  /* padding-bottom: auto; */

  /* text-align: left; */
  /* text-align: center; */
  font-family: "Karla", sans-serif;
  /* font-family: "Hammersmith One", sans-serif; */

  /* align-items: flex-start; */
  /* justify-content: center; */
  /* align-items: center; */
`;
export const KeyCharCenter = styled(motion.div)`
  display: flex;
  position: relative;
  width: inherit;
  align-items: center;
  justify-content: center;
  height: inherit;
  margin: 0 auto;
  will-change: transform, scale, opacity;
`;

export const KeyCharTopLeft = styled.div`
  padding: 5px;
`;

export const KeyCharTopCenter = styled(motion.div)`
  flex-direction: column;
  /* text-align: center; */
  /* top: 2px; */
`;
export const KeyCharBottomCenter = styled.div`
  align-self: center;
`;

export const BottomKeyChar = styled.div`
  font-size: 15px;
  position: absolute;
  z-index: 4;

  font-family: "Hammersmith One", sans-serif;

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
  position: relative;
  width: inherit;
  align-items: center;
  justify-content: center;
  height: inherit;
  margin: 0 auto;
  overflow: hidden;
  font-size: 20px;
  backface-visibility: hidden;
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

  transition: 1s ease;
`;

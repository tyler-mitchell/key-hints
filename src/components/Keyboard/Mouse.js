import React from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import { black } from "../design-system/theme/common";
import { shade } from "polished";

const MouseBase = styled.div`
  width: 180px;
  height: 320px;
  padding: 0;
  /* margin: 0 75px; */

  position: relative;
  /* background: #e8e8e8; */

  /* background: ${props => `radial-gradient(
    ellipse at center,
    ${props.color} 0,
    ${shade(0.3, props.color)} 60%
  )`}; */
  /* background: ${props =>
    `radial-gradient(ellipse at center, ${shade(
      0.05,
      props.color
    )} 20%, ${shade(0.2, props.color)} 40%,  ${shade(
      0.08,
      props.color
    )} 50%)`}; */
  border: 0px solid transparent;
  /* border-radius: 50% 50% 50% 50% / 70% 70% 30% 30%; */
  border-radius: 80%/50%;

  -webkit-transform: scaleY(0.85);
  -moz-transform: scaleY(0.85);
  transform: scaleY(0.95);
  justify-content: center;
  align-items: center;
 
  box-shadow: 
    inset 0 0 3px 3px white, 
    0   0    0   2px  rgb(221, 221, 221),
    0   3px  0px 3px  rgb(128, 128, 128),
   
    0   8px  2px 1px  rgb(124, 124, 124),
    0   9px  2px 1px  rgb(190, 190, 190),
    0   10px 2px 2px  rgba(0, 0, 0, .1),
    0   12px 6px     rgba(0, 0, 0, .05),
    0   13px 8px     rgba(0, 0, 0, .1),
    0   16px 16px    rgba(0, 0, 0, .1),
    8px 10px 10px    rgba(0, 0, 0, .15),
    8px 10px 10px    rgba(0, 0, 0, .15)
    
    ;
  /* &::before {
  
    content: "";
    position: absolute;
    clip-path: polygon(0 8%, 100% 8%, 100% 100%, 0% 100%);
    width: 110%;
    height: 70%;
  
    top: 68%;
    left: 50%;

    transform: translateX(-50%) translateY(-50%);

    background: ${props =>
      `radial-gradient(ellipse at center, ${shade(
        0.5,

        props.color
      )} 20%, ${shade(0.2, props.color)} 40%,  ${shade(
        0.5,
        props.color
      )} 50%)`};
    border-radius: 20% 20% 50% 50%;
    box-shadow: inset 0px 0px 0px 5px #454545, inset 0px 0px 5px 14px #858585,
      inset 0px 0px 5px 15px #454545;
  } */
`;

const MouseTop = styled.div`
  width: 90%;
  height: 95%;
  padding: 0;
  position: absolute;
  margin: 0 auto;
  left: 0;
  right: 0;
  top: 2%;

  background: #f7f7f7;
  /* box-shadow: inset 0 20px 50px 10px rgba(255, 255, 255, 1), inset 0 0 0 rgba(0, 0, 0, 0),
    inset 0 0 0 rgba(0, 0, 0, 0), 0 3px 0 3px  #e8e8e8,
    inset 0 0 0 rgba(0, 0, 0, 0), 0 5px 3px 5px rgba(255, 255, 255, 0.9),
    inset 0 0 0 rgba(0, 0, 0, 0), 0 20px 0 -0px  #787878
    
    ; */

  border-radius: 50%/30%;
  background: transparent;

  /* background: radial-gradient(at center, #ffffff 0%, transparent 100%); */
`;

const LeftMouseButton = styled.div`
  width: 44%;
  height: 35%;
  padding: 0;

  position: absolute;
  top: 2%;
  left: 5%;
  z-index: 20;

  background-clip: border-box;

  border-radius: 90% 10% 0% 100% / 80% 0% 100% 5%;

  background: radial-gradient(circle at center, #ffffff 0%, transparent 90%);
  transform-origin: 100% 35%;
  &:active {
    border-width: 3;
    transform: scale(0.99) translateY(1px);
    transition: transform 0.2s;
  }
`;
const RightMouseButton = styled(LeftMouseButton)`
  transform-origin: 0% 35%;

  right: 5%;
  left: initial;
  /* border-radius: 0px 90px 5px 2px; */
  border-radius: 10% 90% 100% 0% / 0% 80% 5% 0%;

  &:active {
    border-width: 3;
    /* box-shadow: 
  inset -1px -1px 0px 1px black  */
    transform: scale(0.99) translateY(1px);
    transition: transform 0.2s;
  }
`;

const MouseButtonBorder = styled.div`
  width: 10%;
  height: 14%;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  left: 0;
  right: 0;
  top: 10%;
  padding: 0 0.5%;
  margin: 0 auto;

  z-index: 30;
  background: #fcfcfc;
  background: ${props =>
    `linear-gradient( to top, ${shade(0.07, props.color)} 0%, ${shade(
      0.04,
      props.color
    )} 60%, ${shade(0.2, props.color)} 120%)`};

  /* box-shadow: 
    
    0 -2px 0px 3px rgba(0, 0, 0, 1),
    inset 0 3px 10px -5px rgba(0, 0, 0, 0.1),
    inset 0 -3px 20px -5px rgba(110, 110, 110, 0.05),
    0 3px 10px -2px rgba(255, 255, 255, 0.5), inset 0 20px 30px -5px #f6f8f8,
    inset 0 20px 40px -10px rgba(228, 241, 240, 0.5),
    inset 0 20px 40px -10px black
    ; */

  border: 2px ridge rgba(0, 0, 0, 0.1);

  border-radius: 40%;
`;

const MouseButton = styled.div`
  position: relative;

  overflow: hidden;
  width: 90%;
  height: 86%;

  background: rgb(189, 189, 189);
  background: ${props =>
    `linear-gradient(90deg, ${props.color} 20%, ${shade(
      0.3,
      props.color
    )} 30%, ${shade(0.3, props.color)} 70%, ${props.color} 80%)`};
  background-size: 100% 100%;
  box-shadow: inset ${props => props.color} 0 5px 5px,
    inset rgba(0, 0, 0, 0.15) 0 -2px 5px,
    /* inner shadow */ hsl(340, 0%, 87%) 0 0.1em 3px,
    hsl(340, 0%, 8%) 0 0.2em 1px, color border rgba(0, 0, 0, 0.2) 0 0.5em 0px;

  border: 1px solid #666666;
  border-radius: 40%;
  overflow: hidden;
  &::before {
    width: 100%;
    height: 100%;
    left: 0;
    right: 0;
    transform: translateZ(20px);
    margin-left: auto;
    margin-right: auto;
    background: transparent;
    position: absolute;
    content: "";

    background-color: inherit;

    background-image: ${props =>
      `linear-gradient(transparent 50%, ${shade(0, props.color)} 50%)`};
    background-size: 1% 10.1%;

    border-radius: 90%;
    /* box-shadow: 
      0px 0px 1px  0.5px rgba(128, 128, 128, 0.82),
      0px 4px 1px  0.5px rgba(128, 128, 128, 0.82), 
      0px 8px 1px 0.5px rgba(128, 128, 128, 0.82),
      0px 12px 1px 0.5px rgba(128, 128, 128, 0.82), 
      0px 16px 1px 0.5px rgba(128, 128, 128, 0.82),
      0px 20px 1px 0.5px rgba(128, 128, 128, 0.82),
      0px 24px 1px 0.5px rgba(128, 128, 128, 0.82); */
  }
`;

export default () => {
  return (
    <MouseBase color="#FFFFFF">
      <MouseButtonBorder color="#FFFFFF">
        <MouseButton color="#FFFFFF" />
      </MouseButtonBorder>
      <MouseTop color="#FFFFFF" />
      <RightMouseButton color="#FFFFFF" />
      <LeftMouseButton color="#FFFFFF" />
    </MouseBase>
  );
};

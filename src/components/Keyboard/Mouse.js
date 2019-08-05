import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import { black } from '../design-system/theme/common';

const MouseBase = styled.div`
  width: 180px;
  height: 320px;
  padding: 0;
  /* margin: 0 75px; */

  position: relative;
  background: #e8e8e8;
  
  background: radial-gradient(ellipse at center, rgba(0, 0, 0, 0.6) 0, rgba(39, 37, 37, 1) 60%);
  border: 0px solid transparent;
  /* border-radius: 50% 50% 50% 50% / 70% 70% 30% 30%; */
  border-radius: 80%/50%;

  -webkit-transform: scaleY(0.85);
  -moz-transform: scaleY(0.85);
  transform: scaleY(0.95);
  justify-content: center; 
  align-items: center;


  &::before{
    content: '';
    position: absolute;
   
    width: 110%;
    height: 70%;
    /* top: 50%; */
  top: 68%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  /* background:
radial-gradient(circle at 0% 50%, rgba(96, 16, 48, 0) 9px, #613 10px, rgba(96, 16, 48, 0) 11px) 0px 10px,
radial-gradient(at 100% 100%,      rgba(96, 16, 48, 0) 9px, #613 10px, rgba(96, 16, 48, 0) 11px),
#8a3; */
/* background: #e8e8e8; */
/* background: black; */
background: radial-gradient(ellipse at center, rgba(0, 0, 0, 0.6) 0, rgba(39, 37, 37, 0.74) 60%);
 border-radius: 20% 20% 50% 50%;



  } 
`;

const MouseTop = styled.div`
  width: 90%;
  height: 100%;
  padding: 0;
  position: absolute;
  margin: 0 auto;
  left: 0; right: 0;
  top: 2%;

  
 
  background: #f7f7f7;
  /* box-shadow: inset 0 20px 50px 10px rgba(255, 255, 255, 1), inset 0 0 0 rgba(0, 0, 0, 0),
    inset 0 0 0 rgba(0, 0, 0, 0), 0 3px 0 3px  #e8e8e8,
    inset 0 0 0 rgba(0, 0, 0, 0), 0 5px 3px 5px rgba(255, 255, 255, 0.9),
    inset 0 0 0 rgba(0, 0, 0, 0), 0 20px 0 -0px  #787878
    
    ; */
  
    border-radius: 45%/30%;

    background: linear-gradient(to bottom, rgba(255,255,255,.3) 0%,rgba(255,255,255,0) 100%);



  /* box-shadow: inset 0 0 0 rgba(0, 0, 0, 0), inset 0 0 0 rgba(0, 0, 0, 0),
    inset 0 1px 5px 2px #ebebeb, 0 5px 0 rgba(0, 0, 0, 0.06); */
    &::before{
      content: '';
      width: 100%;
      height: 100%;
      position: absolute;
      background-image: linear-gradient(360deg,rgba(255,255,255,.6) 0%,transparent 84%);
  border-radius: 47%;
      z-index: 30;
      pointer-events: none;
    }
`;

const LeftMouseButton = styled.div`
  width: 44%;
  height: 40%;
  padding: 0;

  position: absolute;
  top: -1%;
  left: 5%;
  z-index: 20;
  
  background-clip: border-box;
  /* box-shadow: inset 0 0px 0px 1px #ebebeb,  inset 0 0 0 rgba(0,0,0,0), inset 0 0 0 rgba(0,0,0,0), 0 0px 0 rgba(0,0,0,0.06); */
  
  border-radius: 100% 0% 0% 100% / 80% 0% 100% 5%;
  background: black;
  background: linear-gradient(to bottom, rgb(181, 181, 181) 0%,rgb(87, 87, 87) 100%);
  /* border-style: solid; */
  /* border-color: rgba(0, 0, 0, 0.2); */
  /* border-color: black; */
  /* border-width: 2px 2px 2.5px 2px; */
  transform-origin: 100% 35%;
  &:active{
    border-width: 3;
    /* box-shadow: 
  inset -1px -1px 0px 1px black  */
  transform: scale(0.99) translateY(1px); 
  transition: transform .2s;
  
  }
  box-shadow: 
  0 -2px 0px 0px black,
  1px 1px 0px 1px black

 
  ;

  filter: drop-shadow(-1px 0px 0px black);
`;
const RightMouseButton = styled(LeftMouseButton)`
transform-origin: 0% 35%;
filter: drop-shadow(1px 0px 0px black);

  right: 5%;
  left: initial;
  /* border-radius: 0px 90px 5px 2px; */
  border-radius: 0% 100% 100% 0% / 0% 80% 5% 0%;
  box-shadow: 
  0 -2px 0px 0px black,
  -1px  1px 2px 0px black
 
  ;
  &:active{
    border-width: 3;
    /* box-shadow: 
  inset -1px -1px 0px 1px black  */
  transform: scale(0.99) translateY(1px); 
  transition: transform .2s;
  
  }

`;

const MouseButtonBorder = styled.div`
  width: 10%;
  height: 15%;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  left: 0;
  right: 0;
  top: 10%;
  padding: 0 .5%;
  margin: 0 auto;
  
 
  z-index: 30;
  background: #fcfcfc;
  background: linear-gradient( to top, black 0%, rgba(113,113,113,1) 40%, black 120%);

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
  width: 80%;
  height: 86%;
  
  

  background: rgb(189,189,189);
background: linear-gradient(90deg, rgba(189,189,189,1) 20%, rgba(113,113,113,1) 30%, rgba(113,113,113,1) 70%, rgba(187,187,187,1) 80%);
background-size: 100% 100%;
  box-shadow: 
    inset rgba(241, 243, 243, 0.6) 0 5px 5px, 
    inset rgba(0, 0, 0, 0.15) 0 -2px 5px,
    /* inner shadow */
     hsl(340, 0%, 87%) 0 0.1em 3px, 
    hsl(340, 0%, 8%) 0 0.2em 1px,
    color border rgba(0, 0, 0, 0.2) 0 0.5em 0px
    ;
    
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
    content: '';

    background-color: inherit;
    
    background-image: linear-gradient(transparent 50%, rgb(77, 77, 77) 50%);
    background-size: 1% 10%;

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
    <MouseBase>
      <MouseButtonBorder>
        <MouseButton />
      </MouseButtonBorder>
      <MouseTop />
      <RightMouseButton />
      <LeftMouseButton />
    </MouseBase>
  );
};

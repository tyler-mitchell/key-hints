import styled from 'styled-components';
import React from 'react';
import { Box } from '@rebass/grid';
import { shade, linearGradient } from 'polished';
import Layer from '@material-ui/core/Box';
//import styled from '@xstyled/styled-components';

const Column = props => <Box {...props} />;
export const KeyWrapper = styled(Layer)`
  flex-wrap: wrap;
  position: relative;
  background-color: red;
  color: red;
  height: 40px;
  width: 40px;

  &:hover  {

                z-index: 90;

                background-image: ${linearGradient({
    colorStops: [`${shade(0.2, 'blue')} 0%`, '#FFFFFF 50%'],
    toDirection: '-30deg',
    fallback: '#FFF'
  })};
                font-size:20px;
                text-align:center;
                transform-style: all;
                transition-duration: 1s;
            }
`;




export const Key = styled(Column)`
  width: ${props => props.wt}px;
  height: ${props => props.ht}px;
  cursor: pointer;



  border-width: 10px 10px 20px 10px;

  transition: .5s;
  transition: background-color 2s, color 300ms;




  &:active {
    transition: transform 300ms cubic-bezier(0.075, 0.82, 0.165, 1);
    transform: translateY(2px) scaleX(0.98);
    transform-origin: -100, 200;
  }
  &:last-child {
    border-width: 10px 12px 20px 10px;
  }
  &:first-child {
    margin-bottom: 3px;
    border-width: 10px 10px 20px 10px;
  }
  border-style: solid;
  height: ${props => props.height};
  border-top-color: ${shade(0.02, '#f9f9f9')};
  border-bottom-color: ${shade(0.3, '#f9f9f9')};
  border-left-color: ${shade(0.09, '#f9f9f9')};
  border-right-color: ${shade(0.09, '#f9f9f9')};
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: .4s filter ease;
  position: relative;
  z-index: -1;



  &:hover{

    border-color: transparent;
    background: inherit;

    background-clip: border-box;
    border-top-color: ${shade(0.02, '#f9f9f9')};
  border-bottom-color: ${shade(0.3, '#f9f9f9')};

  border-left-color: ${shade(0.09, '#f9f9f9')};
  border-right-color: ${shade(0.09, '#f9f9f9')};
    filter: invert(8%) contrast(145%);



  }

  /* ${linearGradient({
    colorStops: [`${shade(0.2, '#f9f9f9')} 0%`, '#FFFFFF 100%'],
    toDirection: '-45deg',
    fallback: '#FFF'
  })}; */




`;



Key.defaultProps = {};

export const KeyCap = styled.div`



  background-image: linear-gradient(
    0 0,
    rgba(255, 255, 255, 0.2) 0%,
    rgba(255, 255, 255, 0.2) 37%,
    rgba(255, 255, 255, 0.8) 45%,
    rgba(255, 255, 255, 0) 50%
  );
  border-radius: 1px;
  transition: all 0.3s;

`;

export const KeyChar = styled('Layer')`
  font-size: 15px;
  font-family: Roboto;
  font-weight: bold;
  color: rgba(0, 0, 0, 0.45);
  user-select: none;





`;

export const Span = styled('div')`
  top: 0;
  padding-top: 5px;

  border-radius: 10px 10px 10px 10px;
  height: ${props => props.ht * 0.7}px;
  width: ${props => props.wt - 18}px ;

  /* box-shadow: 0px 10px 10px 5px ${shade(0.8, '#f9f9f9')}; */





  background-image: ${linearGradient({
    colorStops: [`${shade(0.08, '#f9f9f9')} 0%`, '#FFFFFF 50%'],
    toDirection: '-30deg',
    fallback: '#FFF'
  })};




`;




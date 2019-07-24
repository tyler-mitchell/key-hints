import styled, { css } from 'styled-components';
import { zIndex, position, top, right, bottom, left } from 'styled-system';
import { Flex } from '@rebass/grid';
import { makeStyles } from '@material-ui/styles';
import { tint, shade, linearGradient, lighten } from 'polished';
import Container from '@material-ui/core/Container';
import { Grid} from '@material-ui/core/';
import Box from '@material-ui/core/Box';
import React from 'react';
import { useSpring, animated, Keyframes } from 'react-spring';


export const Row = styled(Grid)`
  
  ${zIndex};
  ${position};  


`;

Row.defaultProps = {};


export const InnerFrame = styled(Grid)`
  /* position: sticky; */
  /* display: inline-block; */

  /* flex-grow: 1, */
  /* max-width: '1000px'; */
  /* box-sizing: border-box; */
  width: 'inherit';
  height: 'inherit';
  position: relative;
  /* animation: fader 6s infinite; */
  color: black;
  background: ${shade(0.7, '#f9f9f9')};
  padding-bottom: 4px;
  padding-top: 3px;
  padding-right: 3px;
  padding-left: 3px;
  


  
`;

export const Cover = styled.div`
  
  display: flex;
  align-items: center;
  justify-content: center;
  background: radial-gradient(ellipse at center, rgba(0, 0, 0, 0.6) 0, rgba(39, 37, 37, 0.74) 60%);
  
  padding: 2px;
  margin: 10px;
  background: #fdfdfd;
  -webkit-box-shadow: inset 0 0 11px 0 black;
  box-shadow: inset 0 0 11px 0 black;
  border-radius: 10px;
  
`;
export const useKeyboardStyle = makeStyles({
  root: {
    background: '#f9f9f9',

    boxShadow: `0 2px  2px 2px  rgba(0, 0, 0, .1),
    0 1px  6px  rgba(0, 0, 0, .05),
    0 8px  8px  rgba(0, 0, 0, .1),
    0 16px 16px rgba(0, 0, 0, .1),
    8px 10px 10px rgba(0, 0, 0, .15),
    8px 10px 10px rgba(0, 0, 0, .15)`,
    padding: '10px',
    borderRadius: '20px',
    borderStyle: 'solid',
    borderTopColor: `${shade(0.02, '#f9f9f9')}`,
    borderBottomColor: `${shade(0.33, '#f9f9f9')}`,
    borderLeftColor: `${shade(0.09, '#f9f9f9')}`,
    borderRightColor: `${shade(0.2, '#f9f9f9')}`,

    boxSizing: 'border-box'
  },

  frame: {

    display: 'inline-block',
    borderSizing: 'border-box',
    color: 'black',
    // background: `${shade(0.7, '#f9f9f9')}`,

    padding: '4px',
    borderRadius: '10px',
    boxShadow: '0 0 0 4px hsl(0, 0%, 60%), 0 0 0 5px hsl(0, 0%, 90%), 0 0 0 3px hsl(0, 0%, 80%);'
  },
  key: {
    position: 'absolute',
    top: '0',
    bottom: '0',
    left: '0',
    right: '0',
    opacity: '0',
    transition: '.5s ease',
    backgroundColor: 'rgba(259, 67, 95, 0.7)',
    overflow: 'hidden',
    boxSizing: 'border-box'
  }
});

const AnimatedFrame = animated(InnerFrame);

const AContainer = styled(animated.div)`
   width: 100%;

/* box-sizing: border-box; */

color: black;
/* background: ${shade(0.7, '#f9f9f9')}; */
padding: 4px;
border-radius: 10px;
box-shadow: 0 0 0 4px hsl(0, 0%, 60%), 0 0 0 5px hsl(0, 0%, 90%), 0 0 0 3px hsl(0, 0%, 80%);





`;

export default { Row, useKeyboardStyle };

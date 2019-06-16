import styled, { css } from 'styled-components';
import { zIndex, position, top, right, bottom, left } from 'styled-system';
import { Flex } from '@rebass/grid';
import { makeStyles } from '@material-ui/styles';
import { tint, shade, linearGradient, lighten } from 'polished';
import Container from '@material-ui/core/Container';
import { Grid } from '@material-ui/core/';
import Box from '@material-ui/core/Box';
import React from 'react';
import { useSpring, animated, Keyframes } from 'react-spring';

// const fader = css`
//   @keyframes fader {
//   0% { background: #76FFA3; }
//   20% { background: #82D8FF; }
//   40% { background: #AA7AFF; }
//   60% { background: #FF817F; }
//   80% { background: #F5C38C; }
//   100% { background: #F5EE90; }
// }

// `;

export const Row = styled(Grid)`
  /* margin: -4px; */

  /* box-sizing: border-box; */
  ${zIndex};
  ${position};
`;

Row.defaultProps = {};
export const InnerFrame = styled(Grid)`
  /* position: sticky; */
  /* display: inline-block; */

  /* flex-grow: 1, */

  box-sizing: border-box;

  /* animation: fader 6s infinite; */
  color: black;
  background: ${shade(0.7, '#f9f9f9')};
  padding-bottom: 3px;
  padding-top: 2px;
  padding-right: 2px;
  padding-left: 2px;
  border-radius: 10px;
  box-shadow: 0 0 0 4px hsl(0, 0%, 60%), 0 0 0 5px hsl(0, 0%, 90%), 0 0 0 3px hsl(0, 0%, 80%);
`;

export const Cover = styled.div`

  background: '#f9f9f9';
  /* display: inline-block; */
  box-shadow:
    2px 2px 2px 2px rgba(0, 0, 0, 0.1),
    0 8px 6px rgba(0, 0, 0, 0.1),
    0 8px 6px rgba(0, 0, 0, 0.1),
    0 16px 16px rgba(0, 0, 0, 0.1),
    8px 10px 10px rgba(0, 0, 0, 0.1),
    8px 10px 10px rgba(0, 0, 0, 0.1);
  /* box-shadow: 0 2px 2px 2px rgba(0, 0, 0, 0.1), 0 1px 6px rgba(0, 0, 0, 0.05),
    0 8px 8px rgba(0, 0, 0, 0.1), 0 16px 16px rgba(0, 0, 0, 0.1), 8px 10px 10px rgba(0, 0, 0, 0.15),
    8px 10px 10px rgba(0, 0, 0, 0.15); */
  padding: 8px;
  border-radius: 20px;
  border-style: solid;
  border-top-color: ${shade(0.02, '#f9f9f9')};
  border-bottom-color: ${shade(0.33, '#f9f9f9')};
  border-left-color: ${shade(0.09, '#f9f9f9')};
  border-right-color: ${shade(0.2, '#f9f9f9')};
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

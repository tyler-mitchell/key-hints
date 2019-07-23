import React, { useState } from 'react';

import { Box, Flex } from '@rebass/grid';
import Space from '@rebass/space';
import Layer from '@material-ui/core/Box';
import {
  Key
} from '../Key/Key';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Collapse, FormControlLabel, Switch, checked, Button, Grid } from '@material-ui/core';
import Icon from '@material-ui/core/Icon';
import SaveIcon from '@material-ui/icons/Save';
import RefreshIcon from '@material-ui/icons/Refresh';
import styled from 'styled-components';
import { BackgroundRGB } from './Keyboard.styles';
import { FlashingProvider } from '../Key/FlashingContext';

import {
  firstRow,
  secondRow,
  thirdRow,
  fourthRow,
  fifthRow,
  keySize,
  mw,
  excludedKeys
} from './Layout';

import { Row, useKeyboardStyle, InnerFrame, Cover } from './Keyboard.styles';
// import styled from '@xstyled/styled-components'

import { tint, shade, linearGradient, lighten, timingFunctions } from 'polished';
import Container from '@material-ui/core/Container';
import { EditRounded } from '@material-ui/icons';
import { useSpring, animated, useTransition } from 'react-spring';
import { motion } from 'framer-motion';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core';



const Highlight = styled(Layer)`
  flex-wrap: wrap;

  border-radius: inherit;
  top: 1px;
  padding: 0;
  margin: 0;
  position: absolute;
  height: 100%;
  width: inherit;
`;

Highlight.defaultProps = {};


const GridItem = motion.custom(Grid);

const calculateMargin = (i, len) => {

  
  if (i === 0) { // first
    
    return `0 1.5px 0 0`
    
  } else if (i === len - 1) { // last
    return  `0 0 0 1.5px`
  } else {
    return `0 1.5px 0 1.5px`
  }
}
const renderRow = row => {
  const len = Object.keys(row).length
  const variants = {
    tapStart: {
      scale: 0.98,
      y: '2px',
    },
    init: {
      // scale: 1,
      // y: '0px',
    }
  }

  const tapped = (tap=false) => {
    const o = {

      animate: "tapStart",
      transition: { yoyo: Infinity, repeatDelay: 1 }
    };

    const i = {

      animate: "init",
     
    };

    
    if (tap) {
      return o
    } else {
      return i
    }
  }
  return Object.keys(row).map((keyName, i) => (
    
    <ThemeProvider theme={theme}>
      <GridItem
        item
        
     
        
        whileTap={{
          scale: 0.98,
          y: '2px',
          
          transition: {
            type: "inertia",
            velocity: -20 ,
            min: .98,
            max: 1,
            damping: 300,
            stiffness: 100,

          }
          
        }}
        animate="tapStart"
       
          
          

        
       
      >
          
          <Key
            item
            label={row[keyName][0]}
            key={i}
            margin={calculateMargin(i, len)}
            uniqueKeyName={keyName in excludedKeys ? null : row[keyName][0]}
            keyName={keyName}
            wt={`${row[keyName][1]}`}
            ht={`${keySize}`}
            keySize={keySize}
          />
      </GridItem>
    </ThemeProvider>
      
     
   
  ));
};


const theme = createMuiTheme({
  overrides: {
    MuiGrid: {
      
      container: {
          margin: 0
        },
        item: {
          margin: '0 1.5px',

      },
    },
  },
});

const KeyboardContainer = () => {
  // React.useEffect(() => {
  //   editMode ? setChecked(true) : setChecked(false)

  // },[editMode]);
  
  return (
    
      // <Cover>

        <FlashingProvider>
        <InnerFrame container justify="center" >
        <ThemeProvider theme={theme}>
            <Row
              justify="center"
            container
            direction="row"
            wrap="nowrap"
            item={true}
            // justify="space-evenly"
            // alignItems="stretch"
            xs={12}
            zIndex={1}
          >
            {renderRow(firstRow)}
          </Row>
            <Row
              justify="center"
            container
            direction="row"
            wrap="nowrap"
            item={true}
            // justify="space-evenly"
            // alignItems="stretch"
            xs={12}
            zIndex={2}
          >
            {renderRow(secondRow)}
          </Row>
            <Row
              justify="center"
            container
            direction="row"
            wrap="nowrap"
              item={true}
              
            // justify="space-evenly"
            alignItems="stretch"
            xs={12}
            zIndex={3}
          >
            {renderRow(thirdRow)}
          </Row>
            <Row
              justify="center"
            container
            direction="row"
            wrap="nowrap"
            item={true}
            // justify="space-evenly"
            // alignItems="stretch"
            xs={12}
            zIndex={4}
          >
            {renderRow(fourthRow)}
          </Row>
            <Row
              justify="center"
            container
            direction="row"
            wrap="nowrap"
            item={true}
            // justify="space-evenly"
            // alignItems="stretch"
            xs={12}
            zIndex={5}
          >
            {renderRow(fifthRow)}
          </Row>
        </ThemeProvider>
          </InnerFrame>
        </FlashingProvider>
      // </Cover>
  );
};

export default KeyboardContainer;

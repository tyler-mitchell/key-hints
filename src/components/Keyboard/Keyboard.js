import React, { useState } from 'react';
import './keyboard.css'
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
  
  const getMarginTheme = (index) => {
    if (index === 0) {
      return themeStart;
    } else if (index === len - 1) {
      return themeEnd;
    } else {
      return theme;
    }
  }
  
  return Object.keys(row).map((keyName, i) => (
    
    <ThemeProvider theme={getMarginTheme(i)}>
      <GridItem
        item
        
     
        
        whileTap={{
          scale: 0.98,
          y: '2px',
          
          transition: {
            type: "spring",
            damping: 100,
            stiffness: 400,
          }
          
        }}

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
const themeStart = createMuiTheme({
  overrides: {
    MuiGrid: {
      
      container: {
          margin: 0
        },
        item: {
          marginRight: '1.5px'
      },
    },
  },
});
const themeEnd = createMuiTheme({
  overrides: {
    MuiGrid: {
      
      container: {
          margin: 0
        },
        item: {
          marginLeft: '1.5px',
      },
    },
  },
});

const rowTheme = createMuiTheme({
  overrides: {
    MuiGrid: {
      
      container: {
          margin: 0
        },
        item: {
          margin: 0
      },
    },
  },
});


const KeyboardContainer = () => {
  // React.useEffect(() => {
  //   editMode ? setChecked(true) : setChecked(false)

  // },[editMode]);
  
  return (
    
      <Grid container direction="row" xs={12} alignItems="center" justify="flex-end">
        <Cover fixed className="marvel-device iphone-x" >
          <div className="inner-shadow" style={{ opacity: 0.5 }} />
          <FlashingProvider>
          <div className="screen">
            <InnerFrame container justify="center" alignItems="center" direction="column"  spacing={0}>
            {/* <ThemeProvider theme={rowTheme}> */}
                <Row
                justify="center"
                container
                direction="row"
                wrap="nowrap"
                  item
                  xs={11}
              
                zIndex={1}
              >
                {renderRow(firstRow)}
              </Row>
                <Row
                  justify="center"
                container
                direction="row"
                wrap="nowrap"
                item
                // justify="space-evenly"
                // alignItems="stretch"
                xs={11}
                zIndex={2}
              >
                {renderRow(secondRow)}
              </Row>
                <Row
                  justify="center"
                container
                direction="row"
                wrap="nowrap"
                  item
                  xs={11}
                // justify="space-evenly"
                
          
                zIndex={3}
              >
                {renderRow(thirdRow)}
              </Row>
                <Row
                  justify="center"
                container
                direction="row"
                wrap="nowrap"
                item
                // justify="space-evenly"
                // alignItems="stretch"
                xs={11}
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
                xs={11}
                zIndex={5}
              >
                {renderRow(fifthRow)}
              </Row>
            {/* </ThemeProvider> */}
              </InnerFrame>
          </div>
          </FlashingProvider>
         </Cover>
        <Cover fixed style={{width: '250px'}} className="marvel-device iphone-x" >
          <div className="inner-shadow" style={{ opacity: 0.5 }} />
          <FlashingProvider>
          <div className="screen">
            <InnerFrame container justify="center" alignItems="center"  spacing={0}>
            {/* <ThemeProvider theme={rowTheme}> */}
             
                
                {renderRow(firstRow)}
           
            {/* </ThemeProvider> */}
              </InnerFrame>
          </div>
          </FlashingProvider>
         </Cover>
      </Grid>
  );
};

export default KeyboardContainer;

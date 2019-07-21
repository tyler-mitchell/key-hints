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
import { ThemeProvider } from 'styled-components';
import { tint, shade, linearGradient, lighten } from 'polished';
import Container from '@material-ui/core/Container';
import { EditRounded } from '@material-ui/icons';
import { useSpring, animated, useTransition } from 'react-spring';



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
  return Object.keys(row).map((keyName, i) => (
    
     
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
     
   
  ));
};

const KeyboardContainer = () => {
  // React.useEffect(() => {
  //   editMode ? setChecked(true) : setChecked(false)

  // },[editMode]);
  
  return (
    <React.Fragment>
      <Cover>

        <FlashingProvider>
        <InnerFrame container alignItems="center" justify="center" direction="column"  >
          <Row
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
          </InnerFrame>
        </FlashingProvider>
      </Cover>
    </React.Fragment>
  );
};

export default KeyboardContainer;

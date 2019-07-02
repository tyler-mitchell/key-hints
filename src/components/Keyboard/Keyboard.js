import React, { useState } from 'react';

import { Box, Flex } from '@rebass/grid';
import Space from '@rebass/space';
import Layer from '@material-ui/core/Box';
import {
  KeyContainer,
  ActiveKeyContainer,
  KeyChar,
  Span,
  KeyWrapper,
  Key
} from '../Key/Key.styles';
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

const theme = {
  colors: {
    primary: 'palevioletred',
    primaryLight: 'pink',
    secondary: 'gray',
    white: 'red'
  },
  radii: {
    medium: 3
  },
  fonts: {},
  button: {
    margin: '90px'
  },
  input: {
    display: 'none'
  }
};

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

const EditPanel = styled(Paper)`
  padding: 15px 15px 15px 15px;
  display: inline-block;
  radius: 30px;
  border-radius: 20px;
  /* position: 'relative';
  z-index: -20; */
`;

const KeyItem = styled(Grid)``;

const renderRow = row => {
  return Object.keys(row).map((keyName, i) => (
    <KeyItem item>
     
        <Key
          item
          label={row[keyName][0]}
          key={i}
          uniqueKeyName={keyName in excludedKeys ? null : row[keyName][0]}
          keyName={keyName}
          wt={`${row[keyName][1]}`}
          ht={`${keySize}`}
          keySize={keySize}
        />
     
    </KeyItem>
  ));
};

const KeyboardContainer = () => {
  // React.useEffect(() => {
  //   editMode ? setChecked(true) : setChecked(false)

  // },[editMode]);

  return (
    <React.Fragment>
      <Cover>

        <InnerFrame container alignItems="space-around" direction="column" justify="space-between">
        <FlashingProvider>
          <Row
            container
            direction="row"
            wrap="nowrap"
            item={true}
            justify="space-evenly"
            alignItems="stretch"
            xs={12}
            zIndex={1}
          >
            {renderRow(firstRow)}{' '}
          </Row>
          <Row
            container
            direction="row"
            wrap="nowrap"
            item={true}
            justify="space-evenly"
            alignItems="stretch"
            xs={12}
            zIndex={2}
          >
            {renderRow(secondRow)}{' '}
          </Row>
          <Row
            container
            direction="row"
            wrap="nowrap"
            item={true}
            justify="space-evenly"
            alignItems="stretch"
            xs={12}
            zIndex={3}
          >
            {renderRow(thirdRow)}{' '}
          </Row>
          <Row
            container
            direction="row"
            wrap="nowrap"
            item={true}
            justify="space-evenly"
            alignItems="stretch"
            xs={12}
            zIndex={4}
          >
            {renderRow(fourthRow)}{' '}
          </Row>
          <Row
            container
            direction="row"
            wrap="nowrap"
            item={true}
            justify="space-evenly"
            alignItems="stretch"
            xs={12}
            zIndex={5}
          >
            {renderRow(fifthRow)}{' '}
          </Row>
        </FlashingProvider>
          </InnerFrame>
      </Cover>
    </React.Fragment>
  );
};

export default KeyboardContainer;

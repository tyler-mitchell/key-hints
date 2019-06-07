import React, { useState } from 'react';

import { Box, Flex } from '@rebass/grid';
import Space from '@rebass/space';
import Layer from '@material-ui/core/Box';
import { KeyContainer, KeyCap, KeyChar, Span, KeyWrapper, Key } from '../Key/Key.styles';
import styled from 'styled-components';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { firstRow, secondRow, thirdRow, fourthRow, fifthRow, keySize, mw } from './Layout';
import {BufferContext} from '../KeyBuffer/BufferContext'
import { Row, useKeyboardStyle, InnerFrame, Cover} from './Keyboard.styles';
// import styled from '@xstyled/styled-components'
import { ThemeProvider } from 'styled-components';
import { tint, shade, linearGradient, lighten } from 'polished';
import Container from '@material-ui/core/Container';

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
  fonts: {}
};
const Button = styled.a`
  /* This renders the buttons above... Edit me! */
  border: 2px; /* ⟶ 2px solid */
  color: ${theme.colors.white}; /* ⟶ theme.colors.white */
  border-color: primary; /* ⟶ theme.colors.primary */
  border-radius: 10px; /* ⟶ theme.radii.medium */
  padding: 2px 90px; /* ⟶ theme.space.* */
  margin: 5px 2px; /* ⟶ theme.space.* */
  background-color: ${shade(0.5, `${theme.colors.primary}`)}; /* ⟶ theme.colors.primary */
  display: inline-block;
  transition: background-color 2s, color 300ms;

  &:hover:after {
    content: ' ';
    color: white;
    background-color: red;
  }
`;

const keyPress = () => {};

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

const KeyboardContainer = () => {
  const keyboardStyles = useKeyboardStyle();



  const renderRow = row => {
    return Object.keys(row).map((keyName, i) => (
      <Key

        label={row[keyName][0]}
        key={keyName}
        wt={`${row[keyName][1]}`}
        ht={`${keySize}`}
        m={'1px'}
        keySize={keySize}
      />
    ));
  };

  return (
      <React.Fragment>
         {/* <ThemeProvider theme={theme}> */}

          {/* <Flex  className={keyboardStyles.app} >

            <Flex className={keyboardStyles.root}> */}

              {/* <Frame className={keyboardStyles.frame} width={`${mw}`} > */}
              <Cover>
                <InnerFrame>
                  <Row zIndex={1}>{renderRow(firstRow)}</Row>
                  <Row zIndex={2}>{renderRow(secondRow)}</Row>
                  <Row zIndex={3}>{renderRow(thirdRow)}</Row>
                  <Row zIndex={4}>{renderRow(fourthRow)}</Row>
                  <Row zIndex={5}>{renderRow(fifthRow)}</Row>
                </InnerFrame>
              </Cover>

            {/* </Flex>
          </Flex> */}

        {/* </ThemeProvider> */}
      </React.Fragment>
  );
};

export default KeyboardContainer;

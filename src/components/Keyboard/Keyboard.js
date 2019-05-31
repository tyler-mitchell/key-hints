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

import { Row, useKeyboardStyle } from './Keyboard.styles';
// import styled from '@xstyled/styled-components'
import { ThemeProvider } from 'styled-components';
import { tint, shade, linearGradient, lighten } from 'polished';

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
  const [cmds, setCmds] = useState({});
  const Context = React.createContext();

  const activeColor = '#b0f4e6';
  const [keyColor, changeColor] = useState('#f9f9f9');
  const keyClick = () => {
    changeColor('#b0f4e6');
  };
  const renderRow = row => {
    return Object.keys(row).map((keyName, i) => (
      <Key
        onClick={() => keyClick()}
        label={row[keyName][0]}
        key={row[keyName]}
        wt={`${row[keyName][1]}`}
        ht={`${keySize}`}
        m={'1px'}
        color={keyColor}
        keySize={keySize}
      />
    ));
  };

  return (
    <ThemeProvider theme={theme}>
      <Flex className={keyboardStyles.app} justifyContent={'center'}>
        <Button>Hello World</Button>
        <Box className={keyboardStyles.root}>
          <Box className={keyboardStyles.frame} width={`${mw}`} alignItems="stretch">
            <Row zIndex={1}>{renderRow(firstRow)}</Row>
            <Row zIndex={2}>{renderRow(secondRow)}</Row>
            <Row zIndex={3}>{renderRow(thirdRow)}</Row>
            <Row zIndex={4}>{renderRow(fourthRow)}</Row>
            <Row zIndex={5}>{renderRow(fifthRow)}</Row>
          </Box>
        </Box>
      </Flex>
    </ThemeProvider>
  );
};

export default KeyboardContainer;

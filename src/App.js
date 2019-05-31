import React from 'react';
import logo from './logo.svg';
import './App.css';
import Keyboard from './components/Keyboard';
import { ThemeProvider } from '@xstyled/styled-components';
import { unstable_Box } from '@material-ui/core/Box'



import { useStyles } from './components/design-system/styles';
import theme from './components/design-system/theme/index';
import Box from '@material-ui/core/Box';

function App() {
  const style = useStyles();

  return (

      <ThemeProvider theme={theme}>
        <div >
        <Box padding='300px' c>
          <header >



             <Box  zIndex={-1} position="absolute" top="125px" left="75px" >  <img src={logo} className="App-logo" alt="logo" /></Box>



            <Keyboard />

            </header>
          </Box>
        </div>
      </ThemeProvider>

  );
}

export default App;

// React
import React from 'react';
import './App.css';

import { ThemeProvider } from '@material-ui/styles';
import { useStyles } from './components/design-system/styles';
import { KeySheet } from './components/KeySheet/KeySheet';
// Local
import Keyboard from './components/Keyboard';
// import theme from './components/design-system/theme/index';
import logo from './logo.svg';

// utility for constructing className strings conditionally.
import clsx from 'clsx';

// Material UI
import Box from '@material-ui/core/Box';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import theme from './components/design-system/theme'
import { createMuiTheme } from '@material-ui/core/styles';

import KeyBuffer from './components/KeyBuffer';

import { BufferProvider } from './components/KeyBuffer/BufferContext';
const muiTheme = createMuiTheme({
  palette: {
    common: { "black": "#000", "white": "#fff" },
    primary: {
      // main: '#4be8bc'
      // main: '#00D1B2'
      main: '#209CEE'
    },
    secondary: {
      light: '#ff7961',
      main: '#209CEE',
      dark: '#ba000d',
      contrastText: '#000'
    },
    action: {
      selected: '#4be8bc',
      hover: '#FFD371',
      disabled: '#9B9B9B'
    },
    info: {

    }
  },
  status: {
    // My business variables
    danger: '#1fe3ac',
    success: '#23D160',
    warning: '#FFDD57',

  }
});
function App(props) {
  const style = useStyles();
  const [open, setOpen] = React.useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  return (
    <ThemeProvider theme={theme}>
      <div className={style.root}>
        <CssBaseline />
        {/* App Bar */}
        <AppBar
          color="primary"
          position="absolute"
          className={clsx(style.appBar, open && style.appBarShift)}
        >
          <Toolbar className={style.toolbar}>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="Open drawer"
              onClick={handleDrawerOpen}
              className={clsx(style.menuButton, open && style.menuButtonHidden)}
            />
            <Typography component="h1" variant="h6" color="inherit" noWrap className={style.title}>
              Key Hints
            </Typography>
            <IconButton color="inherit">
              <Badge badgeContent={4} color="secondary" />
            </IconButton>
          </Toolbar>
        </AppBar>
        {/* Side Drawer */}
        <Drawer
          classes={{
            paper: clsx(style.drawerPaper, !open && style.drawerPaperClose)
          }}
        >
          <div className={style.toolbarIcon}>
            <IconButton onClick={handleDrawerClose}>{}</IconButton>
          </div>
          <Divider />
          <List>{}</List>
          <Divider />
          <List>{}</List>
        </Drawer>
        {/* ⭐ MAIN APP */}
        <main className={style.content}>
          <div className={style.appBarSpacer} />
          <Container maxWidth="lg" className={style.container}>
            <Grid container direction="column" justify="center" spacing={2} alignItems="center">
              <BufferProvider>
                <Grid item xs={12}>
                  {/* Keyboard */}

                  <Keyboard className={style.keyboardContainer} />
                </Grid>
                <Grid item xs={12}>
                  {/* Buffer */}
                  {/* <KeyBuffer items={'Ctrl Shift S'.split(' ')} /> */}
                </Grid>
                <Grid container direction="row" xs={12} spacing={3} justify-content="center">
                  <Grid item xs={6}>
                    <KeySheet category="All Keys" />
                  </Grid>
                  <Grid item xs={6}>
                    <KeySheet category="Basic Editing" />
                  </Grid>
                </Grid>
              </BufferProvider>
            </Grid>
          </Container>
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;

// React
import React from 'react';
import './App.css';
import * as firebase from 'firebase';

import { ThemeProvider } from '@material-ui/styles';
import { useStyles } from './components/design-system/styles';
import { KeySheet } from './components/KeySheet/KeySheet';
import useLockBodyScroll from './components/KeySheet/useLockScroll'
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
import Button from '@material-ui/core/Button';
import SignInDialog from './components/SignIn/SignInDialog'


import KeyBuffer from './components/KeyBuffer';

import { BufferProvider } from './components/KeyBuffer/BufferContext';

function Dashboard() {

  useLockBodyScroll();
  const style = useStyles();
  const [open, setOpen] = React.useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };




  return (


    <div className={style.root}>

      {/* Side Drawer */}
      <Drawer open={open}
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
          <Grid container direction="column" justify="space-around" spacing={2} alignItems="center">
            <BufferProvider>
              <Grid item xs={12}>
                {/* Keyboard */}

                <Keyboard  />
              </Grid>
              <Grid item xs={12}>

                {/* Buffer */}
                {/* <KeyBuffer  /> */}
              </Grid>
              <Grid container direction="row" xs={12} spacing={3} justify-content="center">
                <Grid item xs={12}>
                  <KeySheet category="All Keys" />
                </Grid>

              </Grid>
            </BufferProvider>
          </Grid>
        </Container>
      </main>
    </div>


  );
}

export default Dashboard;

// React
import React from 'react';
import './App.css';

import { ThemeProvider } from '@xstyled/styled-components';
import { useStyles } from './components/design-system/styles';


// Local
import Keyboard from './components/Keyboard';
import theme from './components/design-system/theme/index';
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
import KeyBuffer from './components/KeyBuffer';

function App() {
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
      <CssBaseline />
      {/* App Bar */}
      <AppBar position="absolute" className={clsx(style.appBar, open && style.appBarShift)}>
        <Toolbar className={style.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="Open drawer"
            onClick={handleDrawerOpen}
            className={clsx(style.menuButton, open && style.menuButtonHidden)}
          />
          <Typography component="h1" variant="h6" color="inherit" noWrap className={style.title}>
            Dashboard
          </Typography>
          <IconButton color="inherit">
            <Badge badgeContent={4} color="secondary" />
          </IconButton>
        </Toolbar>
      </AppBar>
      {/* Side Drawer */}
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(style.drawerPaper, !open && style.drawerPaperClose)
        }}
        open={open}
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
        <Container maxWidth="lg" className={style.container}  >
          {/* SVG - Animated */}
          <Box zIndex={-1} position="absolute" top="125px" left="75px">
            <img src={logo} className="App-logo" alt="logo" />
          </Box>

          <Grid container direction={'row'} justify="center" spacing={3}>
              {/* Buffer */}


            <Grid item xs={12}>
              <KeyBuffer items={'Lorem ipsum dolor sit'.split(' ')} />
            </Grid>
            <Grid item xs={12}>
              {/* Keyboard */}
              <Keyboard className={style.keyboardContainer} />
            </Grid>
          </Grid>
        </Container>
      </main>
    </div>
  );
}

export default App;

import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

// Views
import Dashboard from './Dashboard';
import Login from './components/SignIn/Login';
import Register from './components/SignIn/Register';
import {
  Typography,
  AppBar,
  IconButton,
  Toolbar,
  CssBaseline,
  Grid,
  Drawer,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@material-ui/core';
import SignInDialog from './components/SignIn/SignInDialog';
import clsx from 'clsx';
import styled from 'styled-components';

import { useStyles } from './components/design-system/styles';
// import { useRouteStyles } from './Routes.styles';
import {
  Menu as MenuIcon,
  ChevronRight as ChevronRightIcon,
  ChevronLeft as ChevronLeftIcon,
  Inbox as InboxIcon,
  Mail as MailIcon,
  Close as CloseIcon
} from '@material-ui/icons';
import { makeStyles, useTheme } from '@material-ui/core/styles';

const drawerWidth = 240;
const DrawerTab = styled(Drawer)``;
const useRouteStyles = makeStyles(theme => ({
  root: {
    display: 'flex'
  },
  appBar: {
    fontSize: '90px',
    height: '50px',
    zIndex: theme.zIndex.drawer + 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  appBarShift: {
    marginLeft: drawerWidth
  },
  menuButton: {
    marginRight: 36
  },
  hide: {
    display: 'none'
  },
  drawer: {
    // width: drawerWidth,
    height: '300px',
    top: '100px',

    flexShrink: 0,
    whiteSpace: 'nowrap'
  },
  paper: {
    height: '870px',
    marginBottom: '30px',
    width: drawerWidth,

    elevation: 9,
    borderRadius: '0px 12px 12px 0px',
    top: 75,

    whiteSpace: 'nowrap'
  },
  drawerTab: {
    height: '60px',
    width: '80px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',

    elevation: 9,
    borderRadius: '0px 35px 35px 0px',
    top: 75
  },
  // drawerOpen: {
  //   height: '300px',
  //   width: drawerWidth,
  //   transition: theme.transitions.create('width', {
  //     easing: theme.transitions.easing.sharp,
  //     duration: theme.transitions.duration.enteringScreen
  //   })
  // },
  // drawerClose: {
  //   transition: theme.transitions.create('width', {
  //     easing: theme.transitions.easing.sharp,
  //     duration: theme.transitions.duration.leavingScreen
  //   }),
  //   overflowX: 'hidden',
  //   width: theme.spacing(7) + 1,
  //   [theme.breakpoints.up('sm')]: {
  //     width: theme.spacing(9) + 1
  //   }
  // },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  }
}));

export default function Routes() {
  const style = useStyles();
  const routeClasses = useRouteStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  function handleDrawerOpen() {
    setOpen(!open);
  }

  function handleDrawerClose() {
    setOpen(false);
  }

  return (
    <>
      <CssBaseline />

      <AppBar
        color="primary"
        position="absolute"
        className={clsx(style.appBar, open && style.appBarShift)}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="Open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={routeClasses.menuButton}
          >
            
          </IconButton>
          <Typography component="h1" variant="h5" color="inherit" noWrap className={style.title}>
            Key Hints
          </Typography>
          <SignInDialog />
        </Toolbar>
      </AppBar>
      <Drawer
        classes={{ paper: routeClasses.paper }}
        variant="persistent"
        hideBackdrop={true}
        BackdropProps={{ invisible: true }}
        PaperProps={{ elevation: 1 }}
        // className={clsx(routeClasses.drawer, {
        //   [routeClasses.drawerOpen]: open,
        //   [routeClasses.drawerClose]: !open
        // })}
        // classes={{
        //   paper: clsx({
        //     [routeClasses.drawerOpen]: open,
        //     [routeClasses.drawerClose]: !open
        //   })
        // }}
        open={open}
      >
        <div className={routeClasses.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
          {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {['All mail', 'Trash', 'Spam'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>

      <Drawer
        variant="persistent"
        classes={{ paper: routeClasses.drawerTab }}
        PaperProps={{elevation: 3}}
        open={!open}
      >
        <div style={{ marginLeft: '20px' }}>
          <IconButton onClick={handleDrawerOpen}>
            <MenuIcon />
          </IconButton>
        </div>
      </Drawer>

      <Switch>
        <Redirect exact from="/" to="/dashboard" />
        <Route component={Dashboard} exact path="/dashboard" />
        {/* <Route component={Login} exact path="/login" /> */}
        {/* <Route component={Register} exact path="/register" /> */}
      </Switch>
    </>
  );
}

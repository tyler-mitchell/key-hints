import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

// Views
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
  ListItemText,
  Fab,
  ButtonIcon
} from "@material-ui/core";
import Dashboard from "./Dashboard";
import Login from "./components/SignIn/Login";
import Register from "./components/SignIn/Register";
import SignInDialog from "./components/SignIn/SignInDialog";
import clsx from "clsx";
import styled from "styled-components";
import useOutSideClick from "./components/utils/useOutsideClick";
import { FirebaseContext } from "./components/utils/firebase";
import { KeyTableContext } from "./context/KeyTableContext";

import { useStyles } from "./components/design-system/styles";
// import { useRouteStyles } from './Routes.styles';
import {
  Menu as MenuIcon,
  ChevronRight as ChevronRightIcon,
  ChevronLeft as ChevronLeftIcon,
  Inbox as InboxIcon,
  Mail as MailIcon,
  Close as CloseIcon,
  Add as AddIcon,
  Folder as FolderIcon
} from "@material-ui/icons";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { useGlobalState, clearKeySelection, setGlobalState } from "./state";

import { SheetDrawer } from "./components/Menu/SheetDrawer";

const drawerWidth = 240;
const DrawerTab = styled(Drawer)``;
const useRouteStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  appBar: {
    fontSize: "90px",
    height: "50px",
    zIndex: theme.zIndex.drawer + 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center"
  },
  appBarShift: {
    marginLeft: drawerWidth
  },
  menuButton: {
    marginRight: 36
  },
  hide: {
    display: "none"
  },
  drawer: {
    // width: drawerWidth,
    height: "300px",
    top: "100px",

    flexShrink: 0,
    whiteSpace: "nowrap"
  },
  paper: {
    height: "870px",
    marginBottom: "30px",
    width: drawerWidth,

    elevation: 9,
    borderRadius: "0px 12px 12px 0px",
    top: 73,

    whiteSpace: "nowrap"
  },
  drawerTab: {
    height: "60px",
    width: "80px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",

    elevation: 9,
    borderRadius: "0px 35px 35px 0px",
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
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
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

  const [open, setOpen] = React.useState(false);

  const { firebase, userAuthState } = React.useContext(FirebaseContext);

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
            edge="start"
            className={routeClasses.menuButton}
          />
          <Typography
            component="h1"
            variant="h5"
            color="inherit"
            noWrap
            className={style.title}
          >
            Key Hints
          </Typography>
          <SignInDialog />
        </Toolbar>
      </AppBar>
      <SheetDrawer />

      <Switch>
        <Redirect exact from="/" to="/dashboard" />

        <Route path="/dashboard" render={() => <Dashboard />} />
        {/* <Route component={Login} exact path="/login" /> */}
        {/* <Route component={Register} exact path="/register" /> */}
      </Switch>
    </>
  );
}

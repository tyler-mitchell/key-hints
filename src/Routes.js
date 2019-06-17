import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

// Views
import Dashboard from './Dashboard';
import Login from './components/SignIn/Login';
import Register from './components/SignIn/Register';
import { Typography, AppBar, IconButton, Toolbar, CssBaseline } from '@material-ui/core';
import SignInDialog from './components/SignIn/SignInDialog';
import clsx from 'clsx';
import { useStyles } from './components/design-system/styles';

export default function Routes() {
  const style = useStyles();
  const [open, setOpen] = React.useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <>
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
          <Typography component="h1" variant="h5" color="inherit" noWrap className={style.title}>
            Key Hints
          </Typography>
          <SignInDialog />
        </Toolbar>
      </AppBar>
      <Switch>
        <Redirect exact from="/" to="/dashboard" />
        <Route component={Dashboard} exact path="/dashboard" />
        <Route component={Login} exact path="/login" />
        <Route component={Register} exact path="/register" />
      </Switch>
    </>
  );
}

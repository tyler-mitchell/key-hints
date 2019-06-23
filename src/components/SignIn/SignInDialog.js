import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';

import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Login from './Login';
import Register from './Register';
import { useAuthState } from 'react-firebase-hooks/auth';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { FirebaseContext } from '../utils/firebase';
import useMenu from './useMenu';
import { usePopupState, bindToggle, bindPopper } from 'material-ui-popup-state/hooks';

import {
  Paper,
  Popper,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Fab,
  Avatar,
  Icon,
  IconButton,
  Divider,
  Fade
} from '@material-ui/core';

function TabContainer({ children, dir }) {
  return (
    <Typography component="div" dir={dir} style={{ padding: 2 }}>
      {children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
  dir: PropTypes.string.isRequired
};

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: 500
  },
  popper: {
    zIndex: theme.zIndex.appBar + 1
  },
  avatar: {
    width: 35,
    height: 35
  },
  papwer: {
    width: '300px'
  }
}));

export const FocusContext = React.createContext({});

export default function SignInDialog() {
  const [menuAnchor, menuItem, handleMenuClose, openMenu] = useMenu();

  const classes = useStyles();

  const [focused, setFocused] = React.useState('SignIn');
  const [value, setValue] = React.useState(0);

  const firebase = React.useContext(FirebaseContext);
  const [user] = useAuthState(firebase.auth());
  const popupState = usePopupState({ variant: 'popper', popupId: 'demoPopper' });
  const uiConfig = {
    // state: { user },
    signInFlow: 'popup',
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID
      // firebase.auth.GithubAuthProvider.PROVIDER_ID,
    ],
    callbacks: {
      signInSuccess: () => console.log('TCL: SignInDialog -> user', user)
    }
  };

  const logout = () => {
    firebase.auth().signOut();
  };
  return (
    <>
      <div {...bindToggle(popupState)}>
        {user ? (
          <Fab color="primary" size="small">
            <Avatar
              alt="profile picture"
              className={classes.avatar}
              src={firebase.auth().currentUser.photoURL}
            />
          </Fab>
        ) : (
          <Button variant="contained" color="primary">
            Sign In
          </Button>
        )}
      </div>
      <Popper className={classes.popper} {...bindPopper(popupState)}>

          <Fade in={popupState} timeout={250}>
            <Paper className={classes.paper} >
              {user ? (
                <>
                  <DialogTitle>Welcome {firebase.auth().currentUser.displayName}!</DialogTitle>
                  <DialogContent>
                    <DialogContentText>Let Google help apps determine location.</DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="secondary"
                      // component={Link}
                      // to="/register"
                      onClick={logout}
                      className={classes.submit}
                    >
                      Logout
                    </Button>
                  </DialogActions>
                </>
              ) : (
                <>
                  <DialogTitle>{'Welcome to Key'}</DialogTitle>
                  <DialogContent>
                    <Divider />
                    <DialogContentText>Let Google help apps determine location.</DialogContentText>
                    <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
                  </DialogContent>
                </>
              )}
            </Paper>
          </Fade>

      </Popper>

      {/* <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title"> */}

      {/* </Dialog> */}
    </>
  );
}
SignInDialog.propTypes = {
  classes: PropTypes.object.isRequired
};

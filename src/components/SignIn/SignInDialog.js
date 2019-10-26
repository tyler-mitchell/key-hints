import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";

import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Login from "./Login";
import Register from "./Register";
import { useAuthState } from "react-firebase-hooks/auth";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { FirebaseContext } from "../utils/firebase";
import useMenu from "./useMenu";
import {
  usePopupState,
  bindToggle,
  bindPopper
} from "material-ui-popup-state/hooks";

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
  Fade,
  MenuList,
  MenuItem,
  ListItemText,
  ListItemIcon,
  Tooltip
} from "@material-ui/core";

import { ExitToApp } from "@material-ui/icons";

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
    zIndex: theme.zIndex.appBar + 1,
    maxWidth: "300px"
  },
  avatar: {
    cursor: "pointer",
    width: 35,
    height: 35
  },
  papwer: {
    width: "300px"
  },
  signInStyle: {}
}));

export const FocusContext = React.createContext({});

export default function SignInDialog() {
  const classes = useStyles();
  const { firebase, userAuthState, logout } = React.useContext(FirebaseContext);
  const [user, loading, error] = userAuthState;
  const [width, setWidth] = React.useState("auto");

  React.useState(() => {
    if (user) {
      setWidth("auto");
    }
  }, [user]);
  function handleLogout() {
    popupState.close();
    setWidth("300px");
    logout();
  }
  const [onboarding, setOnboarding] = React.useState(false);
  function handleOnboardClose() {
    setOnboarding(false);
  }
  // const [user] = useAuthState(firebase.auth());
  const popupState = usePopupState({
    variant: "popper",
    popupId: "demoPopper"
  });
  const uiConfig = {
    // state: { user },
    signInFlow: "popup",
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID
      // firebase.auth.GithubAuthProvider.PROVIDER_ID,
    ],
    callbacks: {
      signInSuccess: () => {
        setOnboarding(true);

        popupState.close();
        setWidth("auto");
      }
    }
  };

  return (
    <>
      <div {...bindToggle(popupState)}>
        {user ? (
          <Tooltip title={firebase.auth().currentUser.email} placement="left">
            <Avatar
              alt="profile picture"
              className={classes.avatar}
              src={firebase.auth().currentUser.photoURL}
            />
          </Tooltip>
        ) : (
          <Button variant="contained" color="primary">
            Sign In
          </Button>
        )}
      </div>
      <Popper
        className={classes.popper}
        style={{ width }}
        {...bindPopper(popupState)}
        placement="bottom-end"
      >
        <Fade in={popupState} timeout={250}>
          {user ? (
            <Paper>
              <MenuList
                style={{
                  padding: 0,
                  margin: 0,
                  overflow: "hidden",
                  borderRadius: "5px"
                }}
              >
                <MenuItem
                  type="submit"
                  fullWidth
                  variant="outlined"
                  // color="secondary"
                  // component={Link}
                  // to="/register"
                  onClick={handleLogout}
                  className={classes.submit}
                >
                  <ExitToApp fontSize="small" style={{ marginRight: "10px" }} />
                  Logout
                </MenuItem>
              </MenuList>
            </Paper>
          ) : (
            <Paper className={classes.paper}>
              <DialogTitle>
                <Typography variant="h4" align="center">
                  Welcome
                  <span
                    style={{ marginLeft: "5px" }}
                    role="img"
                    aria-label="smile"
                  >
                    😄
                  </span>
                </Typography>
              </DialogTitle>

              <DialogContent>
                <Typography
                  variant="body1"
                  align="center"
                  color="textSecondary"
                >
                  To create your own Key Sheets, please sign in with one of the
                  following methods
                </Typography>
                <StyledFirebaseAuth
                  uiConfig={uiConfig}
                  firebaseAuth={firebase.auth()}
                />
              </DialogContent>
            </Paper>
          )}
        </Fade>
      </Popper>

      {onboarding && (
        <Dialog
          open={onboarding}
          onClose={handleOnboardClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle>WELCOME</DialogTitle>
        </Dialog>
      )}
    </>
  );
}
SignInDialog.propTypes = {
  classes: PropTypes.object.isRequired
};

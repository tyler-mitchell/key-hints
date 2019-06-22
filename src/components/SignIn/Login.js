import React, { useState } from 'react';
import {
  Typography,
  Paper,
  Avatar,
  Button,
  FormControl,
  Input,
  InputLabel,
  CircularProgress,
  Snackbar,
  SnackbarContent,
  InputAdornment,
  FormHelperText
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import withStyles from '@material-ui/core/styles/withStyles';
import { Link, withRouter } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { FirebaseContext } from '../utils/firebase';
import { FirebaseLogin } from '../utils/firebase';
import CloseIcon from '@material-ui/icons/Close';
// import firebase from '../firebase'
import FocusContext from './SignInDialog'

const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto'
    }
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit
  },
  submit: {
    marginTop: theme.spacing.unit * 3
  }
});



function SignIn( props ) {



  const { classes } = props;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const firebase = React.useContext(FirebaseContext);
  const { user } = useAuthState(firebase.auth());
  const [error, setErrors] = useState('');
  const logout = () => {
    firebase.auth().signOut();
  };

  const [open, setOpen] = React.useState(false);
  function handleClose(event, reason) {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);

    setTimeout(() => {
      setErrors('');
    }, 0);
	}



  return (
    <Paper className={classes.paper}>
      <Avatar className={classes.avatar}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign in
      </Typography>
      <form className={classes.form} onSubmit={e => e.preventDefault() && false}>
        <FormControl margin="normal" required fullWidth>
          <InputLabel htmlFor="email">Email Address</InputLabel>
          <Input
            id="email"
            name="email"
						autoComplete="off"

            autoFocus
            value={email}

            onChange={e => setEmail(e.target.value)}
          />

        </FormControl>
        <FormControl margin="normal" required fullWidth>
          <InputLabel htmlFor="password">Password</InputLabel>
          <Input
            name="password"
            type="password"
            id="password"
            autoComplete="off"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          {error && (
            <FormHelperText disabled={true} error id="component-error-text">
              {error}
            </FormHelperText>
          )}
        </FormControl>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          onClick={login}
          className={classes.submit}
        >
          Sign in
        </Button>
        {error ? (
          <>
            ERROR: {error} <CircularProgress size={24} className={classes.buttonProgress} />{' '}
          </>
        ) : (
          <div></div>
        )}
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
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left'
          }}
          open={true}
          autoHideDuration={6000}
          onClose={handleClose}
        >
          <SnackbarContent
            onClose={handleClose}
            variant="error"
            message="This is a success message!"
          />
        </Snackbar>
      </form>
    </Paper>
  );

  async function login() {
    firebase.auth().signInWithEmailAndPassword(email, password);
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      // props.history.replace('/dashboard');
    } catch (error) {
      const { message } = error;

      setErrors(message);
      console.log('⚡⚡⚡TCL: login -> message', message);
    }
  }
}

export default withStyles(styles)(SignIn);

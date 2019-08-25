import React from "react";
import styled from "styled-components";

import { makeStyles } from "@material-ui/core/styles";
import {
  Close as CloseIcon,
  CheckCircle as CheckIcon,
  Error as ErrorIcon,
  Warning as WarningIcon,
  Info as InfoIcon
} from "@material-ui/icons";
import { IconButton } from "@material-ui/core";
import { SnackbarContent, Button } from "@material-ui/core";
import { Snackbar } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  success: {
    backgroundColor: theme.palette.success.main
  },
  error: {
    backgroundColor: theme.palette.error.main
  },
  info: {
    backgroundColor: theme.palette.primary.info
  },
  warning: {
    backgroundColor: theme.palette.error.warning
  },

  icon: {
    fontSize: 20
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing(1)
  },
  test: {
    backgroundColor: "red"
  },
  message: {
    display: "flex",
    alignItems: "center"
  },
  margin: {
    margin: theme.spacing(1)
  },
  icon: {
    fontSize: 20,
    opacity: 0.9,
    marginRight: theme.spacing(1)
  }
}));
const variantIcon = {
  success: CheckIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon
};
const ToastContent = styled(SnackbarContent)``;

const Toast = props => {
  const {
    snackbarVariant,
    snackbarMessage,
    onSnackbarClose,
    snackbarOpen
  } = props;

  const SnackbarIcon = variantIcon[snackbarVariant];

  const classes = useStyles();
  return (
    <Snackbar
      // style={{ position: 'absolute', top: 0, left: 0 }}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right"
      }}
      open={snackbarOpen}
      autoHideDuration={2000}
      onClose={onSnackbarClose}
    >
      {/* <Button>sup</Button> */}
      <ToastContent
        className={classes[snackbarVariant]}
        aria-describedby="client-snackbar"
        message={
          <span id="client-snackbar" className={classes.message}>
            <SnackbarIcon className={classes.icon} />

            {snackbarMessage}
          </span>
        }
        action={[
          <IconButton
            key="close"
            aria-label="close"
            color="inherit"
            onClick={onSnackbarClose}
          >
            <CloseIcon />
          </IconButton>
        ]}
      />
    </Snackbar>
  );
};
export default Toast;

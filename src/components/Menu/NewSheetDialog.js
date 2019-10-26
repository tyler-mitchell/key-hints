import React from "react";
import PropTypes from "prop-types";

import Button from "@material-ui/core/Button";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  TextField,
  makeStyles,
  Typography
} from "@material-ui/core";
import { useGlobalState } from "../../state";

const useStyles = makeStyles(theme => ({
  dialogHeader: {
    backgroundImage: `radial-gradient( circle 800px at 48.9% -25.3%,  ${theme.palette.primary.main} 0%, rgba(247,246,246,1.01) 98.5% )`
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1)
  }
}));
export const NewSheetDialog = props => {
  const { handleClose, value: valueProp, open, ...other } = props;
  const [value, setValue] = React.useState(valueProp);
  const [sheetNames] = useGlobalState("sheetNames");
  const [duplicateError, setDuplicateError] = React.useState(false);
  let textInput = React.useRef(null);
  const classes = useStyles();
  React.useEffect(() => {
    if (!open) {
      setValue(valueProp);
    }
  }, [valueProp, open]);

  function handleEntering() {
    if (textInput.current != null) {
      textInput.current.focus();
    }
  }

  function handleCancel() {
    handleClose();
    setValue("");
  }

  function handleOk() {
    if (value in sheetNames) {
      setDuplicateError(true);
      setTimeout(() => {
        setDuplicateError(false);
      }, 3000);
    } else {
      handleClose(value);
      setValue("");
    }
  }

  function handleOnChange(event) {
    const sheetName = event.target.value;

    setValue(sheetName);
  }
  return (
    <Dialog
      PaperProps={{
        style: { borderRadius: "20px" }
      }}
      disableBackdropClick
      disableEscapeKeyDown
      maxWidth="xs"
      onEntering={handleEntering}
      aria-labelledby="confirmation-dialog-title"
      open={open}
      {...other}
    >
      <DialogTitle
        className={classes.dialogHeader}
        id="confirmation-dialog-title"
        disableTypography
      >
        <Typography style={{ color: "white" }} variant="h4">
          New Key Sheet
        </Typography>
      </DialogTitle>
      <DialogContent dividers>
        <TextField
          id="keysheet-name"
          className={classes.textField}
          error={duplicateError}
          autoFocus={true}
          inputRef={textInput}
          id="name"
          value={value}
          helperText={duplicateError ? "Already Exists" : ""}
          onChange={event => handleOnChange(event)}
          fullWidth
          margin="normal"
          inputProps={{
            "aria-label": "bare",
            style: { fontWeight: 700, fontSize: "20px" }
          }}
          variant="outlined"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel} color="primary">
          Cancel
        </Button>
        <Button onClick={handleOk} color="primary">
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
};

NewSheetDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  value: PropTypes.string.isRequired
};

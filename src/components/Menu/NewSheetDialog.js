import React from 'react';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';


import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  TextField
} from '@material-ui/core';
import { useGlobalState } from '../../state';

export const NewSheetDialog = props => {
  const { handleClose, value: valueProp, open, ...other } = props;
  const [value, setValue] = React.useState(valueProp);
  const [sheetNames] = useGlobalState('sheetNames')
  const [duplicateError, setDuplicateError] = React.useState(false)
  let textInput = React.useRef(null);
  

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
  }

  function handleOk() {

    if (sheetNames.has(value)) {
      setDuplicateError(true)
      setTimeout(()=> {setDuplicateError(false)}, 3000)
    } else {
      handleClose(value);
    }
    
  }

  function onChange(event) {
    const sheetName = event.target.value;
    
    setValue(sheetName);
  }
  return (
    <Dialog
      disableBackdropClick
      disableEscapeKeyDown
      maxWidth="xs"
      onEntering={handleEntering}
      aria-labelledby="confirmation-dialog-title"
      open={open}
      {...other}
    >
      <DialogTitle id="confirmation-dialog-title">New Key Sheet</DialogTitle>
      <DialogContent dividers>
        <DialogContentText>Add a new key sheet</DialogContentText>
        <h1>{value}</h1>
        <TextField
          error={duplicateError}
          autoFocus={true}
          inputRef={textInput}
          margin="dense"
          id="name"
          helperText={duplicateError ? "Already Exists" : ''}
          
          label="Sheet Name"
          onChange={event => onChange(event)}
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel} color="primary" >
          Cancel
        </Button>
        <Button onClick={handleOk} color="primary" >
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

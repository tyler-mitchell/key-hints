import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { NewSheetDialog } from './NewSheetDialog';
import { Fab } from '@material-ui/core';

import { Add as AddIcon } from '@material-ui/icons';
import { KeyTableContext } from '../../context/KeyTableContext';
import { useGlobalState } from '../../state';
const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  },
  paper: {
    width: '80%',
    maxHeight: 435
  },

  fabButton: {
    backgroundImage: 'linear-gradient(to right, #1FA2FF 0%, #12D8FA 51%, #1FA2FF 100%)',

    '&:hover': { backgroundColor: 'red' }
  }
}));

export const NewSheetButton = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState('');
  const { addNewKeySheet, setDocIndex, docIndex } = React.useContext(KeyTableContext);
  const [sheetNames] = useGlobalState('sheetNames');

  function handleButtonClick() {
    setOpen(true);
  }

  function handleClose(newValue) {
    setOpen(false);

    if (newValue) {
      addNewKeySheet(newValue);
    }
  }

  return (
    <>
      <Fab
        color="primary"
        variant="extended"
        size="small"
        className={classes.fabButton}
        style={{ bottom: '17px', position: 'absolute' }}
        button
        onClick={handleButtonClick}
      >
        <AddIcon />
        Add New Collection
      </Fab>

      <NewSheetDialog
        classes={{
          paper: classes.paper
        }}
        id="new-sheet-menu"
        keepMounted
        open={open}
        handleClose={handleClose}
        value={value}
      />
    </>
  );
};


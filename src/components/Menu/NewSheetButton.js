import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { NewSheetDialog } from "./NewSheetDialog";
import { Fab, Button, IconButton } from "@material-ui/core";
import { AddCircleRounded as AddIcon } from "@material-ui/icons";
import { KeyTableContext } from "../../context/KeyTableContext";
import { useGlobalState } from "../../state";
const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  },
  paper: {
    width: "80%",
    maxHeight: 435
  },

  button: {
    textTransform: "none",
    borderRadius: "15px",
    textTransfom: "none"
  },
  icon: {
    marginRight: theme.spacing(1)
  }
}));

export const NewSheetButton = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const { addNewKeySheet, setDocIndex, docIndex } = React.useContext(
    KeyTableContext
  );
  const [sheetNames] = useGlobalState("sheetNames");

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
      <Button
        color="primary"
        variant="contained"
        size="small"
        className={classes.button}
        style={{ bottom: "17px", position: "absolute" }}
        onClick={handleButtonClick}
      >
        {/* <div className={classes.icon}><AddIcon /></div> */}
        <AddIcon className={classes.icon} />
        Add New Key Sheet
      </Button>

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

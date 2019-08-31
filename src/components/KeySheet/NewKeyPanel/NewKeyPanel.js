/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import {
  useGlobalState,
  setGlobalState,
  clearKeySelection
} from "../../../state";
import { KeyTableContext } from "../../../context/KeyTableContext";

// Editor

import { KeySequence } from "./KeySequence/KeySequence";
import styled from "styled-components";
import Toast from "./Toast";

// import Editor from "draft-js-plugins-editor";
import { ItalicButton, BoldButton, UnderlineButton } from "draft-js-buttons";
import createInlineToolbarPlugin from "draft-js-inline-toolbar-plugin";
import Editor, { createEditorStateWithText } from "draft-js-plugins-editor";
import { EditorState } from "draft-js";
import "draft-js-inline-toolbar-plugin/lib/plugin.css";
import "draft-js-inline-toolbar-plugin/lib/plugin.css";
import "./editorStyle.css";

// import "draft-js-inline-toolbar-plugin/lib/plugin.css";
// import "braft-editor/dist/index.css";

import {
  makeStyles,
  Popover,
  Divider,
  TextField,
  CardContent,
  Grid,
  List,
  ListItem,
  TableCell,
  TableRow,
  Chip,
  ButtonGroup,
  // Button,
  Paper,
  Grow,
  Slide,
  Zoom
} from "@material-ui/core";

import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";

import { a } from "react-spring";
import { ToolBarAddView } from "./ToolBarAddView";
import { useTheme } from "@material-ui/styles";
import { AnimatedPanel } from "./AnimatedPanel";

import {
  usePopupState,
  bindTrigger,
  bindPopover,
  bindHover
} from "material-ui-popup-state/hooks";
import KeyText from "../../Key/KeyText/KeyText";
import { Portal } from "@material-ui/core";
import { Button } from "@material-ui/core";
import _ from "lodash";
import { motion, AnimatePresence } from "framer-motion";
import { AutocompleteHashtags } from "./CategoryAutoComplete/CategoryInput";
import { AddPhotoAlternateRounded } from "@material-ui/icons";
import { Avatar } from "@material-ui/core";
import { Container } from "@material-ui/core";
import { CardMedia } from "@material-ui/core";
import { IconButton } from "@material-ui/core";
import { SnackbarContent } from "@material-ui/core";
import { Snackbar } from "@material-ui/core";
import { Card } from "@material-ui/core";
import { Backdrop } from "@material-ui/core";
import { InputBase } from "@material-ui/core";
import {
  CheckCircleRounded as CheckIcon,
  ErrorRounded as ErrorIcon,
  Close as CloseIcon
} from "@material-ui/icons";
import { CardHeader, AppBar } from "@material-ui/core";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  avatar: {
    margin: 10,
    color: "#fff",
    backgroundColor: theme.palette.primary.main
  },
  descriptionField: {
    padding: 0,
    background: "white"
  },
  gridContainer: {
    width: "95%"
  },
  root: {
    display: "flex",
    position: "relative",
    // padding: '1rem',
    // left: 10,
    backgroundImage:
      "radial-gradient( circle farthest-corner at 0% 0.5%,  rgb(247, 247, 248) 0.1%, rgb(244, 245, 245) 100.2% )",
    top: 30,
    left: 0,
    right: 0,
    width: "95%",
    height: "80px",
    marginLeft: "auto",
    marginRight: "auto",
    // overflow: "hidden",
    justifyContent: "flex-end",

    padding: "10px 10px",

    borderRadius: "5px",

    alignItems: "center"
    // borderRadius: 0
  },
  buttonGroup: {
    borderRadius: "13px"
  },
  input: {
    marginLeft: 8,
    flex: 1
  },
  iconButton: {
    padding: 10
  },
  divider: {
    width: 1,
    height: 38,
    margin: 6
  },
  chip: { button: { marginRight: "15px" } },
  keyDescription: {
    textAlign: "center"
  }
}));

const KeySequenceContainer = styled(Grid)`
  border-radius: 8px;

  background-image: radial-gradient(
    circle farthest-corner at 0% 0.5%,
    rgb(247, 247, 248) 0.1%,
    rgb(244, 245, 245) 100.2%
  );
  width: 100%;
  height: 75px;
`;
const CardHead = styled(Grid)`
  /* padding: 30px 0px 5px 20px; */

  /* padding: 300px; */
`;
const inlineToolbarPlugin = createInlineToolbarPlugin({
  structure: [BoldButton, ItalicButton, UnderlineButton]
});
const plugins = [inlineToolbarPlugin];
const { InlineToolbar } = inlineToolbarPlugin;

const KeyMenu = motion.custom(Grid);
export const NewKeyPanel = ({ saveClicked, parentHeight, ...props }) => {
  console.log(`⭐: NewKeyPanel -> parentHeight`, parentHeight);
  const [newKeys, setNewKeys] = useGlobalState("newKeys");
  const [addMode, setAddMode] = useGlobalState("addMode");

  const [editorState, setEditorState] = React.useState(
    EditorState.createEmpty()
  );

  const theme = useTheme();
  const classes = useStyles();
  const onEditorStateChange = newEditorState => {
    setEditorState(newEditorState);
    // setKeyInfo(v => ({ ...v, description }));

    // setNewKeys(p => ({ ...p, category }))
  };

  const [keyInfo, setKeyInfo] = React.useState({
    category: [],
    description: null,
    keyDescription: null
  });

  const handleDescriptionChange = event => {
    const description = event.target.value;
    setKeyInfo(v => ({ ...v, description }));

    // setNewKeys(p => ({ ...p, category }))
  };

  const handleKeyDescription = event => {
    const keyDescription = event.target.value;
    setKeyTopText(keyDescription);
    setKeyInfo(v => ({ ...v, keyDescription }));

    // setNewKeys(p => ({ ...p, category }))
  };
  const handleCategories = values => {
    const category = values.map(o => o.value);
    console.log(`⭐: NewKeyPanel -> category`, category);

    setKeyInfo(v => ({ ...v, category }));

    // setNewKeys(p => ({ ...p, category }))
  };
  const popupState = usePopupState({
    variant: "popover",
    popupId: "demoPopover"
  });

  const chipColors = ["#f47c7c", "#6bd5e1", "#a1de93", "#ffd98e", "#ff8364"];

  const [chipData, setChipData] = React.useState([
    { key: 0, label: "Angular" },
    { key: 1, label: "jQuery" },
    { key: 2, label: "Polymer" },
    { key: 3, label: "React" },
    { key: 4, label: "Vue.js" }
  ]);
  const [isKeyAvailable, setIsKeyAvailable] = React.useState(false);

  const [keyTopText, setKeyTopText] = React.useState("");
  const [keyTopRefs] = useGlobalState("keyTopTextRefs");
  const [keyTopRefKey] = useGlobalState("lastKeyRef");
  const [allKeys] = useGlobalState("allKeys");
  // Key Table Context
  const {
    curKeyTable,
    addNewKeyToFirebase,
    updateKeyToFirebase
  } = React.useContext(KeyTableContext);
  const [suggestions] = useGlobalState("tableCategories");
  // Check for key availability
  React.useEffect(() => {
    const keys = _.values(newKeys.keys.key1);
    if (keys in allKeys) {
      setIsKeyAvailable(false);
    } else {
      setIsKeyAvailable(true);
    }
  }, [allKeys, isKeyAvailable, keyInfo, newKeys]);

  React.useEffect(() => {
    if (saveClicked !== 0) {
      if (Object.keys(newKeys.keys.key1).length === 0) {
        setSnackbarMessage("Empty shortcut");
        setSnackbarVariant("error");
      } else if (!keyInfo.description) {
        setSnackbarMessage("Shortcut description required");
        setSnackbarVariant("error");
      } else if (!isKeyAvailable) {
        setSnackbarMessage("Shortcut already exists");
        setSnackbarVariant("error");
      } else {
        setSnackbarVariant("success");
        handleSaveKeyClick();
        setSnackbarMessage("New shortcut added!");
      }
      setSnackbarOpen(true);
    }
    return () => {};
  }, [saveClicked]);

  React.useEffect(() => {
    if (addMode) {
      // deselect any selected item
      setGlobalState("selectedIndex", null);
    } else {
      // clear input
      setKeyInfo({
        category: [],
        description: "",
        keyDescription: ""
      });
    }
  }, [addMode]);

  const handleSaveKeyClick = () => {
    console.log(`⭐: handleSaveKeyClick -> keyInfo`, keyInfo);
    const newKey = { ...newKeys, ...keyInfo };
    addNewKeyToFirebase(newKey);
    setAddMode(false);
  };
  // Snack Bar

  const [snackbarVariant, setSnackbarVariant] = React.useState("info");
  const [snackbarRef] = useGlobalState("snackbarRef");
  const [snackbarMessage, setSnackbarMessage] = React.useState("");
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);

  const onSnackbarClose = (e, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };
  return (
    <>
      <AnimatedPanel parentHeight={parentHeight}>
        {/* <Grid container alignItems="flex-start">  */}
        <Paper
          elevation={3}
          raised
          component={Grid}
          style={{
            height: parentHeight * 0.91,
            borderRadius: 15,

            padding: "25px"
          }}
        >
          <div
            style={{
              width: 50,
              height: 4,

              // transform: 'translateY(-10px)',
              backgroundColor: "rgba(220,220,220,0.2)",

              top: 7,
              borderRadius: 4,
              position: "absolute",
              margin: "0 auto",
              // marginBottom: 46,
              left: 0,
              zIndex: 300,
              right: 0
            }}
          />

          <AnimatePresence>
            {addMode && (
              <motion.div
                animate={{ opacity: 1, transition: { delay: 0.4 } }}
                initial={{ opacity: 0 }}
                exit={{ opacity: 0 }}
              >
                <CardHead
                  container
                  // justify="flex-start"
                  direction="column"
                  item
                  xs={12}
                  // alignItems="center"
                  // alignItems="center"
                >
                  <Grid container item alignItems="center" justify="flex-start">
                    <Grid item>
                      <Avatar
                        className={classes.avatar}
                        style={{ marginRight: "10px" }}
                      >
                        <AddPhotoAlternateRounded />
                      </Avatar>
                    </Grid>
                    <Grid item xs={10}>
                      <InputBase
                        // value={newKeys.description}

                        variant="outlined"
                        style={{
                          fontSize: "36px",
                          // margin: 0,
                          "label + &": {
                            marginTop: 0
                          },

                          background: "white"
                        }}
                        fullWidth
                        value={keyInfo.description}
                        placeholder="untitled"
                        onChange={event => handleDescriptionChange(event)}
                        rowsMax={3}
                      />
                    </Grid>
                  </Grid>
                  <Grid
                    container
                    justify="flex-start"
                    direction="row"
                    alignItems="center"
                    item
                    xs={12}
                  >
                    <Grid item style={{ marginBottom: "15px" }}>
                      <AutocompleteHashtags
                        suggestions={suggestions}
                        onCategorySave={handleCategories}
                      />
                    </Grid>
                  </Grid>
                </CardHead>

                <Grid xs={12} style={{ display: "flex" }} item>
                  <KeySequence
                    isKeyAvailable={isKeyAvailable}
                    isEmpty={Object.keys(newKeys.keys.key1).length === 0}
                    style={{ position: "absolute" }}
                    newKeys={newKeys.keys}
                  />
                </Grid>
                <Grid item style={{ paddingTop: "15px" }}>
                  {/* <InputBase
                    classes={classes.keyDescription}
                    style={{
                      position: "relative",
                      borderRadius: "10px",
                      border: "solid 2px rgba(220,220,220,0.2)",
                      fontSize: "24px"
                    }}
                    inputProps={{
                      min: 0,
                      style: {
                        textAlign: "center"
                      }
                    }}
                    fullWidth
                    value={keyTopText}
                    variant="subtitle1"
                    color="textSecondary"
                    multiline
                    rows={1}
                    rowsMax={10}
                    placeHolder="enter key top label"
                    onChange={event => handleKeyDescription(event)}
                  /> */}
                  <div className="editor">
                    <Editor
                      editorState={editorState}
                      plugins={plugins}
                      onChange={onEditorStateChange}
                      textAlignment={"align-center"}
                    />
                  </div>
                  <InlineToolbar />
                </Grid>
              </motion.div>
            )}
          </AnimatePresence>
        </Paper>
      </AnimatedPanel>
      {keyTopRefs[keyTopRefKey] && (
        <Portal
          container={keyTopRefs[keyTopRefKey].current}
          style={{ height: "inherit", width: "inherit" }}
        >
          <KeyText keyTopText={keyTopText} />
        </Portal>
      )}
      <Portal container={snackbarRef}>
        <Toast
          snackbarVariant={snackbarVariant}
          snackbarMessage={snackbarMessage}
          onSnackbarClose={onSnackbarClose}
          snackbarOpen={snackbarOpen}
        />
      </Portal>
    </>
  );
};

export const CategoryPaper = styled(Paper)`
  height: 471px;
  margin-right: 10px;
  display: block;
  overflow-x: hidden;
  width: 200px;
`;

/* <Grid item>
                  <ButtonGroup
                    className={classes.buttonGroup}
                    variant={keyInfo.category ? 'contained' : 'outlined'}
                    color="primary"
                    aria-label="Split button"
                  >
                    <Button size="small" className={classes.buttonGroup}>
                      {keyInfo.category}
                    </Button>
                    <Button
                      {...bindTrigger(popupState)}
                      color="primary"
                      className={classes.buttonGroup}
                      size="small"
                      aria-haspopup="true"
                    >
                      <ArrowDropDownIcon fontSize="small" />
                    </Button>
                  </ButtonGroup>
  
                  <Popover
                    {...bindPopover(popupState)}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'center'
                    }}
                    PaperProps={{
                      style: {
                        display: 'flex',
                        justifyContent: 'center',
                        flexWrap: 'wrap',
                        padding: '5px 2px',
                        borderRadius: '20px',
                        maxWidth: '175px'
                      }
                    }}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'center'
                    }}
                  >
                    <Grid container justify="flex-start" alignItems="flex-start">
                      {chipData.map((data, i) => {
                        let icon;
                        const chipColor = chipColors[i % chipColors.length];
                        if (data.label === keyInfo.category) {
                          icon = <CheckIcon />;
                        }
  
                        return (
                          <Chip
                            key={data.key}
                            icon={
                              <Zoom timeout={300} in={data.label === keyInfo.category}>
                                <CheckIcon />
                              </Zoom>
                            }
                            label={data.label}
                            clickable={true}
                            size="small"
                            onClick={() => {
                              const selectedChip = data.label;
                              setKeyInfo(v => ({ ...v, category: selectedChip }));
                            }}
                            style={{ margin: '3px', backgroundColor: chipColor }}
                            className={classes.chip}
                          />
                        );
                      })}
                    </Grid>
                  </Popover>
                </Grid> */

/* eslint-disable jsx-a11y/accessible-emoji */
/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import {
  useGlobalState,
  setGlobalState,
  clearKeySelection
} from "../../../state";
import { KeyTableContext } from "../../../context/KeyTableContext";

// Editor
import { createTeleporter } from "react-teleporter";

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
import Upload from "./Upload";
import { lighten } from "polished";
import { ToggleButton } from "@material-ui/lab";

import { TextareaAutosize } from "@material-ui/core";
import { Subject } from "@material-ui/icons";
import { Label } from "@material-ui/icons";
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
  Close as CloseIcon,
  ImageRounded as ImageIcon
} from "@material-ui/icons";
import { CardHeader, AppBar } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
export const StatusBar = createTeleporter();

const useStyles = makeStyles(theme => ({
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
  },
  labelButton: {
    textTransform: "none",
    zIndex: 4,
    top: 3,
    color: theme.palette.common.grey[500]
  },
  toggleButtonGroupRoot: {
    textTransform: "none"
  },
  toggleButtonGrouped: {
    padding: "0px 5px 0px 6px",
    textTransform: "none",
    background: "red",
    "&:not(:first-child)": {
      marginLeft: -1,
      background: "red",

      borderLeft: "1px solid transparent",
      borderTopLeftRadius: 0,
      borderBottomLeftRadius: 0
    },
    "&:not(:last-child)": {
      borderTopRightRadius: 0,
      background: "red",

      borderBottomRightRadius: 0
    }
  },
  toggleButtonSmall: {
    padding: 0
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
  const [newKeys, setNewKeys] = useGlobalState("newKeys");
  const [addMode, setAddMode] = useGlobalState("addMode");

  const [previewImage, setPreviewImage] = React.useState(null);

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
  const [shortcutImage, setShortcutImage] = React.useState(null);
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
  const [isEmpty, setIsEmpty] = React.useState(true);

  const [keyTopText, setKeyTopText] = React.useState("");
  const [lastKey, setLastKey] = useGlobalState("lastKey");
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
    setIsEmpty(Object.keys(newKeys.keys.key1).length === 0);
    setLastKey(keys[keys.length - 1]);
    if (keys in allKeys) {
      setIsKeyAvailable(false);
    } else {
      setIsKeyAvailable(true);
    }
  }, [allKeys, isKeyAvailable, keyInfo, newKeys]);

  React.useEffect(() => {
    if (saveClicked !== 0) {
      // trigger upload
      // save file to state
      if (isEmpty) {
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

      setPreviewImage(null);
      setKeyLabelType(null);
    }
  }, [addMode]);

  async function handleSaveKeyClick() {
    const newKey = { ...newKeys, ...keyInfo };
    addNewKeyToFirebase(newKey, shortcutImage);
  }

  function handleAddLabel(event, type) {
    if (isEmpty) {
      setSnackbarMessage("Empty shortcut");
      setSnackbarOpen(true);
    } else if (!isKeyAvailable) {
      setSnackbarMessage("Shortcut already exists");
      setSnackbarOpen(true);
    } else {
      if (type === "text") {
        setPreviewImage(null);
      }
      setKeyLabelType(type);
    }
  }
  // Snack Bar
  const mapInputPopupState = usePopupState({
    variant: "popover",
    popupId: "demoPopover"
  });
  const [snackbarVariant, setSnackbarVariant] = React.useState("error");
  const [snackbarRef] = useGlobalState("snackbarRef");
  const [snackbarMessage, setSnackbarMessage] = React.useState("");
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);

  const [keyLabelType, setKeyLabelType] = useGlobalState("keyLabel");
  // TODO:
  // add a panel behind last key that expands rightward when "add label" is clicked
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
            // height: parentHeight * 0.61,
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
                    <Grid item xs={10} style={{ position: "relative" }}>
                      <Grid
                        container
                        item
                        alignItems="flex-start"
                        justify="flex-start"
                      >
                        <Grid item>
                          {keyLabelType === "image" && (
                            <Upload
                              setPreviewImage={setPreviewImage}
                              setSnackbarOpen={setSnackbarOpen}
                              setShortcutImage={setShortcutImage}
                              setSnackbarMessage={setSnackbarMessage}
                            />
                          )}
                        </Grid>
                        <Grid item>
                          <InputBase
                            // value={newKeys.description}

                            variant="outlined"
                            style={{
                              padding: 0,
                              fontSize: "36px",
                              // margin: 0,

                              background: "white"
                            }}
                            // fullWidth
                            value={keyInfo.description}
                            placeholder="untitled"
                            onChange={event => handleDescriptionChange(event)}
                            rowsMax={3}
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>

                  <Grid
                    container
                    justify="flex-start"
                    direction="column"
                    alignItems="flex-start"
                    item
                    xs={12}
                    style={{ marginBottom: "15px" }}
                  >
                    <Grid item style={{ marginBottom: "10px" }}>
                      <motion.div
                        animate={
                          keyLabelType === "text"
                            ? { borderColor: "#e2e2e1" }
                            : { borderColor: "transparent" }
                        }
                        style={{
                          border: "1px solid transparent",

                          borderRadius: 4,
                          backgroundColor: "white",
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "flex-start",
                          alignItems: "center",
                          position: "relative",
                          zIndex: 8
                        }}
                      >
                        <AutocompleteHashtags
                          suggestions={suggestions}
                          onCategorySave={handleCategories}
                        />
                        {keyLabelType === "text" && (
                          <InputBase
                            onChange={handleKeyDescription}
                            multiline
                            inputProps={{
                              disableUnderline: true,
                              style: { textAlign: "center", padding: "4px" }
                            }}
                            style={{ margin: "5px", fontSize: "14px" }}
                            classes={{ root: classes.textArea }}
                            rowsMax={3}
                            placeholder="Enter text label 🔥"
                            aria-label="newKey"
                            variant="filled"
                            rows={1}
                          />
                        )}
                      </motion.div>
                    </Grid>
                    <Grid item>
                      <motion.div
                        animate={
                          !isEmpty && isKeyAvailable
                            ? { y: [-25, 0, 0], opacity: 1 }
                            : { y: [0, -25, -50], opacity: [0.2, 0, 0] }
                        }
                      >
                        <ToggleButtonGroup
                          onChange={handleAddLabel}
                          value={keyLabelType}
                          // size="small"
                          exclusive
                          style={{ textTransform: "none" }}
                          aria-label="text alignment"
                        >
                          <ToggleButton
                            value="image"
                            variant="text"
                            style={{ textTransform: "none" }}

                            // classes={{
                            //   root: classes.toggleButtonGroupRoot
                            // }}
                            // classes={{
                            //   root: classes.labelButton
                            // }}
                          >
                            <ImageIcon style={{ marginRight: "3px" }} />
                            Add Image Label
                          </ToggleButton>

                          <ToggleButton
                            value="text"
                            variant="text"
                            style={{ textTransform: "none" }}
                            {...bindTrigger(mapInputPopupState)}
                            // classes={{
                            //   root: classes.labelButton
                            // }}
                          >
                            <Subject style={{ marginRight: "3px" }} />
                            Add Text Label
                          </ToggleButton>
                        </ToggleButtonGroup>
                      </motion.div>
                    </Grid>
                  </Grid>
                </CardHead>

                <Grid xs={12} style={{ display: "flex" }} item>
                  <KeySequence
                    isKeyAvailable={isKeyAvailable}
                    popupState={mapInputPopupState}
                    isEmpty={isEmpty}
                    style={{ position: "absolute" }}
                    newKeys={newKeys.keys}
                  />
                </Grid>
              </motion.div>
            )}
          </AnimatePresence>
        </Paper>
      </AnimatedPanel>
      <StatusBar.Source>
        {keyLabelType === "text" && <KeyText keyTopText={keyTopText} />}
        {/* {keyLabelType === "image" && previewImage && ( */}
        {keyLabelType === "image" && (
          <img
            alt="img"
            style={{
              // borderRadius: "4px",
              overflow: "hidden",
              alignSelf: "center",
              userDrag: "none",

              borderRadius: "10%",
              display: "block",

              objectFit: "contain"
            }}
            // src={previewImage}
            src="https://placeimg.com/900/900/animals"
          />
        )}
      </StatusBar.Source>

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

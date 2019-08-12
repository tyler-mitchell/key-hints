import React from "react";
import {
  useGlobalState,
  setGlobalState,
  clearKeySelection
} from "../../../state";
import { KeyTableContext } from "../../../context/KeyTableContext";
import { KeySequence, renderAddedKeys } from "./KeySequence";
import styled from "styled-components";

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
import { Card } from "@material-ui/core";
import { Backdrop } from "@material-ui/core";
import { InputBase } from "@material-ui/core";
import {
  CheckCircleRounded as CheckIcon,
  ErrorRounded as ErrorIcon
} from "@material-ui/icons";
import { CardHeader, AppBar } from "@material-ui/core";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles({
  descriptionField: {
    padding: 0,
    background: "white"
  },
  gridContainer: {
    width: "95%"
  },
  root: {
    display: "flex",
    position: "absolute",
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
  chip: { button: { marginRight: "15px" } }
});
const CardHead = styled(AppBar)`
  &&& {
    position: relative;
    background: white;
  }
`;
const KeyMenu = motion.custom(Grid);
export const NewKeyPanel = ({ saveClicked, ...props }) => {
  const [newKeys, setNewKeys] = useGlobalState("newKeys");
  const theme = useTheme();
  const classes = useStyles();

  const [keyInfo, setKeyInfo] = React.useState({
    category: null,
    description: null,
    keyDescription: null
  });
  const handleDescriptionChange = event => {
    const description = event.target.value;
    console.log("⭐: value", keyInfo);
    setKeyInfo(v => ({ ...v, description }));

    // setNewKeys(p => ({ ...p, category }))
  };
  const handleKeyDescription = event => {
    const keyDescription = event.target.value;
    setKeyTopText(keyDescription);
    setKeyInfo(v => ({ ...v, keyDescription }));

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
  function checkAvailability() {}
  React.useEffect(() => {
    const keys = _.values(newKeys.keys.key1);
    if (keys in allKeys) {
      setIsKeyAvailable(false);
    } else {
      setIsKeyAvailable(true);
    }

    console.log(`⭐: NewKeyPanel -> isKeyAvailable`, isKeyAvailable);

    checkAvailability();
    if (saveClicked !== 0) {
      const newKey = { ...newKeys, ...keyInfo };
      console.log(`⭐: handleSaveKeyClick -> newKey`, newKey);
      addNewKeyToFirebase(newKey);
      setGlobalState("addMode", false);
    }
  }, [
    addNewKeyToFirebase,
    allKeys,
    isKeyAvailable,
    keyInfo,
    newKeys,
    saveClicked
  ]);

  const handleSaveKeyClick = () => {
    const newKey = { ...newKeys, ...keyInfo };
    console.log(`⭐: handleSaveKeyClick -> newKey`, newKey);
    addNewKeyToFirebase(newKey);
    setGlobalState("addMode", false);
  };

  return (
    <>
      <AnimatedPanel>
        {/* <Grid container alignItems="flex-start">  */}

        <Card raised style={{ height: "300px", borderRadius: 15 }}>
          <CardContent style={{ borderRadius: 15, background: "white" }}>
            <div
              style={{
                width: 50,
                height: 4,
                transform: "translateY(-10px)",
                backgroundColor: "rgba(220,220,220,0.2)",
                bottom: -5,
                top: 3,
                borderRadius: 4,
                position: "relative",
                margin: "0 auto",
                marginBottom: 46,
                left: 0,
                right: 0
              }}
            />

            <Paper className={classes.root} elevation={0} style={{}}>
              <motion.div
                animate={
                  Object.keys(newKeys.keys.key1).length === 0
                    ? { opacity: 0 }
                    : { opacity: 1 }
                }
                style={{
                  position: "absolute",
                  right: 0,
                  top: 0,
                  bottom: 0,
                  // backgroundImage: 'radial-gradient( circle farthest-corner at 12.3% 19.3%,  rgba(32, 156, 238, 1) 0%, rgba(95,209,249,1) 100.2% )',
                  // backgroundImage: 'linear-gradient( 111.5deg, rgba(20,100,196,1) 0.4%, rgba(32, 156, 238, 1) 100.2% )',
                  backgroundImage:
                    "radial-gradient( circle farthest-corner at -20% 20%,  rgba(149,219,254,1) 0%, rgba(32, 156, 238, 1) 100.1% )",
                  // backgroundColor: '#209CEE',
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "11%"
                }}
              >
                <KeyMenu direction="column">
                  <Grid item xs={12}>
                    <div variant="h6">Key Label</div>
                  </Grid>
                  <Grid item xs={12}>
                    <div variant="h6">Key Label</div>
                  </Grid>
                  <Grid item xs={12}>
                    <InputBase
                      style={{ position: "relative" }}
                      value={keyTopText}
                      variant="subtitle1"
                      color="textSecondary"
                      placeHolder="enter key top label"
                      onChange={event => handleKeyDescription(event)}
                    />
                  </Grid>

                  <AnimatePresence>
                    {isKeyAvailable ? (
                      <motion.div
                        key="success"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.3 }}
                        style={{
                          position: "absolute",
                          top: "-10%",

                          right: "-10%",

                          fontSmooth: "always",

                          background: "white",
                          border: "3px solid white",
                          boxShadow: "inset 0px 0px 2px 5px #209CEE",
                          borderRadius: "100%",
                          display: "flex"
                        }}
                        exit={{ scale: 0 }}
                      >
                        <CheckIcon
                          fontSize="medium"
                          style={{
                            display: "inline-block",

                            color: "#4be8bc"
                          }}
                        />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="error"
                        initial={{ scale: 0 }}
                        transition={{ delay: 0.3 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        style={{
                          position: "absolute",
                          top: "-10%",

                          right: "-10%",

                          fontSmooth: "always",

                          background: "white",
                          border: "3px solid white",
                          boxShadow: "inset 0px 0px 2px 5px #209CEE",
                          borderRadius: "100%",
                          display: "flex"
                        }}
                      >
                        <ErrorIcon
                          fontSize="medium"
                          style={{ color: "#FC7575" }}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </KeyMenu>
              </motion.div>
              {/* <div style={{ width: "95%" }}> */}
              <Grid
                className={classes.gridContainer}
                container
                direction="row"
                alignItems="center"
                justify="flex-start"
                spacing={1}
                xs={12}
              >
                <Grid item xs={3}>
                  <TextField
                    // value={newKeys.description}
                    multiline={true}
                    variant="outlined"
                    style={{
                      margin: 0,
                      "label + &": {
                        marginTop: 0
                      },

                      background: "white"
                    }}
                    fullWidth
                    placeholder="shortcut description"
                    onChange={event => handleDescriptionChange(event)}
                    rowsMax={3}
                  />
                  {/* <TextField
                    // value={newKeys.description}
                    multiline
                    variant="filled"
                    rowsMax={2}
                    placeholder="description"
                    onChange={event => handleDescriptionChange(event)}
                  /> */}
                </Grid>

                <Grid container item xs={7} justify="flex-end">
                  {renderAddedKeys(newKeys.keys)}
                </Grid>

                {/* <KeyMenu
                  container
                  direction="column"
                  justify="center"
                  alignItems="center"
                  style={{
                    position: "absolute",

                    right: 0,
                    top: 0,
                    bottom: 0,
                    // backgroundImage: 'radial-gradient( circle farthest-corner at 12.3% 19.3%,  rgba(32, 156, 238, 1) 0%, rgba(95,209,249,1) 100.2% )',
                    // backgroundImage: 'linear-gradient( 111.5deg, rgba(20,100,196,1) 0.4%, rgba(32, 156, 238, 1) 100.2% )',
                    backgroundImage:
                      "radial-gradient( circle farthest-corner at -20% 20%,  rgba(149,219,254,1) 0%, rgba(32, 156, 238, 1) 100.1% )",
                    // backgroundColor: '#209CEE',

                    width: "10%"
                  }}
                >
                  <Grid item xs={12}>
                    <div variant="h6">Key Label</div>
                  </Grid>
                  <Grid item xs={12}>
                    <div variant="h6">Key Label</div>
                  </Grid>
                  <Grid item xs={12}>
                    <InputBase
                      style={{ position: "relative" }}
                      value={keyTopText}
                      variant="subtitle1"
                      color="textSecondary"
                      placeHolder="enter key top label"
                      onChange={event => handleKeyDescription(event)}
                    />
                  </Grid>
                </KeyMenu> */}
                {keyTopRefs[keyTopRefKey] && (
                  <Portal
                    container={keyTopRefs[keyTopRefKey].current}
                    style={{ height: "inherit", width: "inherit" }}
                  >
                    <KeyText keyTopText={keyTopText} />
                  </Portal>
                )}
              </Grid>
              {/* </div> */}
            </Paper>
          </CardContent>
        </Card>
      </AnimatedPanel>
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
                              console.log('⭐: VALUE ON CHIP CLICK', keyInfo);
                            }}
                            style={{ margin: '3px', backgroundColor: chipColor }}
                            className={classes.chip}
                          />
                        );
                      })}
                    </Grid>
                  </Popover>
                </Grid> */

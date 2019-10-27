import {
  Checkbox,
  FormControlLabel,
  Grid,
  GridList,
  GridListTile,
  useTheme,
  Card,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  ExpansionPanelActions,
  Typography,
  makeStyles,
  Box,
  Tabs,
  CircularProgress,
  LinearProgress,
  Tab,
  Paper,
  Fade
} from "@material-ui/core";
import { ExpandMore as ExpandMoreIcon } from "@material-ui/icons";
import { AnimatePresence, motion } from "framer-motion";
import { lighten, shade } from "polished";
import React from "react";
import styled from "styled-components";
import { useGlobalState } from "../../state";
import {
  updateActiveLayers,
  updateActiveSingleLayer
} from "../Keyboard/KeyMapData";
import { renderCategoryIcon } from "./KeyList/KeyListItem";
import { AnimatedPanel } from "./NewKeyPanel/AnimatedPanel";
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: "flex",
    opacity: 1,
    height: "100%"
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`
  },
  tab: {
    opacity: 1,
    "&:hover": {
      opacity: 1
    },
    "&$selected": {
      color: "#1890ff",
      opacity: 1,
      fontWeight: theme.typography.fontWeightMedium
    }
  }
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      <Box p={3}>{children}</Box>
    </Typography>
  );
}

const AnimatedTile = motion.custom(GridListTile);
const AnimatedPaper = motion.custom(Paper);
const KeyMapLayersPanel = () => {
  const [showMultipleLayers, setShowMultipleLayers] = useGlobalState(
    "showMultipleLayers"
  );
  const [layerState, setState] = React.useState({ index: 0, layer: null });
  const [activeLayers, setActiveLayers] = useGlobalState("activeLayers");
  const [allLayers] = useGlobalState("allLayers");
  const [layerKeys] = useGlobalState("layerKeys");
  const [initialLayerIndices] = useGlobalState("initialLayerIndices");
  const classes = useStyles();
  const [loading, setLoading] = React.useState(false);

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  React.useEffect(() => {
    activeLayers &&
      (async () => {
        if (showMultipleLayers) {
          const {
            layerIndices: newIndices,
            activeLayers: newActiveLayers
          } = await updateActiveLayers(allLayers, layerState.layer);

          setActiveLayers(newActiveLayers);
          setLayerIndices(newIndices);
          setLoading(false);
          return newIndices;
        } else {
          const x = await updateActiveSingleLayer(
            allLayers,
            layerKeys,
            layerState.index
          );
          setLayerIndices(new Set([layerState.index]));
          setLoading(false);
          return x;
        }
      })();
  }, [layerState, showMultipleLayers]);

  React.useEffect(() => {
    if (initialLayerIndices) {
      setLayerIndices(initialLayerIndices);
    }
  }, [initialLayerIndices]);

  const [layerIndices, setLayerIndices] = React.useState(initialLayerIndices);

  const theme = useTheme();
  const [tabIndicatorColor, setTabIndicatorColor] = React.useState(
    theme.palette.action.selected
  );
  const [mode] = useGlobalState("mode");
  function handleMultiLayerOption() {
    setShowMultipleLayers(!showMultipleLayers);
  }
  return (
    <div className={classes.root}>
      <FormControlLabel
        control={
          <Checkbox
            onChange={() => setShowMultipleLayers(!showMultipleLayers)}
            value="checkedC"
            checked={showMultipleLayers}
          />
        }
        label="Multiple Layers"
      />

      {mode === "KEYMAP_MODE" && (
        <Tabs
          // centered={false}
          className={classes.tabs}
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          TabIndicatorProps={{
            style: {
              backgroundColor: tabIndicatorColor
            }
          }}
          aria-label="Vertical tabs example"
          // className={classes.tabs}
        >
          {initialLayerIndices &&
            layerKeys.map((layer, index) => {
              return (
                <Tab
                  classes={{ root: classes.tab }}
                  disableFocusRipple
                  textColor="primary"
                  disableRipple={layerIndices.has(layer.id)}
                  onClick={() => {
                    // setState({ index, layer: layer.keybind });
                    setTabIndicatorColor(layer.color);

                    if (!layerIndices.has(layer.id)) {
                      setLoading(true);
                      setTimeout(() => {
                        setState({ index, layer: layer.keybind });
                        // setTabIndicatorColor(layer.color);
                      }, 300);
                    }
                  }}
                  label={
                    <motion.div
                      cols={layer.keybind.length}
                      row={1}
                      item
                      key={layer.keybind}
                      style={{
                        transform: "translateZ(0)",
                        backfaceVisibility: "hidden"
                      }}
                      whileHover={{
                        transition: {
                          type: "spring",
                          damping: 100,
                          stiffness: 400
                        }
                      }}
                      whileTap={{
                        transition: {
                          type: "spring",
                          damping: 100,
                          stiffness: 400
                        }
                      }}
                    >
                      <RenderSelectedCategory
                        layerKey={layer.keybind}
                        color={layer.color}
                        active={layerIndices.has(layer.id)}
                      >
                        <Fade
                          unmountOnExit={true}
                          in={
                            loading &&
                            value === index &&
                            !layerIndices.has(layer.id)
                          }
                        >
                          <Box color={tabIndicatorColor}>
                            <CircularProgress
                              size={30}
                              thickness={5}
                              disableShrink
                              color="inherit"
                            />
                          </Box>
                        </Fade>
                      </RenderSelectedCategory>
                    </motion.div>
                  }
                />
              );
            })}
        </Tabs>
      )}

      <TabPanel value={value} index={0}>
        Item One
      </TabPanel>
      <TabPanel value={value} index={1}>
        Item Two
      </TabPanel>
      <TabPanel value={value} index={2}>
        Item Three
      </TabPanel>
      <TabPanel value={value} index={3}>
        Item Four
      </TabPanel>
      <TabPanel value={value} index={4}>
        Item Five
      </TabPanel>
      <TabPanel value={value} index={5}>
        Item Six
      </TabPanel>
      <TabPanel value={value} index={6}>
        Item Seven
      </TabPanel>
    </div>
  );
};

export const RenderSelectedCategory = ({
  layerKey,
  color,
  active,
  setState,
  children
}) => {
  console.log(`⭐: RenderSelectedCategory -> active`, active);
  console.log(`⭐: layerKey`, layerKey);
  return (
    <KeyContainer
      custom={color}
      animate={active ? "active" : "inactive"}
      height="30px"
      variants={variants}
      color={color}
      whileTap={"active"}
    >
      <Box
        position="absolute"
        display="flex"
        justifyContent="center"
        alignItems="center"
        zIndex={50}
      >
        {children}
      </Box>
      <KeyTop bgColor={color} active={active}>
        <Grid
          container
          justify="space-around"
          alignItems="center"
          wrap="nowrap"
          xs={4}
          flexGrow={1}
        >
          {layerKey.map((kb, index, array) => {
            return (
              <>
                {/* <Box>{iconLoad()}</Box> */}
                <Grid
                  style={{
                    textAlign: "center"
                  }}
                  item
                >
                  {renderCategoryIcon(kb, "75px")}
                </Grid>
                {index !== layerKey.length - 1 && (
                  <Grid item>
                    <span style={{ margin: "2px" }}>+</span>
                  </Grid>
                )}
              </>
            );
          })}
        </Grid>
      </KeyTop>
    </KeyContainer>
  );
};

const KeyTop = styled(motion.div)`
  display: flex;
  user-select: none;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 30px;
  box-sizing: border-box;
  border-radius: 3px;
  backface-visibility: hidden;
  background-image: inherit;
  z-index: 10;
  padding: 10px;
  text-transform: none;
  /* padding-bottom: auto; */
  margin: -2px;
  /* text-align: left; */
  /* text-align: center; */
  font-family: "Karla", sans-serif;

  text-shadow: "2px 5px 4px #000";

  /* color: ${({ bgColor }) => bgColor}; */
  font-family: "Muli", sans-serif;
  

  font-size: 18px;
  font-weight: bold;
  text-align: center;
`;
const KeyContainer = styled(motion.div)`

position: relative;
backface-visibility: hidden;
 /* width: ${props => props.wt}px; */
 

width: ${({ width }) => width};
display: flex;
justify-content: center;
align-items: center;
cursor: pointer;
border-width: 6px 6px 12px 6px;

border-radius: 6px;


border-style: solid;


`;
const variants = {
  active: activeColor => ({
    borderTopColor: `${shade(0.02, activeColor)}`,
    borderBottomColor: `${shade(0.3, activeColor)}`,
    borderLeftColor: `${shade(0.09, activeColor)}`,
    borderRightColor: `${shade(0.09, activeColor)}`,
    transition: { duration: 0.3 },
    y: 0,
    filter: `grayscale(${[300, 200, 400]})`,
    backgroundImage: `linear-gradient(-30deg, ${shade(
      0.05,
      activeColor
    )} 0%, ${lighten(0.1, activeColor)} 50%)`
  }),
  inactive: defaultColor => ({
    // y: 0,
    // rotateY: 180,
    // rotateX: 0,
    y: 0,
    borderTopColor: `${shade(0.02, "#FFFFFF")}`,
    borderBottomColor: `${shade(0.3, "#FFFFFF")}`,
    borderLeftColor: `${shade(0.09, "#FFFFFF")}`,
    borderRightColor: `${shade(0.09, "#FFFFFF")}`,
    // boxShadow: " 0px 0px 0px 0px rgba(0,0,0,0.5)",
    // boxShadow: " 0px 0px 0px 0px black",
    backgroundImage: `linear-gradient(-30deg, ${shade(
      0.05,
      "#FFFFFF"
    )} 0%, ${lighten(0.2, "#FFFFFF")} 50%)`,
    transition: { duration: 0.3 }
  })
};

const GridListContainer = styled(Grid)`
  /* display: flex;
  display: inline-flex;
  align-items: center;
  justify-content: center; */

  /* justify-items: center; */
  background: radial-gradient(
    ellipse at center,
    rgba(0, 0, 0, 0.6) 0,
    rgba(39, 37, 37, 0.74) 60%
  );
  /* box-sizing: content-box; */

  /* margin: 10px; */

  /* Style */

  padding: 12px;
  background: #f9f9f9;

  border-style: solid;
  border-color: white;
  border-radius: 15px;
  /* box-shadow:  
  0 0 0 2px rgb(221, 221, 221),
  0 10px 0px 1px rgb(187, 187, 187), 
    0 5px 50px 10px rgb(0, 0, 0); */

  box-shadow: 0 0 0 2px rgb(221, 221, 221), 0 3px 0px 3px rgb(128, 128, 128),
    0 8px 2px 1px rgb(124, 124, 124), 0 9px 2px 1px rgb(190, 190, 190),
    0 10px 2px 2px rgba(0, 0, 0, 0.1), 0 12px 6px rgba(0, 0, 0, 0.05),
    0 13px 8px rgba(0, 0, 0, 0.1), 0 16px 16px rgba(0, 0, 0, 0.1),
    8px 10px 10px 0px rgba(0, 0, 0, 0.15), 8px 10px 10px 0px rgba(0, 0, 0, 0.15);
`;

const GridListInnerFrame = styled(Grid)`
  overflow: hidden;

  /* background-image: ${({ bgColor }) =>
    `linear-gradient(-45deg, ${lighten(0.08, bgColor)} 25%, ${bgColor} 25%,
          ${bgColor} 50%, ${lighten(0.08, bgColor)} 50%, ${lighten(
      0.08,
      bgColor
    )} 75%,
          ${bgColor} 75%, ${bgColor})`}; */

 
  background-image: ${({ bgColor }) =>
    `linear-gradient(120deg, #89f7fe 0%, ${bgColor} 100%)}`};

background: ${shade(0.7, "#f9f9f9")};
  padding-bottom: 3px;
  padding-top: 3px;
  padding-right: 3px;
  padding-left: 3px;
  border-radius: 10px;
`;

export default KeyMapLayersPanel;

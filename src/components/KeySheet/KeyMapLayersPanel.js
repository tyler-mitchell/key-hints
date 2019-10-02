import React from "react";
import { AnimatedPanel } from "./NewKeyPanel/AnimatedPanel";

import { useGlobalState } from "../../state";
import { AnimatedKeyContainer, KeyCharCenter } from "../Key/Key.styles";
import styled from "styled-components";
import {
  updateActiveLayers,
  updateActiveSingleLayer
} from "../Keyboard/KeyMapData";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import { renderCategoryIcon } from "./KeyList/KeyListItem";
import { shade, lighten } from "polished";
import { NumpadInnerFrame, NumpadCover } from "../Keyboard/Keyboard.styles";
import { useTheme } from "@material-ui/core";
import { Checkbox } from "@material-ui/core";
import { FormControlLabel } from "@material-ui/core";
import { GridList } from "@material-ui/core";
import { GridListTile } from "@material-ui/core";
import { Button } from "@material-ui/core";
import { Grid } from "@material-ui/core";
const AnimatedTile = motion.custom(GridListTile);
const AnimatedGridList = motion.custom(GridList);
const KeyMapLayersPanel = () => {
  const [showMultipleLayers, setShowMultipleLayers] = React.useState(true);
  const [layerState, setState] = React.useState({ index: 0, layer: null });
  const [activeLayers, setActiveLayers] = useGlobalState("activeLayers");
  const [allLayers] = useGlobalState("allLayers");
  const [layerKeys] = useGlobalState("layerKeys");
  const [initialLayerIndices] = useGlobalState("initialLayerIndices");

  React.useEffect(() => {
    const delayCalculation =
      activeLayers &&
      setTimeout(() => {
        if (showMultipleLayers) {
          const {
            layerIndices: newIndices,
            activeLayers: newActiveLayers
          } = updateActiveLayers(allLayers, layerState.layer);
          setActiveLayers(newActiveLayers);
          setLayerIndices(newIndices);
        } else {
          console.log(`⭐: KeyMapLayersPanel -> TEST`);
          updateActiveSingleLayer(allLayers, layerKeys, layerState.index);
          setLayerIndices(new Set([layerState.index]));
        }
      }, 100);

    return () => clearTimeout(delayCalculation);
  }, [layerState, showMultipleLayers]);

  React.useEffect(() => {
    if (initialLayerIndices) {
      setLayerIndices(initialLayerIndices);
    }
  }, [initialLayerIndices]);

  console.log(
    `⭐: KeyMapLayersPanel -> initialLayerIndices`,
    initialLayerIndices
  );
  const [layerIndices, setLayerIndices] = React.useState(initialLayerIndices);
  console.log(`⭐: KeyMapLayersPanel -> layerIndices`, layerIndices);
  const theme = useTheme();

  const [mode] = useGlobalState("mode");
  function handleMultiLayerOption() {
    setShowMultipleLayers(!showMultipleLayers);
  }
  return (
    <AnimatedPanel
      customStyle={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
      GridProps={{ container: true, justify: "flex-start" }}
      padding="50px 25px 10px 25px"
      variantInfo={{
        type: "KeyMapPanel",
        opened: "openedMap",
        closed: "closedMap",
        mode: "KEYMAP_MODE"
      }}
    >
      <Grid container justify="center">
        <GridListContainer item xs={12}>
          <Grid item xs={3}>
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
          </Grid>
          <GridListInnerFrame
            bgColor={theme.palette.primary.main}
            container
            item
            xs={12}
          >
            <AnimatePresence>
              {mode === "KEYMAP_MODE" && (
                <AnimatedGridList
                  style={{ width: "100%" }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: [1, 0, 0, 0], y: -60 }}
                  initial={{ opacity: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 100,
                    damping: 30,
                    mass: 2
                  }}
                  cellHeight={50}
                  spacing={3}
                  cols={6}
                >
                  {initialLayerIndices &&
                    layerKeys.map((layer, index) => {
                      return (
                        <AnimatedTile
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
                          onClick={() =>
                            setState({ index, layer: layer.keybind })
                          }
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
                          />
                        </AnimatedTile>
                      );
                    })}
                </AnimatedGridList>
              )}
            </AnimatePresence>
          </GridListInnerFrame>
        </GridListContainer>
      </Grid>
    </AnimatedPanel>
  );
};

export const RenderSelectedCategory = ({
  layerKey,
  color,
  active,
  setState
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
      <KeyTop bgColor={color} active={active}>
        <Grid container justify="space-around" alignItems="center" xs={4}>
          {layerKey.map((kb, index, array) => {
            return (
              <>
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
  height: auto;
  box-sizing: border-box;
  border-radius: 3px;
  backface-visibility: hidden;
  background-image: inherit;
  z-index: 10;
  padding: 10px;
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

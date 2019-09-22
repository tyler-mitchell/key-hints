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

  const [mode] = useGlobalState("mode");

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
        <Grid item xs={3}>
          <FormControlLabel
            control={<Checkbox value="checkedC" />}
            label="Multiple Layers"
          />
        </Grid>

        <Grid item xs={8}>
          <AnimatePresence>
            {mode === "KEYMAP_MODE" && (
              <AnimatedGridList
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
                spacing={1}
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
                        {/* <Switch
                                    edge="start"
                                    layerColor={layer.color}
                                    color="primary"
                                    onClick={() => handleSwitchClick(layer.keybind, index)}
                                    // checked={(layer.id === state.index )}
                                    checked={
                                      layer.id === layerState.index ||
                                      layerIndices.has(layer.id)
                                    }
                                  /> */}

                        <RenderSelectedCategory
                          layerKey={layer.keybind}
                          color={layer.color}
                          active={layerIndices.has(layer.id)}
                        />

                        {/* {renderCategoryItem(layer.keybind, layer.color)} */}
                        {/* <Portal container={container.current}>
                                    
                                  </Portal> */}
                      </AnimatedTile>
                    );
                  })}
              </AnimatedGridList>
            )}
          </AnimatePresence>
        </Grid>
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

  const len = layerKey.reduce((result, cur) => {
    result += cur.length;
    return result;
  }, 0);

  console.log(`⭐: len`, len);
  return (
    <KeyContainer
      custom={color}
      animate={active ? "active" : "inactive"}
      width={`calc(${len + layerKey.length - 1}*2px)px`}
      height="30px"
      variants={variants}
      color={color}
      whileTap={"active"}
    >
      <KeyTop>
        <KeyCharCenter>
          <div
            style={{
              fontFamily: "Muli, sans-serif",
              fontSize: "16px",
              fontWeight: "700"
            }}
          >
            {layerKey.map((kb, index, array) => {
              return (
                <>
                  {renderCategoryIcon(kb, "75px")}
                  {index !== layerKey.length - 1 && (
                    <span style={{ margin: "2px" }}>+</span>
                  )}
                </>
              );
            })}
          </div>
        </KeyCharCenter>
      </KeyTop>
    </KeyContainer>
  );
};

const KeyTop = styled(motion.div)`
  display: flex;
  user-select: none;
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

export default KeyMapLayersPanel;

/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { startCase, toLower } from "lodash";

import {
  usePopupState,
  bindTrigger,
  bindMenu
} from "material-ui-popup-state/hooks";

import {
  useGlobalState,
  setGlobalState,
  clearKeySelection
} from "../../../state";

import Select from "react-select";
import styled from "styled-components";

import { Folder as FolderIcon } from "@material-ui/icons";

import { useStyles, CategoryPaper } from "./CategoryMenu.styles";
import { KeyTableContext } from "../../../context/KeyTableContext";
import {
  renderCategoryItem,
  RenderSelectedCategory
} from "../KeyList/KeyListItem";
import {
  getActiveLayers,
  updateActiveLayers,
  updateActiveSingleLayer
} from "../../Keyboard/KeyMapData";
import { Switch, Typography } from "@material-ui/core";
import { Grid } from "@material-ui/core";
import { GridListTile } from "@material-ui/core";
import { GridList } from "@material-ui/core";
import _ from "lodash";
import { Checkbox } from "@material-ui/core";
import { createMuiTheme } from "@material-ui/core";
import useBoolean from "react-hanger/useBoolean";
import { motion } from "framer-motion";
import { lighten } from "polished";
import { useTheme } from "@material-ui/core";
import { Snackbar } from "@material-ui/core";
import { Portal } from "@material-ui/core";
import { Menu, MenuItem } from "@material-ui/core";

import { Button } from "@material-ui/core";
import { ButtonGroup } from "@material-ui/core";
import {
  makeStyles,
  Divider,
  Badge,
  List,
  ListItemIcon,
  ListItem,
  ListItemText,
  Popper,
  Fade,
  Paper
} from "@material-ui/core";
import { Menu as MenuIcon } from "@material-ui/icons";

import { ThemeProvider } from "@material-ui/styles";

const CategoryButton = motion.custom(Grid);
const useSwitchStyles = makeStyles({
  // style rule
  foo: props => ({
    backgroundColor: props.backgroundColor
  }),
  bar: {
    // CSS property
    color: props => props.color
  }
});

function useDidMount() {
  const [didMount, setDidMount] = React.useState(false);
  React.useEffect(() => setDidMount(true), []);

  return didMount;
}

export const CategoryMenu = () => {
  const classes = useStyles();

  const [drawerState] = useGlobalState("drawerState");

  const popupState = usePopupState({ variant: "popover", popupId: "demoMenu" });

  const [selectedIndex, setSelectedIndex] = useGlobalState(
    "selectedCategoryIndex"
  );
  const [selectedItemIndex, setSelectedItemIndex] = useGlobalState(
    "selectedItemIndex"
  );

  const [curCategory, setCurCategory] = useGlobalState("sheetCategory");
  const [listRef] = useGlobalState("listRef");
  const { curKeyTable, loadingUKTC } = React.useContext(KeyTableContext);

  const [mode, setMode] = useGlobalState("mode");
  const [allLayers] = useGlobalState("allLayers");
  const [layerKeys] = useGlobalState("layerKeys");
  const [initialLayerIndices] = useGlobalState("initialLayerIndices");
  const [tableCategories] = useGlobalState("tableCategories");

  const [checkedIndex, setCheckedIndex] = React.useState(0);
  const [showMultipleLayers, setShowMultipleLayers] = React.useState(true);
  const [layerIndices, setLayerIndices] = React.useState(initialLayerIndices);

  const [layerState, setState] = React.useState({ index: 0, layer: null });

  // Portal ref
  const container = React.useRef(null);
  const didMount = useDidMount();
  const [options, setOptions] = React.useState(getOptions(tableCategories));
  const AllOption = {
    value: "All",
    label: "All",
    color: "white"
  };
  const [activeLayers, setActiveLayers] = useGlobalState("activeLayers");
  React.useEffect(() => {
    const delayCalculation =
      didMount &&
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
          updateActiveSingleLayer(allLayers, layerKeys, layerState.index);
          setLayerIndices(new Set([layerState.index]));
        }
      }, 100);

    return () => clearTimeout(delayCalculation);
  }, [layerState, showMultipleLayers]);

  const switchClasses = useSwitchStyles();

  function handleSwitchClick(layer, index) {
    setState({ index, layer });

    //  const data =  await  updateActiveLayers(allLayers, state.layer)
    //  const { layerIndices: newIndices, activeLayers: newActiveLayers } = data;
    //  await
  }
  function handleCheckBoxClick(layer, index) {
    setCheckedIndex(index);
    updateActiveSingleLayer(allLayers, layerKeys, index);
  }
  function handleListCategoryClick(option, index, category) {
    clearKeySelection();

    console.log(`⭐: handleListCategoryClick -> selectedIndex`, selectedIndex);
    setSelectedItemIndex(null);
    setCurCategory(option.value);
    setMode(null);
    popupState.setOpen(false);

    listRef.current && listRef.current.resetAfterIndex(0, false);
  }

  const theme = useTheme();

  function handleMultiLayerOption() {
    setShowMultipleLayers(!showMultipleLayers);
  }
  const onCategoryChange = option => {};
  return (
    <>
      <Select
        // formatOptionLabel={getLabel}
        isSearchable={false}
        options={[
          {
            value: "All",
            label: "All",
            color: "white"
          },
          ...tableCategories
        ]}
        instanceId="HEllo"
        formatOptionLabel={({ color, label, data, size }) => (
          <div style={{ display: "flex" }}>
            <span
              style={{
                backgroundColor: color,
                borderRadius: "15px",
                alignSelf: "flex-start",
                width: "200px",

                padding: "5px 12px"
              }}
            >
              {label}
            </span>
          </div>
        )}
        // onChange={option => {
        //   if (option && !Array.isArray(option)) {
        //     // onChange(option);
        //   }
        // }}
        // value={null}
        onChange={handleListCategoryClick}
        defaultValue={AllOption}
        styles={headerSelectStyles(theme)}
      />
      {/* <ButtonGroup
        disableRipple={true}
        style={{ height: "50px" }}
        disableFocusRipple
      >
        <Button
          {...bindTrigger(popupState)}
          className={classes.iconButton}
          aria-label="Menu"
          onClick={popupState.toggle}
          // style={{ marginRight: '10px' }}
        >
          <MenuIcon />
        </Button>
        {!keyMapMode ? (
          <Button
            style={{
              textTransform: "none",
              padding: "5px",
              width: "100px"
            }}
          >
            {startCase(toLower(curCategory))}
          </Button>
        ) : (
          <Button
            disable
            style={{
              textTransform: "none",
              padding: "5px",
              backgroundColor: "transparent"
            }}
            ref={container}
          >
            {layerKeys.map(layer => (
              <div>
                <RenderSelectedCategory
                  layerKey={layer.keybind}
                  color={layer.color}
                  active={layerIndices.has(layer.id)}
                />
              </div>
            ))}
          </Button>
        )}
      </ButtonGroup> */}
      <Popper
        // className={classes.popper}
        getContentAnchorEl={null}
        placement="bottom-start"
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "left" }}
        {...bindMenu(popupState)}
      >
        {mode === "KEYMAP_MODE" ? (
          <Paper>
            <MenuItem button onClick={handleMultiLayerOption}>
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={showMultipleLayers.value}
                  // tabIndex={-1}

                  inputProps={{
                    "aria-label": "show multiple layers"
                  }}
                />
              </ListItemIcon>
              <ListItemText primary="Show multiple layers" />
            </MenuItem>
            {/* <Divider /> */}

            <Grid container style={{ width: "100%" }} direction="row">
              {initialLayerIndices &&
                layerKeys.map((layer, index) => {
                  return (
                    <Grid item button disableRipple key={layer.keybind}>
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
                    </Grid>
                  );
                })}
            </Grid>
          </Paper>
        ) : (
          <>
            <MenuItem
              button
              onClick={e => handleListCategoryClick(e, -1, "All")}
              selected={selectedIndex === -1}
              key={"All"}
            >
              {/* <ListItemIcon>
                <FolderIcon />
              </ListItemIcon> */}
              <Badge>
                <ListItemText primary="All" />
              </Badge>
            </MenuItem>
            {/* <Divider /> */}

            {/* {tableCategories.map((category, index) => (
              <MenuItem
                button
                onClick={e => handleListCategoryClick(e, index, category.value)}
                selected={selectedIndex === index}
                key={category.value}
              >
                <Badge>
                  <ListItemText primary={startCase(toLower(category.value))} />
                </Badge>
              </MenuItem>
              
            ))} */}
          </>
        )}
      </Popper>
    </>
  );
};

function getLabel({ icon, label }) {
  return (
    <div style={{ alignItems: "center", display: "flex" }}>
      <span style={{ fontSize: 18, marginRight: "0.5em" }}>{icon}</span>
      <span style={{ fontSize: 14 }}>{label}</span>
    </div>
  );
}

const headerSelectStyles = theme => {
  return {
    control: ({ isFocused, ...base }) => ({
      ...base,
      height: "40px",
      overflow: "visible",
      // backgroundClip: "padding-box",
      minHeight: 35,
      borderColor: "rgba(0,0,0,0.1)",
      boxShadow: isFocused
        ? `0 0 0 10px ${theme.palette.action.selected} `
        : null,

      ":hover": {
        borderColor: "rgba(0,0,0,0.2)"
      }
    }),
    indicatorsContainer: provided => ({
      ...provided,
      height: 30
    }),
    valueContainer: base => ({
      ...base,
      fontWeight: "bold",
      height: 30,
      maxHeight: 30
    }),
    option: (base, { data, isSelected, isDisabled }) => ({
      ...base,
      padding: "4px 12px",
      background: isSelected ? theme.palette.primary.main : "white",
      color: data.value === "All" && "black",
      ":hover": {
        background: !isSelected && lighten(0.3, theme.palette.primary.main)
      }
    }),
    placeholder: base => ({
      ...base,
      color: "black"
    })
  };
};

const getOptions = categories => {
  return categories.map(category => ({
    value: category.value,
    icon: "🔥",
    label: category.value
  }));
};

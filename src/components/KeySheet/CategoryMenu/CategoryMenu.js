/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { startCase, toLower } from 'lodash';

import {
  usePopupState,
  bindTrigger,
  bindMenu
} from 'material-ui-popup-state/hooks';

import {
  useGlobalState,
  setGlobalState,
  clearKeySelection
} from '../../../state';

import styled from 'styled-components';

import { Folder as FolderIcon } from '@material-ui/icons';

import { useStyles, CategoryPaper } from './CategoryMenu.styles';
import { KeyTableContext } from '../../../context/KeyTableContext';
import {
  renderCategoryItem,
  RenderSelectedCategory
} from '../KeyList/KeyListItem';
import {
  getActiveLayers,
  updateActiveLayers,
  updateActiveSingleLayer
} from '../../Keyboard/KeyMapData';
import { Switch, Typography } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import { GridListTile } from '@material-ui/core';
import { GridList } from '@material-ui/core';
import _ from 'lodash';
import { useSwitchStyle } from './KeySwitch';
import { Checkbox } from '@material-ui/core';
import { createMuiTheme } from '@material-ui/core';
import useBoolean from 'react-hanger/useBoolean';
import { motion } from 'framer-motion';
import { Snackbar } from '@material-ui/core';
import { Portal } from '@material-ui/core';
import { Menu, MenuItem } from '@material-ui/core';

import { Button } from '@material-ui/core';
import { ButtonGroup } from '@material-ui/core';
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
} from '@material-ui/core';
import { Menu as MenuIcon } from '@material-ui/icons';

import { ThemeProvider } from '@material-ui/styles';

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

  const [drawerState] = useGlobalState('drawerState');

  const popupState = usePopupState({ variant: 'popover', popupId: 'demoMenu' });

  const [selectedIndex, setSelectedIndex] = useGlobalState(
    'selectedCategoryIndex'
  );
  const [curCategory, setCurCategory] = useGlobalState('sheetCategory');
  const [listRef] = useGlobalState('listRef');
  const { curKeyTable, loadingUKTC } = React.useContext(KeyTableContext);

  const [keyMapMode] = useGlobalState('keyMapMode');
  const [allLayers] = useGlobalState('allLayers');
  const [layerKeys] = useGlobalState('layerKeys');
  const [initialLayerIndices] = useGlobalState('initialLayerIndices');

  const [checkedIndex, setCheckedIndex] = React.useState(0);
  const showMultipleLayers = useBoolean(true);
  const [layerIndices, setLayerIndices] = React.useState(initialLayerIndices);
  const [state, setState] = React.useState({ index: null, layer: null });

  // Portal ref
  const container = React.useRef(null);
  console.log(`⭐: CategoryMenu -> layerIndices`, initialLayerIndices);
  const didMount = useDidMount();
  const testHELLO = 'HELLO';
  const hello = startCase(toLower(testHELLO));
  React.useEffect(() => {
    console.log(`⭐: CategoryMenu -> didMount`, didMount);

    const delayCalculation =
      didMount &&
      setTimeout(() => {
        console.log(`⭐: TRIGGERED -> useEffect `);

        if (showMultipleLayers.value) {
          const {
            layerIndices: newIndices,
            activeLayers: newActiveLayers
          } = updateActiveLayers(allLayers, state.layer);
          setGlobalState('activeLayers', newActiveLayers);
          setLayerIndices(newIndices);
        } else {
          updateActiveSingleLayer(allLayers, layerKeys, state.index);
          setLayerIndices(new Set([state.index]));
        }
      }, 100);

    return () => clearTimeout(delayCalculation);
  }, [state, showMultipleLayers.value]);

  const switchClasses = useSwitchStyles();

  async function handleSwitchClick(layer, index) {
    setState({ index, layer });

    //  const data =  await  updateActiveLayers(allLayers, state.layer)
    //  const { layerIndices: newIndices, activeLayers: newActiveLayers } = data;
    //  await
  }
  function handleCheckBoxClick(layer, index) {
    setCheckedIndex(index);
    updateActiveSingleLayer(allLayers, layerKeys, index);
  }
  function handleListCategoryClick(event, index, category) {
    clearKeySelection();

    setSelectedIndex(index);
    setCurCategory(category);
    setGlobalState('addMode', false);
    popupState.setOpen(false);

    listRef.current && listRef.current.resetAfterIndex(0, false);
  }

  function handleMultiLayerOption() {
    showMultipleLayers.toggle();
    console.log(
      `⭐: handleMultiLayerOption -> showMultipleLayers`,
      showMultipleLayers
    );
  }
  return [
    <div>
      <ButtonGroup
        disableRipple={true}
        style={{ height: '50px' }}
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
              textTransform: 'none',
              padding: '5px',
              width: '100px'
            }}
          >
            {startCase(toLower(curCategory))}
          </Button>
        ) : (
          <Button
            disable
            style={{
              textTransform: 'none',
              padding: '5px',
              backgroundColor: 'transparent'
            }}
            ref={container}
          >
            {layerKeys.map(layer => (
              <div>
                <RenderSelectedCategory
                  layerKey={layer.keybind}
                  color={layer.color}
                />
              </div>
            ))}
          </Button>
        )}
      </ButtonGroup>
      <Menu
        // className={classes.popper}
        getContentAnchorEl={null}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        {...bindMenu(popupState)}
      >
        {keyMapMode ? (
          <List dense>
            <MenuItem button onClick={handleMultiLayerOption}>
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={showMultipleLayers.value}
                  // tabIndex={-1}

                  inputProps={{
                    'aria-label': 'show multiple layers'
                  }}
                />
              </ListItemIcon>
              <ListItemText primary="Show multiple layers" />
            </MenuItem>
            {/* <Divider /> */}

            {initialLayerIndices &&
              layerKeys.map((layer, index) => {
                return (
                  <MenuItem button disableRipple key={layer.keybind}>
                    <ListItemIcon>
                      <ThemeProvider
                        theme={createMuiTheme({
                          palette: {
                            primary: {
                              main: `${layer.color}`
                            }
                          }
                        })}
                      >
                        {true ? (
                          <Switch
                            edge="start"
                            layerColor={layer.color}
                            color="primary"
                            onClick={() =>
                              handleSwitchClick(layer.keybind, index)
                            }
                            // checked={(layer.id === state.index )}
                            checked={
                              layer.id === state.index ||
                              layerIndices.has(layer.id)
                            }
                          />
                        ) : (
                          <Checkbox
                            color="primary"
                            disableRipple
                            onClick={() =>
                              handleCheckBoxClick(layer.keybind, index)
                            }
                            edge="start"
                            checked={index === checkedIndex}
                            inputProps={{
                              'aria-label': `${layer.keybind} layer`
                            }}
                          />
                        )}
                      </ThemeProvider>
                    </ListItemIcon>
                    {renderCategoryItem(layer.keybind, layer.color)}
                    {/* <Portal container={container.current}>
                      
                    </Portal> */}
                  </MenuItem>
                );
              })}
          </List>
        ) : (
          <>
            <MenuItem
              button
              onClick={e => handleListCategoryClick(e, -1, 'All')}
              selected={selectedIndex === -1}
              key={'All'}
            >
              {/* <ListItemIcon>
                <FolderIcon />
              </ListItemIcon> */}
              <Badge>
                <ListItemText primary="All" />
              </Badge>
            </MenuItem>
            <Divider />

            {(curKeyTable.data().categories || []).map((category, index) => (
              <MenuItem
                button
                onClick={e => handleListCategoryClick(e, index, category)}
                selected={selectedIndex === index}
                key={category}
              >
                <Badge>
                  <ListItemText primary={startCase(toLower(category))} />
                </Badge>
              </MenuItem>
            ))}
          </>
        )}
        <Divider />
      </Menu>
    </div>
  ];
};

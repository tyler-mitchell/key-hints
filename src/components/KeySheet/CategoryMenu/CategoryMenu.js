import React from 'react';
import { startCase, toLower } from 'lodash';

import {
  usePopupState,
  bindToggle,
  bindPopper,
  anchorRef,
  bindTrigger
} from 'material-ui-popup-state/hooks';

import { useGlobalState, setGlobalState, clearKeySelection } from '../../../state';

import styled from 'styled-components';

import { Folder as FolderIcon } from '@material-ui/icons';

import { useStyles, CategoryPaper } from './CategoryMenu.styles';
import { KeyTableContext } from '../../../context/KeyTableContext';
import { renderCategoryItem } from '../KeyList/KeyListItem';
import { getActiveLayers, updateActiveLayers, updateActiveSingleLayer } from '../../Keyboard/KeyMapData';
import { Switch } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import { GridListTile } from '@material-ui/core';
import { GridList } from '@material-ui/core';
import _ from 'lodash';
import { useSwitchStyle } from './KeySwitch';
import { Checkbox } from '@material-ui/core';
import { createMuiTheme } from '@material-ui/core';
import useBoolean from 'react-hanger/useBoolean';
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

import { ThemeProvider } from '@material-ui/styles';

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


export const CategoryMenu = ({ popupState }) => {
  const classes = useStyles();

  const [drawerState] = useGlobalState('drawerState');

  const { open, ...bindPopState } = bindPopper(popupState);

  const [selectedIndex, setSelectedIndex] = useGlobalState('selectedCategoryIndex');
  const [curCategory, setCurCategory] = useGlobalState('sheetCategory');
  const [listRef] = useGlobalState('listRef');
  const { curKeyTable, loadingUKTC } = React.useContext(KeyTableContext);

  const [keyMapMode] = useGlobalState('keyMapMode');
  const [allLayers] = useGlobalState('allLayers');
  const [layerKeys, setLayerKeys] = useGlobalState('layerKeys');
  const [checkedIndex, setCheckedIndex] = React.useState(0);
  const showMultipleLayers = useBoolean(true);
  

  // React.useEffect(() => {
  //   // const { newLayerKeys } =
  //   // effect dependency array
  // }, [showMultipleLayers]);
  const switchClasses = useSwitchStyles();

  function handleSwitchClick(layer, event) {
    updateActiveLayers(allLayers, layerKeys, layer);
  }
  function handleCheckBoxClick(layer, index) {
    setCheckedIndex(index)
    updateActiveSingleLayer(allLayers, layerKeys, layer);
  }
  function handleListCategoryClick(event, index, category) {
    clearKeySelection();
    
    setSelectedIndex(index);
    setCurCategory(category);
    setGlobalState('addMode', false);

    listRef.current.resetAfterIndex(0, false);
  }

  function handleMultiLayerOption() {
    showMultipleLayers.toggle()
  }
  function isLayerActive(layerKey) {}

  return (
    <>
      <Popper
        placement="left-start"
        className={classes.popper}
        open={drawerState}
        {...bindPopState}
      >
        <Fade in={popupState} timeout={250}>
          <CategoryPaper>
            {keyMapMode ? (
              <List
                dense
              >
                <ListItem button onClick={handleMultiLayerOption}>
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
                </ListItem>
                <Divider />

                {layerKeys.map((layer, index) => {
                  return (
                    <ListItem
                      button
                      disableRipple
                      key={layer.keybind}
                    >
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
                          {showMultipleLayers.value ? (
                            <Switch
                              edge="start"
                              layerColor={layer.color}
                              color="primary"
                              onChange={(event) => handleSwitchClick(layer.keybind, event)}
                              checked={layer.active}
                            />
                          ) : (
                              <Checkbox
                                color="primary"
                                disableRipple
                              onClick={() => handleCheckBoxClick(layer.keybind, index)}
                              edge="start"
                              checked={index === checkedIndex}
                              inputProps={{
                                'aria-label': `${layer.keybind} layer`
                              }}
                            />
                          )}
                        </ThemeProvider>
                      </ListItemIcon>
                      {renderCategoryItem(layer.keybind)}
                    </ListItem>
                  );
                })}
              </List>
            ) : (
              <List>
                <ListItem
                  button
                  onClick={e => handleListCategoryClick(e, -1, 'All')}
                  selected={selectedIndex === -1}
                  key={'All'}
                >
                  <ListItemIcon>
                    <FolderIcon />
                  </ListItemIcon>
                  <ListItemText primary={'All'} />
                </ListItem>
                <Divider />

                {(curKeyTable.data().categories || []).map((category, index) => (
                  <ListItem
                    button
                    onClick={e => handleListCategoryClick(e, index, category)}
                    selected={selectedIndex === index}
                    key={category}
                  >
                    <Badge>
                      <ListItemText primary={startCase(toLower(category))} />
                    </Badge>
                  </ListItem>
                ))}
              </List>
            )}
            <Divider />
          </CategoryPaper>
        </Fade>
      </Popper>
    </>
  );
};

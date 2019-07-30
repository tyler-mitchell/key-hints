/* eslint-disable react-hooks/exhaustive-deps */
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

function useDidMount() {
  const [didMount, setDidMount] = React.useState(false)
  React.useEffect(() => setDidMount(true), [])

  return didMount
}

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
  const [layerKeys] = useGlobalState('layerKeys');
  const [initialLayerIndices] = useGlobalState('initialLayerIndices');
  

  const [checkedIndex, setCheckedIndex] = React.useState(0);
  const showMultipleLayers = useBoolean(true);
  const [layerIndices,setLayerIndices] = React.useState(initialLayerIndices)
  const [state, setState] = React.useState({index: null, layer: null})
  const [initialRender, setInitialRender] = React.useState(true);

  console.log(`⭐: CategoryMenu -> layerIndices`, initialLayerIndices)
  const didMount = useDidMount();
  React.useEffect(() => {
    console.log(`⭐: CategoryMenu -> didMount`, didMount)
    
   const delayCalculation = didMount && setTimeout(() => {
      console.log(`⭐: TRIGGERED -> useEffect `);

      if (showMultipleLayers.value) {
        const { layerIndices: newIndices, activeLayers: newActiveLayers } = updateActiveLayers(allLayers, state.layer)
        setGlobalState('activeLayers', newActiveLayers)
        setLayerIndices(newIndices);
      } else {
        updateActiveSingleLayer(allLayers, layerKeys, state.index);
        setLayerIndices(new Set([state.index]));
      }
      
    }, 100)

      return () => clearTimeout(delayCalculation)
    
 
    
    
  }, [state, showMultipleLayers.value]);



  const switchClasses = useSwitchStyles();

   async function handleSwitchClick(layer, index) {
     
    
       setState({ index, layer })

    //  const data =  await  updateActiveLayers(allLayers, state.layer)
    //  const { layerIndices: newIndices, activeLayers: newActiveLayers } = data;
  //  await 
  
    
  }
  function handleCheckBoxClick(layer, index) {
    setCheckedIndex(index)
    updateActiveSingleLayer(allLayers, layerKeys, index);
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
    console.log(`⭐: handleMultiLayerOption -> showMultipleLayers`, showMultipleLayers)
  }


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

                {initialLayerIndices && layerKeys.map((layer, index) => {
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
                          {true ? (
                            <Switch
                            edge="start"
                            layerColor={layer.color}
                            color="primary"
                            onClick={() => handleSwitchClick(layer.keybind, index)}
                            // checked={(layer.id === state.index )}
                            checked={(layer.id === state.index )|| layerIndices.has(layer.id)}
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

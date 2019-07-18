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
import { getActiveLayers, updateActiveLayers } from '../../Keyboard/KeyMapData';
import { Switch } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import { GridListTile } from '@material-ui/core';
import { GridList } from '@material-ui/core';
import _ from 'lodash';
import { useSwitchStyle } from './KeySwitch';
import { createMuiTheme } from '@material-ui/core';

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
// const theme = createMuiTheme({
//   palette: {
//     primary: 'purple',
//     secondary: 'green',
//   },
//   status: {
//     danger: 'orange',
//   },
// });


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


// {
//   "classes": {
//     "root": "MuiSwitch-root",
//     "edgeStart": "MuiSwitch-edgeStart",
//     "edgeEnd": "MuiSwitch-edgeEnd",
//     "switchBase": "MuiSwitch-switchBase",
//     "colorPrimary": "MuiSwitch-colorPrimary",
//     "colorSecondary": "MuiSwitch-colorSecondary",
//     "checked": "Mui-checked",
//     "disabled": "Mui-disabled",
//     "input": "MuiSwitch-input",
//     "thumb": "MuiSwitch-thumb",
//     "track": "MuiSwitch-track"
//   },
//   "className": "sc-kAzzGY kDsFDX"
// }
const LayerSwitch = styled(({ layerColor, ...otherProps }) => <Switch {...otherProps} />)`


  
  &.MuiSwitch-switchBase {
    &.MuiSwitch-checked + .MuiSwitch-track {
      color: ${({ layerColor }) => layerColor};
      background-color: ${({layerColor}) => layerColor};

    }
    
    
  }
  







`;

const switchStyle = color => {};

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

  

  React.useEffect(() => {
  
    
    // const { newLayerKeys } = 
  
    
  // effect dependency array
  }, [keyMapMode])
  const switchClasses = useSwitchStyles();

  function handleSwitchClick(layer) {

    
    updateActiveLayers(allLayers, layerKeys, layer)
    console.log(`????????????: handleSwitchClick -> layerKeys`, layerKeys)
  }
  function handleListCategoryClick(event, index, category) {
    clearKeySelection();

    setSelectedIndex(index);
    setCurCategory(category);
    setGlobalState('addMode', false);

    listRef.current.resetAfterIndex(0, false);
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
              <List>
                {layerKeys.map(layer => {
                  
                  
                  
            
                  return (
                    <ListItem disableRipple button key={layer.keybind}>
                      <ListItemIcon>
                        <ThemeProvider theme={createMuiTheme({
                          palette: {
                            primary: {
                              main: `${layer.color}`
                            }
                        }})}>
                          <Switch
                            layerColor={layer.color}
                            color="primary"
                            onClick={() => handleSwitchClick(layer.keybind)}
                            checked={layer.active}
                          />
                        </ThemeProvider>
                      </ListItemIcon>
                      {renderCategoryItem(layer.keybind)}
                    </ListItem>
                  );
                })}
                {/* <ListItem>{renderKeys()}</ListItem> */}
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

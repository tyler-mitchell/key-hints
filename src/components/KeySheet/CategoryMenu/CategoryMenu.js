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

import {
  Folder as FolderIcon
} from '@material-ui/icons';

import { useStyles, CategoryPaper } from './CategoryMenu.styles';
import { KeyTableContext } from '../../../context/KeyTableContext';

import {
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

export const CategoryMenu = ({popupState}) => {
  const classes = useStyles();

  const [drawerState] = useGlobalState('drawerState');
 
  const { open, ...bindPopState } = bindPopper(popupState);

  const [selectedIndex, setSelectedIndex] = useGlobalState('selectedCategoryIndex')
  const [curCategory, setCurCategory] = useGlobalState('sheetCategory')
  const [listRef] = useGlobalState('listRef');
  const { curKeyTable, loadingUKTC } = React.useContext(KeyTableContext);

  function handleListCategoryClick(event, index, category) {
    clearKeySelection();

    setSelectedIndex(index);
    setCurCategory(category);
    setGlobalState('addMode', false);

    listRef.current.resetAfterIndex(0, false);
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
            <Divider />
          </CategoryPaper>
        </Fade>
      </Popper>
    </>
  );
};


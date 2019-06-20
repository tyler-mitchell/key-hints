import React from 'react';
import styled from 'styled-components';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import { SelectionContext } from './SelectionContext';
import { BufferContext } from '../../KeyBuffer/BufferContext';
import {
  Button,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  List,
  Badge
} from '@material-ui/core';
import useScrollTop from './useScrollTop';

const KbdKeyList = styled(ListItem)``;

const KbdKey = styled.div`
  margin-left: auto;
  margin-right: 0;
`;
const KbdBadge = styled.div`
  margin-left: auto;
  margin-right: 0;
`;

const renderKeys = keybind => {
  const keysLength = Object.keys(keybind).length > 1;

  return (
    <>
      {Object.values(keybind).map((keyItem, keyIndex) => {
        return (
          <KbdKeyList
            key={keyIndex}
            dense={true}
            button={true}
            disableGutters={true}
            alignItems="flex-end"
          >

            <Badge badgeContent={keyIndex+1} color="primary" >
              {keyItem.map((kb, index, array) => (
                <KbdKey key={index}>
                  <KBD>{kb}</KBD>
                  {index !== keyItem.length - 1 && '+'}
                </KbdKey>
              ))}
              </Badge>

            {/* {keyIndex !== Object.keys(keybind).length - 1 && 'or'} */}
            {console.log('TCL: keybind.length ', keybind.length)}
          </KbdKeyList>
        );
      })}
    </>
  );
};
const KBD = styled.kbd`
  display: inline-block;
  min-width: auto;
  min-height: auto;
  padding: 12px 12px;
  border: 1px solid #8a8a8a;
  border-radius: 4px;
  /* background: linear-gradient(to bottom, #fafafa 0%,#f0f0f0 100%); */
  box-shadow: inset 0px 0px 0px 4px rgba(255, 255, 255, 1), 0px 2px 0px 0px rgba(159, 159, 159, 1);
  display: inline-block;

  margin: 0px 4px;
  background: #fff;
  border-radius: 4px;
  /* box-shadow: 0px 1px 3px 1px rgba(0, 0, 0, 0.5); */
  /*Text Properties*/
  /* font: 10px Helvetica, serif ; */
  text-transform: uppercase;
  /* text-align: center; */
  color: #666;
`;

const KeyListItem = props => {
  const { index, openMenu, styles, text, keybind } = props;
  const [, , activeKeys, setActiveKeys] = React.useContext(BufferContext);
  const [, , , , editMode, setEditMode] = React.useContext(BufferContext);
  const editClicked = (e, index) => {
    openMenu(e, index);
    setEditMode(true);
  };
  const [selection, setSelection] = React.useContext(SelectionContext);
  const itemClicked = index => {
    setSelection(index);
    setActiveKeys(keybind['key1']);
    if (selection !== index) {
      setEditMode(false);
    }
    console.log('TCL: activeKeys', activeKeys);
  };

  return (
    <ListItem
      button
      style={styles}
      divider
      onClick={() => itemClicked(index)}
      selected={selection === index}
    >
      <ListItemText primary={text} />

      <List>{renderKeys(keybind)}</List>
    </ListItem>
  );
};

export default KeyListItem;

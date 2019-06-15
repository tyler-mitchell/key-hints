import React from 'react';
import styled from 'styled-components';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import { SelectionContext } from './SelectionContext';
import { BufferContext } from '../../KeyBuffer/BufferContext';
import { Button, ListItem, ListItemSecondaryAction, ListItemText } from '@material-ui/core';
import useScrollTop from './useScrollTop'

const KBD = styled.kbd`
  background-color: #fff;
  border: 1px solid #ccc;
  color: #333;
  line-height: 1.4;
  text-shadow: 0 1px 0 #fff;
  display: inline-block;
  white-space: nowrap;
  box-shadow: 0 1px 0 rgba(0, 0, 0, 0.2), 0 0 0 2px #fff inset;
  font-family: Arial, Helvetica, sans-serif;
  border-radius: 3px;
  position: relative;

  padding: 10px;
  min-width: 45px;
  box-sizing: border-box;
  justify-content: center;
  align-items: center;
  user-select: none;
  text-align: center;
  margin: 0 20px 0 0;
`;

const KeyListItem = props => {
  const { index, openMenu, styles, text, keybind } = props;
  const [, , activeKeys, setActiveKeys] = React.useContext(BufferContext);
  const [, , , , editMode, setEditMode] = React.useContext(BufferContext);
  const editClicked = (e, index) => {
    openMenu(e, index)
    setEditMode(true);
  };
  const [selection, setSelection] = React.useContext(SelectionContext);
  const itemClicked = index => {
    setSelection(index);
    setActiveKeys(keybind);
    if(!(selection===index)){
      setEditMode(false);
    }
    console.log('TCL: activeKeys', activeKeys);
  };



  React.useEffect(() => {

    return () => {
      // setSelection(null);
    };
  }, [selection, setSelection]);


  return (
    <ListItem
      button
      ContainerProps={{ style: styles }}
      divider
      onClick={() => itemClicked(index)}
      selected={selection === index}
    >


      <ListItemText primary={text} />
      {keybind.map((keybind, index) => {
        return <KBD key={index}>{keybind}</KBD>;
      })}
    </ListItem>
  );
};

export default KeyListItem;

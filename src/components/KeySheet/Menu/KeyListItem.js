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
  Badge,
  Typography,
  Chip,
  Grid
} from '@material-ui/core';
import useScrollTop from './useScrollTop';
import { useGlobalState } from '../../../state';
import { KeyTable } from '../SheetData';

const KbdKeyList = styled(ListItem)``;

const KbdKey = styled.div`
  margin-left: auto;
  margin-right: 0;
`;
const KbdBadge = styled.div`
  margin-left: auto;
  margin-right: 0;
`;

const ORLabel = styled.span`
  font-size: 8px;
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
            {/* <Badge badgeContent={keyIndex+1} color="primary" variant="dot" > */}
            {Object.keys(keyItem).map((kb, index, array) => (
              <KbdKey key={index}>
                <KBD>
                  {Array.isArray(keyItem[kb])
                    ? keyItem[kb].map((x, i, arr) =>
                        arr.length - 1 !== i ? (
                          <span key={i}>
                            {x}
                            <ORLabel> or </ORLabel>
                          </span>
                        ) : (
                          x
                        )
                      )
                    : keyItem[kb]}
                  {/* {Array.isArray(kb)
                    // ? kb.map((x, i) =>   i !== Object.keys(keybind).length - 1 && 'or')
                    ? kb.map((x, i) => x + (kb.length - 1 !== i ? 'or': ''))
                    : kb} */}
                </KBD>
                {index !== Object.keys(keyItem).length - 1 && '+'}
              </KbdKey>
            ))}
            {/* </Badge> */}
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
  font-family: 'Nunito', sans-serif;
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

const ListItemContainer = () => styled(ListItem)`
  font-family: 'Nunito', sans-serif;
`;

const CategoryChip = styled(Chip)`

  transform: scale(0.85);
  
`;

const KeyListItem = props => {
  const { index, openMenu, styles, text, keybind, category } = props;
  // const [, , activeKeys, setActiveKeys] = React.useContext(BufferContext);

  const [, setActiveKeys] = useGlobalState('activeKeys');

  const [editMode, setEditMode] = useGlobalState('editMode');
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
  };

  return (
    <ListItem
      button
      style={{ ...styles, display: 'flex', justifyContent: 'flex-start' }}
      divider
      onClick={() => itemClicked(index)}
      selected={selection === index}
    >
      <Grid container xs={5} justify="flext-start">
        <ListItemText
          primary={<Typography variant="keylabel">{text}</Typography>}
          disableTypography={true}
        />
      </Grid>

      <Grid container  xs={6} justify="flex-end" direction="row">
        <List>{renderKeys(keybind)}</List>
      </Grid>
      <Grid container xs={1} justify="flex-start" direction="row">
        <CategoryChip size="small" element={Typography} label={category} clickable color="primary" />
      </Grid>
    </ListItem>
  );
};

export default KeyListItem;

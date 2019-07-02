import React from 'react';

import { ChromeLogo, FigmaLogo, Windows10Logo, SketchLogo, VSCodeLogo } from '../../assets';

import {
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  IconButton
} from '@material-ui/core';

import { KeyTableContext } from '../../context/KeyTableContext';
import { SheetData } from '../KeySheet/SheetData';

import { Folder as FolderIcon, Delete as DeleteIcon } from '@material-ui/icons';

import { clearKeySelection, setGlobalState, useGlobalState } from '../../state';

export const SheetList = () => {
  const [selectedIndex, setSelectedIndex] = useGlobalState('selectedKeySheet');
  const { userKTC, setDocIndex, docIndex, deleteKeySheet } = React.useContext(KeyTableContext);

  function handleListItemClick(event, index) {
    clearKeySelection();
    setSelectedIndex(index);
    setDocIndex(index);

    setGlobalState('addMode', false);
  }

  function handleDeleteClick(index) {
    deleteKeySheet(index);
  }

  // const [sheetNames, setSheetNames] = useGlobalState('sheetNames')

  return (
    <>
      <List>
        <ListItem button>
          <ListItemIcon>
            <VSCodeLogo />
          </ListItemIcon>
          <ListItemText>VS Code</ListItemText>
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <ChromeLogo />
          </ListItemIcon>
          <ListItemText>Chrome</ListItemText>
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <Windows10Logo />
          </ListItemIcon>
          <ListItemText>Windows 10</ListItemText>
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <FigmaLogo />
          </ListItemIcon>
          <ListItemText>Figma</ListItemText>
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <SketchLogo />
          </ListItemIcon>
          <ListItemText>Sketch</ListItemText>
        </ListItem>
      </List>
      <Divider />
      <List>
        {userKTC &&
          userKTC.docs.map((doc, index) => {
            setGlobalState('sheetNames', o => ({ ...o, [doc.id]: index }));

            // console.log("⭐: sheetNames", sheetNames)
            return (
              <ListItem
                button
                key={doc.id}
                onClick={e => handleListItemClick(e, index)}
                selected={selectedIndex === index}
              >
                <ListItemIcon>
                  <FolderIcon color="primary" />
                </ListItemIcon>
                <ListItemText primary={doc.id} />
                <ListItemSecondaryAction>
                  <IconButton
                    edge="end"
                    aria-label="Delete"
                    size="small"
                    onClick={() => handleDeleteClick(index)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            );
          })}
      </List>
    </>
  );
};

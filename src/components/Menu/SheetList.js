import React from 'react';

import { ChromeLogo, FigmaLogo, Windows10Logo, SketchLogo, VSCodeLogo } from '../../assets';

import { Divider, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';

import { KeyTableContext } from '../../context/KeyTableContext';

import { Folder as FolderIcon } from '@material-ui/icons';

import { clearKeySelection, setGlobalState } from '../../state';

export const SheetList = () => {
  const [selectedIndex, setSelectedIndex] = React.useState();
  const { userKTC, setDocIndex } = React.useContext(KeyTableContext);

  function handleListItemClick(event, index) {
    console.log('⭐: handleListItemClick -> index', index);
    clearKeySelection();
    setSelectedIndex(index);
    setDocIndex(index);
    setGlobalState('addMode', false);
  }

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
          userKTC.docs.map((doc, index) => (
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
            </ListItem>
          ))}
      </List>
    </>
  );
};

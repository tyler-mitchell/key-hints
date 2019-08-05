import React from 'react';
import styled from 'styled-components';

import { FlashingContext } from '../../Key/FlashingContext';
import {
  Button,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  List,
  Badge,
  Typography,
  Chip,
  Grid,
  TextField,
  makeStyles,
  Popover,
  Menu,
  MenuItem,
  IconButton,
  ToolTip,
  ClickAwayListener
} from '@material-ui/core';
import { shade } from 'polished';
import { useGlobalState, setGlobalState } from '../../../state';
import { KeyTable } from '../SheetData';
import {
  ArrowBack as LeftArrowIcon,
  ArrowForward as RightArrowIcon,
  ArrowUpward as UpArrowIcon,
  ArrowDownward as DownArrowIcon,
  Delete as DeleteIcon,
  Edit as EditIcon
} from '@material-ui/icons';

import MoreVertIcon from '@material-ui/icons/MoreVert';
import { usePopupState, bindHover, bindMenu, bindTrigger } from 'material-ui-popup-state/hooks';
import ListItemAction from './ListItemAction';

const KbdKeyList = styled(ListItem)``;

const KbdKey = styled.div`
  margin-left: auto;
  margin-right: 0;
`;
const KbdAddedKey = styled.div`
  margin-left: auto;
  margin-right: 0;
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(2rem);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  transition: all 0.4s;

  animation: fadeIn 0.4s ease-out;
`;
const KbdBadge = styled.div`
  margin-left: auto;
  margin-right: 0;
`;

const ORLabel = styled.span`
  font-size: 8px;
`;

const modifierKeys = new Set(["Ctrl", "Alt", "Shift", "Capslock", "Tab", "Win"]);
const renderIcon = keyLabel => {

  const color = modifierKeys.has(keyLabel) ? '#15191c ': '#209CEE';
  
  const iconLabels = {
    '←': (
      <LeftArrowIcon fontSize="small" style={{ display: 'inline-block', verticalAlign: 'middle' }}>
        {keyLabel}
      </LeftArrowIcon>
    ),
    '→': (
      <RightArrowIcon fontSize="small" style={{ display: 'inline-block', verticalAlign: 'middle' }}>
        {keyLabel}
      </RightArrowIcon>
    ),
    '↑': (
      <UpArrowIcon fontSize="small" style={{ display: 'inline-block', verticalAlign: 'middle' }}>
        {keyLabel}
      </UpArrowIcon>
    ),
    '↓': (
      <DownArrowIcon fontSize="small" style={{ display: 'inline-block', verticalAlign: 'middle' }}>
        {keyLabel}
      </DownArrowIcon>
    )
  };

  if (keyLabel in iconLabels) {
    return <KBD color={color}>{iconLabels[keyLabel]}</KBD>;
  } else {
    return <KBD color={color} >{keyLabel} </KBD>;
  }
};
export const renderKeys = keybind => {
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
                
                
                  {Array.isArray(keyItem[kb])
                    ? keyItem[kb].map((x, i, arr) =>
                      arr.length - 1 !== i ? (
                    
                          <span key={i}>
                            {renderIcon(x)}
                            <ORLabel> or </ORLabel>
                          </span>
                          
                        ) : (
                          renderIcon(x)
                        )
                      )
                    : renderIcon(keyItem[kb])}
               
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
const renderAddedKeys = (keybind) => {
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
              <KbdAddedKey key={index}>
                <KBD >
                  {Array.isArray(keyItem[kb])
                    ? keyItem[kb].map((x, i, arr) =>
                        arr.length - 1 !== i ? (
                          <span key={i}>
                            {renderIcon(x)}
                            <ORLabel> or </ORLabel>
                          </span>
                        ) : (
                          renderIcon(x)
                        )
                      )
                    : renderIcon(keyItem[kb])}
                </KBD>
                {index !== Object.keys(keyItem).length - 1 && '+'}
              </KbdAddedKey>
            ))}
            {/* </Badge> */}
          </KbdKeyList>
        );
      })}
    </>
  );
};

export const renderCategoryItem = (layerKey, color) => {
 
  return (
    <Grid container justify="flex-start" alignItems="center" direction="row" wrap="nowrap">
      {/* <Badge badgeContent={keyIndex+1} color="primary" variant="dot" > */}
      {layerKey.map((kb, index, array) => {
        
        return (
          <Grid item key={index}>
            <KbdKey  key={index}>
              <KBD style={{ filter: `drop-shadow(-4px 0px 0px ${color})` }}>{renderIcon(kb)}</KBD>
              {index !== layerKey.length - 1 && '+'}
            </KbdKey>
          </Grid>
        );
      })}
      {/* </Badge> */}
      </Grid>
  );
};

const KBD = styled.kbd`
  display: inline-block;
  min-width: 40px;
  min-height: auto;
  padding: 12px 12px;
  /* border: 1px solid #8a8a8a; */
  border-radius: 5px;
  /* background: linear-gradient(to bottom, #15191c 0%, #15191c 100%); */
  /* background: linear-gradient(to bottom, #209CEE 0%, #209CEE 100%); */
  background: ${({color})=> color};
  /* background-image: radial-gradient( circle farthest-corner at 10% 20%,  rgba(90,92,106,1) 0%, rgba(32,45,58,1) 81.3% ); */

  /* box-shadow: inset 0px 0px 0px 4px rgba(255, 255, 255, 1), 0px 2px 3px 0px rgba(159, 159, 159, 1); */
  /* box-shadow: 
  
  inset 0 0 0 1px #15191c,
  -.5px .5px 0px 1px rgba(0, 0, 0, 1); */
  display: inline-block;
 

  /* font-family: 'Varela Round', sans-serif; */
  font-family: 'Muli', sans-serif;
  font-size: 16px;
  font-weight: 700;
  margin: 0px 4px;
  /* background: #fff; */
  border-radius: 4px;
  /* background: radial-gradient(circle farthest-corner at -50% -50%,  #00c6ff 0%, #0072ff 100%);  */
  /* background: radial-gradient(circle farthest-corner at -50% -50%,  #15191c 0%, #15191c 100%);  */
 
  /* background-image: linear-gradient(-225deg, #FFFEFF 0%, #D7FFFE 100%);
  background-image: linear-gradient(275deg, #1d15e3 34%, #5587D8 96%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent; */
  /* box-shadow: 0px 1px 3px 1px rgba(0, 0, 0, 0.5); */
  /*Text Properties*/
  /* font: 10px Helvetica, serif ; */
  /* text-transform: uppercase; */
  text-align: center;

  color: #FFFEFF;
  /* color: white; */
`;

const ListItemContainer = () => styled(ListItem)`
  font-family: 'Nunito', sans-serif;
`;

const CategoryChip = styled(Chip)`
  transform: scale(0.85);
`;

export const KeyListItem = props => {
  const { index, openMenu, styles, text, keybind, category, shortcutObjectKey } = props;

  // const [, , activeKeys, setActiveKeys] = React.useContext(FlashingContext);

  const [, setActiveKeys] = useGlobalState('activeKeys');
  const [, setEditMode] = useGlobalState('editMode');
  const [selectedItem, setSelectedItem] = useGlobalState('selectedItem');
  const [alreadySelected, setAlreadySelected] = React.useState(false);
  const [curShortcutObjectKey] = useGlobalState('curShortcutObjectKey');
  const [selected, setSelected] = React.useState(curShortcutObjectKey === shortcutObjectKey)
  const popupState = usePopupState({ variant: 'popover', popupId: 'demoMenu' });
  React.useEffect(() => {
    if (selectedItem !== shortcutObjectKey) {
      setAlreadySelected(false);
    }
    
  }, [selectedItem]);
  const itemClicked = shortcutObjectKey => {
    // if (!alreadySelected) {
      setSelectedItem(shortcutObjectKey);
      
      setActiveKeys(keybind['key1']);
      setGlobalState('curShortcutObjectKey', shortcutObjectKey);
      setGlobalState('activeKeysIndex', shortcutObjectKey);
      setAlreadySelected(true);
      // }
      if (selectedItem !== shortcutObjectKey) {
        setEditMode(false);
      }
      console.log(`⭐: selection`, selectedItem)
      console.log(`⭐: shortcutobjectKey`, shortcutObjectKey)
      console.log(`⭐: selection === shortcutObjectKey`, selectedItem === shortcutObjectKey)
    };
    
  return (
    <ListItem
      button
      style={{ ...styles }}
      divider
      dense
      // component={Grid}
      container
      direction="row"
      // justify="center"
      
      focusRipple
      key={index}
      onClick={() => itemClicked(shortcutObjectKey)}
      selected={selectedItem === shortcutObjectKey}
    >
      {/* <Grid  item direction="row" xs={12} alignItems="center" justify="flex-end" wrap="nowrap"> */}
      <Grid item xs={4} justify="flext-start">
        <ListItemText
          primary={<Typography variant="listItem">{text}</Typography>}
          
        />
      </Grid>

      <Grid xs={8} container item justify="flex-end" direction="row">
      
        <List>{renderKeys(keybind)}</List>
      </Grid>

      <ListItemAction />

      {/* </Grid> */}
    </ListItem>
  );
};

export const NewKeyForm = ({ newKeys, category, children }) => {
  return (
    <ListItem style={{ display: 'flex', justifyContent: 'flex-start' }} divider>
      {children}

      <List>{renderAddedKeys(newKeys)}</List>
    </ListItem>
  );
};
export default KeyListItem;

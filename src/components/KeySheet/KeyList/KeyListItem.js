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
  TextField
} from '@material-ui/core';

import { useGlobalState, setGlobalState } from '../../../state';
import { KeyTable } from '../SheetData';
import {
  ArrowBack as LeftArrowIcon,
  ArrowForward as RightArrowIcon,
  ArrowUpward as UpArrowIcon,
  ArrowDownward as DownArrowIcon
} from '@material-ui/icons';

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

const renderIcon = keyLabel => {
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
    return iconLabels[keyLabel];
  } else {
    return keyLabel;
  }
};
const renderKeys = keybind => {
  

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
              </KbdKey>
            ))}
            {/* </Badge> */}
          </KbdKeyList>
        );
      })}
    </>
  );
};
const renderAddedKeys = keybind => {
  

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
                <KBD>
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

export const KeyListItem = props => {
  const { index, openMenu, styles, text, keybind, category, shortcutObjectKey } = props;

  // const [, , activeKeys, setActiveKeys] = React.useContext(FlashingContext);

  const [, setActiveKeys] = useGlobalState('activeKeys');
  const [, setEditMode] = useGlobalState('editMode');
  const [selection, setSelection] = useGlobalState('selectedItem');
  
  
  
  

  const itemClicked = index => {
    setSelection(index);
    setActiveKeys(keybind['key1']);
    setGlobalState('curShortcutObjectKey', shortcutObjectKey )
    setGlobalState('activeKeysIndex', index);
    if (selection !== index) {
      setEditMode(false);
    }
  };

  const ListWrapper = styled(ListItem)`
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
    padding: 1rem;

    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.3);
    border-radius: 3px;
    transition: all 0.4s;

    animation: fadeIn 0.4s ease-out;
    /* &:hover {
    transform: translateX(5px);
  } */
  `;

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

      <Grid container justify="flex-end" direction="row">
        <List>{renderKeys(keybind)}</List>
      </Grid>
      <Grid container xs={2} justify="flex-end" direction="row">
        <CategoryChip
          size="small"
          element={Typography}
          label={category}
          clickable
          color="primary"
        />
      </Grid>
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

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

import _ from 'lodash'
import { useTransition, animated , config} from 'react-spring';

export const KeySequence = ({ newKeys, category, children }) => {
  return (
    <ListItem style={{ display: 'flex', justifyContent: 'flex-start' }} divider>
      {children}

      <List>{renderAddedKeys(newKeys)}</List>
    </ListItem>
  );
};

const KeyItems = keyItem => {
  // const items = Object.keys(keyItem).map((k, index) => (keyItem[k]));

  const [items, setItems] = React.useState([]);

  const [newKeys, setNewKeys] = useGlobalState('newKeys');

  const [sequence, setSequence] = React.useState([]);
  const [count, setCount] = React.useState(0)

  React.useEffect(() => {
    
    setCount(count + 1)
    setSequence(_.chain(newKeys.keys.key1).toArray().value().map((v,i) => ({ kb: v, index: i})))
  },[newKeys])
  
  console.log("⭐: _.toArray(keyItem.key1)", _.toArray(newKeys.keys.key1))
  const transitions = useTransition(
    sequence,
    // _.toArray(keyItem.key1),
 
    item => item.index,
    {
      from: {
        // position: 'absolute',
        opacity: 0,
        transform: 'translate3d(0,-40px,0)'},
      enter: {
        opacity: 1,
        transform: 'translate3d(0,0px,0)'},
      leave: {
        opacity: 0,
        transform: 'translate3d(0,-40px,0)'
      },
      config: config.wobbly,
      
    }
  );

  return (
    <>
      {count && transitions.map(({ item, key, props}) => (
        <animated.div key={key} style={props}>
          {console.log("🔥: key", key)}
          {console.log('🔥: item', item)}
          {console.log('🔥: sequence', sequence)}
          <KBD style={props}>
            
               {renderIcon(item.kb)}
          </KBD>
          {item.kb !== Object.keys(keyItem).length - 1 && '+'}
        </animated.div>
      ))}
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
            <KeyItems keyItem={keyItem} />
            {/* </Badge> */}
          </KbdKeyList>
        );
      })}
    </>
  );
};

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

const KbdKeyList = styled(ListItem)``;

const KbdKey = styled.div`
  margin-left: auto;
  margin-right: 0;
`;
// const KbdAddedKey = styled.div`
//   margin-left: auto;
//   margin-right: 0;
//   @keyframes fadeIn {
//     from {
//       opacity: 0;
//       transform: translateY(2rem);
//     }
//     to {
//       opacity: 1;
//       transform: translateY(0);
//     }
//   }
//   transition: all 0.4s;

//   animation: fadeIn 0.4s ease-out;

// `;
const KbdBadge = styled.div`
  margin-left: auto;
  margin-right: 0;
`;

const ORLabel = styled.span`
  font-size: 8px;
`;

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

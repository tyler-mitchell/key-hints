import React from 'react';
import styled from 'styled-components';

import { FlashingContext } from '../../Key/FlashingContext';
import {
  IconButton,
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
  ArrowDownward as DownArrowIcon,
  Add as AddIcon
} from '@material-ui/icons';

import _ from 'lodash';
import { useTransition, animated, config, useSpring } from 'react-spring';

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
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    
    setSequence(
      _.chain(newKeys.keys.key1)
        .toArray()
        .value()
        .map((v, i) => ({ kb: v, index: i }))
    );
  }, [ newKeys]);

 
  const transitions = useTransition(
    sequence,
    // _.toArray(keyItem.key1),

    item => item.index,
    {
      from: {
        // position: 'absolute',
        opacity: 0,
        // position: 'absolute',
        transform: 'translate3d(0,-40px,0)'
      },
      enter: {
        opacity: 1,
        transform: 'translate3d(0,0px,0)'
      },
      leave: {
        opacity: 0,
        transform: 'translate3d(-30px,-40px,0)'
      },
      config: config.wobbly,
      delay: 100
    }
  );

  return (
    <div style={{ display: 'flex', flexOverflow: 'wrap', position: 'relative', padding: '1rem' }}>
      {
        transitions.map(({ item, key, props }) => (
          <animated.div
            key={key}
            style={{
              ...props,
              display: 'flex',
              // flexOverflow: 'wrap',
              position: 'relative',
              
             
            }}
          >
            

            <KBD >{renderIcon(item.kb)}</KBD>

            {item.index !== sequence.length - 1 && (
              <IconButton size="small" color="textSecondary">
                <AddIcon fontSize="small" />
              </IconButton>
            )}
          </animated.div>
        ))}
    </div>
  );
};

export const renderAddedKeys = keybind => {
  return (
    <>
      {Object.values(keybind).map((keyItem, keyIndex) => {
        return (
          
            
          <KeyItems key={keyIndex} keyItem={keyItem} />
           
         
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


const useKBDStyle = {
  display: 'inline-block',
  minWidth: 'auto',
  minHeight: 'auto',
  padding: '12px 12px',
  border: '1px solid #8a8a8a',
  borderRadius: '4px',
  boxShadow: 'inset 0px 0px 0px 4px rgba(255, 255, 255, 1), 0px 2px 0px 0px rgba(159, 159, 159, 1)',
  fontFamily: 'Nunito, sans-serif',
  margin: '0px 4px',
  background: '#fff',
  textTransform: 'uppercase',
  color: '#666'
  // /* boxShadow: '0px 1px 3px 1px rgba(0, 0, 0, 0.5) */',
  // /*Text Properties*/
  // /* font: '10px Helvetica, serif  */',
  // /* textAlign: 'center */',
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

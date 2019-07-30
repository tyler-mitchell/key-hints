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
  TextField,
  makeStyles
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
import { motion, AnimatePresence } from 'framer-motion';
import { usePrevious } from '../../hooks/helpers';
import { Paper } from '@material-ui/core';

export const KeySequence = ({ newKeys, category, children }) => {
  return (
    <ListItem style={{ display: 'flex', justifyContent: 'flex-start' }} divider>
      {children}

      <List>{renderAddedKeys(newKeys)}</List>
    </ListItem>
  );
};

const variants = {
  show: {
    opacity: 1,
    scale: 1,
    transition: {
      delay: 0.15
    }
  },
  hide: {
    opacity: 0,
    scale: 0,
    transition: {
      delay: 0.15
    }
  }
};
const pluses = {
  show: {
    opacity: 1,
    scale: 1
  },
  hide: {
    opacity: 0,
    scale: 0
  }
};
const variantContainer = {
  show: {
    opacity: 1,
    scale: 1,
    transition: {
      when: 'afterChildren',
      staggeredChildren: 0.5
    }
  },
  hide: {
    transition: {
      when: 'afterChildren',
      // delayChildren: 0.5,
      staggeredChildren: 0.5

      // staggerChildren: 0.5, delayChildren: 0.5
    }
  }
};
const useStyles = makeStyles({
  root: {
    display: 'flex',
    position: 'absolute',
    // padding: '1rem',
    // left: 10,

    top: 10,
    left: 0,
    right: 0,
    width: '90%',
    height: '80px',
    marginLeft: 'auto',
    marginRight: 'auto',
    overflow: 'hidden',
    justifyContent: 'flex-end',

    padding: '10px 10px',

    borderRadius: '5px',

    alignItems: 'center'
    // borderRadius: 0
  },
  buttonGroup: {
    borderRadius: '13px'
  },
  input: {
    marginLeft: 8,
    flex: 1
  },
  iconButton: {
    padding: 10
  },
  divider: {
    width: 1,
    height: 38,
    margin: 6
  },
  chip: { button: { marginRight: '15px' } }
});

const KeyItems = keyItem => {
  // const items = Object.keys(keyItem).map((k, index) => (keyItem[k]));
  const classes = useStyles();
  const [items, setItems] = React.useState([]);

  const [newKeys, setNewKeys] = useGlobalState('newKeys');

  const [sequence, setSequence] = React.useState([]);
  const [count, setCount] = React.useState(0);
  const prevSequence = usePrevious(sequence);
  React.useEffect(() => {
    setSequence(
      _.chain(newKeys.keys.key1)
        .toArray()
        .value()
        .map((v, i) => ({ kb: v, index: i }))
    );
   
  }, [newKeys]);

  return (
    <AnimatePresence>
      {sequence.map((shortcut, index) => (
        <motion.div
          initial="hide"
          animate="show"
          exit="hide"
          positionTransition
          variants={variantContainer}
          key={shortcut.kb + 'container'}
          style={{
            display: 'flex',
            position: 'relative',

            // overflow: 'hidden',
            justifyContent: 'center'
          }}
        >
          <motion.div
            key={shortcut.kb}
            variants={variants}
            positionTransition
            style={{
              display: 'flex',

              // flexOverflow: 'wrap',
              position: 'relative'
            }}
          >
            <KBD>{renderIcon(shortcut.kb)}</KBD>
          </motion.div>

          <motion.div
            positionTransition
            key={shortcut.index}
            initial={false}
            animate={shortcut.index !== sequence.length - 1 ? 'show' : 'hide'}
            variants={pluses}
            style={{
              display: 'flex',
              // flexOverflow: 'wrap',
              position: 'relative'
            }}
          >
            <IconButton size="small" color="textSecondary">
              <AddIcon fontSize="small" />
            </IconButton>
          </motion.div>
        </motion.div>
      ))}
    </AnimatePresence>
  );
};

export const renderAddedKeys = keybind => {
  return (
    <>
      {Object.values(keybind).map((keyItem, keyIndex) => {
        return <KeyItems key={keyIndex} keyItem={keyItem} />;
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

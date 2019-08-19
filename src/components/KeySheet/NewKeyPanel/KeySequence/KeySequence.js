import React from 'react';
import styled from 'styled-components';

import { FlashingContext } from '../../../Key/FlashingContext';
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
import {
  usePopupState,
  bindToggle,
  bindPopper
} from 'material-ui-popup-state/hooks';

import { makeStyles } from '@material-ui/core/styles';

import { KeyTable } from '../../SheetData';
import {
  ArrowBack as LeftArrowIcon,
  ArrowForward as RightArrowIcon,
  ArrowUpward as UpArrowIcon,
  ArrowDownward as DownArrowIcon,
  Add as AddIcon
} from '@material-ui/icons';

import _ from 'lodash';
import { useTransition, animated, config, useSpring } from 'react-spring';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { usePrevious } from '../../../hooks/helpers';
import { RenderIcon } from '../../KeyList/KeyListItem';
import { black } from '../../../design-system/theme/common';
import theme from '../../../design-system/theme';
import { CombineAction } from './KeySequenceAction/ActionButtons/ActionButtons';
import { useSequenceStyles } from './KeySequence.style';

import TouchRipple from '@material-ui/core/ButtonBase/TouchRipple';
import { KeySequenceStatus } from './KeySequenceStatus/KeySequenceStatus';
import KeySequenceAction from './KeySequenceAction/KeySequenceAction';
import { useGlobalState } from '../../../../state';

const variants = {
  show: {
    opacity: 1,
    scale: 1,
    transition: {
      // duration: 1,

      delay: 0.15
    }
  },
  hide: {
    opacity: 0,
    scale: 0,
    transition: {
      // when: "beforeCh"
      // duration: 0.3// default
      ease: 'anticipate',
      delay: 0.15
    }
  }
};
const actionVariants = {
  show: {
    opacity: 1,
    scale: 1,
    transition: {
      type: 'spring',
      // ease: 'backInOut',
      // duration: 0.3,
      // damping: 10,
      // mass: 0.5,
      stiffness: 200,
      velocity: 8,
      // duration: 0.3
      restSpeed: 11
    }
  },
  hide: {
    opacity: 0,
    scale: 0,
    transition: {
      type: 'tween',
      ease: 'backInOut',
      velocity: 5,
      // duration: 0.2,
      damping: 400
      // ease: 'anticipate',

      // stiffness: 20,
      // restDelta: 2
      // velocity: 10
    }
  }
};
const hideVariant = {
  show: {
    opacity: 0,
    scale: 0
  },
  hide: {
    opacity: 0,
    scale: 0
  }
};
const variantContainer = {
  show: {
    // opacity: 1,
    // scale: 1,
    transition: {
      when: 'afterChildren',
      staggeredChildren: 1,
      duration: 1
    }
  },
  hide: {
    transition: {
      when: 'afterChildren',
      // delayChildren: 0.5,
      duration: 1
      // staggerChildren: 0.5, delayChildren: 0.5
    }
  }
};

const Sequence = keyItem => {
  // const items = Object.keys(keyItem).map((k, index) => (keyItem[k]));
  const classes = useSequenceStyles();
  const [items, setItems] = React.useState([]);

  const [newKeys, setNewKeys] = useGlobalState('newKeys');
  const [keyLabelAdded, setKeyLabelAdded] = useGlobalState('keyLabelAdded');
  // const [isActionHovered, setIsActionHovered] = useGlobalState('isActionHovered');
  const [sequence, setSequence] = React.useState([]);
  const [renderSequence, setRenderSequence] = React.useState([]);
  const [len, setLen] = React.useState(null);
  const prevSequence = usePrevious(sequence);
  const [curVariant, setCurVariant] = React.useState(actionVariants);

  React.useEffect(() => {
    const result = _.chain(newKeys.keys.key1)
      .toArray()
      .value()
      .reduce((result, keybind, index, arr) => {
        const isAction = index !== arr.length - 1;
        const key = keybind;

        result.push({ kb: keybind, isAction: false, index: index, key });
        if (index !== arr.length - 1) {
          result.push({ isAction, key: keybind + 'index' });
        }
        return result;
      }, []);
    setSequence(result);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newKeys]);

  return (
    <AnimatePresence>
      {sequence.map((shortcut, index) => {
        return (
          <motion.div
            initial="hide"
            animate="show"
            exit="hide"
            positionTransition
            variants={shortcut.isAction ? actionVariants : variants}
            key={shortcut.key}
            style={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {shortcut.kb && <RenderIcon keyLabel={shortcut.kb} height="46px" />}

            {shortcut.isAction && <KeySequenceAction />}
          </motion.div>
        );
      })}
    </AnimatePresence>
  );
};

export const KeySequence = props => {
  const { isEmpty, ...others } = props;
  return (
    <div
      style={{
        display: 'flex',
        position: 'relative',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
      }}
      container
      justify="center"
      alignItems="center"
    >
      <Instruction isEmpty={isEmpty} />
      <KeySequenceContainer {...others} />
    </div>
  );
};

const StyledKeySequenceContainer = styled(motion.div)`
  display: flex;
  width: 100%;
  height: 76px;
  position: relative;
  align-self: center;
  align-items: center;
  justify-content: center;
  border-radius: 8px;

  background-image: radial-gradient(
    circle farthest-corner at 0% 0.5%,
    rgb(247, 247, 248) 0.1%,
    rgb(244, 245, 245) 100.2%
  );
`;
const KeySequenceContainer = ({ isEmpty, newKeys, isKeyAvailable }) => {
  return (
    <AnimatePresence>
      {!isEmpty && (
        <StyledKeySequenceContainer
          key="keysequence"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {Object.values(newKeys).map((keyItem, keyIndex) => {
            return <Sequence key={keyIndex} keyItem={keyItem} />;
          })}
          <KeySequenceStatus
            isEmpty={isEmpty}
            isKeyAvailable={isKeyAvailable}
          />
        </StyledKeySequenceContainer>
      )}
    </AnimatePresence>
  );
};

const Instruction = ({ isEmpty }) => {
  return (
    <>
      <AnimatePresence>
        {isEmpty && (
          <motion.div
            key="info"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ position: 'absolute' }}
          >
            <Typography color="textSecondary">
              Click the keyboard to add a shortcut
            </Typography>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

import React from 'react';
import { motion } from 'framer-motion';
import { StyledActionButton } from './ActionButton.style';
import { Fab } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { Typography, ButtonBase } from '@material-ui/core';
import {
  AddRounded as CombineIcon,
  KeyboardArrowRightRounded as ThenIcon
} from '@material-ui/icons';
import TouchRipple from '@material-ui/core/ButtonBase/TouchRipple';
import { transparentize } from 'polished';
import { bindHover } from 'material-ui-popup-state/core';

const actionButtonVariants = {
  initial: {
    scale: 0,
    opacity: 0
  },
  showCombine: {
    width: '20px',
    scale: 1,
    opacity: 1
  },
  showThen: {
    scale: 1,
    opacity: 1,

    // width: '50px'
    width: '20px'
  }
};
const actionContentVariants = {
  initial: {
    opacity: 0
  },
  showCombine: {
    opacity: 1,
    transition: { delay: 0.3 }
  },
  showThen: {
    opacity: 1,
    transition: { delay: 0.3 }
  }
};

const ActionButton = ({ key, variantType, children, borderRadius }) => {
  return (
    <StyledActionButton
      // positionTransition
      key={key}
      // borderRadius={borderRadius}
      positionTransition
      initial="initial"
      exit="initial"
      animate={variantType}
      variants={actionButtonVariants}
    >
      {children}
    </StyledActionButton>
  );
};
export const CombineAction = ({ key, onClick }) => {
  return (
    <ActionButton key={key} variantType="showCombine" borderRadius={'50%'}>
      <CombineIcon
        color="textSecondary"
        style={{ width: '100%', selfAlign: 'center', color: 'gray' }}
        fontSize="small"
      />
    </ActionButton>
  );
};
export const ThenAction = ({ key, onClick }) => {
  return (
    <ActionButton
      key={key}
      variantType="showThen"
      borderRadius={'50%'}
      // padding="0px 10px"
    >
      <ThenIcon
        color="textSecondary"
        style={{ width: '100%', selfAlign: 'center', color: 'gray' }}
        fontSize="small"
      />
    </ActionButton>
  );
};

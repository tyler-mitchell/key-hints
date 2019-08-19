import React from 'react';
import { motion } from 'framer-motion';
import { StyledActionButton } from './ActionButton.style';
import { Fab } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { Typography, ButtonBase } from '@material-ui/core';
import { Add as AddIcon } from '@material-ui/icons';
import TouchRipple from '@material-ui/core/ButtonBase/TouchRipple';

const ActionButton = ({ key, children, borderRadius }) => {
  return (
    <motion.div
    // key={key}
    // animate={{ opacity: 1 }}
    // initial={{ opacity: 0 }}
    // exit={{ opacity: 0 }}
    // positionTransition
    >
      <StyledActionButton>{children}</StyledActionButton>
    </motion.div>
  );
};
export const CombineAction = ({ onClick }) => {
  return (
    <ActionButton key="COMBINE">
      <AddIcon
        style={{ width: '100%', selfAlign: 'center' }}
        fontSize="small"
      />
    </ActionButton>
  );
};
export const ThenAction = ({ onClick }) => {
  return (
    <ActionButton key="THEN" borderRadius="10px">
      <Typography fontSize="small" color="textSecondary">
        then
      </Typography>
    </ActionButton>
  );
};

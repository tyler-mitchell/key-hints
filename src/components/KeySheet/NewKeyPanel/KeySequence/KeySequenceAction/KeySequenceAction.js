import React from 'react';
import { useAnimation, motion, AnimatePresence } from 'framer-motion';
import {
  bindToggle,
  bindPopper,
  usePopupState
} from 'material-ui-popup-state/hooks';

import { CombineAction, ThenAction } from './ActionButtons/ActionButtons';

import theme from '../../../../design-system/theme';
import { useSequenceStyles } from '../KeySequence.style';
import { ListItem } from '@material-ui/core';
import { Paper } from '@material-ui/core';
import ActionMenu from './ActionMenu/ActionMenu';
import { bindTrigger } from 'material-ui-popup-state';
import { bindHover } from 'material-ui-popup-state/core';
import { hideText } from 'polished';
const KeySequenceAction = ({
  key,
  endOfArray,
  initial,
  animate,
  actionPresent,
  variants,
  exit
}) => {
  const classes = useSequenceStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  function handleClick(event) {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  }
  const [isPresent, setIsPresent] = React.useState(actionPresent);
  React.useEffect(() => {}, [actionPresent]);

  const controls = useAnimation();
  const handleActionClick = action => {
    setActionType(action);
    controls.start();
    setTimeout(() => {
      popupState.close();
    }, 500);
  };
  const popupState = usePopupState({
    variant: 'popper',
    popupId: 'demoPopper'
  });
  const [actionType, setActionType] = React.useState('COMBINE');

  const id = 'simple-popper';

  return (
    <>
      <div
        // positionTransition
        // positionTransition
        // key={key}
        // initial={{ opacity: 0, scale: 0 }}
        // animate={{ opacity: 1, scale: 1 }}
        // exit={{ opacity: 0, scale: 0 }}
        // transition={{ delay: 1 }}
        // variants={variants}
        {...bindHover(popupState)}
        style={{
          display: 'flex',
          position: 'relative'
        }}
      >
        {actionType === 'COMBINE' && (
          <CombineAction onClick={handleActionClick} />
        )}
        {actionType === 'THEN' && <ThenAction onClick={handleActionClick} />}
      </div>

      <ActionMenu
        classes={classes}
        popupState={popupState}
        actionType={actionType}
        setActionType={setActionType}
      />
    </>
  );
};

export default KeySequenceAction;

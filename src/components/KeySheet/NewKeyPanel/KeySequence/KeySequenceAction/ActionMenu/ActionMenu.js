import React from 'react';
import { ArrowPopper } from './ArrowPopper';
import theme from '../../../../../design-system/theme';
import { bindPopper, bindPopover } from 'material-ui-popup-state';
import { motion } from 'framer-motion';
import { Fade } from '@material-ui/core';
import { ListItem } from '@material-ui/core';
import { Paper } from '@material-ui/core';
import { bindMenu } from 'material-ui-popup-state/hooks';

const ActionMenu = ({
  actionType,
  setActionType,
  classes,
  popupState,
  handleActionClick
}) => {
  const [arrowRef, setArrowRef] = React.useState(null);
  function handleListItemClick(id) {
    setActionType(id);
    popupState.close();
  }
  return (
    <ArrowPopper
      transition
      elevation={0}
      color={actionType === 'COMBINE' ? theme.palette.action.selected : 'white'}
      className={classes.popper}
      id="action-menu"
      {...bindMenu(popupState)}
      placement="top"
      disablePortal={false}
      modifiers={{
        arrow: {
          enabled: true,
          element: arrowRef
        }
      }}
    >
      {({ TransitionProps }) => (
        <Fade {...TransitionProps} timeout={350}>
          <motion.div
          // initial={{ opacity: 0 }}
          // animate={
          //   popupState.isOpen ? { opacity: 1, y: -6 } : { opacity: 0, y: 0 }
          // }
          >
            <Paper className={classes.paper} transition transitionDelay={10}>
              <span className="arrow" ref={setArrowRef} />
              <div>
                <ListItem
                  onClick={() => handleListItemClick('THEN')}
                  selected={actionType === 'THEN'}
                  alignItems="center"
                  dense
                  button
                  style={{
                    height: '20px',
                    display: 'flex',
                    justifyContent: 'center',
                    textAlign: 'center'
                  }}
                >
                  then
                </ListItem>
                <ListItem
                  onClick={() => handleListItemClick('COMBINE')}
                  selected={actionType === 'COMBINE'}
                  dense
                  button
                  style={{
                    height: '20px',
                    textAlign: 'center',
                    justifyContent: 'center'
                  }}
                >
                  +
                </ListItem>
              </div>
            </Paper>
          </motion.div>
        </Fade>
      )}
    </ArrowPopper>
  );
};

export default ActionMenu;

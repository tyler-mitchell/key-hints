import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import FileCopyIcon from '@material-ui/icons/FileCopyOutlined';
import SaveIcon from '@material-ui/icons/Save';
import PrintIcon from '@material-ui/icons/Print';
import ShareIcon from '@material-ui/icons/Share';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { makeStyles, Popover, Menu, MenuItem, IconButton } from '@material-ui/core';
import { usePopupState, bindTrigger, bindMenu } from 'material-ui-popup-state/hooks';
import { KeyTableContext } from '../../../context/KeyTableContext'



const useStyles = makeStyles(theme => ({
  root: {
    height: 380
  },
  speedDial: {
    position: 'relative',
    bottom: theme.spacing(2),
    right: theme.spacing(3),

    actions: {
      position: 'absolute'
    },
    actionsClosed: {
      position: 'absolute'
    }
  },
  button: {},

  speedDialButton: {}
}));

const ListItemAction = () => {
  const popupState = usePopupState({
    variant: 'popover',
    popupId: 'demoPopover'
  });

  const {deleteShortcut}  = React.useContext(KeyTableContext)

  const handleDeleteClick = () => {
    popupState.close()
    deleteShortcut();

  }
  return (
    <>
      <IconButton edge="end" aria-label="Edit-shortcut" {...bindTrigger(popupState)}>
        <MoreVertIcon />
      </IconButton>
      {/* <DeleteIcon/> */}

      <Menu
        {...bindMenu(popupState)}
        getContentAnchorEl={null}
        useLayerForClickAway={false}
        disableGutters
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
      >
        <MenuItem onClick={popupState.close}>Edit</MenuItem>
        <MenuItem onClick={()=>handleDeleteClick()}>Delete</MenuItem>
      </Menu>
    </>
  );
};

export default ListItemAction;

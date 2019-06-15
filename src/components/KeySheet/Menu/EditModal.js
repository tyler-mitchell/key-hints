import React from 'react';
import { Menu, MenuList, ClickAwayListener, MenuItem } from '@material-ui/core';
import ListMenu from './ListMenu';
import styled from 'styled-components';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import Grow from '@material-ui/core/Grow';
import Fade from '@material-ui/core/Fade';

const MList = styled(Menu)`
  display: 'flex';
  width: 50px;
  height: 100px;
  position: relative;
  flex-direction: 'row';
  padding: 0;
`;

const MenuPopper = styled(Popper)`



`;
const EditModal = props => {
  const { menuAnchor, menuItem, handleMenuClose } = props;
  const menuContent = <ListMenu />;

  const handleSave = () => {
    handleMenuClose();
  };

  const handleCancel = () => {};
  return (
    <Popper open={Boolean(menuAnchor)} anchorEl={menuAnchor} placement="left" transition >
      {({ TransitionProps, placement }) => (
        <Fade {...TransitionProps} timeout={350}>
          <Paper id="menu-list-grow">

            <MenuList
              anchorOrigin={{ vertical: 'center', horizontal: 'left' }}
              transformOrigin={{ vertical: 'center', horizontal: 'right' }}
              disablePortal={false}
            >
              <MenuItem color="primary" onClick={handleSave}>Save</MenuItem>
              <MenuItem onClick={handleMenuClose}>Cancel</MenuItem>
            </MenuList>

          </Paper>
        </Fade>
      )}
    </Popper>

    // <HorizontalMenu
    //   anchorEl={menuAnchor}
    //   open={Boolean(menuAnchor)}
    //   onClose={handleMenuClose}
    //   anchorOrigin={{ vertical: 'center', horizontal: 'left' }}
    //   transformOrigin={{ vertical: 'center', horizontal: 'right' }}
    //   elevation={20}
    //   disableEnforceFocus={true}
    // >
    //   {menuContent}
    // </HorizontalMenu>
  );
};

export default EditModal;

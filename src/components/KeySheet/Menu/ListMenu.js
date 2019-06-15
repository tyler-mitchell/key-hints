import React from 'react';
import { MenuItem } from '@material-ui/core';

const ListMenu = props => {
  return (
    <>
      <MenuItem onClick={() => console.log('menu item 1')}>Save</MenuItem>
      <MenuItem onClick={() => console.log('menu item 1')}>Cancel</MenuItem>
    </>
  );
};

export default ListMenu;

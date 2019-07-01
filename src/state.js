import { createGlobalState } from 'react-hooks-global-state';
import React from 'react';

import { useSpring, animated, config } from 'react-spring';
import useColorLoop from './components/Key/useColorLoop';

const { GlobalStateProvider, setGlobalState, useGlobalState } = createGlobalState({

  activeKeys: {},
  editMode: false,
  flashing: {},
  keyTable: null,
  loadingKTC: true,
  errorKTC: null,
  drawerState: false,
  loading: true,
  listRef: {},
  user: { user: null },
  selectedItem: null,
  addMode: false,
  
  newKeys: {
    keys: { key1: {} },
    description: 'no description',
    category: 'none'
  }
    

});


export const clearKeySelection = () => {
  setGlobalState('selectedItem', null)
  setGlobalState('activeKeys', {})
 

}

export { GlobalStateProvider, useGlobalState, setGlobalState };
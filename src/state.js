import { createGlobalState } from 'react-hooks-global-state';
import React from 'react';

import { useSpring, animated, config } from 'react-spring';
import useColorLoop from './components/Key/FlashingKey';

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
  selectedCategoryIndex: -1,
  addMode: false,
  
  newKeys: {
    keys: { key1: {} },
    description: 'no description',
    category: 'none'
  },
  sheetCategory: 'All'
    

});



export const clearKeySelection = () => {
  setGlobalState('selectedItem', null)
  setGlobalState('activeKeys', {})
  setGlobalState('newKeys', v => ({ ...v, keys: {key1: {}} }))


  
  
 
 

}

export { GlobalStateProvider, useGlobalState, setGlobalState };
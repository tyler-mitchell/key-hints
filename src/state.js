import { createGlobalState } from 'react-hooks-global-state';
import React from 'react';

import { useSpring, animated, config } from 'react-spring';
import useColorLoop from './components/Key/FlashingKey';

const { GlobalStateProvider, setGlobalState, useGlobalState } = createGlobalState({

  activeKeys: {},
  activeKeysIndex: null,
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
  selectedKeySheet: 0,
  addMode: false,
  keyMapMode: false,
  activeLayers: null,
  keyTopRef: null,
  
  newKeys: {
    keys: { key1: {} },
    description: 'no description',
    category: 'none'
  },
  sheetCategory: 'All',
  sheetNames: {},
  curShortcutObjectKey: null
    

});



export const clearKeySelection = () => {
  setGlobalState('selectedItem', null)
  setGlobalState('activeKeys', {})
  setGlobalState('newKeys', v => ({ ...v, keys: { key1: {} } }))
}

export const selectNewSheet = (index) => {
  setGlobalState('selectedItem', null)
  setGlobalState('activeKeys', {})
  setGlobalState('newKeys', v => ({ ...v, keys: { key1: {} } }))
  setGlobalState('selectedKeySheet', index)

}

export { GlobalStateProvider, useGlobalState, setGlobalState };
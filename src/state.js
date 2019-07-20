import { createGlobalState } from 'react-hooks-global-state';
import React from 'react';

import { useSpring, animated, config } from 'react-spring';
import useColorLoop from './components/Key/FlashingKey';

// FAVORITES:
// 'Raleway, sans-serif', 
const fonts = [
  'Hammersmith One, sans-serif',
  'Karla, sans-serif',
  'Basic, sans-serif',
  'Ramabhadra, sans-serif',
  'NTR, sans-serif',
  'K2D, sans-serif',
  ]
  
// const fonts = [
//   'Karla, sans-serif',
//   'Raleway, sans-serif',
//   'Noto Sans, sans-serif',
//   'Fira Sans, sans-serif',
//   'Heebo, sans-serif',
//   'Fira Sans Condensed, sans-serif',
//   'Maven Pro, sans-serif',
//   'Hammersmith One, sans-serif',
//   'DM Sans, sans-serif',
//   'Tauri, sans-serif',
//   'Basic, sans-serif',
//   'IBM Plex Sans Condensed, sans-serif',
//   'Ramabhadra, sans-serif',
//   'K2D, sans-serif',
//   'NTR, sans-serif',
//   'Maven Pro, sans-serif',
//   'Saira, sans-serif',
//   'ZCOOL QingKe HuangYou, cursive',
//   ]
// const fonts = [
//   'Karla, sans-serif',
//   'Fira Sans Condensed, sans-serif',
//   'DM Sans, sans-serif',
//   ]
  
  
  
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
  allLayers: null,
  layerKeys: [],
  activeLayerIndices: new Set([]),
  keyTopTextRefs: {},
  activeKeyMapKeys: [],
  lastKeyRef: null,
  
  newKeys: {
    keys: { key1: {} },
    description: 'no description',
    category: 'none',
    keyDescription: ''
  },
  sheetCategory: 'All',
  sheetNames: {},
  curShortcutObjectKey: null,
  devFonts: fonts,
  currentFont: 'Encode Sans Expanded, sans-serif',
    

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

export const cycleFonts = () => {

}
export { GlobalStateProvider, useGlobalState, setGlobalState };



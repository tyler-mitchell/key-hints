import { createGlobalState } from 'react-hooks-global-state';
import React from 'react';

import { useSpring, animated, config } from 'react-spring';
import useColorLoop from './components/Key/useColorLoop';

const { GlobalStateProvider, setGlobalState, useGlobalState } = createGlobalState({

  activeKeys: [],
  editMode: false,
  flashing: {},
  keyTable: {},
  drawerState: false,
  loading: true
});




export { GlobalStateProvider, useGlobalState, setGlobalState };
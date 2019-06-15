import React from 'react';
import { usePrevious } from './usePrevious';

export const SelectionContext = React.createContext({});

export const SelectionProvider = ({ children }) => {

  const [selection, setSelection] = React.useState(null);
  // const previousSelection = usePrevious(selection);

  const selectContexts = [
    selection, setSelection
  ];
  return <SelectionContext.Provider value={selectContexts}>{children}</SelectionContext.Provider>;
};

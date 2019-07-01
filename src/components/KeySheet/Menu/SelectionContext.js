import React from 'react';


export const SelectionContext = React.createContext({});

export const SelectionProvider = ({ children }) => {

  const [selection, setSelection] = React.useState(null);


  const selectContexts = [
    selection, setSelection
  ];
  return <SelectionContext.Provider value={selectContexts}>{children}</SelectionContext.Provider>;
};

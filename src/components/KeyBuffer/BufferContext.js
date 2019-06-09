import React from 'react';

export const BufferContext = React.createContext({});

export const BufferProvider = ({ children }) => {

  const [keys, setKeys] = React.useState([]);
  const [activeKeys, setActiveKeys] = React.useState([]);

  const keyContexts = [
    keys,
    setKeys,
    activeKeys,
    setActiveKeys,
  ];
  return <BufferContext.Provider value={keyContexts}>{children}</BufferContext.Provider>;
};

import React from 'react';

export const BufferContext = React.createContext();

export const BufferProvider = ({ children }) => {
  const [keys, setKeys] = React.useState([]);
  return <BufferContext.Provider value={[keys, setKeys]}>{children}</BufferContext.Provider>;
};

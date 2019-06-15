import React from 'react';
import { KeyTable } from '../KeySheet/SheetData';
import { useSpring, animated, config } from 'react-spring';
export const BufferContext = React.createContext({});

export const BufferProvider = ({ children }) => {
  const [activeKeys, setActiveKeys] = React.useState([]);
  const [keys, setKeys] = React.useState(activeKeys);
  const [editMode, setEditMode] = React.useState(false);
  const [keyTable, setKeyTable] = React.useState(KeyTable);

  const not = x => !x;
  const useSpringLoop = ({ from, to }) => {
    const [reverse, setReverse] = React.useState(false);

    return useSpring({
      reset: true,
      reverse,
      from,
      to,

      onRest: () => setReverse(not)
    });
  };


  const useColorLoop = () => {
    return  useSpringLoop(editMode ? {
      from: { opacity: 0.75 },
      to: { opacity: 1 },
      config: config.gentle
    } : {});

  };
  const flashLoop = useColorLoop();

  const keyContexts = [keys, setKeys, activeKeys, setActiveKeys, editMode, setEditMode, flashLoop];
  return <BufferContext.Provider value={keyContexts}>{children}</BufferContext.Provider>;
};

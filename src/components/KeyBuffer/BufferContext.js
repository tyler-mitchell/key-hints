import React from 'react';
import { KeyTable } from '../KeySheet/SheetData';
import { useSpring, animated, config } from 'react-spring';
import { useGlobalState } from '../../state';

export const BufferContext = React.createContext({});

export const BufferProvider = ({ children }) => {
  
  

  // const uav = () => {
  //   const [editMode] = useGlobalState('editMode');
   
  //   const not = x => !x;
  //   const useSpringLoop = ({ from, to }) => {
  //     const [reverse, setReverse] = React.useState(false);
  
  //     return useSpring({
  //       reset: true,
  //       reverse,
  //       from,
  //       to,
  
  //       onRest: () => setReverse(not)
  //     });
  //   };
  
  //   return useSpringLoop(

  //     editMode
  //       ? {
  //           from: { opacity: 0.75 },
  //           to: { opacity: 1 },
  //           config: config.gentle
  //         }
  //       : {}
  //   );
  // };


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
    const [editMode] = useGlobalState('editMode');
    return  useSpringLoop(editMode ? {
      from: { opacity: 0.75 },
      to: { opacity: 1 },
      config: config.gentle
    } : {});

  };
  const flashLoop = useColorLoop();
 

 
  return <BufferContext.Provider value={[flashLoop]}>{children}</BufferContext.Provider>;
};

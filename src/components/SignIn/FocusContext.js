import React from 'react';

export const FocusContext = React.createContext()


export const FocusProvider = ({children}) => {
  const focusedIndex = React.useState(null)
  return (

     <FocusContext.Provider value={focusedIndex}>{children}</FocusContext.Provider>

  );

}

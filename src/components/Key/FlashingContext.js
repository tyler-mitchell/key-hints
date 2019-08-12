import React from "react";
import { KeyTable } from "../KeySheet/SheetData";
import { useSpring, animated, config } from "react-spring";
import { useGlobalState } from "../../state";

export const FlashingContext = React.createContext({});

export const FlashingProvider = ({ children }) => {
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
    const [editMode] = useGlobalState("editMode");
    return useSpringLoop(
      editMode
        ? {
            from: { opacity: 0.75 },
            to: { opacity: 1 },
            config: config.molasses
          }
        : {}
    );
  };
  const flashLoop = useColorLoop();

  return (
    <FlashingContext.Provider value={[flashLoop]}>
      {children}
    </FlashingContext.Provider>
  );
};

import React from "react";
import { VariableSizeList, areEqual } from "react-window";
import { List } from "@material-ui/core";
import KeyListItem from "./KeyListItem";
import { KeyTable } from "../SheetData";
import { Virtuoso } from "react-virtuoso";
import { setGlobalState, useGlobalState } from "../../../state";

const itemSize = index => {
  return KeyTable[index].keys.length * 10 + 40;
};
const Row = React.memo(
  ({ keyTableKeys, keyTable, data, index, style, listRef, ...others }) => {
    const shortcutObjectKey = keyTableKeys[index];

    // _.orderBy

    return (
      <KeyListItem
        index={index}
        styles={style}
        listRef={listRef}
        text={keyTable[shortcutObjectKey].description}
        keybind={keyTable[shortcutObjectKey].keys}
        category={keyTable[shortcutObjectKey].category}
        shortcutObjectKey={shortcutObjectKey}
        {...others}
      />
    );
  },
  areEqual
);

const KeyList = props => {
  const { height, ...others } = props;
  let listRef = React.useRef();
  const [selectedIndex, setSelectedIndex] = useGlobalState("selectedItemIndex");
  const itemCount = others.keyTableKeys.length;
  const [arrowStep, setArrowStep] = React.useState();
  const [arrowPressed, setArrowPressed] = React.useState(false);

  const handleKeyDown = event => {
    if (event.key === "ArrowDown") {
      event.preventDefault(); // prevent default to prevent unwanted scrolling
      if (selectedIndex === null) {
        setSelectedIndex(0);
      } else {
        // uses `Math.min` to ensure the selectedIndex does not go out of bounds
        if (itemCount - 1 > selectedIndex) {
          setSelectedIndex(selectedIndex + 1);
        }
      }
    }

    if (event.key === "ArrowUp") {
      event.preventDefault(); // prevent default to prevent unwanted scrolling
      if (selectedIndex === null) {
        setSelectedIndex(0);
      } else {
        // uses `Math.max` to ensure the selectedIndex does not go out of bounds
        if (selectedIndex > 0) {
          setSelectedIndex(selectedIndex - 1);
        }
        // setSelectedIndex(Math.max(0, selectedIndex - 1));
      }
    }
  };
  // for when div loses focus

  // Re-cache list size when table changes
  // React.useEffect(() => {
  //   const list = listRef.current;
  //   if (!list) {
  //     return;
  //   }
  //   if (!selectedIndex) {
  //     return;
  //   }
  //   list.scrollToItem(selectedIndex);
  // }, [arrowPressed, selectedIndex]);

  React.useLayoutEffect(() => {
    // listRef.current.resetAfterIndex(0, false);
    setGlobalState("listRef", listRef);
  }, [others.keyTable]);

  return (
    <Virtuoso
      item={index => <Row index={index} {...others} />}
      style={{ width: "100%", height: "400px" }}
      totalCount={itemCount}

      // height={height}
      // // height={360}
      // itemCount={itemCount}
      // itemSize={index => {
      //   return 50;
      // }}
      // minIndex
      // outerElementType={List}
      // ref={listRef}
      // itemData={others}
    />
  );
};

export default KeyList;

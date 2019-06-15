import React from "react";
import { FixedSizeList } from "react-window";
import { List } from "@material-ui/core";
import KeyListItem from "./KeyListItem";
import { KeyTable } from '../SheetData';
import {SelectionProvider} from './SelectionContext'

const itemSize = (index) => {
  return KeyTable[index].keys.length * 10 + 40;
};
const Row = ({ data, index, style,  keyCategory, ...others}) => {

  return (
    <KeyListItem
      index={index}
      styles={style}
      text={data[index].description}
      keybind={data[index].keys}
      {...others}


    />
  );
};

const KeyList = props => {
  const { height, selection, keyCategory, keyTable, ...others } = props;

  return (
    <SelectionProvider>

    <FixedSizeList
      height={height}
      itemCount={keyTable.length}
      itemSize={46}
      outerElementType={List}
      itemData={keyTable}

        keyCategory={keyCategory}
      {... others}


      >
        {Row}
      </FixedSizeList>
    </SelectionProvider>

  );
};

export default KeyList;

import React from 'react';
import { VariableSizeList } from 'react-window';
import { List } from '@material-ui/core';
import KeyListItem from './KeyListItem';
import { KeyTable } from '../SheetData';
import { SelectionProvider } from './SelectionContext';

const itemSize = index => {
  return KeyTable[index].keys.length * 10 + 40;
};
const Row = props => {
  const { data, index, style, ...others } = props;
  const { keyTable } = data;
  console.log('TCL: Row -> data', data);
  console.log('TCL: Row -> others', others);

  return (
    <KeyListItem
      index={index}
      styles={style}
      text={keyTable[index].description}
      keybind={keyTable[index].keys}
      {...data}
      
    />
  );
};

const KeyList = props => {
  const { height, ...others } = props;
  console.log('TCL: others', others);


  return (
    <SelectionProvider>
      <VariableSizeList
        height={height}
        itemCount={others.keyTable.length}
        itemSize={index => Object.keys(others.keyTable[index].keys).length * 50 }
        outerElementType={List}

        itemData={others}
      >
        {Row}
      </VariableSizeList>
    </SelectionProvider>
  );
};

export default KeyList;

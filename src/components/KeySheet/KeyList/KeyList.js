import React from 'react';
import { VariableSizeList } from 'react-window';
import { List } from '@material-ui/core';
import KeyListItem from './KeyListItem';
import { KeyTable } from '../SheetData';

import { setGlobalState } from '../../../state';

const itemSize = index => {
  return KeyTable[index].keys.length * 10 + 40;
};
const Row = props => {
  const { data, index, style, ...others } = props;
  const { keyTableKeys, keyTable } = data;
  
  const shortcutObjectKey = keyTableKeys[index]
  


  
  // _.orderBy
  

  return (
    <KeyListItem
      index={index}
      
      styles={style}
      text={keyTable[shortcutObjectKey].description}
      keybind={keyTable[shortcutObjectKey].keys}
      category={keyTable[shortcutObjectKey].category}
      shortcutObjectKey={shortcutObjectKey}
      
      {...data}

    />
  );
};

const KeyList = props => {
  const { height, ...others } = props;
  let listRef = React.useRef();
  setGlobalState('listRef', listRef)
  
  
  // Re-cache list size when table changes
  React.useEffect(() => {
    listRef.current.resetAfterIndex(0, false);
  }, [others.keyTable])
  
  
  
  return (

      <VariableSizeList
        height={height}
        itemCount={others.keyTableKeys.length}
        itemSize={index => {return (50)}}
        outerElementType={List}                 
        ref={listRef}
        itemData={others}
      >
        {Row}
      </VariableSizeList>

  );
};

export default KeyList;

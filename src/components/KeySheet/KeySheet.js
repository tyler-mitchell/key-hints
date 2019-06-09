import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import { List, TextField } from '@material-ui/core';
import ListItemText from '@material-ui/core/ListItemText';
import PropTypes from 'prop-types';
import { VariableSizeList } from 'react-window';

import { shade, linearGradient, lighten } from 'polished';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import Select from '@material-ui/core/Select';
import clsx from 'clsx';
import range from 'lodash/range';

import { KeyTable } from './SheetData';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import { BufferContext } from '../KeyBuffer/BufferContext';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { useTheme } from '@material-ui/styles';
import { SearchInput } from './SearchInput';

const useStyles = makeStyles({
  app: {
    display: 'flex',
    flexDirection: 'column'
  },
  title: {
    marginBottom: 16
  },
  container: {
    marginTop: 16,
    alignSelf: 'flex-start'
  },
  list: {
    border: '5px solid green'
  },
  item: {
    height: 10,
    padding: '0 8px',
    fontFamily: 'Arial',
    display: 'flex',
    alignItems: 'center'
  },
  itemSelected: {
    fontWeight: 'bold',
    backgroundColor: '#EEBDEE'
  }
});

// list highlight text color: #1fe3ac
// list highlight background color: #d3f9ee

function Row({ index, style, active, listRef }) {
  // const { index, style } = props;
  const itemClicked = () => {
    // setSelected(!selected);
  };
  return (
    <ListItem
      button
      index={index}
      styles={style}
      disableRipple
      onClick={() => itemClicked()}
      ref={listRef}
    >
      <IconButton />
      <ListItemText primary={`Item ${index + 1}`} />
      <kbd>Ctrl</kbd>+<kbd>Alt</kbd>+<kbd>X</kbd>
    </ListItem>
  );
}

Row.propTypes = {
  index: PropTypes.number,
  style: PropTypes.object
};
const KBD = styled.kbd`
  background-color: #fff;
  border: 1px solid #ccc;
  color: #333;
  line-height: 1.4;
  text-shadow: 0 1px 0 #fff;
  display: inline-block;
  white-space: nowrap;
  box-shadow: 0 1px 0 rgba(0, 0, 0, 0.2), 0 0 0 2px #fff inset;
  font-family: Arial, Helvetica, sans-serif;
  border-radius: 3px;
  position: relative;

  padding: 10px;
  min-width: 45px;
  box-sizing: border-box;
  justify-content: center;
  align-items: center;

  text-align: center;
  margin: 0 20px 0 0;
`;
const KWrap = styled.div``;

const ShortcutItem = styled(ListItem)`
  ${({ odd }) =>
    odd &&
    `
    background: ${lighten(0.05, '#d3f9ee')};
  `}
`;

const KeyListItem = props => {
  const { keybind, style, index } = props;





  return (
    <>
      <ListItemText primary={`${KeyTable[index].description}`} secondary />

      {KeyTable[index].keys.map((keybind, index) => {
        return <KBD key={index}>{keybind}</KBD>;
      })}
    </>
  );
};

export const KeySheet = props => {
  const { category } = props;

  const classes = useStyles();
  const listRef = React.useRef(null);
  const [selection, setSelection] = React.useState(null);

  const items = range(1000).map(i => <div>item #{i}</div>);
  const theme = useTheme();
  const itemSz = (index, size) => {
    return KeyTable[index].keys.length * 10 + 40;
  };
  const [,,activeKeys, setActiveKeys] = React.useContext(BufferContext);
  const itemClicked = (index) => {
    setSelection(index);
    setActiveKeys(KeyTable[index].keys);
    console.log("TCL: activeKeys", activeKeys)

  }

  return (
    <React.Fragment>
      <Card>
        <CardHeader
          title={category}
          action={
            <IconButton>
              <MoreHorizIcon />
            </IconButton>
          }
        />

        <div>
          <SearchInput
            theme={theme}
            placeholder="Search…"
            inputProps={{ 'aria-label': 'Search' }}
          />
        </div>
        <CardContent>
          <div className={classes.root}>
            <VariableSizeList
              height={420}
              itemSize={index => itemSz(index, 50)}
              itemCount={KeyTable.length}
              outerElementType={List}
              ref={listRef}
            >
              {({ index, style }) => {


                return (
                  <ShortcutItem
                    selected={selection === index}
                    style={style}
                    onClick={() => itemClicked(index)}
                    odd={!(index % 2 === 0)}
                    dense
                  >
                    <KeyListItem index={index} style={style} />
                  </ShortcutItem>
                );
              }}
            </VariableSizeList>
          </div>
        </CardContent>
      </Card>
    </React.Fragment>
  );
};

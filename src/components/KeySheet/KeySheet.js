import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import { List } from '@material-ui/core';
import ListItemText from '@material-ui/core/ListItemText';
import PropTypes from 'prop-types';
import { FixedSizeList } from 'react-window';

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

import { VS_Code } from './SheetData';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';

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
    backgroundColor: '#eee'
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
  box-shadow: 1px 0 1px 0 #eee, 0 2px 0 2px #ccc, 0 2px 0 3px #444;
  border-radius: 3px;
  box-sizing: border-box;
  position: relative;
  margin: 0.5em 2em 1em 0;
      padding: 0.9em 0;
      width: 3em;

  text-align: center;
  margin: 0.5em 2em 1em 0;
  &::after {
      content: "+";
      display: block;
      padding: 0 0 0 0.8em;
      position: absolute;
      left: 100%;
      top: 0.9em;
    }

`;
const KWrap = styled.div`
  & > ${KBD}:last-child::after {
      content: "";
      display: none;
      padding: 0;
      position: static;
    }
`;


const ShortcutItem = styled(ListItem)`
  &:nth-child(odd)  {
       background: #f7f7f7;
    }
`;



export const KeySheet = (props) => {

  const {category} = props;



  const classes = useStyles();
  const listRef = React.useRef(null);
  const [selection, setSelection] = React.useState(null);
  const items = range(1000).map(i => <div>item #{i}</div>);
  const [activeKeys, setActiveKeys] = React.useState(null);
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
        <CardContent>
          <div className={classes.root}>
            <FixedSizeList
              height={400}
              itemSize={46}
              itemCount={VS_Code.length}
              outerElementType={List}
              ref={listRef}
            >
              {({ index, style }) => {
                const item = items[index];
                return (
                  <ShortcutItem
                    selected={index === selection}
                    style={style}
                    onClick={() => setSelection(index)}
                    divider
                    dense
                  >
                    <ListItemText primary={`${VS_Code[index].description}`} secondary/>

                    {/* <ListItemText primary={`${VS_Code[index].keys}`} /> */}
                    <KWrap>
                      {VS_Code[index].keys.split('+').map((item, index, arr) =>{
                      console.log("TCL: KeySheet -> arr", arr);
                      return (
                        <KBD key={index}>{item}</KBD>
                      )})}
                    </KWrap>
                  </ShortcutItem>
                );
              }}
            </FixedSizeList>
          </div>
        </CardContent>
      </Card>
    </React.Fragment>
  );
};

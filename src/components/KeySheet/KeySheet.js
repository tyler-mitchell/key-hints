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

export const KeySheet = () => {
  const classes = useStyles();
  const listRef = React.useRef(null);
  const [selection, setSelection] = React.useState(null);
  const items = range(1000).map(i => <div>item #{i}</div>);
  return (
    <React.Fragment>
      <Card>
        <CardHeader
          title="Basic Editing"
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
              width={360}
              itemSize={46}
              itemCount={200}
              outerElementType={List}
              text="hello world"
              ref={listRef}
            >
              {({ index, style }) => {
                const item = items[index];
                return (
                  <ListItem

                    selected={index === selection}
                    style={style}
                    onClick={() => setSelection(index)}
                  >
                    Hello
                  </ListItem>
                );
              }}
            </FixedSizeList>
          </div>
        </CardContent>
      </Card>
    </React.Fragment>
  );
};

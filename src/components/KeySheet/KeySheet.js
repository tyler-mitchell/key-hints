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
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Select from '@material-ui/core/Select';
import clsx from 'clsx';
import range from 'lodash/range';

import { KeyTable } from './SheetData';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';

import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { useTheme } from '@material-ui/styles';
import { SearchInput } from './SearchInput';

import ListItemIcon from '@material-ui/core/ListItemIcon';
import Tooltip from '@material-ui/core/Tooltip';
import EditIcon from '@material-ui/icons/Edit';

import Portal from '@material-ui/core/Portal';
import Button from '@material-ui/core/Button';
import { TreeStuff, Tree } from './Tree';
import { Global } from './treestyles';
import useMenu from './Menu/useMenu';
import EditModal from './Menu/EditModal';

import KeyList from './Menu/KeyList';

import CategoryTab from './CategoryTab/CategoryTab';
import Badge from '@material-ui/core/Badge';
import Switch from '@material-ui/core/Switch';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { SelectionProvider } from './Menu/SelectionContext';
import { BufferContext } from '../KeyBuffer/BufferContext';
import { AppBar } from '@material-ui/core';

import { Save as SaveIcon, Refresh as RefreshIcon } from '@material-ui/icons';
import Fade from '@material-ui/core/Fade';

const useStyles = makeStyles({
  appBar: {
    color: 'white'
  },
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
  /* ${({ odd }) =>
    odd &&
    `
    background: ${lighten(0.05, '#d3f9ee')};
  `} */
  user-select: none;
  ${({ editMode }) =>
    editMode &&
    `
    // pointer-events: none;

  `}

`;

const EditButtonGroup = styled.div`
  padding-right: 10px;
`;

const CardHeadStyle = theme => ({
  root: {}
});
const CardHead = styled(AppBar)`
  &&& {
    position: relative;
    background: white;
  }
`;

export const KeySheet = props => {
  const { category } = props;
  const classes = useStyles();
  const listRef = React.useRef(null);

  const theme = useTheme();

  const itemSz = (index, size) => {
    return KeyTable[index].keys.length * 10 + 40;
  };

  const [value, setValue] = React.useState('All');

  const [keyTable, setKeyTable] = React.useState(KeyTable.table);

  const [, , , , editMode, setEditMode] = React.useContext(BufferContext);

  function handleChange(event, newValue) {
    setValue(newValue);

    newValue !== 'All'
      ? setKeyTable(
          KeyTable.table.filter(key => {
            console.log(`TCL: handleChange -> key.category **${key.category}**`);
            return key.category.toUpperCase() === newValue;
          })
        )
      : setKeyTable(KeyTable.table);

    console.log('TCL: NewTable -> keyTable', keyTable);
  }

  const [invisible, setInvisible] = React.useState(true);

  function handleBadgeVisibility() {
    setInvisible(!invisible);
  }
  const editClicked = () => {
    setEditMode(true);
  };
  const [editButtonsVisible, setEditButtonsVisibility] = React.useState(false);

  return (
    <React.Fragment>
      <SelectionProvider>
        <Card>
          <CardHead
            className={classes.appBar}
            value={value}
            indicatorColor="primary"
            textColor="primary"
            onChange={handleChange}
          >
            <Grid container spacing={0} justify="flex-start" direction="column">
              <Grid item xs={12}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  indicatorColor="primary"
                  textColor="primary"
                  variant="scrollable"
                  scrollButtons="auto"
                >
                  <Tab
                    value="All"
                    label={
                      <Badge
                        className={classes.padding}
                        color="secondary"
                        badgeContent={4}
                        invisible={invisible}
                      >
                        All
                      </Badge>
                    }
                  />
                  {KeyTable.categories.map((e, index) => {
                    return (
                      <Tab
                        key={index}
                        value={e}
                        label={
                          <Badge
                            className={classes.padding}
                            color="secondary"
                            badgeContent={4}
                            invisible={invisible}
                          >
                            {e}
                          </Badge>
                        }
                      />
                    );
                  })}
                </Tabs>
              </Grid>
              <Grid container direction="row">
                <Grid item xs={11}>
                  <SearchInput
                    theme={theme}
                    placeholder="Search…"
                    inputProps={{ 'aria-label': 'Search' }}
                  />
                </Grid>

                <Grid
                  container
                  spacing={1}
                  item
                  xs={1}
                  justify="space-between"
                  direction="row"
                  alignItems="center"
                >
                  {editMode ? (
                    <>
                      <Grid item xs={6}>
                        <Button
                          className={theme.button}
                          variant="contained"
                          color="primary"
                          size="small"
                          disabled={true}
                        >
                          <SaveIcon />
                          Save
                        </Button>
                      </Grid>
                      <Grid item xs={6}>
                        <EditButtonGroup>
                          <Button
                            className={theme.button}
                            variant="contained"
                            size="small"
                            disabled={true}
                          >
                            <RefreshIcon />
                            Reset
                          </Button>
                        </EditButtonGroup>
                      </Grid>
                    </>
                  ) : (
                    <>
                      <Grid item>
                        <EditButtonGroup>
                          <Button
                            onClick={event => editClicked()}
                            className={theme.button}
                            variant="contained"
                            color="primary"
                            size="small"
                          >
                            <EditIcon />
                            Edit
                          </Button>
                        </EditButtonGroup>
                      </Grid>
                    </>
                  )}
                </Grid>

              </Grid>
            </Grid>
          </CardHead>
          {/* <CardHeader
          title={category}
          action={
            <IconButton>
              <MoreHorizIcon />
            </IconButton>
          }
        /> */}

          <CardContent>
            <div>
              {console.log('⭐TCL: Row -> others')}
              <KeyList height={360} keyTable={keyTable} />
            </div>
          </CardContent>
        </Card>
      </SelectionProvider>
    </React.Fragment>
  );
};

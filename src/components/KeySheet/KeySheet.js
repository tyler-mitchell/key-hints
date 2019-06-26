import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import { List, TextField } from '@material-ui/core';
import ListItemText from '@material-ui/core/ListItemText';
import PropTypes from 'prop-types';
import { VariableSizeList } from 'react-window';
import { startCase, toLower } from 'lodash';

import { shade, linearGradient, lighten } from 'polished';
import Card from '@material-ui/core/Card';

import CardContent from '@material-ui/core/CardContent';

import IconButton from '@material-ui/core/IconButton';

import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';

import { useTheme } from '@material-ui/styles';
import { SearchInput } from './SearchInput';

import EditIcon from '@material-ui/icons/Edit';

import Button from '@material-ui/core/Button';

import KeyList from './Menu/KeyList';

import Badge from '@material-ui/core/Badge';

import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { SelectionProvider } from './Menu/SelectionContext';
import { BufferContext } from '../KeyBuffer/BufferContext';
import {
  usePopupState,
  bindToggle,
  bindPopper,
  anchorRef,
  bindTrigger
} from 'material-ui-popup-state/hooks';
import {
  AppBar,
  Toolbar,
  Divider,
  CircularProgress,
  Drawer,
  ListItemIcon,
  Popper,
  Fade
} from '@material-ui/core';

import {
  Save as SaveIcon,
  Refresh as RefreshIcon,
  Inbox as InboxIcon,
  Mail as MailIcon,
  Folder as FolderIcon
} from '@material-ui/icons';

import { useDocument } from 'react-firebase-hooks/firestore';
import { FirebaseContext } from '../utils/firebase';
import useMeasure from './useMeasure';

import 'firebase/firestore';
import { useGlobalState } from '../../state';

import { useAuthState } from 'react-firebase-hooks/auth';

const drawerWidth = 240;
const useStyles = makeStyles(theme => ({
  appBar: {
    color: 'white',
    padding: 0
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
  },
  divider: {
    width: 1,
    height: 28,
    margin: 4
  },
  drawerPaper: {
    width: drawerWidth
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  },
  root: {
    display: 'flex'
  },
  popper: {
    zIndex: 0,

    position: 'absolute',
    display: 'block'
  },
  paper: {
    height: '471px',
    marginRight: '10px',
    display: 'block',
    overflow: 'scroll'
  }
}));

const EditButtonGroup = styled.div`
  padding-right: 10px;
`;

const CardHead = styled(AppBar)`
  &&& {
    position: relative;
    background: white;
  }
`;
const CategoryPaper = styled(Paper)`
  height: 471px;
  margin-right: 10px;
  display: block;
  overflow-x: hidden;

  &::-webkit-scrollbar {
    width: 5px;
  }
  &::hover {
    /* overflow-y: auto; */

    /* &::-webkit-scrollbar-track { background: #f7f7f7; }
&::-webkit-scrollbar-thumb { background: #eee; }
&:-webkit-scrollbar { width: 0 !important } */
  }

  /* &::-webkit-scrollbar-thumb:hover {background: #555;} */

  /* &::-webkit-scrollbar-track
{
	-webkit-box-shadow: inset 0 0 2px rgba(0,0,0,0.3);
	border-radius: 2px;
	background-color: #F5F5F5;
}



&::-webkit-scrollbar-thumb
{
	border-radius: 5px;
	-webkit-box-shadow: inset 0 0 2px rgba(0,0,0,.3);
	background: #cccccc; 
} */
`;

export const KeySheet = props => {
  const classes = useStyles();
  const theme = useTheme();

  const cardRef = React.useRef(null);
  const { margin } = useMeasure(cardRef, 'margin');
  const [curCategory, setCurCategory] = React.useState('All');

  console.log('⭐: bounds', margin);

  function filterKeyTable(ktable, category) {
    if (category !== 'All') {
      return ktable.data().table.filter(key => {
        return key.category.toUpperCase() === category;
      });
    } else {
      return ktable.data().table;
    }
  }

  // Firebase
  const firebase = React.useContext(FirebaseContext);
  const vsCodeDocument = firebase
    .firestore()
    .collection('KeyTables')
    .doc('VS_Code');

  const [fbKeyTable, loading, error] = useDocument(vsCodeDocument);
  console.log('⭐: fbKeyTable', !loading && fbKeyTable.data());

  console.log('⭐: loading', loading);

  const [drawerState] = useGlobalState('drawerState');
  const popupState = usePopupState({ variant: 'popper', popupId: 'demoPopper' });
  const { open, ...bindPopState } = bindPopper(popupState);

  const [selectedIndex, setSelectedIndex] = React.useState();
  const [listRef, setListRef] = useGlobalState('listRef')

  console.log("⭐: handleListItemClick -> listRef.current", listRef)
  function handleListItemClick(event, index, category) {
    setSelectedIndex(index);
    setCurCategory(category);
    listRef.current.resetAfterIndex(0, false)
    console.log('⭐: handleListItemClick -> category', category);
  }

  const [user] = useAuthState(firebase.auth());

  const addSheet = (userId, sheetName) =>
    firebase
      .firestore()
      .collection('KeyTables')
      .add({
        keyDoc: sheetName,
        user: userId
      });

  return (
    <React.Fragment>
      {loading && <CircularProgress className={classes.progress} />}

      {!loading && !error && (
        <SelectionProvider>
          <div>
            {/* <Button onClick={()=>addSheet(user.uid, "TEST NAME")}>TEST </Button> */}
            <Card ref={anchorRef(popupState)}>
              <CardHead
                ref={cardRef}
                className={classes.appBar}
                indicatorColor="primary"
                textColor="primary"
              />

              <SearchInput
                theme={theme}
                placeholder="Search…"
                inputProps={{ 'aria-label': 'Search' }}
              />
              <Divider />
              <Popper
                placement="left-start"
                className={classes.popper}
                open={drawerState}
                {...bindPopState}
              >
                <Fade in={popupState} timeout={250}>
                  <CategoryPaper>
                    <List>
                      <ListItem
                        button
                        onClick={e => handleListItemClick(e, -1, 'All')}
                        selected={selectedIndex === -1}
                        key={'All'}
                      >
                        <ListItemIcon>
                          <FolderIcon />
                        </ListItemIcon>
                        <ListItemText primary={'All'} />
                      </ListItem>
                      <Divider/>
                      {fbKeyTable.data().categories.map((category, index) => (
                        <ListItem
                          button
                          onClick={e => handleListItemClick(e, index, category)}
                          selected={selectedIndex === index}
                          key={category}
                        >
                          {/* {selectedIndex === index && <ListItemIcon>
                              <FolderIcon /> 
                          </ListItemIcon>} */}

                          <ListItemText primary={startCase(toLower(category))} />
                        </ListItem>
                      ))}
                    </List>
                    <Divider />
                  </CategoryPaper>
                </Fade>
              </Popper>

              <div>
                <CardContent>
                  <KeyList height={360} keyTable={filterKeyTable(fbKeyTable, curCategory)} />
                </CardContent>
              </div>
            </Card>
          </div>
        </SelectionProvider>
      )}
      {error && <div>ERROR</div>}
    </React.Fragment>
  );
};

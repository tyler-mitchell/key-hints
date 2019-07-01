import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import { List, TextField } from '@material-ui/core';
import ListItemText from '@material-ui/core/ListItemText';
import PropTypes from 'prop-types';
import { FixedSizeList } from 'react-window';
import { startCase, toLower } from 'lodash';
import { NewKeyForm } from './Menu/KeyListItem';

import { KeyTable } from './SheetData';

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
import { KeyTableContext } from '../../context/KeyTableContext';
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
  ListSubheader,
  Popper,
  Fade,
  Chip,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  Input
} from '@material-ui/core';

import {
  Folder as FolderIcon
} from '@material-ui/icons';

import { FirebaseContext } from '../utils/firebase';
import useMeasure from './useMeasure';

import 'firebase/firestore';
import { useGlobalState, setGlobalState, clearKeySelection } from '../../state';

import { useAuthState } from 'react-firebase-hooks/auth';
import SwipeableViews from 'react-swipeable-views';
import { AddKeyView } from './AddKeyView'
import {CategoryMenu} from './CategoryMenu/CategoryMenu'

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
  },
  slideContainer: {
    height: 100
  },
  slide: {
    padding: 15,
    minHeight: 100,
    color: '#fff'
  },
  slide1: {
    backgroundColor: '#FEA900'
  },
  slide2: {
    backgroundColor: '#B3DC4A'
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
  width: 200px;

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
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
};

export const KeySheet = props => {
  const classes = useStyles();
  const theme = useTheme();

  const cardRef = React.useRef(null);

  function filterKeyTable(ktable, category) {
    if (category !== 'All') {
      return curKeyTable.data().table.filter(key => {
        return key.category.toUpperCase() === category;
      });
    } else {
      return curKeyTable.data().table;
    }
  }

  // Firebase

  const { firebase, userAuthState } = React.useContext(FirebaseContext);
  const [user, loading, error] = userAuthState;

  const { curKeyTable, loadingUKTC } = React.useContext(KeyTableContext);

  setGlobalState('user', user);

  const vsCodeDocument = firebase
    .firestore()
    .collection('KeyTables')
    .doc('VS_Code');

  // Menu
  const [drawerState] = useGlobalState('drawerState');



  const popupState = usePopupState({ variant: 'popper', popupId: 'demoPopper' });

  const [selectedIndex, setSelectedIndex] = React.useState();
  const [curCategory, setCurCategory] = useGlobalState('sheetCategory');
  const [listRef, setListRef] = useGlobalState('listRef');
  const [newKeys, setNewKeys] = useGlobalState('newKeys');

  const [addMode, setAddMode] = useGlobalState('addMode');
  
  const [value, setView] = React.useState(0);


  const addCategory = (userId, sheetName) =>
    firebase
      .firestore()
      .collection('Users')
      .doc(user.uid)
      .set({
        keyDoc: sheetName,
        user: userId
      });


  const [viewIndex, setViewIndex] = React.useState(0);
  React.useEffect(() => {
    addMode ? setViewIndex(1) : setViewIndex(0);
  }, [addMode]);

  return (
    <React.Fragment>
      {loadingUKTC && <CircularProgress className={classes.progress} />}

      {curKeyTable && (
        <SelectionProvider>
          <>
            <Card ref={anchorRef(popupState)} style={{ height: '470px' }}>
              <SwipeableViews
                // axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}

                resistance={true}
                axis="y"
                index={viewIndex}
                // onChangeIndex={handleChangeIndex}

                slideStyle={{ height: '100%' }}
                containerStyle={{ height: '500px' }}
                // style={{ flex: 1 }}
              >
                <>
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
                  <CategoryMenu popupState={popupState}/>

                  <CardContent>
                    <KeyList height={360} keyTable={filterKeyTable(curKeyTable, curCategory)} />
                  </CardContent>
                </>
                <AddKeyView/>
              </SwipeableViews>
            </Card>
          </>
        </SelectionProvider>
      )}
    </React.Fragment>
  );
};

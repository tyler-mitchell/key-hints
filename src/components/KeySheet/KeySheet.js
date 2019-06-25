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
  Mail as MailIcon
} from '@material-ui/icons';

import { useDocument } from 'react-firebase-hooks/firestore';
import { FirebaseContext } from '../utils/firebase';

import 'firebase/firestore';
import { useGlobalState } from '../../state';
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
    height: '40px'
   
  },
  paper: {
    height: '400px',
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

export const KeySheet = props => {
  const classes = useStyles();
  const theme = useTheme();
  const [val, setValue] = React.useState('All');

  const [editMode, setEditMode] = useGlobalState('editMode');

  // const [, , , , editMode, setEditMode] = React.useContext(BufferContext);

  function handleChange(event, newValue) {
    setValue(newValue);

    newValue !== 'All'
      ? setKeyTable(
          fbKeyTable.data().table.filter(key => {
            return key.category.toUpperCase() === newValue;
          })
        )
      : setKeyTable(fbKeyTable.data().table);
  }

  const [invisible, setInvisible] = React.useState(true);

  const editClicked = () => {
    setEditMode(true);
  };

  // Firebase
  const firebase = React.useContext(FirebaseContext);
  const vsCodeDocument = firebase
    .firestore()
    .collection('KeyTables')
    .doc('VS_Code');

  const [fbKeyTable, loading, error] = useDocument(vsCodeDocument);
  console.log('⭐: fbKeyTable', !loading && fbKeyTable.data());

  console.log('⭐: loading', loading);

  const [keyTableCategory, setKeyTable] = React.useState(null);

  const [drawerState] = useGlobalState('drawerState');
  const popupState = usePopupState({ variant: 'popper', popupId: 'demoPopper' });
  const { open, ...bindPopState } = bindPopper(popupState);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const rollouts = await firebase
          .firestore()
          .collection('KeyTables')
          .doc('VS_Code')
          .get();
        console.log('⭐: fetchData -> rollouts', rollouts);

        if (rollouts) {
          setKeyTable(rollouts.data().table);

          console.log('⭐: fetchData -> keyTableCategory', keyTableCategory);
        }
      } catch (err) {
        console.log('ERROR  ', err.message);
      }
    };
    fetchData();
    console.log('⭐: fetchData -> keyTableCategory', keyTableCategory);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <React.Fragment>
      {loading && <CircularProgress className={classes.progress} />}

      {!loading && !error && (
        <SelectionProvider>
          <Card>
            <CardHead
              className={classes.appBar}
              value={val}
              indicatorColor="primary"
              textColor="primary"
              onChange={handleChange}
            />

            <SearchInput
              theme={theme}
              placeholder="Search…"
              inputProps={{ 'aria-label': 'Search' }}
            />
            <Popper  placement="left-start" className={classes.popper} open={drawerState} {...bindPopState}>
              <Fade in={popupState} timeout={250}>
                <Paper className={classes.paper}>
                  
                  <List>
                    {fbKeyTable.data().categories.map((text, index) => (
                      <ListItem button key={text}>
                        <ListItemIcon>
                          {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                        </ListItemIcon>
                        <ListItemText primary={startCase(toLower(text))} />
                      </ListItem>
                    ))}
                  </List>
                  <Divider />
                  <List>
                    {['All mail', 'Trash', 'Spam'].map((text, index) => (
                      <ListItem button key={text}>
                        <ListItemIcon>
                          {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                        </ListItemIcon>
                        <ListItemText primary={text} />
                      </ListItem>
                    ))}
                  </List>
                </Paper>
              </Fade>
            </Popper>

            <div ref={anchorRef(popupState)}>
              <CardContent>
                {keyTableCategory && (
                  <KeyList height={360} keyTable={keyTableCategory}>
                    {console.log('⭐: INNER', keyTableCategory)}
                  </KeyList>
                )}
              </CardContent>
            </div>
          </Card>
        </SelectionProvider>
      )}
      {error && <div>ERROR</div>}
    </React.Fragment>
  );
};

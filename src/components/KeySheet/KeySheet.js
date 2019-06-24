import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import { List, TextField } from '@material-ui/core';
import ListItemText from '@material-ui/core/ListItemText';
import PropTypes from 'prop-types';
import { VariableSizeList } from 'react-window';

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
import { AppBar, Toolbar, Divider, CircularProgress } from '@material-ui/core';


import { Save as SaveIcon, Refresh as RefreshIcon } from '@material-ui/icons';

import {

  useDocument,

} from 'react-firebase-hooks/firestore';
import { FirebaseContext } from '../utils/firebase';

import 'firebase/firestore';

const useStyles = makeStyles({
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
  }
});






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

  const [, , , , editMode, setEditMode] = React.useContext(BufferContext);

  function handleChange(event, newValue) {
    setValue(newValue);
    // if (newValue !== 'All') {
    //   fbKeyTable.table.filter(key => {
    //     return key.category.toUpperCase() === newValue;
    //   })
    // } else {
    //   return fbKeyTable.table
    // }
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
  console.log("⭐: fbKeyTable", !loading && fbKeyTable.data())


  console.log('⭐: loading', loading);
  const keyTableCopy = loading ? null : fbKeyTable.data()
  const [keyTableCategory, setKeyTable] = React.useState( null);




  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const rollouts = await
        firebase.firestore().collection('KeyTables').doc('VS_Code').get();
        console.log("⭐: fetchData -> rollouts", rollouts)

        if (rollouts) {
          setKeyTable(
           rollouts.data().table
          );

          console.log("⭐: fetchData -> keyTableCategory", keyTableCategory)
        }
      } catch (err) {
        console.log("ERROR  ", err.message);
      }

    };
    fetchData();
    console.log("⭐: fetchData -> keyTableCategory", keyTableCategory)
  }, []);


  return (
    <React.Fragment>
      {loading && (
        <CircularProgress className={classes.progress} />
      )}

      {!loading && !error && (
        <SelectionProvider>

          <Card>
            <CardHead
              className={classes.appBar}
              value={val}
              indicatorColor="primary"
              textColor="primary"
              onChange={handleChange}
            >
              <Grid container spacing={0} justify="flex-start" direction="column">
                <Grid item xs={12}>
                  <Tabs
                    value={val}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="fullWidth"
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
                    {fbKeyTable.data().categories.map((e, index) => {
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
              </Grid>
            </CardHead>
            <Paper>
              <Toolbar>
                <Grid container direction="row" spacing={1} wrap="nowrap">
                  <Grid item xs={11}>
                    <SearchInput
                      theme={theme}
                      placeholder="Search…"
                      inputProps={{ 'aria-label': 'Search' }}
                    />
                  </Grid>

                  <Divider className={classes.divider} />
                  {editMode ? (
                    <>
                      <Grid item>
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
                      <Grid item>
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
              </Toolbar>
            </Paper>

            <CardContent>
              <div>
                {console.log("⭐: keyTableCopy", keyTableCategory)}
                {keyTableCategory  && <KeyList height={360} keyTable={keyTableCategory}>{console.log("⭐: INNER", keyTableCategory)}</KeyList>  }

              </div>
            </CardContent>
          </Card>
        </SelectionProvider>
      )}
      {error && <div>ERROR</div>}
    </React.Fragment>
  );
};

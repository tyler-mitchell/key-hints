import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Card from '@material-ui/core/Card';

import CardContent from '@material-ui/core/CardContent';

import styled from 'styled-components';

import { useTheme } from '@material-ui/styles';
import { SearchInput } from './SearchInput';

import KeyList from './KeyList/KeyList';

import Paper from '@material-ui/core/Paper';

import { KeyTableContext } from '../../context/KeyTableContext';
import { usePopupState, anchorRef } from 'material-ui-popup-state/hooks';
import { AppBar, Divider, CircularProgress, Grid } from '@material-ui/core';

import { FirebaseContext } from '../utils/firebase';

import 'firebase/firestore';
import { useGlobalState, setGlobalState } from '../../state';
import SwipeableViews from 'react-swipeable-views';
import { NewKeyPanel } from './NewKeyPanel/NewKeyPanel';
import { CategoryMenu } from './CategoryMenu/CategoryMenu';

import { filter, isEmpty } from 'lodash';

const useStyles = makeStyles(theme => ({
  appBar: {
    color: 'white',
    padding: 0
  },

  divider: {
    width: 1,
    height: 28,
    margin: 4
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
`;

export const KeySheet = props => {
  const classes = useStyles();
  const theme = useTheme();

  const { curKeyTable, loadingUKTC, docIndex } = React.useContext(KeyTableContext);
  const [curCategory, setCurCategory] = useGlobalState('sheetCategory');
  const [addMode] = useGlobalState('addMode');

  // Card View Index
  const [viewIndex, setViewIndex] = React.useState(0);

  // Category Menu popup state
  const popupState = usePopupState({ variant: 'popper', popupId: 'demoPopper' });

  // useEffect
  React.useEffect(() => {
    addMode ? setViewIndex(1) : setViewIndex(0);
  }, [addMode]);

  const [listRef] = useGlobalState('listRef');
  React.useEffect(() => {
    return () => {
      setGlobalState('selectedCategoryIndex', -1);
      setCurCategory('All');
    };
  }, [curKeyTable, setCurCategory]);

  // Functions
  function filterKeyTable(ktable, category) {
    if (category !== 'All') {
      return filter(curKeyTable.data().table, key => {
        return key.category.toUpperCase() === category;
      });
    } else {
      return Object.keys(curKeyTable.data().table).sort();
    }
  }

  return (
    <React.Fragment>
      {loadingUKTC && <CircularProgress className={classes.progress} />}

      {curKeyTable && (
        <>
          <Card ref={anchorRef(popupState)} style={{ height: '470px', borderRadius: '10px'}}>
            {/* <SwipeableViews
              resistance={true}
              axis="y"
              index={viewIndex}
              slideStyle={{ height: '100%' }}
              containerStyle={{ height: '500px' }}
            > */}
            <>
              <CardHead className={classes.appBar} indicatorColor="primary" textColor="primary" />
              <Grid container xs={12} style={{}} justify="center" alignItems="center" />
              <SearchInput
                theme={theme}
                placeholder="Search…"
                inputProps={{ 'aria-label': 'Search' }}
              />
              <Divider />
              <CategoryMenu popupState={popupState} />

              <CardContent>
              
                {!isEmpty(curKeyTable.data().table) && (
                  <KeyList height={360} keyTableKeys={filterKeyTable(curKeyTable, curCategory)} keyTable={curKeyTable.data().table}/>
                )}
            <div
              style={{
                    bottom: 7,
                
                pointerEvents: 'none',
                alignItems: 'center',
                position: 'absolute',
                height: '120%',
                    width: '100%',
                
                paddingBottom: '100px',
                // border: 'solid',
                borderRadius: "10px 10px 60px 60px",
                
                clipPath: 'polygon(1% 0, 99% 0, 99% 99%, 1% 99% )',
                left: 0,
                right: 0,
              }}
            >
              <NewKeyPanel />
            </div>
              </CardContent>
            </>

            {/* </SwipeableViews> */}
          </Card>
        </>
      )}
    </React.Fragment>
  );
};

/* eslint-disable react-hooks/exhaustive-deps */
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
import { AppBar, Divider, CircularProgress, Grid, CardActionArea } from '@material-ui/core';

import { FirebaseContext } from '../utils/firebase';

import 'firebase/firestore';
import { useGlobalState, setGlobalState, clearKeySelection } from '../../state';
import SwipeableViews from 'react-swipeable-views';
import { NewKeyPanel } from './NewKeyPanel/NewKeyPanel';
import { CategoryMenu } from './CategoryMenu/CategoryMenu';

import { filter, isEmpty } from 'lodash';
import { initializeKeyMap } from '../Keyboard/KeyMapData';
import { pickBy } from 'lodash-es';
import { bindTrigger, bindPopover } from 'material-ui-popup-state';
import { useMeasure } from '../hooks/helpers';
import { motion, AnimatePresence } from 'framer-motion';
import { ButtonGroup } from '@material-ui/core';
import { Popper } from '@material-ui/core';
import { Popover } from '@material-ui/core';
import { IconButton } from '@material-ui/core';
import { Add as AddIcon, CancelOutlined as CancelIcon, Save as SaveIcon} from '@material-ui/icons';
import { Fab } from '@material-ui/core';
import { CardActions } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { useInput, useBoolean, useNumber, useArray, useOnMount, useOnUnmount } from 'react-hanger';
import { array } from 'prop-types';
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
  const [editMode] = useGlobalState('editMode');
  
  // Category Menu popup state
  const popupState = usePopupState({ variant: 'popper', popupId: 'demoPopper', isOpen: true });

  // useEffect
  

  // button popper
  const buttonPopupState = usePopupState({ variant: 'popover', popupId: 'demoMenu' });

  const [listRef] = useGlobalState('listRef');
  React.useEffect(() => {
    return () => {
      setGlobalState('selectedCategoryIndex', -1);
      setCurCategory('All');
    };
  }, [curKeyTable, setCurCategory]);

  const [filteredKeyTable, setFilteredKeyTable] = React.useState(null);
  const [searchText, setSearchText] = React.useState('');
  function onChange(e) {
    setSearchText(e.target.value);
    console.log('SEARCH TEXT', searchText);
  }

  const [selection] = useGlobalState('selectedItem');

  React.useEffect(() => {
    if (curKeyTable) {
      if (searchText.length === 0) {
        const fktb = filterKeyTable(curKeyTable, curCategory);
        console.log('DEFAULT FILTERED KEY TABLE: ', fktb);
        setFilteredKeyTable(fktb);
      } else {
        const fktb = filterSearchKeyTable(curKeyTable);
        console.log(`⭐: SEARCH FILTERED KEY TABLE`, fktb);
        setFilteredKeyTable(fktb);
        console.log(`⭐: selection`, selection);
      }
    }
  }, [curKeyTable, curCategory, searchText]);
  // Functions
  function filterKeyTable(ktable, category) {
    if (category !== 'All') {
      return filter(curKeyTable.data().table, key => {
        return key.category.toUpperCase() === category;
      });
    } else {
      console.log('SORT KEYS: ');
      return curKeyTable.data().table;
    }
  }
  function filterSearchKeyTable(ktable) {
    const fktb = pickBy(curKeyTable.data().table, key => {
      return key.description.toLowerCase().indexOf(searchText.toLowerCase()) !== -1;
    });
    const keys = Object.keys(fktb).sort();

    console.log('filterSearchKeyTable: ', fktb);
    return fktb;
  }
  const handleAddClick = () => {
    clearKeySelection();
    setGlobalState('keyMapMode', false);
    setGlobalState('addMode', v => !v);
    
  };
  const handleCancelClick = () => {
    setGlobalState('addMode', v => !v);
  };



  const [saveClicked, setSaveClicked] = React.useState(0);
  const handleSaveClick = (e) => {
    setSaveClicked(saveClicked + 1);
  }



 

  const [, { height, width }] = useMeasure();
  // const actions = useArray([
  //   { id: 'add', add: AddAction, clickFunction: handleAddClick },
  //   { id: 'save', save: SaveAction, clickFunction: handleAddClick },
  //   { id: 'cancel', cancel: CancelAction, clickFunction: handleAddClick }
  // ]);
  const [actions, setActions] = React.useState([
    { id: 'add', component: AddAction, clickFunction: handleAddClick }
  ]);
  const id = 'fab-reference';
  return (
    <React.Fragment>
      {loadingUKTC && <CircularProgress className={classes.progress} />}

      {curKeyTable && (
        <>
          <Card
            ref={anchorRef(popupState)}
            style={{
              height: '470px',
              borderRadius: '10px'
            }}
          >
            {/* <SwipeableViews
              resistance={true}
              axis="y"
              index={viewIndex}
              slideStyle={{ height: '100%' }}
              containerStyle={{ height: '500px' }}
            > */}

            <CardHead className={classes.appBar} indicatorColor="primary" textColor="primary" />
            <Grid container xs={12} style={{}} justify="center" alignItems="center" />
            <SearchInput
              theme={theme}
              onChange={onChange}
              placeholder="Search…"
              inputProps={{ 'aria-label': 'Search' }}
            />
            <Divider />
            <CategoryMenu popupState={popupState} />

            <CardContent>
              {!isEmpty(filteredKeyTable) && (
                // height: 360
                <KeyList
                  height={340}
                  keyTableKeys={Object.keys(filteredKeyTable).sort()}
                  keyTable={filteredKeyTable}
                />
              )}
              <div
                style={{
                  bottom: 30,

                  pointerEvents: 'none',
                  alignItems: 'center',
                  position: 'absolute',
                  height: '120%',
                  width: '100%',

                  // paddingBottom: '100px',
                  // border: 'solid',
                  borderRadius: '10px 10px 200px 200px',

                  clipPath: 'polygon(1% 0, 99% 0, 99% 99%, 1% 99% )',
                  left: 0,
                  right: 0
                }}
              >
                <NewKeyPanel saveClicked={saveClicked}  />
              </div>
            </CardContent>

            <CardActions disableSpacing style={{ height: '1px' }} />
            {/* </SwipeableViews> */}
          </Card>

          {/* <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              position: 'absolute',
              right: width,
              bottom: height + 15,
              borderRadius: '3px'
            }}
          > */}
            {/* {actions.map((obj, index, key) => {
                const Component = obj['component'];
                return (
                  <Component
                    transition={{ delay: 3 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    clickFunction={obj.clickFunction}
                    key={obj.id}
                  />
                );
              })} */}

            <motion.div onClick={handleAddClick}    initial={{position:"absolute" , right: width, bottom: height + 15,}} custom={1} onTransitionEnd={onTransitionEnd}  animate={!addMode ? "openAddButton" : "closedAddButton"} variants={actionVariants} ><AddAction       clickFunction={handleAddClick} /></motion.div>
            <motion.div onClick={handleSaveClick}            initial={{position:"absolute" , right: width + 40, bottom: height + 15,}} custom={1.1} onTransitionEnd={onTransitionEnd} animate={   (addMode || editMode) ? "openSaveButton" : "closedSaveButton"}  variants={actionVariants} ><SaveAction      clickFunction={handleCancelClick} /></motion.div>
            <motion.div onClick={handleCancelClick} initial={{position:"absolute" , right: width, bottom: height + 15,}} custom={1} onTransitionEnd={onTransitionEnd} animate={   (addMode || editMode) ? "openCancelButton" : "closedCancelButton"}  variants={actionVariants} ><CancelAction  clickFunction={handleCancelClick} /></motion.div>
          {/* </div> */}
        </>
      )}
    </React.Fragment>
  );
};

function onTransitionEnd() {
  return("")
}
const AddAction = ({ animate, clickFunction, ...props }) => (
  
    <Fab
  
      // variant="outlined"
      color="primary"
    size="small"
    
    >
      <AddIcon style={{fontSmoothing: 'antialiased'}}/>
    </Fab>

);
const SaveAction = ({ animate, clickFunction, ...props }) => (

    <Fab
    
      // variant="outlined"
      color="primary"
    size="small"
    
    >
      <SaveIcon style={{fontSmoothing: 'antialiased'}}/>
    </Fab>

);
const CancelAction = ({ clickFunction, ...props }) => (
  
    <Fab
      // onClick={clickFunction}
      // variant="outlined"
      color="secondary"
    size="small"
    
    >
      <CancelIcon style={{fontSmoothing: 'antialiased'}}/>
    </Fab>

);

const actionVariants = {
  openAddButton: i => ({
   
    opacity: 1,
    scale: 1,
    y: 0,
    x: 0,
    
    display: 'initial',
    transition: {
      delay: 0.1,
      type: "spring",
      restSpeed: 0.3
    }
    
  }),
  openSaveButton: i => ({
    y: 0,
    x: 0,
    opacity: [0, 0.37, 0.81, 1],
    scale: [0,1,1,1],
    marginRight: 5,
    display: 'initial',
    transition: {
      delay: 0.2,
      type: "spring",
   
      restSpeed: 1
    }
    
  }),
  openCancelButton: i => ({
    y: 0,
  
    opacity: 1,
    scale: 1,
    display: 'initial',
    
    transition: {
      delay: 0.1,
      type: "spring",
   
      restSpeed: 10
    }
    
  }),
  closedAddButton: {
    opacity: 0,
    scale: 0,
    
    transitionEnd: {     
      display: 'none',
    }
 
    
  },
  closedSaveButton: {
    opacity: 0,
    scale: 0,
    
    x: 45,
    transitionEnd: {     
      display: 'none',
    }
 
    
  },
  closedCancelButton: {
    opacity: 0,
    scale: 0,
  
    transition: {     
      delay: 0.1,
      
      display: 'none',
    },
    transitionEnd: {     
   
      display: 'none',
    }
 
    
  },
  

};

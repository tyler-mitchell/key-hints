import React from 'react';

// Externals
import PropTypes from 'prop-types';

// Material components
import {
  withStyles,
  makeStyles,
  Paper,
  Input,
  InputBase,
  Grid,
  Button,
  Divider,
  IconButton
} from '@material-ui/core';
import { useGlobalState, clearKeySelection, setGlobalState } from '../../state';
import { KeyTableContext } from '../../context/KeyTableContext';

// Material icons
import {
  Search,
  Edit as EditIcon,
  Refresh as RefreshIcon,
  Save as SaveIcon,
  Menu as MenuIcon,
  Add as AddIcon
} from '@material-ui/icons';
import styled from 'styled-components';

const useStyles = makeStyles({
  root: {
    padding: '10px 10px',
    display: 'flex',
    alignItems: 'center',
    borderRadius: 0
  },
  input: {
    marginLeft: 8,
    flex: 1
  },
  iconButton: {
    padding: 10
  },
  divider: {
    width: 1,
    height: 38,
    margin: 6
  }
});


const SearchIcon = styled(Search)`
  margin-right: ${({ theme }) => theme.spacing.unit};
  color: ${({ theme }) => theme.palette.text.secondary};
`;

const InputSearch = styled(Input)`
  flex-grow: 1;
  font-size: 14px;
  line-height: 16px;
  letter-spacing: -0.05px;
  margin-left: 8px;
`;

export const SearchInput = props => {
  const { theme, className, onChange, style, ...rest } = props;
  const classes = useStyles();
  const [drawerState, setDrawerState] = useGlobalState('drawerState');
  const [editMode, setEditMode] = useGlobalState('editMode');
  const [activeKeys, setActiveKeys] = useGlobalState('activeKeys') ;
  const [addMode, setAddMode] = useGlobalState('addMode');
  const [newKeys] = useGlobalState('newKeys');
  const {curKeyTable, addNewKeyToFirebase} = React.useContext(KeyTableContext);
  

  
  React.useEffect(() => {
    
    return () => {
      addMode && clearKeySelection()
    }
  },[addMode])
  
  const handleAddClick = () => {
    clearKeySelection();
    setGlobalState('addMode', v => !v);
  };
  const handleSaveKeyClick = () => {
    
    console.log("⭐: handleSaveKeyClick -> curKeyTable", curKeyTable.ref)
    addNewKeyToFirebase(curKeyTable, newKeys)
    clearKeySelection();
    setGlobalState('addMode', v => !v);
    console.log("⭐: handleSaveKeyClick -> curKeyTable", curKeyTable.data())
    
    
 
    
  };


  return (
    <Paper elevation={0} className={classes.root}>
      <IconButton
        className={classes.iconButton}
        aria-label="Menu"
        onClick={() => setDrawerState(!drawerState)}
      >
        <MenuIcon />
      </IconButton>
      <SearchIcon theme={theme} />
      <InputSearch {...rest} disableUnderline onChange={onChange} />

      <Divider className={classes.divider} />
      {editMode ? (
        <>
          <Grid container spacing={1}>
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
              <Button className={theme.button} variant="contained" size="small" disabled={true}>
                <RefreshIcon />
                Reset
              </Button>
            </Grid>
          </Grid>
        </>
      ) : (
        <>
          <Grid item>
            {!addMode && <Button
              onClick={() => setEditMode(true)}
              className={theme.button}
              variant="contained"
              color="primary"
              size="small"
            >
              <EditIcon />
              Edit
            </Button>}
            {!addMode ? (
              <Button
                onClick={handleAddClick}
                className={theme.button}
                variant="contained"
                color="primary"
                size="small"
              >
                <AddIcon />
                Add
              </Button>
            ) : (
              <>
                <Button
                  onClick={handleSaveKeyClick}
                  className={theme.button}
                  variant="contained"
                  color="primary"
                  size="small"
                >
                  <SaveIcon />
                  Save
                </Button>
                <Button
                  onClick={() => setAddMode(false)}
                  className={theme.button}
                  variant="contained"
                  color="secondary"
                  size="small"
                >
                  <SaveIcon />
                  Cancel
                </Button>
              </>
            )}
          </Grid>
        </>
      )}
    </Paper>
  );
};

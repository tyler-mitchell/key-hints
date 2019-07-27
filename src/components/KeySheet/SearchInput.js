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
import { useNumber } from 'react-hanger';
// Material icons
import {
  Search,
  Edit as EditIcon,
  Refresh as RefreshIcon,
  Save as SaveIcon,
  Menu as MenuIcon,
  Add as AddIcon,
  Keyboard as KeyMapIcon,
  FormatAlignJustify as ShortcutIcon
} from '@material-ui/icons';
import styled from 'styled-components';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import { initializeKeyMap } from '../Keyboard/KeyMapData';
import { motion, useCycle, AnimatePresence } from 'framer-motion';
import { InputAdornment } from '@material-ui/core';
import { Tooltip } from '@material-ui/core';
import { TextField } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    padding: '10px 10px',
    display: 'flex',
    borderRadius: '10px 10px 0px 0px',
    margin: '0px 0px 0px 0px',

    alignItems: 'center'
    // borderRadius: 0
  },
  input: {
    marginLeft: 8,
    flex: 1
  },
  iconButton: {
    padding: 10
  },
  keyMapButton: {
    padding: 0,
    width: '10px'
  },
  divider: {
    width: '1.3px',
    height: 33,
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

const SearchBox = styled(motion.div)``;

export const SearchInput = props => {
  const { theme, className, onChange, style, ...rest } = props;
  const classes = useStyles();
  const [drawerState, setDrawerState] = useGlobalState('drawerState');
  const [editMode, setEditMode] = useGlobalState('editMode');
  const [activeKeys, setActiveKeys] = useGlobalState('activeKeys');
  const [addMode, setAddMode] = useGlobalState('addMode');
  const [newKeys] = useGlobalState('newKeys');
  const [isSelected] = useGlobalState('selectedItem');
  const { curKeyTable, addNewKeyToFirebase, updateKeyToFirebase } = React.useContext(
    KeyTableContext
  );

  // React.useEffect(() => {

  //   return () => {
  //     addMode && clearKeySelection()
  //   }
  // },[addMode])

  const handleAddClick = () => {
    clearKeySelection();
    setGlobalState('keyMapMode', false);
    setGlobalState('addMode', v => !v);
  };

  const handleEditClick = () => {
    setEditMode(true);
  };
  const handleSaveEditClick = () => {
    setEditMode(false);
    updateKeyToFirebase(newKeys);

    setGlobalState('newKeys', v => ({ ...v, keys: { key1: {} } }));
  };

  const [fonts] = useGlobalState('devFonts');
  const [currentFont] = useGlobalState('currentFont');
  const [fontIndex, setFontIndex] = React.useState(0);

  const changeFont = () => {
    const newIndex = fontIndex === fonts.length - 1 ? 0 : fontIndex + 1;
    setFontIndex(newIndex);
    setGlobalState('currentFont', fonts[fontIndex]);
  };

  function handleKeyMapMode() {
    initializeKeyMap(curKeyTable.data().table);
    setGlobalState('keyMapMode', true);
  }

  const [view, setView] = React.useState('shortcutView');

  const handleChange = (event, newView) => {
    setView(newView);
  };
  const variants = {
    open: {
      opacity: [0, 0.6, 0.9, 1],
      x: '6px',
      
      width: '200px',
      
      // transition: {
      //   delay: 1,
      //   x: { type: "spring", stiffness: 100 },
      //   default: { duration: 2 },
      // }
    },
    closed: { opacity: [.5, 0, 0, 0], x: '-22px', width: '0px',   }
  };
  const [isOpen, toggleOpen] = useCycle(false, true);
  return (
    <Paper className={classes.root}>
      <Grid container xs={12} alignItems="center" directio="row" justify="center">
        <Grid container item xs={6} justify="flex-start" direction="row" alignItems="center">
          <IconButton
            className={classes.iconButton}
            aria-label="Menu"
            // style={{ marginRight: '10px' }}
            onClick={() => setDrawerState(!drawerState)}
          >
            <MenuIcon />
          </IconButton>

          <Divider className={classes.divider} />

          {/* <InputSearch {...rest} disableUnderline onChange={onChange} onFocus={()=> console.log("HELLO WORLDDDDD")} /> */}
          <motion.div>
            <IconButton
              onClick={() => toggleOpen()}
        
              
              style={{
                display: 'inline-block',
                position: 'relative',
                
                // background: 'white'
              }}
            >
              <Search  size="small" />
            </IconButton>
          </motion.div>
          <motion.div
            initial="closed"
            animate={isOpen ? 'open' : 'closed'}
            variants={variants}
            
            // initial={{ '--width': '0px' }}

            // style={{ display: 'inline-block', margin: '10px' }}
          >
            <TextField
              type="search"
              variant="outlined"
              margin="dense"
              style={{ width: 'inherit' }}
              // SelectProps={{
              //   MenuProps: {
              //     className: classes.menu,
              //   },
              // }}

              disabled={!isOpen}
              {...rest}
              disableUnderline
              onChange={onChange}
            />
          </motion.div>
        </Grid>

        {/* <Button
          onClick={handleKeyMapMode}

          variant="contained"
          color="primary"
          size="small"
        >
          <KeyboardIcon style={{}}/>
        </Button> */}
        <Grid item xs={3}>
          {editMode && (
            <>
              <Grid container spacing={1}>
                <Grid item>
                  <Button
                    className={theme.button}
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={() => handleSaveEditClick()}
                    // disabled={true}
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
          ) }
        </Grid>
        <Grid item container justify="flex-end" xs={3}>
          <ToggleButtonGroup size="small" value={view} exclusive onChange={handleChange}>
            <Tooltip title="shortcut view" placement="top">
              <ToggleButton
                value="shortcutView"
                onClick={() => {
                  setGlobalState('keyMapMode', false);
                }}
              >
                <ShortcutIcon />
              </ToggleButton>
            </Tooltip>
            <Tooltip title="map view" placement="top">
              <ToggleButton value="keymapView" onClick={handleKeyMapMode}>
                <KeyMapIcon />
              </ToggleButton>
            </Tooltip>
          </ToggleButtonGroup>
        </Grid>
      </Grid>
    </Paper>
  );
};

/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import {
  useGlobalState,
  setGlobalState,
  clearKeySelection
} from '../../../state';
import { KeyTableContext } from '../../../context/KeyTableContext';
import { KeySequence } from './KeySequence';
import styled from 'styled-components';
import Toast from './Toast';

import {
  makeStyles,
  Popover,
  Divider,
  TextField,
  CardContent,
  Grid,
  List,
  ListItem,
  TableCell,
  TableRow,
  Chip,
  ButtonGroup,
  // Button,
  Paper,
  Grow,
  Slide,
  Zoom
} from '@material-ui/core';

import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

import { a } from 'react-spring';
import { ToolBarAddView } from './ToolBarAddView';
import { useTheme } from '@material-ui/styles';
import { AnimatedPanel } from './AnimatedPanel';

import {
  usePopupState,
  bindTrigger,
  bindPopover,
  bindHover
} from 'material-ui-popup-state/hooks';
import KeyText from '../../Key/KeyText/KeyText';
import { Portal } from '@material-ui/core';
import { Button } from '@material-ui/core';
import _ from 'lodash';
import { motion, AnimatePresence } from 'framer-motion';
import { Avatar } from '@material-ui/core';
import { Container } from '@material-ui/core';
import { CardMedia } from '@material-ui/core';
import { IconButton } from '@material-ui/core';
import { SnackbarContent } from '@material-ui/core';
import { Snackbar } from '@material-ui/core';
import { Card } from '@material-ui/core';
import { Backdrop } from '@material-ui/core';
import { InputBase } from '@material-ui/core';
import {
  CheckCircleRounded as CheckIcon,
  ErrorRounded as ErrorIcon,
  Close as CloseIcon
} from '@material-ui/icons';
import { CardHeader, AppBar } from '@material-ui/core';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles({
  descriptionField: {
    padding: 0,
    background: 'white'
  },
  gridContainer: {
    width: '95%'
  },
  root: {
    display: 'flex',
    position: 'relative',
    // padding: '1rem',
    // left: 10,
    backgroundImage:
      'radial-gradient( circle farthest-corner at 0% 0.5%,  rgb(247, 247, 248) 0.1%, rgb(244, 245, 245) 100.2% )',
    top: 30,
    left: 0,
    right: 0,
    width: '95%',
    height: '80px',
    marginLeft: 'auto',
    marginRight: 'auto',
    // overflow: "hidden",
    justifyContent: 'flex-end',

    padding: '10px 10px',

    borderRadius: '5px',

    alignItems: 'center'
    // borderRadius: 0
  },
  buttonGroup: {
    borderRadius: '13px'
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
  },
  chip: { button: { marginRight: '15px' } },
  keyDescription: {
    textAlign: 'center'
  }
});

const KeySequenceContainer = styled(Grid)`
  border-radius: 8px;

  background-image: radial-gradient(
    circle farthest-corner at 0% 0.5%,
    rgb(247, 247, 248) 0.1%,
    rgb(244, 245, 245) 100.2%
  );
  width: 100%;
  height: 75px;
`;
const CardHead = styled(Grid)`
  /* padding: 30px 0px 5px 20px; */

  /* padding: 300px; */
`;
const KeyMenu = motion.custom(Grid);
export const NewKeyPanel = ({ saveClicked, ...props }) => {
  const [newKeys, setNewKeys] = useGlobalState('newKeys');
  const [addMode, setAddMode] = useGlobalState('addMode');

  const theme = useTheme();
  const classes = useStyles();

  const [keyInfo, setKeyInfo] = React.useState({
    category: 'uncategorized',
    description: null,
    keyDescription: null
  });
  const handleDescriptionChange = event => {
    const description = event.target.value;
    console.log('⭐: value', keyInfo);
    setKeyInfo(v => ({ ...v, description }));

    // setNewKeys(p => ({ ...p, category }))
  };
  const handleKeyDescription = event => {
    const keyDescription = event.target.value;
    setKeyTopText(keyDescription);
    setKeyInfo(v => ({ ...v, keyDescription }));

    // setNewKeys(p => ({ ...p, category }))
  };
  const popupState = usePopupState({
    variant: 'popover',
    popupId: 'demoPopover'
  });

  const chipColors = ['#f47c7c', '#6bd5e1', '#a1de93', '#ffd98e', '#ff8364'];

  const [chipData, setChipData] = React.useState([
    { key: 0, label: 'Angular' },
    { key: 1, label: 'jQuery' },
    { key: 2, label: 'Polymer' },
    { key: 3, label: 'React' },
    { key: 4, label: 'Vue.js' }
  ]);
  const [isKeyAvailable, setIsKeyAvailable] = React.useState(false);

  const [keyTopText, setKeyTopText] = React.useState('');
  const [keyTopRefs] = useGlobalState('keyTopTextRefs');
  const [keyTopRefKey] = useGlobalState('lastKeyRef');
  const [allKeys] = useGlobalState('allKeys');
  // Key Table Context
  const {
    curKeyTable,
    addNewKeyToFirebase,
    updateKeyToFirebase
  } = React.useContext(KeyTableContext);

  // Check for key availability
  React.useEffect(() => {
    const keys = _.values(newKeys.keys.key1);
    if (keys in allKeys) {
      setIsKeyAvailable(false);
    } else {
      setIsKeyAvailable(true);
    }

    console.log(`⭐: NewKeyPanel -> isKeyAvailable`, isKeyAvailable);
  }, [allKeys, isKeyAvailable, keyInfo, newKeys]);

  React.useEffect(() => {
    if (saveClicked !== 0) {
      if (Object.keys(newKeys.keys.key1).length === 0) {
        setSnackbarMessage('Empty shortcut');
        setSnackbarVariant('error');
      } else if (!keyInfo.description) {
        setSnackbarMessage('Shortcut description required');
        setSnackbarVariant('error');
      } else if (!isKeyAvailable) {
        setSnackbarMessage('Shortcut already exists');
        setSnackbarVariant('error');
      } else {
        setSnackbarVariant('success');
        handleSaveKeyClick();
        setSnackbarMessage('New shortcut added!');
      }
      setSnackbarOpen(true);
    }
    return () => {};
  }, [saveClicked]);

  React.useEffect(() => {
    if (addMode) {
      // deselect any selected item
      setGlobalState('selectedIndex', null);
    } else {
      // clear input
      setKeyInfo({
        category: 'uncategorized',
        description: '',
        keyDescription: ''
      });
    }
  }, [addMode]);

  const handleSaveKeyClick = () => {
    const newKey = { ...newKeys, ...keyInfo };
    console.log(`⭐: handleSaveKeyClick -> newKey`, newKey);
    addNewKeyToFirebase(newKey);
    setAddMode(false);
  };
  // Snack Bar

  const [snackbarVariant, setSnackbarVariant] = React.useState('info');
  const [snackbarRef] = useGlobalState('snackbarRef');
  const [snackbarMessage, setSnackbarMessage] = React.useState('');
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);

  const onSnackbarClose = (e, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };
  return (
    <>
      <AnimatedPanel>
        {/* <Grid container alignItems="flex-start">  */}
        <Paper
          elevation={3}
          raised
          component={Grid}
          style={{
            height: '440px',
            borderRadius: 15,

            padding: '25px'
          }}
        >
          <div
            style={{
              width: 50,
              height: 4,

              // transform: 'translateY(-10px)',
              backgroundColor: 'rgba(220,220,220,0.2)',

              top: 7,
              borderRadius: 4,
              position: 'absolute',
              margin: '0 auto',
              // marginBottom: 46,
              left: 0,
              zIndex: 300,
              right: 0
            }}
          />

          <CardHead
            item
            container
            xs={3}
            justify="flex-start"
            direction="row"
            alignItems="center"
          >
            <Grid item xs={2}>
              <Avatar />
            </Grid>
            <Grid item xs={10}>
              <InputBase
                // value={newKeys.description}

                variant="outlined"
                style={{
                  fontSize: '36px',
                  // margin: 0,
                  'label + &': {
                    marginTop: 0
                  },

                  background: 'white'
                }}
                fullWidth
                value={keyInfo.description}
                placeholder="untitled"
                onChange={event => handleDescriptionChange(event)}
                rowsMax={3}
              />
            </Grid>
          </CardHead>

          <KeySequenceContainer
            item
            container
            justify

            // wrap="nowrap"
          >
            <Grid container style={{ position: 'relative' }}>
              <KeySequence
                isKeyAvailable={isKeyAvailable}
                isEmpty={Object.keys(newKeys.keys.key1).length === 0}
                style={{ position: 'absolute' }}
                newKeys={newKeys.keys}
              />
            </Grid>

            <div
              style={{
                display: 'flex',
                width: 0,
                height: 0,
                position: 'relative'
              }}
            ></div>
          </KeySequenceContainer>
          <Grid item style={{ paddingTop: '15px' }}>
            <InputBase
              classes={classes.keyDescription}
              style={{
                position: 'relative',
                borderRadius: '10px',
                border: 'solid 2px rgba(220,220,220,0.2)',
                fontSize: '24px'
              }}
              inputProps={{
                min: 0,
                style: {
                  textAlign: 'center'
                }
              }}
              fullWidth
              value={keyTopText}
              variant="subtitle1"
              color="textSecondary"
              multiline
              rows={1}
              rowsMax={10}
              placeHolder="enter key top label"
              onChange={event => handleKeyDescription(event)}
            />
          </Grid>
        </Paper>
      </AnimatedPanel>
      {keyTopRefs[keyTopRefKey] && (
        <Portal
          container={keyTopRefs[keyTopRefKey].current}
          style={{ height: 'inherit', width: 'inherit' }}
        >
          <KeyText keyTopText={keyTopText} />
        </Portal>
      )}
      <Portal container={snackbarRef}>
        <Toast
          snackbarVariant={snackbarVariant}
          snackbarMessage={snackbarMessage}
          onSnackbarClose={onSnackbarClose}
          snackbarOpen={snackbarOpen}
        />
      </Portal>
    </>
  );
};

export const CategoryPaper = styled(Paper)`
  height: 471px;
  margin-right: 10px;
  display: block;
  overflow-x: hidden;
  width: 200px;
`;

/* <Grid item>
                  <ButtonGroup
                    className={classes.buttonGroup}
                    variant={keyInfo.category ? 'contained' : 'outlined'}
                    color="primary"
                    aria-label="Split button"
                  >
                    <Button size="small" className={classes.buttonGroup}>
                      {keyInfo.category}
                    </Button>
                    <Button
                      {...bindTrigger(popupState)}
                      color="primary"
                      className={classes.buttonGroup}
                      size="small"
                      aria-haspopup="true"
                    >
                      <ArrowDropDownIcon fontSize="small" />
                    </Button>
                  </ButtonGroup>
  
                  <Popover
                    {...bindPopover(popupState)}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'center'
                    }}
                    PaperProps={{
                      style: {
                        display: 'flex',
                        justifyContent: 'center',
                        flexWrap: 'wrap',
                        padding: '5px 2px',
                        borderRadius: '20px',
                        maxWidth: '175px'
                      }
                    }}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'center'
                    }}
                  >
                    <Grid container justify="flex-start" alignItems="flex-start">
                      {chipData.map((data, i) => {
                        let icon;
                        const chipColor = chipColors[i % chipColors.length];
                        if (data.label === keyInfo.category) {
                          icon = <CheckIcon />;
                        }
  
                        return (
                          <Chip
                            key={data.key}
                            icon={
                              <Zoom timeout={300} in={data.label === keyInfo.category}>
                                <CheckIcon />
                              </Zoom>
                            }
                            label={data.label}
                            clickable={true}
                            size="small"
                            onClick={() => {
                              const selectedChip = data.label;
                              setKeyInfo(v => ({ ...v, category: selectedChip }));
                              console.log('⭐: VALUE ON CHIP CLICK', keyInfo);
                            }}
                            style={{ margin: '3px', backgroundColor: chipColor }}
                            className={classes.chip}
                          />
                        );
                      })}
                    </Grid>
                  </Popover>
                </Grid> */

import React from 'react';
import { useGlobalState, setGlobalState, clearKeySelection } from '../../../state';
import { KeyTableContext } from '../../../context/KeyTableContext';
import { KeySequence, renderAddedKeys } from './KeySequence';
import styled from 'styled-components';



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
import CheckIcon from '@material-ui/icons/Check';
import { a } from 'react-spring';
import { ToolBarAddView } from './ToolBarAddView';
import { useTheme } from '@material-ui/styles';
import { AnimatedPanel } from './AnimatedPanel';

import { usePopupState, bindTrigger, bindPopover, bindHover } from 'material-ui-popup-state/hooks';
import { Button } from '@material-ui/core';

const useStyles = makeStyles({
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
  chip: {button:{marginRight: '15px'}}
});

export const NewKeyPanel = props => {
  const [newKeys, setNewKeys] = useGlobalState('newKeys');
  const theme = useTheme();
  const classes = useStyles();

  const [value, setValue] = React.useState({ description: null, category: null });
  const handleDescriptionChange = event => {
    const description = event.target.value;
    setValue(v => ({ ...v, description }));

    console.log('⭐: value', value);
    // setNewKeys(p => ({ ...p, category }))
  };
  const popupState = usePopupState({
    variant: 'popover',
    popupId: 'demoPopover'
  });

  const chipColors = ['#f47c7c', '#6bd5e1', '#a1de93', '#ffd98e', '#ff8364',];
  
  const [chipData, setChipData] = React.useState([
    { key: 0, label: 'Angular' },
    { key: 1, label: 'jQuery' },
    { key: 2, label: 'Polymer' },
    { key: 3, label: 'React' },
    { key: 4, label: 'Vue.js' }
  ]);
  return (
    <>
      <AnimatedPanel>
        {/* <Grid container alignItems="flex-start">  */}

        <CardContent style={{ borderRadius: 15, background: 'white' }}>
          <div
            style={{
              width: 50,
              height: 4,
              transform: 'translateY(-10px)',
              backgroundColor: 'rgba(220,220,220,0.2)',

              bottom: -5,
              borderRadius: 4,
              position: 'relative',
              margin: '0 auto',
              left: 0,
              right: 0
            }}
          />
          <ToolBarAddView
            theme={theme}
            placeholder="Search…"
            inputProps={{ 'aria-label': 'Search' }}
          />
          
          
          <Divider />
          <List>
            <TableRow style={{ display: 'flex', justifyContent: 'flex-start' }} divider>
              <Grid container direction="row" alignItems="flex-end" spacing={1} xs={12}>
                <Grid item>
                  <TextField
                    // value={newKeys.description}
                    multiline
                    rowsMax={2}
                    placeholder="description"
                    onChange={event => handleDescriptionChange(event)}
                  />
                </Grid>
                <Grid item>
                  <ButtonGroup
                    className={classes.buttonGroup}
                    
                    variant={value.category ? 'contained' : 'outlined'}
                    color="primary"
                    aria-label="Split button"
                  >
                    <Button size="small" className={classes.buttonGroup}>{value.category}</Button>
                    <Button
                     
                      {...bindTrigger(popupState)}
                      color="primary"
                      className={classes.buttonGroup}
                      size="small"
                      aria-haspopup="true"
                    >
                      <ArrowDropDownIcon fontSize="small"/>
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
                    <Grid container  justify="flex-start" alignItems="flex-start">
                      {chipData.map((data, i) => {
                        let icon;
                        const chipColor = chipColors[i % chipColors.length] 
                        if (data.label === value.category) {
                          icon = <CheckIcon />
                        } 

                        return (
                          <Chip
                            key={data.key}
                            icon={<Zoom timeout={300} in={data.label === value.category}><CheckIcon/></Zoom>}
                            label={data.label}
                           
                            
                            clickable={true}
                            size="small"
                            onClick={() => {
                              const selectedChip = data.label;
                              setValue(v => ({ ...v, category: selectedChip }));
                              console.log('⭐: VALUE ON CHIP CLICK', value);
                            }}
                            style={{ margin: '3px', backgroundColor: chipColor}} 
                            className={classes.chip}
                          />
                        );
                      })}
                    </Grid>
                  </Popover>

                  {/* <TextField
                  
                  rows={3}
                  rowsMax={3}
                  
                  placeholder="category"
                  onChange={event => {
                    const category = event.target.value;
                    setNewKeys(p => ({ ...p, category }));
                  }}
                  /> */}
                </Grid>
              </Grid>
              {renderAddedKeys(newKeys.keys)}
            </TableRow>
          </List>
          {/* <Grid item xs={4}>
              <TextareaAutosize
                rowsMax={4}
                aria-label="Maximum height"
                placeholder="Maximum 4 rows"
                onChange={event => {
                  const description = event.target.value;
                  setNewKeys(p => ({ ...p, description }));
                }}
              />
            </Grid> */}
          />
        </CardContent>
        {/* </Grid> */}
      </AnimatedPanel>
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

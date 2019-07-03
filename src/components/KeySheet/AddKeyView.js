import React from 'react';
import { useGlobalState, setGlobalState, clearKeySelection } from '../../state';
import { KeyTableContext } from '../../context/KeyTableContext';
import { NewKeyForm } from './KeyList/KeyListItem';
import { Divider, TextField, CardContent, Grid } from '@material-ui/core';
import { a } from 'react-spring';
import { SearchInput } from './SearchInput';
import { useTheme } from '@material-ui/styles';
import {AnimatedAddView} from './AnimatedAddView'
export const AddKeyView = props => {
  const [newKeys, setNewKeys] = useGlobalState('newKeys');
  const theme = useTheme();

  return (
    <>
      <AnimatedAddView>
    <Grid container alignItems="flex-start"> 
        
        
        <CardContent >
          <SearchInput theme={theme} placeholder="Search…" inputProps={{ 'aria-label': 'Search' }} />
        
            <Divider />
            <NewKeyForm
              // onChange={e => setDescription(e.target.value)}
              category="Hello"
              newKeys={newKeys.keys}
            >
              <TextField
                value={newKeys.description}
                variant="outlined"
                label="description"
                onChange={event => {
                  const description = event.target.value;
                  setNewKeys(p => ({ ...p, description }));
                }}
              />
              <TextField
                value={newKeys.category}
                label="category"
                variant="outlined"
                onChange={event => {
                  const category = event.target.value;
                  setNewKeys(p => ({ ...p, category }));
                }}
              />
            </NewKeyForm>
      
          </CardContent>
          </Grid>
       
      </AnimatedAddView>
    </>
  );
};

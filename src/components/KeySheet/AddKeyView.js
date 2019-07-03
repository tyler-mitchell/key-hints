import React from 'react';
import { useGlobalState, setGlobalState, clearKeySelection } from '../../state';
import { KeyTableContext } from '../../context/KeyTableContext';
import { NewKeyForm } from './KeyList/KeyListItem';
import { Divider, TextField, CardContent, Grid } from '@material-ui/core';
import { a } from 'react-spring';
import { ToolBarAddView } from './ToolBarAddView';
import { useTheme } from '@material-ui/styles';
import { AnimatedAddView } from './AnimatedAddView';
export const AddKeyView = props => {
  const [newKeys, setNewKeys] = useGlobalState('newKeys');
  const theme = useTheme();

  return (
    <>
      <AnimatedAddView>
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
        {/* </Grid> */}
      </AnimatedAddView>
    </>
  );
};

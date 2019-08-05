// React
import React from 'react';
import './App.css';

import { useStyles } from './components/design-system/styles';
import { KeySheet } from './components/KeySheet/KeySheet';
import useLockBodyScroll from './components/hooks/useLockScroll';
// Local
import Keyboard from './components/Keyboard';

// utility for constructing className strings conditionally.
import clsx from 'clsx';

// Material UI
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

function Dashboard() {
  useLockBodyScroll();
  const style = useStyles();

  return (
    <div className={style.root}>
      {/* ⭐ MAIN APP */}

      <main className={style.content}>
        <div className={style.appBarSpacer} />
        <Container maxWidth="lg" className={style.container}>
          <Grid container direction="column" justify="center" spacing={2} alignItems="flex-start">
            {/* Keyboard */}

            {/* <Grid item container justify="flex-end" xs={12} style={{ position: 'relative', zIndex: 6 }}> */}
              <Keyboard />
            {/* </Grid> */}
            <Grid
              container
              item
              direction="row"
              xs={12}
              spacing={3}
              justify="center"
              alignItems="center"
              style={{
                position: 'relative',
                zIndex: 5
              }}
            >
              <Grid item xs={12}>
              
                  
                      <KeySheet category="All Keys" />
                   
                  
                  

              
   
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </main>
    </div>
  );
}

export default Dashboard;

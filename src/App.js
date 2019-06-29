import React, { Component } from 'react';
import { Router } from 'react-router-dom';

import { createBrowserHistory } from 'history';
import KeyTableProvider from './context/KeyTableContext'


// Material helpers
import { ThemeProvider } from '@material-ui/styles';
import {FirebaseProvider} from './components/utils/firebase'




// Theme
import theme from './components/design-system/theme'


// Styles
// import 'react-perfect-scrollbar/dist/css/styles.css';
// import './assets/scss/index.scss';

// Routes
import Routes from './Routes';


// Global State
import { GlobalStateProvider } from './state';



// Browser history
const browserHistory = createBrowserHistory();


export default class App extends Component {
  render() {
    return (
      <GlobalStateProvider>
        <FirebaseProvider>
          <KeyTableProvider>
            <ThemeProvider theme={theme}>
              <Router history={browserHistory}>
    
                <Routes />
              </Router>
            </ThemeProvider>
          </KeyTableProvider>
        </FirebaseProvider>
      </GlobalStateProvider>
    );
  }
}
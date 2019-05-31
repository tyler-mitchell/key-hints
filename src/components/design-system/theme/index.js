import { createMuiTheme } from '@material-ui/core/styles';

const primary = {
  main: '#1da1f2',
  dark: '#1a91da',
};
const theme = {
  typography: {
    fontSize: 12,
    fontWeightRegular: 500,
    // Use the system font instead of the default Roboto font.
    fonts: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ],
    body1: {
      fontSize: '1rem',
    },
    colors: {
      blue: '#07c',
      blues: [
        '#004170',
        '#006fbe',
        '#2d8fd5',
        '#5aa7de',
      ]
    }
  },

  palette: {
    primary,
  },
  spacing: 4,

};

// const white = {
//   text: '#ffffff',

//   secondary: 'rgba(255, 255, 255, 0.54)',
//   disabled: 'rgba(255, 255, 255, 0.38)',
//   hint: 'rgba(255, 255, 255, 0.24)',
// };



// const linked = {
//   cursor: 'pointer',
//   color: primary.main,
//   display: 'inline-block',
// };

// const linkInverted = {
//   ...linked,
//   color: white.primary,
//   '&:hover': {
//     color: theme.palette.common.white,
//   },
// };

export default {
  theme,
  primary,
  // linked,
  // linkInverted,
  // white,
};
import { makeStyles } from '@material-ui/core/styles';



const drawerWidth = 240;

export const useDrawerStyles = makeStyles(theme => ({
  root: {
    display: 'flex'
  },
  appBar: {
    fontSize: '90px',
    height: '50px',
    zIndex: theme.zIndex.drawer + 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  appBarShift: {
    marginLeft: drawerWidth
  },
  menuButton: {
    marginRight: 36
  },
  hide: {
    display: 'none'
  },
  drawer: {
    // width: drawerWidth,
    height: '300px',
    top: '100px',

    flexShrink: 0,
    whiteSpace: 'nowrap'
  },
  paper: {
    height: '870px',
    marginBottom: '30px',
    width: drawerWidth,

    elevation: 9,
    borderRadius: '0px 12px 12px 0px',
    top: 73,

    whiteSpace: 'nowrap'
  },
  drawerTab: {
    height: '60px',
    width: '80px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',

    elevation: 9,
    borderRadius: '0px 35px 35px 0px',
    top: 75
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  }
}));

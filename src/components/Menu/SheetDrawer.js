import React from 'react'
import {
  Menu as MenuIcon,
  ChevronRight as ChevronRightIcon,
  ChevronLeft as ChevronLeftIcon,
  Add as AddIcon,
} from '@material-ui/icons';
import {
  Typography,
  AppBar,
  IconButton,
  Toolbar,
  CssBaseline,
  Grid,
  Drawer,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Fab,
  ButtonIcon
} from '@material-ui/core';
import { SheetList } from './SheetList';
import { useDrawerStyles } from './SheetDrawer.styles';
import { useTheme } from '@material-ui/core/styles';
import { FirebaseContext } from '../utils/firebase';
import { NewSheetButton } from './NewSheetButton'


export const SheetDrawer = () => {
  const theme = useTheme();
  const classes = useDrawerStyles();
  const [open, setOpen] = React.useState(false);
  const { firebase, userAuthState } = React.useContext(FirebaseContext);
  const [user] = userAuthState;
  function handleDrawerOpen() {
    setOpen(!open);
  }

  function handleDrawerClose() {
    setOpen(false);
  }
  
  return (
    <>
    
    <Drawer
        classes={{ paper: classes.paper }}
        variant="persistent"
        hideBackdrop={true}
        BackdropProps={{ invisible: true }}
        
        PaperProps={{ elevation: 1 }}
        open={open}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <Divider />
        <SheetList/>
        <Divider style={{ bottom: '50px', position: 'absolute' }} />

        <Grid container justify="center">
          {user && <NewSheetButton />}
        </Grid>

      </Drawer>

      <Drawer
        variant="persistent"
        classes={{ paper: classes.drawerTab }}
        PaperProps={{ elevation: 3 }}
        open={!open}
      >
        <div style={{ marginLeft: '20px' }}>
          <IconButton onClick={handleDrawerOpen}>
            <MenuIcon />
          </IconButton>
        </div>
      </Drawer>
    
    </>
    

  )
}
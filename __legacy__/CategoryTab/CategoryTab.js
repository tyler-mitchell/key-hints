import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
import Switch from '@material-ui/core/Switch';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Paper from '@material-ui/core/Paper';

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired
};

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper
  }
}));

export default function CategoryTab() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  function handleChange(event, newValue) {
    setValue(newValue);
  }

  const [invisible, setInvisible] = React.useState(false);

  function handleBadgeVisibility() {
    setInvisible(!invisible);
  }

  return (
    <div className={classes.root}>
      <Paper value={value} indicatorColor="primary"  textColor="primary"  onChange={handleChange} >
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab
            label={
              <Badge className={classes.padding} color="secondary" badgeContent={4} invisible={invisible}>
                All
              </Badge>
            }
          />
          <Tab
            label={
              <Badge className={classes.padding} color="secondary" badgeContent={4} invisible={invisible}>
                Basic Editing
              </Badge>
            }
          />
          <Tab
            label={
              <Badge className={classes.padding} color="secondary" badgeContent={4} invisible={invisible}>
                Workspace Shortcuts
              </Badge>
            }
          />
          <Tab
            label={
              <Badge className={classes.padding} color="secondary" badgeContent={4} invisible={invisible}>
                Text Editor
              </Badge>
            }
          />
          <Tab
            label={
              <Badge className={classes.padding} color="secondary" badgeContent={4} invisible={invisible}>
                Terminal Shortcuts
              </Badge>
            }
          />
          <Tab
            label={
              <Badge className={classes.padding} color="secondary" badgeContent={4} invisible={invisible}>
                Misc
              </Badge>
            }
          />
        </Tabs>

      </Paper>
      <FormGroup column>
        <FormControlLabel
          control={<Switch color="primary" checked={!invisible} onChange={handleBadgeVisibility} />}
          label="Show Badge"
        />
      </FormGroup>
    </div>
  );
}

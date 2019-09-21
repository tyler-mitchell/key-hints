import React from "react";

// Externals
import PropTypes from "prop-types";

// Material components
import {
  makeStyles,
  Paper,
  Input,
  InputBase,
  Grid,
  Button,
  Divider,
  IconButton
} from "@material-ui/core";
import {
  useGlobalState,
  clearKeySelection,
  setGlobalState
} from "../../../state";
import { KeyTableContext } from "../../../context/KeyTableContext";

// Material icons
import {
  Search,
  Edit as EditIcon,
  Refresh as RefreshIcon,
  Save as SaveIcon,
  Menu as MenuIcon,
  Add as AddIcon
} from "@material-ui/icons";
import styled from "styled-components";

const useStyles = makeStyles({
  root: {
    padding: "10px 10px",
    display: "flex",
    alignItems: "center",
    borderRadius: 0
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
  }
});

const SearchIcon = styled(Search)`
  margin-right: ${({ theme }) => theme.spacing.unit};
  color: ${({ theme }) => theme.palette.text.secondary};
`;

const InputSearch = styled(Input)`
  flex-grow: 1;
  font-size: 14px;
  line-height: 16px;
  letter-spacing: -0.05px;
  margin-left: 8px;
`;

export const ToolBarAddView = props => {
  const { theme, className, onChange, style, keyInfo, ...rest } = props;
  const classes = useStyles();
  const [drawerState, setDrawerState] = useGlobalState("drawerState");

  const [mode, setMode] = useGlobalState("mode");
  const [newKeys, setNewKeys] = useGlobalState("newKeys");
  // const [keyDescription, setKeyDescription] = React.useState('')
  const {
    curKeyTable,
    addNewKeyToFirebase,
    updateKeyToFirebase
  } = React.useContext(KeyTableContext);

  const handleSaveKeyClick = () => {
    const newKey = { ...newKeys, ...keyInfo };
    console.log(`⭐: handleSaveKeyClick -> newKey`, newKey);
    addNewKeyToFirebase(newKey);
    setMode(null);
  };

  return (
    <Paper elevation={0} className={classes.root}>
      <Divider className={classes.divider} />
      <>
        <Grid item>
          <>
            <Button
              onClick={handleSaveKeyClick}
              className={theme.button}
              variant="contained"
              color="primary"
              size="small"
            >
              <SaveIcon />
              Save
            </Button>
            <Button
              onClick={() => setMode(null)}
              className={theme.button}
              variant="contained"
              color="secondary"
              size="small"
            >
              <SaveIcon />
              Cancel
            </Button>
          </>
        </Grid>
      </>
    </Paper>
  );
};

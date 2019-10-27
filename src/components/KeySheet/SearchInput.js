import React from "react";

// Externals
import PropTypes from "prop-types";

// Material components
import {
  withStyles,
  makeStyles,
  Paper,
  Input,
  InputBase,
  Grid,
  Button,
  Divider,
  FormControlLabel,
  Checkbox,
  IconButton
} from "@material-ui/core";
import { useGlobalState, clearKeySelection, setGlobalState } from "../../state";
import { KeyTableContext } from "../../context/KeyTableContext";
import { useNumber } from "react-hanger";
// Material icons
import {
  Search,
  Edit as EditIcon,
  Refresh as RefreshIcon,
  Save as SaveIcon,
  Menu as MenuIcon,
  Add as AddIcon,
  Keyboard as KeyMapIcon,
  FormatAlignJustify as ShortcutIcon
} from "@material-ui/icons";
import styled from "styled-components";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import { initializeKeyMap } from "../Keyboard/KeyMapData";
import { motion, useCycle, AnimatePresence } from "framer-motion";
import { CategoryMenu } from "./CategoryMenu/CategoryMenu";
import { ButtonGroup } from "@material-ui/core";
import { InputAdornment } from "@material-ui/core";
import { Tooltip } from "@material-ui/core";
import { TextField } from "@material-ui/core";

const AnimatedPaper = motion.custom(Paper);
const useStyles = makeStyles({
  root: {
    width: "100%",
    padding: "10px 10px",
    display: "flex",
    borderRadius: "10px 10px 0px 0px",
    margin: "0px 0px 0px 0px",

    alignItems: "center"
    // borderRadius: 0
  },
  input: {
    marginLeft: 8,
    flex: 1
  },
  iconButton: {
    padding: 10
  },
  keyMapButton: {
    padding: 0,
    width: "10px"
  },
  divider: {
    width: "1.3px",
    height: 33,
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

const SearchBox = styled(motion.div)``;

export const SearchInput = props => {
  const { theme, className, onChange, style, ...rest } = props;
  const classes = useStyles();
  const [drawerState, setDrawerState] = useGlobalState("drawerState");
  const [mode, setMode] = useGlobalState("mode");
  const [activeKeys, setActiveKeys] = useGlobalState("activeKeys");
  const [newKeys] = useGlobalState("newKeys");
  const [isSelected] = useGlobalState("selectedItem");
  const [initialLayerIndices] = useGlobalState("initialLayerIndices");
  const {
    curKeyTable,
    addNewKeyToFirebase,
    updateKeyToFirebase
  } = React.useContext(KeyTableContext);
  const [showMultipleLayers, setShowMultipleLayers] = useGlobalState(
    "showMultipleLayers"
  );
  const handleSaveEditClick = () => {
    setMode(null);
    updateKeyToFirebase(newKeys);

    setGlobalState("newKeys", v => ({ ...v, keys: { key1: [] } }));
  };

  const [selected, setSelected] = React.useState(false);
  function handleKeyMapMode(event, newView) {
    if (selected) {
      setSelected(false);
      setGlobalState("mode", null);
    } else {
      setSelected(true);
      setGlobalState("mode", "KEYMAP_MODE");
    }
  }
  React.useEffect(() => {
    if (mode !== "KEYMAP_MODE" && selected) {
      setSelected(false);
    }
  }, [mode]);
  const [view, setView] = React.useState("shortcutView");

  const handleChange = (event, newView) => {};
  const variants = {
    open: {
      opacity: [0, 0.6, 0.9, 1],
      x: "6px",

      width: "200px"

      // transition: {
      //   delay: 1,
      //   x: { type: "spring", stiffness: 100 },
      //   default: { duration: 2 },
      // }
    },
    closed: { opacity: [0.5, 0, 0, 0], x: "-22px", width: "0px" }
  };
  const [isOpen, toggleOpen] = useCycle(false, true);
  return (
    <Paper
      animate={mode === "KEYMAP_MODE" ? "opened" : "closed"}
      variants={paperVariants}
      className={classes.root}
    >
      <Grid
        container
        xs={12}
        alignItems="center"
        direction="row"
        justify="center"
      >
        <Grid
          container
          item
          xs={6}
          justify="flex-start"
          direction="row"
          alignItems="center"
        >
          {mode === "KEYMAP_MODE" ? (
            <FormControlLabel
              control={
                <Checkbox
                  onChange={() => setShowMultipleLayers(!showMultipleLayers)}
                  value="checkedC"
                  checked={showMultipleLayers}
                />
              }
              label="Multiple Layers"
            />
          ) : (
            <>
              <Grid item xs={6}>
                {initialLayerIndices && <CategoryMenu />}
              </Grid>
              <Divider className={classes.divider} />
              <motion.div>
                <IconButton
                  onClick={() => toggleOpen()}
                  style={{
                    display: "inline-block",
                    position: "relative"

                    // background: 'white'
                  }}
                >
                  <Search size="small" />
                </IconButton>
              </motion.div>
              <motion.div
                initial="closed"
                animate={isOpen ? "open" : "closed"}
                variants={variants}
              >
                <TextField
                  type="search"
                  variant="outlined"
                  margin="dense"
                  style={{ width: "inherit" }}
                  // SelectProps={{
                  //   MenuProps: {
                  //     className: classes.menu,
                  //   },
                  // }}

                  disabled={!isOpen}
                  {...rest}
                  disableUnderline
                  onChange={onChange}
                />
              </motion.div>
            </>
          )}
        </Grid>

        {/* <Button
          onClick={handleKeyMapMode}

          variant="contained"
          color="primary"
          size="small"
        >
          <KeyboardIcon style={{}}/>
        </Button> */}
        <Grid item xs={3}>
          {mode === "EDIT_MODE" && (
            <>
              <Grid container spacing={1}>
                <Grid item>
                  <Button
                    className={theme.button}
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={() => handleSaveEditClick()}
                    // disabled={true}
                  >
                    <SaveIcon />
                    Save
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    className={theme.button}
                    variant="contained"
                    size="small"
                    disabled={true}
                  >
                    <RefreshIcon />
                    Reset
                  </Button>
                </Grid>
              </Grid>
            </>
          )}
        </Grid>
        <Grid item container justify="flex-end" xs={3}>
          <ToggleButton
            selected={selected}
            value="keymapView"
            onClick={handleKeyMapMode}
          >
            <Tooltip title="map view" placement="top">
              <KeyMapIcon />
            </Tooltip>
          </ToggleButton>

          {/* </ToggleButtonGroup> */}
        </Grid>
      </Grid>
    </Paper>
  );
};
const paperVariants = {
  opened: {
    paddingTop: 100,

    transition: {
      type: "spring",
      // damping: 50,
      stiffness: 250,
      // velocity: 800
      damping: 20,
      mass: 2

      // mass: 0.1
    }
  },
  closed: {
    paddingTop: 10,
    transition: {
      type: "spring",

      stiffness: 200,
      velocity: 150,
      damping: 20,
      mass: 2,
      delay: 0.1
      // restSpeed: 0.3
      // mass: 0.1
    }
  }
};

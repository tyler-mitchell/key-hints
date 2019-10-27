/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import Card from "@material-ui/core/Card";

import CardContent from "@material-ui/core/CardContent";

import styled from "styled-components";

import { useTheme } from "@material-ui/styles";
import { SearchInput } from "./SearchInput";

import KeyList from "./KeyList/KeyList";

import Paper from "@material-ui/core/Paper";
import Skeleton from "@material-ui/lab/Skeleton";
import KeyMapLayersPanel from "./KeyMapLayersPanel";

import { KeyTableContext } from "../../context/KeyTableContext";
import { usePopupState, anchorRef } from "material-ui-popup-state/hooks";
import {
  AppBar,
  Divider,
  CircularProgress,
  Grid,
  CardActionArea
} from "@material-ui/core";

import { FirebaseContext } from "../utils/firebase";

import "firebase/firestore";
import { useGlobalState, setGlobalState, clearKeySelection } from "../../state";
import SwipeableViews from "react-swipeable-views";
import { NewKeyPanel } from "./NewKeyPanel/NewKeyPanel";
import { CategoryMenu } from "./CategoryMenu/CategoryMenu";

import { filter, isEmpty } from "lodash";
import { initializeKeyMap } from "../Keyboard/KeyMapData";
import { pickBy } from "lodash-es";
import { bindTrigger, bindPopover } from "material-ui-popup-state";
import { useMeasure, useDimensions } from "../hooks/helpers";
import {
  motion,
  AnimatePresence,
  useCycle,
  useMotionValue
} from "framer-motion";
import { ButtonGroup } from "@material-ui/core";
import { Popper } from "@material-ui/core";
import { Popover } from "@material-ui/core";
import { IconButton } from "@material-ui/core";
import {
  Add as AddIcon,
  CancelOutlined as CancelIcon,
  Save as SaveIcon
} from "@material-ui/icons";
import { Fab } from "@material-ui/core";
import { CardActions } from "@material-ui/core";
import { Button } from "@material-ui/core";
import {
  useInput,
  useBoolean,
  useNumber,
  useArray,
  useOnMount,
  useOnUnmount
} from "react-hanger";
import { array } from "prop-types";
import { animated, useSpring } from "react-spring";
import {
  AnimatedPanel,
  NewKeyPanelContainer
} from "./NewKeyPanel/AnimatedPanel";
import { Backdrop } from "@material-ui/core";
const useStyles = makeStyles(theme => ({
  appBar: {
    color: "white",
    padding: 0
  },

  divider: {
    width: 1,
    height: 28,
    margin: 4
  },

  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  },
  root: {
    display: "flex"
  },
  popper: {
    zIndex: 0,

    position: "absolute",
    display: "block"
  },
  paper: {
    height: "471px",

    marginRight: "10px",
    display: "block",
    overflow: "scroll"
  },
  slideContainer: {
    height: 100
  },
  slide: {
    padding: 15,
    minHeight: 100,
    color: "#fff"
  },
  slide1: {
    backgroundColor: "#FEA900"
  },
  slide2: {
    backgroundColor: "#B3DC4A"
  }
}));

const CardHead = styled(AppBar)`
  &&& {
    position: relative;
    background: white;
  }
`;
const CategoryPaper = styled(Paper)`
  height: 471px;
  margin-right: 10px;
  display: block;
  overflow-x: hidden;
  width: 200px;

  &::-webkit-scrollbar {
    width: 5px;
  }
  &::hover {
    /* overflow-y: auto; */

    /* &::-webkit-scrollbar-track { background: #f7f7f7; }
&::-webkit-scrollbar-thumb { background: #eee; }
&:-webkit-scrollbar { width: 0 !important } */
  }
`;
const CardStyle = styled(Card)`
  /* height: 100%; */
  position: relative;
  width: 100%;
  z-index: 0;
  border-radius: 15;
  /* pointer-events: "auto"; */
  /* filter: "drop-shadow(16px 16px 20px red)"; */
`;

const AnimatedCard = motion.custom(CardStyle);

export const KeySheet = ({ vh }) => {
  const classes = useStyles();
  const theme = useTheme();

  const snackbarRef = React.useRef(null);
  React.useEffect(() => {
    // componentDidMount(), componentDidUpdate()

    setGlobalState("snackbarRef");

    // effect dependency array
  }, [snackbarRef]);

  const [initialLayerIndices] = useGlobalState("initialLayerIndices");

  const { curKeyTable, loadingUKTC, docIndex } = React.useContext(
    KeyTableContext
  );
  const [curCategory, setCurCategory] = useGlobalState("sheetCategory");

  const [mode] = useGlobalState("mode");

  // Category Menu popup state
  const popupState = usePopupState({
    variant: "popper",
    popupId: "demoPopper",
    isOpen: true
  });

  // useEffect

  // button popper
  const buttonPopupState = usePopupState({
    variant: "popover",
    popupId: "demoMenu"
  });

  const [listRef] = useGlobalState("listRef");
  React.useEffect(() => {
    return () => {
      setGlobalState("selectedCategoryIndex", -1);
      setCurCategory("All");
    };
  }, [curKeyTable, setCurCategory]);

  const [filteredKeyTable, setFilteredKeyTable] = React.useState(null);
  const [searchText, setSearchText] = React.useState("");
  function onChange(e) {
    setSearchText(e.target.value);
  }

  const [selection] = useGlobalState("selectedItem");

  React.useEffect(() => {
    if (curKeyTable) {
      if (searchText.length === 0) {
        const fktb = filterKeyTable(curKeyTable, curCategory);

        setFilteredKeyTable(fktb);
      } else {
        const fktb = filterSearchKeyTable(curKeyTable);
        setFilteredKeyTable(fktb);
      }
    }
  }, [curKeyTable, curCategory, searchText]);
  // Functions
  function filterKeyTable(ktable, curCategory) {
    if (curCategory !== "All") {
      return Object.values(curKeyTable.data().table).filter((key, shortcut) => {
        if (!key.category) {
          return false;
        } else {
          return key.category.includes(curCategory);
        }
      });
    } else {
      return curKeyTable.data().table;
    }
  }
  function filterSearchKeyTable(ktable) {
    const fktb = pickBy(curKeyTable.data().table, key => {
      return (
        key.description.toLowerCase().indexOf(searchText.toLowerCase()) !== -1
      );
    });
    const keys = Object.keys(fktb).sort();

    return fktb;
  }
  const handleAddClick = () => {
    clearKeySelection();

    setGlobalState("mode", "ADD_MODE");
  };
  const handleCancelClick = () => {
    setGlobalState("mode", null);
  };

  const [saveClicked, setSaveClicked] = React.useState(0);
  const handleSaveClick = e => {
    setSaveClicked(saveClicked + 1);
  };

  const [ref, { x, y, width, height }] = useDimensions();
  console.log(`⭐: height`, height);
  // const actions = useArray([
  //   { id: 'add', add: AddAction, clickFunction: handleAddClick },
  //   { id: 'save', save: SaveAction, clickFunction: handleAddClick },
  //   { id: 'cancel', cancel: CancelAction, clickFunction: handleAddClick }
  // ]);

  const [zIndex, setZIndex] = React.useState(0);
  return (
    <React.Fragment>
      {/* {loadingUKTC && <CircularProgress className={classes.progress} />} */}
      {/* {loadingUKTC && <Skeleton height={470} />} */}

      {curKeyTable && (
        <div style={{ position: "relative" }} ref={ref}>
          <AnimatedCard
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            ref={anchorRef(popupState)}
            style={{
              borderRadius: "10px",
              zIndex: zIndex,
              // height: "30vh"
              height: "inherit"
            }}

            // style={{
            //   height: '470px',
            //   position: 'relative',
            //   filter: `blur(${blur}px)`,
            //   zIndex: zIndex,
            //   borderRadius: '10px'
            // }}
          >
            <motion.div
              // initial={{ background: '#030303', zIndex: 0 }}
              animate={mode === "ADD_MODE" ? "openBackDrop" : "closeBackDrop"}
              variants={variants}
              style={{
                // background: 'rgba(0, 0, 0, 0.66)',
                width: "100%",
                // height: "30vh",

                backgroundClip: "context-box",

                top: 0,
                left: 0,

                position: "absolute"
                // zIndex: 3,
              }}
            />

            <div
              style={{
                position: "relative",
                zIndex: 9000
              }}
            >
              <SearchInput
                theme={theme}
                onChange={onChange}
                placeholder="Search…"
                inputProps={{ "aria-label": "Search" }}
              />
            </div>
            <Divider />

            <CardContent
              style={{
                position: "relative",
                zIndex: 0,
                height: vh - 5,
                // minHeight: vh
                marginBottom: 5
              }}
            >
              {isEmpty(filteredKeyTable) && "Keysheet is empty"}
              {!isEmpty(filteredKeyTable) && (
                // height: 360

                <>
                  {mode === "KEYMAP_MODE" ? (
                    <KeyMapLayersPanel height={vh - 10} />
                  ) : (
                    <KeyList
                      interactive={true}
                      height={vh - 10}
                      keyTableKeys={Object.keys(filteredKeyTable).sort()}
                      keyTable={filteredKeyTable}
                    />
                  )}
                </>
              )}
            </CardContent>
          </AnimatedCard>
          {/* <AnimatedPanel
            animate={mode === "KEYMAP_MODE" ? "openedMap" : "closedMap"}
            variantType="KeyMapPanel"
            parentHeight={height}
          ></AnimatedPanel> */}
          <NewKeyPanelContainer
            parentHeight={height}
            saveClicked={saveClicked}
          />

          <motion.div
            onClick={handleAddClick}
            initial={{
              position: "absolute",
              zIndex: 3,
              right: -20,
              bottom: -10
            }}
            custom={1}
            onTransitionEnd={onTransitionEnd}
            animate={
              !(mode === "ADD_MODE") ? "openAddButton" : "closedAddButton"
            }
            variants={actionVariants}
          >
            <AddAction clickFunction={handleAddClick} />
          </motion.div>
          <motion.div
            onClick={handleSaveClick}
            initial={{
              position: "absolute",
              right: 20,
              zIndex: 50,
              bottom: -10
            }}
            custom={1.1}
            onTransitionEnd={onTransitionEnd}
            animate={
              mode === "ADD_MODE" || mode === "EDIT_MODE"
                ? "openSaveButton"
                : "closedSaveButton"
            }
            variants={actionVariants}
          >
            <SaveAction clickFunction={handleCancelClick} />
          </motion.div>
          <motion.div
            onClick={handleCancelClick}
            initial={{
              position: "absolute",
              zIndex: 50,
              right: -20,
              bottom: -10
            }}
            custom={1}
            onTransitionEnd={onTransitionEnd}
            animate={
              mode === "ADD_MODE" || mode === "EDIT_MODE"
                ? "openCancelButton"
                : "closedCancelButton"
            }
            variants={actionVariants}
          >
            <CancelAction clickFunction={handleCancelClick} />
          </motion.div>
          <div ref={snackbarRef} />
        </div>
      )}
    </React.Fragment>
  );
};

function onTransitionEnd() {
  return "";
}
const AddAction = ({ animate, clickFunction, ...props }) => (
  <Fab
    // variant="outlined"
    color="primary"
    size="small"
  >
    <AddIcon style={{ fontSmoothing: "antialiased" }} />
  </Fab>
);
const SaveAction = ({ animate, clickFunction, ...props }) => (
  <Fab
    // variant="outlined"
    color="primary"
    size="small"
  >
    <SaveIcon style={{ fontSmoothing: "antialiased" }} />
  </Fab>
);
const CancelAction = ({ clickFunction, ...props }) => (
  <Fab
    // onClick={clickFunction}
    // variant="outlined"
    color="secondary"
    size="small"
  >
    <CancelIcon style={{ fontSmoothing: "antialiased" }} />
  </Fab>
);

const variants = {
  openBackDrop: {
    opacity: 0.1,
    zIndex: 1,
    pointerEvents: "auto",

    transition: {
      duration: 0.5
    }
  },
  closeBackDrop: {
    opacity: 0,
    zIndex: 0,
    pointerEvents: "none",
    transition: {
      duration: 0.3
    }
  }
};

const actionVariants = {
  openAddButton: i => ({
    opacity: 1,
    scale: 1,
    y: 0,
    x: 0,

    display: "initial",
    transition: {
      delay: 0.1,
      type: "spring",
      restSpeed: 0.3
    }
  }),
  openSaveButton: i => ({
    y: 0,
    x: 0,
    opacity: [0, 0.37, 0.81, 1],
    scale: [0, 1, 1, 1],
    marginRight: 5,
    display: "initial",
    transition: {
      delay: 0.2,
      type: "spring",

      restSpeed: 1
    }
  }),
  openCancelButton: i => ({
    y: 0,

    opacity: 1,
    scale: 1,
    display: "initial",

    transition: {
      delay: 0.1,
      type: "spring",

      restSpeed: 10
    }
  }),
  closedAddButton: {
    opacity: 0,
    scale: 0,

    transitionEnd: {
      display: "none"
    }
  },
  closedSaveButton: {
    opacity: 0,
    scale: 0,

    x: 45,
    transitionEnd: {
      display: "none"
    }
  },
  closedCancelButton: {
    opacity: 0,
    scale: 0,

    transition: {
      delay: 0.1,

      display: "none"
    },
    transitionEnd: {
      display: "none"
    }
  }
};

import React from "react";
import { useAnimation, motion, AnimatePresence } from "framer-motion";
import {
  bindToggle,
  bindPopper,
  usePopupState
} from "material-ui-popup-state/hooks";

import { CombineAction, ThenAction } from "./ActionButtons/ActionButtons";

import theme from "../../../../design-system/theme";
import { useSequenceStyles } from "../KeySequence.style";
import { ListItem } from "@material-ui/core";
import { Paper } from "@material-ui/core";
import ActionMenu from "./ActionMenu/ActionMenu";
import { bindTrigger } from "material-ui-popup-state";
import { bindHover } from "material-ui-popup-state/core";
import { hideText } from "polished";
import { StyledActionButton } from "./ActionButtons/ActionButton.style";
import {
  AddRounded as CombineIcon,
  KeyboardArrowRight as ThenIcon
} from "@material-ui/icons";

const actionButtonVariants = {
  initial: {
    scale: 0,
    opacity: 0
  },
  showCombine: {
    width: "20px",
    scale: 1,
    opacity: 1
  },
  showThen: {
    scale: 1,
    opacity: 1,

    width: "50px"
  }
};
const KeySequenceAction = ({
  key,
  endOfArray,
  initial,
  animate,
  actionPresent,
  actionHasOptions,
  variants,
  exit
}) => {
  const classes = useSequenceStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  function handleClick(event) {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  }
  const [isPresent, setIsPresent] = React.useState(actionPresent);
  React.useEffect(() => {}, [actionPresent]);

  const controls = useAnimation();
  const handleActionClick = action => {
    setActionType(action);
    controls.start();
    setTimeout(() => {
      popupState.close();
    }, 500);
  };
  const popupState = usePopupState({
    variant: "popper",
    popupId: "demoPopper"
  });
  const [actionType, setActionType] = React.useState("COMBINE");

  const id = "simple-popper";

  return (
    <>
      <motion.div
        style={{ width: "30px", display: "flex", position: "relative" }}
        {...bindHover(popupState)}
        animate={{}}
      >
        <AnimatePresence exitBeforeEnter>
          {actionType === "COMBINE" && (
            <CombineAction key={"COMBINE"} onClick={handleActionClick} />
          )}
          {actionType === "THEN" && (
            <ThenAction
              key={"THEN"}
              onClick={handleActionClick}
              // {...bindHover(popupState)}
            />
          )}
        </AnimatePresence>
      </motion.div>

      {actionHasOptions && (
        <ActionMenu
          classes={classes}
          popupState={popupState}
          actionType={actionType}
          setActionType={setActionType}
        />
      )}
    </>
  );
};

export default KeySequenceAction;

import React from "react";
import styled from "styled-components";

import { FlashingContext } from "../../../Key/FlashingContext";
import {
  IconButton,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  List,
  Badge,
  Typography,
  Chip,
  Grid,
  TextField,
  TextareaAutosize
} from "@material-ui/core";
import {
  usePopupState,
  bindToggle,
  bindPopper
} from "material-ui-popup-state/hooks";

import { makeStyles } from "@material-ui/core/styles";

import { KeyTable } from "../../SheetData";
import {
  ArrowBack as LeftArrowIcon,
  ArrowForward as RightArrowIcon,
  ArrowUpward as UpArrowIcon,
  ArrowDownward as DownArrowIcon,
  Add as AddIcon
} from "@material-ui/icons";

import _ from "lodash";
import { useTransition, animated, config, useSpring } from "react-spring";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import { usePrevious } from "../../../hooks/helpers";
import { RenderIcon } from "../../KeyList/KeyListItem";
import { black } from "../../../design-system/theme/common";
import theme from "../../../design-system/theme";
import { CombineAction } from "./KeySequenceAction/ActionButtons/ActionButtons";
import { useSequenceStyles } from "./KeySequence.style";

import TouchRipple from "@material-ui/core/ButtonBase/TouchRipple";
import { KeySequenceStatus } from "./KeySequenceStatus/KeySequenceStatus";
import KeySequenceAction from "./KeySequenceAction/KeySequenceAction";
import { useGlobalState } from "../../../../state";
import { Paper } from "@material-ui/core";

const variants = {
  show: {
    opacity: 1,
    scale: 1,
    transition: {
      // duration: 1,

      delay: 0.15
    }
  },
  hide: {
    opacity: 0,
    scale: 0,
    transition: {
      // when: "beforeCh"
      // duration: 0.3// default
      ease: "anticipate",
      delay: 0.15
    }
  }
};
const actionVariants = {
  show: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      // ease: 'backInOut',
      // duration: 0.3,
      // damping: 10,
      // mass: 0.5,
      stiffness: 200,
      velocity: 8,
      // duration: 0.3
      restSpeed: 11
    }
  },
  hide: {
    opacity: 0,
    scale: 0,
    transition: {
      type: "tween",
      ease: "backInOut",
      velocity: 5,
      // duration: 0.2,
      damping: 400
      // ease: 'anticipate',

      // stiffness: 20,
      // restDelta: 2
      // velocity: 10
    }
  }
};
const hideVariant = {
  show: {
    opacity: 0,
    scale: 0
  },
  hide: {
    opacity: 0,
    scale: 0
  }
};
const variantContainer = {
  show: {
    // opacity: 1,
    // scale: 1,
    transition: {
      when: "afterChildren",
      staggeredChildren: 1,
      duration: 1
    }
  },
  hide: {
    transition: {
      when: "afterChildren",
      // delayChildren: 0.5,
      duration: 1
      // staggerChildren: 0.5, delayChildren: 0.5
    }
  }
};

const Sequence = keyItem => {
  // const items = Object.keys(keyItem).map((k, index) => (keyItem[k]));

  const [newKeys] = useGlobalState("newKeys");

  // const [isActionHovered, setIsActionHovered] = useGlobalState('isActionHovered');
  const [sequence, setSequence] = React.useState([]);

  React.useEffect(() => {
    const result = _.chain(newKeys.keys.key1)
      .toArray()
      .value()
      .reduce((result, keybind, index, arr) => {
        const lastIndex = arr.length - 1;
        const isAction = index !== lastIndex;
        const actionHasOptions = index === lastIndex - 1;
        const key = keybind;

        result.push({
          kb: keybind,
          isAction: false,
          index: index,
          key,
          isEnd: index === lastIndex
        });
        if (index !== arr.length - 1) {
          result.push({ isAction, key: keybind + "index", actionHasOptions });
        }
        return result;
      }, []);
    setSequence(result);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newKeys]);

  return (
    <AnimatePresence>
      {sequence.map((shortcut, index) => {
        return (
          <motion.div
            initial="hide"
            animate="show"
            exit="hide"
            positionTransition
            variants={shortcut.isAction ? actionVariants : variants}
            key={shortcut.key}
            style={{
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            {shortcut.kb && <RenderIcon keyLabel={shortcut.kb} height="46px" />}
            {/* <AnimatePresence>
              {shortcut.isEnd && (
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  exit={{ width: "0" }}
                >
                  <div>
                    <TextareaAutosize
                      style={{
                        maxWidth: "200px",
                        minWidth: "90px",
                        maxHeight: "60px",
                        minHeight: "60px"
                      }}
                      rowsMax={5}
                      rows
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence> */}
            {shortcut.isAction && (
              <KeySequenceAction actionHasOptions={shortcut.actionHasOptions} />
            )}
          </motion.div>
        );
      })}
    </AnimatePresence>
  );
};

export const KeySequence = props => {
  const { isEmpty, ...others } = props;
  return (
    // <div
    //   style={{
    //     display: 'flex',
    //     position: 'relative',
    //     width: '100%',
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     backgroundImage: `radial-gradient(
    //       circle farthest-corner at 0% 0.5%,
    //       rgb(247, 247, 248) 0.1%,
    //       rgb(244, 245, 245) 100.2%
    //     );`
    //   }}
    //   container
    //   justify="center"
    //   alignItems="center"
    // >
    <StyledOuterKeySequenceContainer>
      <AnimatePresence>
        {isEmpty && <Instruction key="info" isEmpty={isEmpty} />}
        {!isEmpty && <KeySequenceContainer key="sequence" {...others} />}
      </AnimatePresence>
    </StyledOuterKeySequenceContainer>
    // </div>
  );
};

const StyledInnerKeySequenceContainer = styled(motion.div)`
  display: flex;
  width: 100%;
  height: 76px;
  position: relative;
  align-self: center;
  align-items: center;
  justify-content: center;
`;
const StyledOuterKeySequenceContainer = styled.div`
  display: flex;
  width: 100%;
  height: 76px;
  position: relative;
  align-self: center;
  align-items: center;
  justify-content: center;
  background-image: radial-gradient(
    circle farthest-corner at 0% 0.5%,
    rgb(247, 247, 248) 0.1%,
    rgb(244, 245, 245) 100.2%
  );
  border-radius: 8px;
`;
const KeySequenceContainer = ({ key, isEmpty, newKeys, isKeyAvailable }) => {
  return (
    <StyledInnerKeySequenceContainer
      key={key}
      positionTransition
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {Object.values(newKeys).map((keyItem, keyIndex) => {
        return <Sequence key={keyIndex} keyItem={keyItem} />;
      })}
      <KeySequenceStatus isEmpty={isEmpty} isKeyAvailable={isKeyAvailable} />
    </StyledInnerKeySequenceContainer>
  );
};

const Instruction = ({ key, isEmpty }) => {
  return (
    <motion.div
      key={key}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ position: "absolute" }}
    >
      <Typography color="textSecondary">
        Click the keyboard to add a shortcut
      </Typography>
    </motion.div>
  );
};

import React, { useState } from "react";
import "./keyboard.css";
import { MouseIcon } from "../Key/Icons";
import { Box, Flex } from "@rebass/grid";
import Space from "@rebass/space";
import Layer from "@material-ui/core/Box";
import { Key } from "../Key/Key";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import {
  Collapse,
  FormControlLabel,
  Switch,
  checked,
  Button,
  Grid
} from "@material-ui/core";
import Icon from "@material-ui/core/Icon";
import SaveIcon from "@material-ui/icons/Save";
import RefreshIcon from "@material-ui/icons/Refresh";
import styled from "styled-components";
import { BackgroundRGB, OuterFrame } from "./Keyboard.styles";
import { FlashingProvider } from "../Key/FlashingContext";

import Mouse from "./Mouse";

import {
  firstRow,
  secondRow,
  thirdRow,
  fourthRow,
  fifthRow,
  keySize,
  mw,
  excludedKeys,
  miscKeys
} from "./Layout";

import {
  Row,
  useKeyboardStyle,
  InnerFrame,
  Cover,
  NumpadCover,
  NumpadInnerFrame
} from "./Keyboard.styles";
// import styled from '@xstyled/styled-components'

import {
  tint,
  shade,
  linearGradient,
  lighten,
  timingFunctions
} from "polished";
import Container from "@material-ui/core/Container";
import { EditRounded } from "@material-ui/icons";
import { useSpring, animated, useTransition } from "react-spring";
import { motion } from "framer-motion";
import { AnimatedKeyContainer, KeyTop, BottomKeyChar } from "../Key/Key.styles";
import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core";

const GridItem = motion.custom(Grid);

const calculateMargin = (i, len) => {
  if (i === 0) {
    // first

    return `0 1.5px 0 0`;
  } else if (i === len - 1) {
    // last
    return `0 0 0 1.5px`;
  } else {
    return `0 1.5px 0 1.5px`;
  }
};
const KeyRow = React.memo(({ row }) => {
  const len = Object.keys(row).length;

  const getMarginTheme = index => {
    if (index === 0) {
      return themeStart;
    } else if (index === len - 1) {
      return themeEnd;
    } else {
      return theme;
    }
  };

  return Object.keys(row).map((keyName, i) => (
    <ThemeProvider theme={getMarginTheme(i)}>
      <GridItem
        style={{ transform: "translateZ(0)", backfaceVisibility: "hidden" }}
        item
        whileTap={{
          scale: 0.98,
          y: "2px",

          transition: {
            type: "spring",
            damping: 100,
            stiffness: 400
          }
        }}
      >
        <Key
          item
          label={row[keyName]["label"]}
          key={i}
          KeyComponent={AnimatedKeyContainer}
          margin={calculateMargin(i, len)}
          uniqueKeyName={keyName in excludedKeys ? null : row[keyName]["label"]}
          keyName={keyName}
          wt={`${row[keyName]["size"]}`}
          ht={`${keySize}`}
          keySize={keySize}
          KeyChar={row[keyName]["KeyChar"]}
          borderWidth="10px 10px 20px 10px"
        />
      </GridItem>
    </ThemeProvider>
  ));
});
const renderMiscKeys = row => {
  const len = Object.keys(row).length;

  return Object.keys(row).map((keyName, i) => (
    <GridItem
      item
      style={{}}
      whileTap={{
        scale: 0.98,
        y: "2px",

        transition: {
          type: "spring",
          damping: 100,
          stiffness: 400
        }
      }}
    >
      <Key
        item
        label={row[keyName][0]}
        key={i}
        margin={0}
        KeyComponent={AnimatedKeyContainer}
        uniqueKeyName={keyName in excludedKeys ? null : row[keyName][0]}
        keyName={keyName}
        wt={`${row[keyName][1] - 10}`}
        ht={`${keySize - 10}`}
        borderWidth="5px 5px 10px 5px"
        keySize={keySize}
        KeyChar={row[keyName]["KeyChar"]}
      />
    </GridItem>
  ));
};

const theme = createMuiTheme({
  overrides: {
    MuiGrid: {
      container: {
        margin: 0
      },
      item: {
        margin: "0 1.5px"
      }
    }
  }
});
const themeStart = createMuiTheme({
  overrides: {
    MuiGrid: {
      container: {
        margin: 0
      },
      item: {
        marginRight: "1.5px"
      }
    }
  }
});
const themeEnd = createMuiTheme({
  overrides: {
    MuiGrid: {
      container: {
        margin: 0
      },
      item: {
        marginLeft: "1.5px"
      }
    }
  }
});
const rowTheme = createMuiTheme({
  overrides: {
    MuiGrid: {
      container: {
        margin: 0
      },
      item: {
        margin: "0 1.5px"
      }
    }
  }
});

const KeyboardContainer = () => {
  // React.useEffect(() => {
  //   editMode ? setChecked(true) : setChecked(false)

  // },[editMode]);

  return (
    <Cover
      initial={{ opacity: 0 }}
      transition={{ delay: 1 }}
      animate={{ opacity: 1 }}
      fixed
    >
      {/* <div className="inner-shadow" style={{ opacity: 0.5 }} /> */}
      <FlashingProvider>
        <OuterFrame>
          <InnerFrame
            container
            justify="center"
            alignItems="center"
            direction="column"
            spacing={0}
          >
            {/* <ThemeProvider theme={rowTheme}> */}
            <Row
              justify="center"
              container
              direction="row"
              wrap="nowrap"
              item
              xs={12}
              zIndex={1}
            >
              <KeyRow row={firstRow} />
            </Row>
            <Row
              justify="center"
              container
              direction="row"
              wrap="nowrap"
              item
              // justify="space-evenly"
              // alignItems="stretch"
              xs={12}
              zIndex={2}
            >
              <KeyRow row={secondRow} />
            </Row>
            <Row
              justify="center"
              container
              direction="row"
              wrap="nowrap"
              item
              xs={12}
              // justify="space-evenly"

              zIndex={3}
            >
              <KeyRow row={thirdRow} />
            </Row>
            <Row
              justify="center"
              container
              direction="row"
              wrap="nowrap"
              item
              // justify="space-evenly"
              // alignItems="stretch"
              xs={12}
              zIndex={4}
            >
              <KeyRow row={fourthRow} />
            </Row>
            <Row
              justify="center"
              container
              direction="row"
              wrap="nowrap"
              item={true}
              // justify="space-evenly"
              // alignItems="stretch"
              xs={12}
              zIndex={5}
            >
              <KeyRow row={fifthRow} />
            </Row>
            {/* </ThemeProvider> */}
          </InnerFrame>
        </OuterFrame>
      </FlashingProvider>
    </Cover>
  );
};

export default KeyboardContainer;

/* eslint-disable react-hooks/exhaustive-deps */
import {
  Grid,
  List,
  ListItem,
  ListItemText,
  Typography
} from "@material-ui/core";
import {
  ArrowBack as LeftArrowIcon,
  ArrowDownward as DownArrowIcon,
  ArrowForward as RightArrowIcon,
  ArrowUpward as UpArrowIcon
} from "@material-ui/icons";
import { motion } from "framer-motion";
import { lighten, shade } from "polished";
import React from "react";
import styled from "styled-components";
import { setGlobalState, useGlobalState } from "../../../state";
import ListItemAction from "./ListItemAction";

export const KBD = styled.div`
  /* display: inline-block; */
  display: inline-flex;
  justify-content: center;
  align-items: center;
  transform: translate3d(0, 0, 0);
  height: ${({ height }) => height || "inherit"};

  min-width: 40px;
  padding: 12px 12px;
  margin: 0 4px;

  border-radius: 5px;
  border-radius: 4px;

  background: ${({ color }) => color};
  color: #fffeff;

  font-family: Muli, sans-serif;
  font-size: 16px;
  font-weight: 700;
  text-align: center;

  backface-visibility: hidden;
`;

const SelectedCategoryKBD = motion.custom(KBD);

const KbdKeyList = styled(ListItem)``;

const KbdKey = styled(motion.div)`
  margin-left: auto;
  margin-right: 0;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  -moz-backface-visibility: hidden;
  -ms-backface-visibility: hidden;
`;

const modifierKeys = new Set([
  "Ctrl",
  "Alt",
  "Shift",
  "Capslock",
  "Tab",
  "Win"
]);
const iconLabels = {
  "←": (
    <LeftArrowIcon
      fontSize="small"
      style={{ display: "inline-block", verticalAlign: "middle" }}
    />
  ),
  "→": (
    <RightArrowIcon
      fontSize="small"
      style={{ display: "inline-block", verticalAlign: "middle" }}
    />
  ),
  "↑": (
    <UpArrowIcon
      fontSize="small"
      style={{ display: "inline-block", verticalAlign: "middle" }}
    />
  ),
  "↓": (
    <DownArrowIcon
      fontSize="small"
      style={{ display: "inline-block", verticalAlign: "middle" }}
    />
  )
};
export const renderCategoryIcon = (keyLabel, width = "auto", styleProps) => {
  const color = modifierKeys.has(keyLabel) ? "#15191c " : "#209CEE";

  if (keyLabel in iconLabels) {
    return iconLabels[keyLabel];
  } else {
    return keyLabel;
  }
};
export const RenderIcon = ({ keyLabel, width, height, styleProps }) => {
  const color = modifierKeys.has(keyLabel) ? "#15191c " : "#209CEE";

  const iconLabels = {
    "←": (
      <LeftArrowIcon
        fontSize="small"
        style={{ display: "inline-block", verticalAlign: "middle" }}
      >
        {keyLabel}
      </LeftArrowIcon>
    ),
    "→": (
      <RightArrowIcon
        fontSize="small"
        style={{ display: "inline-block", verticalAlign: "middle" }}
      >
        {keyLabel}
      </RightArrowIcon>
    ),
    "↑": (
      <UpArrowIcon
        fontSize="small"
        style={{ display: "inline-block", verticalAlign: "middle" }}
      >
        {keyLabel}
      </UpArrowIcon>
    ),
    "↓": (
      <DownArrowIcon
        fontSize="small"
        style={{ display: "inline-block", verticalAlign: "middle" }}
      >
        {keyLabel}
      </DownArrowIcon>
    )
  };

  if (keyLabel in iconLabels) {
    return (
      <KBD color={color} height={height} style={{ width }}>
        {iconLabels[keyLabel]}
      </KBD>
    );
  } else {
    return (
      <KBD color={color} height={height} style={{ width, ...styleProps }}>
        {keyLabel}
      </KBD>
    );
  }
};
export const SheetKeys = ({ keybind, onOrKeyClick }) => {
  return (
    <>
      {Object.values(keybind).map((keyItem, keyIndex) => {
        return (
          <KbdKeyList
            key={keyIndex}
            dense={true}
            button={true}
            disableGutters={true}
            alignItems="flex-end"
          >
            {/* <Badge badgeContent={keyIndex+1} color="primary" variant="dot" > */}
            {Object.keys(keyItem).map((kb, index, array) => {
              const startOfThen = array[index + 1] === "THEN";
              const isEndOfArray = index === Object.keys(keyItem).length - 1;
              const combination = !(isEndOfArray || startOfThen);
              return (
                <>
                  <KbdKey key={index}>
                    {!(kb === "THEN") ? (
                      <RenderIcon keyLabel={keyItem[kb]} />
                    ) : (
                      <>
                        then
                        {keyItem[kb].map((x, i, arr) =>
                          arr.length - 1 !== i ? (
                            <span key={i}>
                              {<RenderIcon keyLabel={x} />}
                              {index !== arr.length - 1 && "+"}
                              {/* <ORLabel> or </ORLabel> */}
                            </span>
                          ) : (
                            <RenderIcon keyLabel={x} />
                          )
                        )}
                      </>
                    )}

                    {combination && "+"}
                  </KbdKey>
                </>
              );
            })}
            {/* </Badge> */}
          </KbdKeyList>
        );
      })}
    </>
  );
};

export const renderCategoryItem = (layerKey, color) => {
  return (
    <Grid
      container
      justify="flex-start"
      alignItems="center"
      direction="row"
      wrap="nowrap"
    >
      {/* <Badge badgeContent={keyIndex+1} color="primary" variant="dot" > */}
      {layerKey.map((kb, index, array) => {
        return (
          <Grid item key={index}>
            <KbdKey key={index}>
              {/* <KBD style={{ filter: `drop-shadow(-4px 0px 0px ${color})` }}> */}
              {<RenderIcon keyLabel={kb} width="75px" />}
              {/* </KBD> */}
              {index !== layerKey.length - 1 && "+"}
            </KbdKey>
          </Grid>
        );
      })}
      {/* </Badge> */}
    </Grid>
  );
};
export const RenderSelectedCategory = ({ layerKey, color, active }) => {
  return (
    <KbdKey custom={color} variants={categoryVariants}>
      <SelectedCategoryKBD
        height="30px"
        // animated={isHovered ? 'active' : 'inactive'}
        // animated={'active'}

        // positionTransition
        color={color}

        // transition={{
        //   type: 'spring',
        //   mass: 3,
        //   restSpeed: 0.05,
        //   damping: 2300,
        //   duration: 5
        // }}
        // style={{
        //   transform: 'translate3D(0,0,0)',
        //   filter: 'drop-shadow(0 0 0 transparent)',
        //   margin: '0 10px'
        // }}
      >
        {layerKey.map((kb, index, array) => {
          return (
            <>
              {/* <Grid item key={index}> */}
              {/* <KBD style={{ filter: `drop-shadow(-4px 0px 0px ${color})` }}> */}
              {renderCategoryIcon(kb, "75px")}
              {index !== layerKey.length - 1 && (
                <span style={{ margin: "2px" }}>+</span>
              )}
              {/* </Grid> */}

              {/* {index !== layerKey.length - 1 && <Grid item>+</Grid>} */}
            </>
          );
        })}
      </SelectedCategoryKBD>
      {/* </KBD> */}
    </KbdKey>
  );
};
const categoryVariants = {
  active: color => ({
    borderColor: shade(0.01, color),
    backgroundImage: `linear-gradient(-30deg, ${shade(
      0.05,
      color
    )} 0%, ${lighten(0.1, color)} 50%)`
  }),

  inactive: color => ({
    backgroundImage: `linear-gradient(-30deg, ${shade(
      0.05,
      color
    )} 0%, ${lighten(0.2, color)} 50%)`
  })
};
export const KeyListItem = props => {
  const {
    index,
    openMenu,
    styles,
    text,
    keybind,
    category,
    shortcutObjectKey,
    arrowPressed,
    interactive
  } = props;

  // const [, , activeKeys, setActiveKeys] = React.useContext(FlashingContext);

  const [, setActiveKeys] = useGlobalState("activeKeys");
  const [, setMode] = useGlobalState("mode");
  const [selectedItem, setSelectedItem] = useGlobalState("selectedItem");
  const [curShortcutObjectKey] = useGlobalState("curShortcutObjectKey");
  const [keybindIndex, setKeybindIndex] = React.useState(1);
  const [selectedIndex, setSelectedIndex] = useGlobalState("selectedItemIndex");
  // React.useEffect(() => {
  //   if (selectedItem !== shortcutObjectKey) {
  //     setAlreadySelected(false);
  //   }
  //   console.log('test');
  // }, [selectedItem, shortcutObjectKey]);
  // React.useEffect(() => {
  //   const list = listRef.current;

  //   if (!list) {
  //     return;
  //   }
  //   if (!selectedItem) {
  //     return;
  //   }
  //   list.scrollToItem(index);
  // }, []);

  const itemClicked = shortcutObjectKey => {
    setSelectedIndex(index);
    handleSelection(shortcutObjectKey);
  };
  const arrowClicked = shortcutObjectKey => {
    handleSelection(shortcutObjectKey);
  };
  const onOrKeyClick = index => {
    setActiveKeys(keybind[`key${index}`]);
  };
  const handleSelection = shortcutObjectKey => {
    setSelectedItem(shortcutObjectKey);
    setActiveKeys(keybind[`key${1}`]);
    setGlobalState("curShortcutObjectKey", shortcutObjectKey);
    setGlobalState("activeKeysIndex", shortcutObjectKey);

    if (selectedItem !== shortcutObjectKey) {
      setMode(null);
    }
    // console.log(`⭐: selection`, selectedItem);
    // console.log(`⭐: shortcutobjectKey`, shortcutObjectKey);
    // console.log(
    //   `⭐: selection === shortcutObjectKey`,
    //   selectedItem === shortcutObjectKey
    // );
  };

  // React.useEffect(() => {
  //   if(selectedIndex === index){
  //     handleSelection(shortcutObjectKey);
  //   }
  // }, [arrowPressed])
  return (
    <ListItem
      button={interactive}
      style={{ ...styles }}
      divider
      dense
      container
      direction="row"
      // justify="center"

      focusRipple
      key={index}
      onClick={() => interactive && itemClicked(shortcutObjectKey)}
      selected={selectedIndex === index}
    >
      <Grid item xs={5} justify="flext-start">
        <ListItemText
          primary={
            <Typography
              style={{
                fontSize: "16px"
                // fontWeight: 600
              }}
            >
              {text}
            </Typography>
          }
        />
      </Grid>

      <Grid xs={7} container item justify="flex-end" direction="row">
        <List>
          <SheetKeys onOrKeyClick={onOrKeyClick} keybind={keybind} />
        </List>
      </Grid>

      {interactive && <ListItemAction />}
    </ListItem>
  );
};

export default KeyListItem;

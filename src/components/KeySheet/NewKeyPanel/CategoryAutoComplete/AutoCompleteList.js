import React from "react";
import cx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import MenuItem from "@material-ui/core/MenuItem";
import { Button } from "@material-ui/core";
import { Chip } from "@material-ui/core";
import Select, { components } from "react-select";
import styled from "styled-components";
import { keyMapColors } from "../../../Keyboard/KeyMapData";
import { RemoveCircleOutlineRounded } from "@material-ui/icons";
import { IconButton } from "@material-ui/core";
import { TextField } from "@material-ui/core";
import makeAnimated from "react-select/animated";
import { motion, AnimatePresence } from "framer-motion";
import { opacify } from "polished";
import { ClearRounded } from "@material-ui/icons";
import { HighlightOffRounded } from "@material-ui/icons";

const useStyles = makeStyles(theme => ({
  root: {
    width: 360,
    padding: 4,
    "&.fullWidth": {
      width: "100%"
    }
  },
  input: {
    display: "flex",
    padding: 0,
    height: "auto"
  },
  valueContainer: {
    display: "flex",
    flexWrap: "wrap",
    flex: 1,
    alignItems: "center",
    overflow: "hidden"
  },
  noOptionsMessage: {
    padding: theme.spacing(1, 2)
  },
  singleValue: {
    fontSize: 16
  },
  placeholder: {
    position: "absolute",
    left: 34,
    bottom: 7,
    fontSize: 16
  },

  paper: {
    position: "absolute",
    zIndex: 1,
    left: theme.spacing(2),
    right: theme.spacing(2)
  }
}));

function NoOptionsMessage({ children, innerProps, selectProps }) {
  return (
    <Typography
      color="textSecondary"
      className={selectProps.classes.noOptionsMessage}
      {...innerProps}
    >
      {children}
    </Typography>
  );
}

function Option({ children, innerRef, innerProps, isFocused, isSelected }) {
  return (
    <MenuItem
      ref={innerRef}
      selected={isFocused}
      component="div"
      style={{
        fontWeight: isSelected ? 500 : 400
      }}
      {...innerProps}
    >
      {children}
    </MenuItem>
  );
}

function Placeholder({ children, innerProps, selectProps }) {
  return (
    <Typography
      color="textSecondary"
      className={selectProps.classes.placeholder}
      {...innerProps}
    >
      {children}
    </Typography>
  );
}

const ChipContainer = styled.div`
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  padding-left: 4px;
  padding-right: 4px;
`;

function Menu({ selectProps, innerProps, children }) {
  return (
    <Paper square className={selectProps.classes.paper} {...innerProps}>
      {children}
    </Paper>
  );
}

const StyledMultiValueContainer = styled(motion.div)`
  border-radius: 30px;
`;
function MultiValueContainer({ children, selectProps, innerProps, data }) {
  console.log(`⭐: MultiValueContainer -> children`, children);
  console.log(`⭐: MultiValueContainer -> selectProps`, selectProps);
  console.log(`⭐: MultiValueContainer -> innerProps`, innerProps);

  return (
    <StyledMultiValueContainer
      positionTransition
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      // className={selectProps.classes.paper}
      {...innerProps}
    >
      {children}
    </StyledMultiValueContainer>
  );
}
function MultiValueLabel({ selectProps, innerProps, children }) {
  console.log(`⭐: MultiValueLabel -> innerProps`, innerProps);
  console.log(`⭐: MultiValueLabel -> selectProps`, selectProps);
  return (
    <components.MultiValueLabel {...selectProps}>
      {children}
    </components.MultiValueLabel>
  );
}
function SelectContainer({ children, ...props }) {
  const [removeClick, setRemoveClick] = React.useState(null);
  return (
    <components.SelectContainer TESTPROP="WHATSUP" {...props}>
      <motion.div positionTransition>{children}</motion.div>
    </components.SelectContainer>
  );
}

const StyledMultiValueRemove = styled(motion.div)`
  border-radius: 50%;
  position: absolute;
  right: -9;
  left: 0;

  top: 0;
`;

const MultiValueRemove = props => {
  console.log(`⭐: props`, props);
  // console.log(`⭐: MultiValueRemove -> selectProps`, props.selectProps);
  // console.log(`⭐: MultiValueRemove -> innerProps`, props.innerProps);
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative"
      }}
    >
      <motion.div
        initial={{ scale: 0.3, color: "white" }}
        whileHover={{ scale: 0.7, opacity: 1, color: "red" }}
        whileTap={{ scale: 0.3 }}
        onClick={() => props.innerProps.onClick()}
        style={{
          position: "relative",
          height: "20px",
          width: "20px",
          background: "white",
          marginRight: "-5px",
          fontWeight: "bold",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <StyledMultiValueRemove
        // initial={{ scale: 0, opacity: 0, rotate: 0 }}
        // animate={{ scale: 1, x: -20 }}

        // className="css-8vjmyn-multiValue"
        >
          <ClearRounded style={{ display: "inline-block" }} fontSize="small" />
        </StyledMultiValueRemove>
      </motion.div>
    </div>
  );
};
const AutocompleteList = props => {
  // const animatedComponents = makeAnimated();
  const { placeholder, suggestions, fullWitdh, InputControl, onChange } = props;
  const classes = useStyles();
  const animatedComponents = makeAnimated({
    SelectContainer,
    MultiValueContainer,
    MultiValueRemove,
    DropdownIndicator: null
  });
  const theme = useTheme();
  const [removeClicked, setRemoveClicked] = React.useState(false);
  // const chipColor = keyMapColors[i % keyMapColors.length]
  const selectStyles = {
    multiValue: (styles, { data }) => {
      // https://react-select.com/styles#styles
      const color = theme.palette.primary.main;

      return {
        ...styles,
        boxSizing: "border-box",
        backgroundColor: data.color,
        padding: "0 5px",

        borderRadius: "15px"
      };
    },

    control: (styles, { data }) => ({
      ...styles,

      borderColor: "transparent",
      ":hover": {
        borderColor: styles.borderColor
      }
    }),
    multiValueLabel: (styles, { data }) => ({
      ...styles,

      fontWeight: "bold",
      fontSize: "16px"
    })
    // multiValueRemove: (styles, { data }) => ({
    //   ...styles,
    //   color: theme.palette.text.primary,
    //   backgroundColor: "transparent",
    //   opacity: 0.6,

    //   borderRadius: "50%",
    //   ":hover": {
    //     backgroundColor: "red",
    //     color: "white"
    //   }
    // })
  };

  function handleChangeSingle(value) {
    // setSingle(value);
    // onChange(value);
  }

  if (!InputControl) {
    return null;
  }

  const components = {
    Menu,
    NoOptionsMessage,
    Option,
    Placeholder,

    // ValueContainer,
    Control: InputControl.prototype.constructor
  };
  const onInputChange = (inputValue, { action }) => {
    console.log(inputValue, action);
    setTimeout(() => {}, 4000);
  };

  return (
    <Select
      classes={classes}
      styles={selectStyles}
      components={animatedComponents}
      options={suggestions}
      defaultValue={suggestions[0]}
      isClearable={false}
      blurInputOnSelect={true}
      isMulti
      isSearchable
      onChange={handleChangeSingle}
      name="category"
      instanceId="HEllo"
    />
  );
};

export default AutocompleteList;

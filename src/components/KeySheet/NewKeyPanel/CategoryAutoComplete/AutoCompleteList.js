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
import { opacify, lighten, shade } from "polished";
import { ClearRounded } from "@material-ui/icons";
import { HighlightOffRounded } from "@material-ui/icons";
import CreatableSelect from "react-select/creatable";
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

function MultiValueContainer({ children, selectProps, innerProps, data }) {
  return (
    <motion.div
      positionTransition
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      // className={selectProps.classes.paper}
      {...innerProps}
    >
      {children}
    </motion.div>
  );
}
function MultiValueLabel({ selectProps, innerProps, children }) {
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
      {children}
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

const MultiValueRemove = ({ selectProps, innerProps, data, options }) => {
  console.log(`⭐: MultiValueRemove -> data`, data);

  const iconColor =
    data.color ||
    (options && keyMapColors[options.length % keyMapColors.length]) ||
    "#4be8bc";
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
        initial={{ scale: 0.4, color: "transparent" }}
        whileHover={{
          scale: 0.8,
          opacity: 1,
          color: shade(0.1, iconColor),
          backgroundColor: "white"
        }}
        onClick={() => innerProps.onClick()}
        style={{
          position: "relative",
          height: "15px",
          width: "15px",
          backgroundColor: lighten(0.2, iconColor),
          // backgroundColor: variables.colorPrimaryLighter

          // marginRight: "-5px",
          fontWeight: "bold",
          borderRadius: "50%",
          display: "flex",
          padding: "1px",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <HighlightOffRounded
          style={{ display: "inline-block", margin: "2px" }}
          fontSize="small"
        />
      </motion.div>
    </div>
  );
};
const AutocompleteList = props => {
  // const animatedComponents = makeAnimated();
  const {
    placeholder,
    suggestions,
    fullWitdh,
    InputControl,
    handleCategoryChange
  } = props;
  const classes = useStyles();
  const animatedComponents = makeAnimated({
    SelectContainer,
    MultiValueContainer,
    MultiValueRemove,
    DropdownIndicator: null
    // Control: InputControl
  });
  const theme = useTheme();
  const [removeClicked, setRemoveClicked] = React.useState(false);
  // const chipColor = keyMapColors[i % keyMapColors.length]
  const selectStyles = {
    control: ({ borderColor, ...base }, { data, isHovered }) => {
      console.log(`⭐: CONTROL STYLES: `, base);
      return {
        ...base,
        boxShadow: null,

        borderColor: "transparent",
        minHeight: 30,
        minWidth: 200,

        transition: "background-color 100ms",
        backgroundColor: "transparent",

        "&:hover": {
          borderColor: "transparent",
          backgroundColor: theme.palette.common.grey[100]
        }
      };
    },
    container: base => ({
      ...base,
      backgroundColor: "grey"
    }),
    dropdownIndicator: base => ({
      ...base,
      padding: 4
    }),
    clearIndicator: base => ({
      ...base,
      padding: 4
    }),
    multiValue: (base, { data, options }) => {
      console.log(`⭐: options`, options);
      return {
        ...base,

        fontWeight: "bold",
        borderRadius: "30px",
        padding: "0 2px",
        backgroundColor: data.color || theme.palette.action.selected
      };
    },
    multiValueLabel: (base, { data, options }) => ({
      ...base,
      borderRadius: "30px",
      color: "#12161B",
      margin: 0

      // margin: "0 5px",
      // padding: "3px 2px",

      // backgroundColor:
      //   data.color || keyMapColors[options.length % keyMapColors.length]
      // backgroundColor: variables.colorPrimaryLighter
    }),

    valueContainer: base => ({
      ...base,
      padding: "0px 6px"
    }),
    input: (base, { data }) => ({
      ...base,

      margin: 0,
      padding: 0
    }),
    container: base => ({
      ...base,
      display: "inline-block"
    }),
    // option: (styles, { data }) => ({
    //   ...styles,
    //   backgroundColor: data.color,
    //   borderRadius: "15px",

    //   // margin: "5px 0"

    //   backgroundClip: "text"
    // }),
    placeholder: base => {
      return {
        ...base,
        whiteSpace: "nowrap"
      };
    }
    // multiValue: (styles, { data, options }) => {
    //   // https://react-select.com/styles#styles
    //   const color = theme.palette.primary.main;

    //   return {
    //     ...styles,
    //     // boxSizing: "border-box",
    //     // height: "15px",

    //     backgroundColor:
    //       data.color || keyMapColors[options.length % keyMapColors.length],

    //     borderRadius: "15px"
    //   };
    // },

    // control: ({ isFocused, ...styles }, { data }) => {
    //   return {
    //     ...styles,
    //     height: "20px",
    //     minHeight: "20px",

    //     // boxShadow: isFocused ? "0 0 0 1px #4C9AFF" : null,
    //     // borderColor: isFocused ? "#4C9AFF" : "#4C9AFF",
    //     // backgroundClip: "padding-box",
    //     // minWidth: "100px",
    //     // minHeight: "20px",
    //     // height: "20px",

    //     ":hover": {
    //       // borderColor: styles.borderColor
    //     }
    //   };
    // },
    // container: (styles, { data }) => ({
    //   ...styles,
    //   display: "inline-block"
    //   // padding: 0,
    //   // margin: 0,
    //   // borderColor: "transparent",

    //   // ":hover": {
    //   //   borderColor: styles.borderColor
    //   // }
    // }),

    // valueContainer: (styles, { data }) => ({
    //   ...styles
    // }),
    // multiValueLabel: (styles, { data }) => ({
    //   // ...styles,
    //   margin: "0 5px"
    // }),
    // placeholder: (styles, { data }) => ({
    //   ...styles
    // }),
    // input: (styles, { data }) => ({
    //   ...styles
    // }),

    // option: (styles, { data }) => ({
    //   ...styles
    // })

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

  // if (!InputControl) {
  //   return null;
  // }

  const components = {
    Menu,
    NoOptionsMessage,
    Option,
    Placeholder

    // ValueContainer,
    // Control: InputControl.prototype.constructor
  };

  return (
    <CreatableSelect
      classes={classes}
      styles={selectStyles}
      components={animatedComponents}
      options={suggestions}
      // defaultValue={suggestions[0]}
      backspaceRemovesValue={false}
      isClearable={false}
      clearValue={() => true}
      isMulti
      placeholder={"Select Category..."}
      isSearchable
      onChange={handleCategoryChange}
      name="categories"
      instanceId="HEllo"
      formatOptionLabel={({ color, label }) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          <span
            style={{
              backgroundColor: color,
              borderRadius: "15px",
              padding: "2px 12px"
            }}
          >
            {label}
          </span>
        </div>
      )}
      formatCreateLabel={label => (
        <span>
          {"Create "}
          <span
            style={{
              whiteSpace: "nowrap",
              padding: "2px 8px",
              borderRadius: "15px",
              backgroundColor: theme.palette.action.selected
            }}
          >
            #{label}
          </span>
        </span>
      )}
    />
  );
};

export default AutocompleteList;

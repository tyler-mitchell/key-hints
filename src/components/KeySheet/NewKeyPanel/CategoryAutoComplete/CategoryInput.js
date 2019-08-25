import React, { useState } from "react";
import {
  Grid,
  Chip,
  InputBase,
  makeStyles,
  OutlinedInput
} from "@material-ui/core";
import { Search as SearchIcon } from "@material-ui/icons";
import { withStyles } from "@material-ui/styles";
import { fade } from "@material-ui/core/styles";
import { lighten, transparentize } from "polished";
import AutoCompleteList from "./AutoCompleteList";
import { keyMapColors } from "../../../Keyboard/KeyMapData";
import { useGlobalState } from "../../../../state";
import { Typography } from "@material-ui/core";
export const AutocompleteHashtags = ({
  suggestions,
  onCategorySave,

  saveClicked
}) => {
  const [tags, setTags] = useState([]);
  //  const chipColor = keyMapColors[i % keyMapColors.length]

  function handleCategoryChange(values) {
    values && onCategorySave(values);
  }

  // function handleTagDelete(value) {
  //   const newTags = tags.filter(item => item.value !== value.value);
  //   setTags(newTags);
  //   const newSuggestions = [...suggestions];
  //   newSuggestions.push(value);
  //   setSuggestions(newSuggestions);
  // }

  return (
    <AutoCompleteList
      placeholder="Add new tag."
      suggestions={suggestions}
      InputControl={SearchInputControl}
      handleCategoryChange={handleCategoryChange}
    />
  );
};

function SearchInputControl({
  children,
  innerProps,
  innerRef,
  selectProps: { classes, TextFieldProps }
}) {
  return (
    <SearchInputBaseContainer
      fullWidth
      inputComponent={inputComponent}
      inputProps={{
        className: classes.input,
        ref: innerRef,
        children,
        ...innerProps
      }}
      {...TextFieldProps}
    />
  );
}

function inputComponent({ inputRef, ...props }) {
  return <div ref={inputRef} {...props} />;
}

const SearchInputBaseContainer = ({ className, ...props }) => {
  const classes = useInputStyle();

  return (
    <OutlinedInput
      className={className}
      startAdornment={<Typography>Category:</Typography>}
      {...props}
    />
  );
};

const useInputStyle = makeStyles(theme => ({
  root: {
    transition: "0.2s",
    backgroundColor: theme.palette.common.grey,
    borderRadius: "20px",
    border: "1px solid",
    // initial as transparent, prevent lagging when focused
    borderColor: "rgba(0,0,0,0)",
    padding: `1px 5px`,

    "&$focused": {
      borderColor: theme.palette.primary.main,
      backgroundColor: theme.palette.common.white,
      boxShadow: `0 1px 8px 0 ${fade(theme.palette.primary.main, 0.8)}`
    }
  }
}));

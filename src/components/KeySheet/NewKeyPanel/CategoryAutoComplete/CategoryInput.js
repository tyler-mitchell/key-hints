import React, { useState } from 'react';
import { Grid, Chip, InputBase, makeStyles } from '@material-ui/core';
import { Search as SearchIcon } from '@material-ui/icons';
import { withStyles } from '@material-ui/styles';
import { fade } from '@material-ui/core/styles'
import { lighten, transparentize } from 'polished';
import AutoCompleteList from './AutoCompleteList';
export const AutocompleteHashtags = () => {
  const [tags, setTags] = useState([]);
  const [suggestions, setSuggestions] = useState([
    { label: 'cinema', value: 'cinema' },
    { label: 'sport', value: 'sport' },
    { label: 'nightlife', value: 'nightlife' },
    { label: 'theater', value: 'theater' },
    { label: 'culture', value: 'culture' },
    { label: 'holy', value: 'holy' },
  ]);

  function handleListChange(value) {
    if (!value) {
      return;
    }
    const newTags = [...tags];
    newTags.push(value);
    setTags(newTags);
    const newSuggestions = suggestions.filter(
      item => item.value !== value.value
    );
    setSuggestions(newSuggestions);
  }

  function handleTagDelete(value) {
    const newTags = tags.filter(item => item.value !== value.value);
    setTags(newTags);
    const newSuggestions = [...suggestions];
    newSuggestions.push(value);
    setSuggestions(newSuggestions);
  }

  return (
    <>
      <Grid container direction="row" wrap="nowrap" spacing={1}>
        {tags.map(item => (
          <Grid item key={item.label}>
            <Chip
              color="secondary"
              label={`#${item.label}`}
              onDelete={() => handleTagDelete(item)}
            />
          </Grid>
        ))}
        <AutoCompleteList
          placeholder="Add new tag."
          suggestions={suggestions}
          InputControl={SearchInputControl}
          onChange={handleListChange}
        />
      </Grid>
    </>
  );
};

function SearchInputControl({
  children,
  innerProps,
  innerRef,
  selectProps: { classes, TextFieldProps },
}) {
  return (
    <SearchInputBaseContainer
      fullWidth
      inputComponent={inputComponent}
      inputProps={{
        className: classes.input,
        ref: innerRef,
        children,
        ...innerProps,
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
    <InputBase
      className={className}
      startAdornment={<SearchIcon />}
      {...props}
    />
  );
};

const useInputStyle = makeStyles(theme => ({
  root: {
    transition: '0.2s',
    backgroundColor: theme.palette.common.grey,
    borderRadius: '20px',
    border: '1px solid',
    // initial as transparent, prevent lagging when focused
    borderColor: 'rgba(0,0,0,0)',
    padding: `1px 5px`,

    '&$focused': {
      borderColor: theme.palette.primary.main,
      backgroundColor: theme.palette.common.white,
      boxShadow: `0 1px 8px 0 ${fade(theme.palette.primary.main, 0.8)}`,
    },
  },
}));

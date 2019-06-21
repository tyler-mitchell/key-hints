
import React from 'react';

// Externals
import PropTypes from 'prop-types';


// Material helpers
import { withStyles } from '@material-ui/core';

// Material components
import { Input } from '@material-ui/core';

// Material icons
import { Search } from '@material-ui/icons';
import styled from 'styled-components';




const SearchContainer = styled.div`

    align-items: center;
    background-color: ${({theme})=> theme.palette.common.white};
    border: 1px solid ${ ({ theme })=>theme.palette.common.neutral};
    border-radius: 4px;
    display: flex;
    flex-basis: 200px;
    
    margin-left: 38px;


`;

const SearchIcon = styled(Search)`
    margin-right: ${({theme})=>theme.spacing.unit};
    color: ${({theme})=>theme.palette.text.secondary};
`;

const InputSearch = styled(Input)`

    flex-grow: 1;
    font-size: 14px;
    line-height: 16px;
    letter-spacing: -0.05px;

`;


export const SearchInput = props => {
  const { theme, className, onChange, style, ...rest } = props;



  return (
    <SearchContainer
      theme={theme}

    >
      <SearchIcon theme={theme}  />
      <InputSearch
        {...rest}

        disableUnderline
        onChange={onChange}
      />
    </SearchContainer>
  );
};




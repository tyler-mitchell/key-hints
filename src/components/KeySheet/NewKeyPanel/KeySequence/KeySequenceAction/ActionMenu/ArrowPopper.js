import styled from 'styled-components';
import React from 'react';
import { Popper } from '@material-ui/core';
export const ArrowPopper = styled(Popper)`
  && {
    filter: drop-shadow(0px 1px 3px rgba(0, 0, 0, 0.2))
      drop-shadow(0px 1px 1px rgba(0, 0, 0, 0.14))
      drop-shadow(0px 2px -1px rgba(0, 0, 0, 0.12))
      drop-shadow(0px 3px 2px rgba(0, 0, 0, 0.5));

    z-index: 1003;
    &[x-placement*='bottom'] .arrow {
      width: 0;
      height: 0;
      border-left: 1em solid transparent;
      border-right: 1em solid transparent;
      border-bottom: 1em solid #2c3e50;
      margin-top: -0.95em;

      &:before {
        border-width: 0 1em 1em 1em;

        border-color: transparent transparent white transparent;
      }
    }

    &[x-placement*='top'] .arrow {
      bottom: 0;
      width: 0;
      height: 0;
      border-left: 1em solid transparent;
      border-right: 1em solid transparent;
      border-top: 1em solid #2c3e50;
      /* box-shadow: 0px 0px 3px 2px black; */

      margin-bottom: -0.95em;

      &:before {
        border-width: 1em 1em 0 1em;
        border-color: ${props => props.color} transparent transparent
          transparent;
      }
    }

    &[x-placement*='right'] .arrow {
      left: 0;
      width: 0;
      height: 0;
      border-top: 1em solid transparent;
      border-bottom: 1em solid transparent;
      border-right: 1em solid #2c3e50;
      margin-left: -0.9em;

      &:before {
        border-width: 1em 1em 1em 0;
        border-color: transparent white transparent transparent;
      }
    }

    &[x-placement*='left'] .arrow {
      right: 0;
      width: 0;
      height: 0;
      border-top: 1em solid transparent;
      border-bottom: 1em solid transparent;
      border-left: 1em solid #2c3e50;
      margin-right: -0.9em;

      &:before {
        border-width: 1em 0 1em 1em;
        border-color: transparent transparent transparent white;
      }
    }

    .arrow {
      position: absolute;
      font-size: 7px;
      z-index: 0;
      width: 3em;
      height: 3em;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 10px;
      &::before {
        content: '';
        position: absolute;
        top: -1em;

        margin: auto;

        display: block;
        width: 0;
        border-style: solid;
        height: 0;
      }
    }

    .popper-content {
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #2c3e50;

      color: white;
      height: 90px;
      width: 160px;
    }
  }
`;

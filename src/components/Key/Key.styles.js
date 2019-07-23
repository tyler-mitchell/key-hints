/* eslint-disable react-hooks/exhaustive-deps */
import styled, { keyframes, css } from 'styled-components';
import { findAll } from 'styled-components/test-utils';
import React from 'react';
import { Box } from '@rebass/grid';
import { shade, linearGradient, lighten } from 'polished';
import Layer from '@material-ui/core/Box';
import { FlashingContext } from './FlashingContext';
import { Card, Grid, Paper } from '@material-ui/core';
import { Textfit } from 'react-textfit';
import {
  useSpring,
  animated,
  useTransition,
  config,
  interpolate,
  extrapolate,
  Easing
} from 'react-spring';
import fitty from 'fitty';
import Typography from '@material-ui/core/Typography';
import {
  ArrowBack as LeftArrowIcon,
  ArrowForward as RightArrowIcon,
  ArrowUpward as UpArrowIcon,
  ArrowDownward as DownArrowIcon
} from '@material-ui/icons';
import './key.css';

import { FlashingKey } from './FlashingKey';

import { useGlobalState, setGlobalState } from '../../state';
import _ from 'lodash';

import flatMap from 'lodash/flatMap';
import KeyText from './KeyText/KeyText';
import { motion } from 'framer-motion';
import { TextField } from '@material-ui/core';


export const KeyContainer = styled(animated.div)`
  /* transform: scaleX(0.95); */
  /* padding: 0 1.5px; */
  /* margin: ${props => props.margin}; */
  
  /* margin-right: 3px; */
  box-sizing: border-box;


  position: absolute;
  width: ${props => props.wt}px;
  height: ${props => props.ht}px;
  cursor: pointer;
  border-width: 10px 10px 20px 10px;

  /* transition: background-color 2s, color 300ms; */

  border-radius: 8px;

  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  
  /* transition: filter .3s; */

  &:hover {
    /* background-position: 0 0, 0 0; */
    /* transition-duration: 0.5s; */
    /* background: inherit; */

    filter: contrast(140%);
  }

  border-style: solid;
  /* transition: transform 300ms cubic-bezier(0.075, 0.82, 0.165, 1), filter 0.5s, flex 300ms; */

  
  &:last-child {
    /* border-width: 10px 12px 20px 10px; */
  }

  &:first-child {
    /* margin-bottom: 3px; */
    /* border-width: 10px 10px 20px 10px; */
  }

  &:hover::after {
    background-color: ${props => shade(0.05, '#1fe3ac')};
    opacity: 0.5;
    transition: all 0.4s ease-in-out;
  }
`;



export const AnimatedKeyContainer = animated(KeyContainer);

export const ActiveKeyContainer = styled(KeyContainer)`
  border-top-color: ${props => shade(0.02, props.color)};
  border-bottom-color: ${props => shade(0.3, props.color)};
  border-left-color: ${props => shade(0.09, props.color)};
  border-right-color: ${props => shade(0.09, props.color)};

  &:hover {
    animation-delay: 2s;
  }
`;

export const KeyTop = styled(animated.div)`
  height: ${props => props.ht * 0.7}px;
  width: ${props => props.wt - 17}px;
  margin: -30px;
  position: relative;
  border-radius: 8px;
`;

export const BottomKeyChar = styled.div`
  font-size: 15px;
  position: absolute;
  z-index: 4;

  font-family: 'Hammersmith One', sans-serif;

  font-weight: bold;
  color: rgba(0, 0, 0, 0.45);
  user-select: none;
  width: auto;
  height: auto;
  /* position: 'relative'; */
  transform: rotateX(8deg) translateY(34px) scale(1);

  /* text-align: center; */
`;
export const KeyChar = styled.div`
  display: flex;
  width: inherit;
  align-items: center;
  justify-content: center;
  height: inherit;
  margin: 0 auto;
  overflow: hidden;
  font-size: 20px;
  font-family: 'Nunito';
  font-weight: bold;
  color: rgba(0, 0, 0, 0.45);
  user-select: none;

  text-align: center;
`;

export const Span = styled.div`
  top: 0;
  position: relative;
  padding-top: 5px;
  border-radius: 8px;
  ${'1200px'};
  transition: 1s ease;
`;


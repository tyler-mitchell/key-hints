import styled, { keyframes, css } from 'styled-components';
import { findAll } from 'styled-components/test-utils';
import React from 'react';
import { Box } from '@rebass/grid';
import { shade, linearGradient, lighten } from 'polished';
import Layer from '@material-ui/core/Box';
import { BufferContext } from '../KeyBuffer/BufferContext';
import { Card, Grid, Paper } from '@material-ui/core';
import { useSpring, animated, useTransition } from 'react-spring';
import Typography from "@material-ui/core/Typography";
import './key.css';

const Column = props => <Box {...props} />;

const Container = styled.ul`
  opacity: 1;
  visibility: hidden;
  transform: translateY(20px);
  transition: all 0.3s ease-in-out;
`;

export const KeyContainer = styled.div`

  margin: 0 1.5px;
  box-sizing: border-box;

  width: ${props => props.wt}px;
  height: ${props => props.ht}px;
  cursor: pointer;
  border-width: 10px 10px 20px 10px;

  transition: background-color 2s, color 300ms;


  /* height: ${props => props.height}; */
  border-top-color: ${props => shade(0.02, props.color)};
  border-bottom-color: ${props => shade(0.3, props.color)};
  border-left-color: ${props => shade(0.09, props.color)};
  border-right-color: ${props => shade(0.09, props.color)};

  border-radius: 8px;


  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;


  transition: filter .3s;
  &:hover {
    background-position: 0 0, 0 0;
    transition-duration: 0.5s;
    /* background: inherit; */
   filter: contrast(140%);
  }

  /* ${({ active }) =>
    active &&
    `
    animation: fader 1s infinite;


  `} */

  &:active {
    transition: transform 300ms cubic-bezier(0.075, 0.82, 0.165, 1);
    transform: translateY(2px) scaleX(0.98);
    transform-origin: -100, 200;
  }
  &:last-child {
    border-width: 10px 12px 20px 10px;

  }
  &:first-child {
    /* margin-bottom: 3px; */
    border-width: 10px 10px 20px 10px;
  }
  border-style: solid;



  &:hover::after{
    background-color:${props => shade(0.05, '#1fe3ac')};
    opacity: 0.5;
    transition: all 0.4s ease-in-out;
  }

`;

KeyContainer.defaultProps = {};

export const ActiveKeyContainer = styled(KeyContainer)`
  border-top-color: ${props => shade(0.02, props.color)};
  border-bottom-color: ${props => shade(0.3, props.color)};
  border-left-color: ${props => shade(0.09, props.color)};
  border-right-color: ${props => shade(0.09, props.color)};
  /* transition: all 0.4s ease-in-out; */
`;

const KeyTop = styled(Grid)`
  height: ${props => props.ht * 0.7}px;
  width: ${props => props.wt - 17}px;
  display: block;
  margin: -15px;
  position: relative;
  border-radius: 8px;

  background-image: ${props =>
    linearGradient({
      colorStops: [`${shade(0.05, props.color)} 0%`, `${lighten(0.2, props.color)} 50%`],
      toDirection: '-30deg',
      fallback: '#FFF'
    })};

  /* transition: all 0.3s; */
  /* z-index: 1; */
`;

export const KeyChar = styled.div`
  font-size: 15px;

  font-family: Roboto;
  font-weight: bold;



  color: rgba(0, 0, 0, 0.45);
  user-select: none;
  /* text-align: center; */
`;

export const Span = styled.div`

  top: 0;
  position: relative;

  padding-top: 5px;
  border-radius: 8px;
  height: ${props => props.ht * 0.7}px;
  width: ${props => props.wt - 18}px;

  /* background-color: red; */
  background: red;
  background: ${props =>
    linearGradient({
      colorStops: [`${shade(0.05, props.color)} 0%`, `${lighten(0.2, props.color)} 50%`],
      toDirection: '-30deg',
      fallback: '#FFF'
    })};
  /* background: ${props =>
    linearGradient({
      colorStops: [`${shade(0.05, props.color)} 0%`, `${lighten(0.09, props.color)} 50%`],
      toDirection: '-30deg',
      fallback: '#FFF'
    })}; */

  transition: 1s ease;


`;

const ConditionalWrap = ({ condition, wrap, children }) =>
  condition ? wrap(children) : <>{children}</>;

export const Key = ({ label, keyName, wt, ht, m, amin, key }) => {
  const defaultColor = '#FFFFFF';
  const activeColor = '#1fe3ac';
  const editColor = '#FFB822';
  const [keyColor, changeColor] = React.useState(defaultColor);
  const [active, setActive] = React.useState(false);
  const [editableKey, setEditableKey] = React.useState(false);
  const [keys, setKeys] = React.useContext(BufferContext);
  const [, , , , editMode, setEditMode] = React.useContext(BufferContext);
  const [, , activeKeys, setActiveKeys] = React.useContext(BufferContext);
  const [, , , , , , flashLoop] = React.useContext(BufferContext);

  React.useEffect(() => {
    console.log('TCL: Key -> editMode', editMode);
    if (activeKeys.includes(keyName)) {
      if (editMode) {
        changeColor(editColor);
        setActive(true);
      } else {
        changeColor(activeColor);
      }
    }
    return () => {
      changeColor(defaultColor);
      setEditableKey(false);
      setActive(false);
    };
  }, [activeKeys, editMode, keyName]);

  const keyClicked = newKey => {
    if (editMode) {
      if (active) {
        changeColor(defaultColor);
        setActive(false);
      } else {
        changeColor(editColor);
        setActive(true);
      }

      // setKeys([...keys, newKey]);
    }

    // console.log('TCL: keyClicked -> keys', keys);
  };

  return (
    <React.Fragment>
      <ConditionalWrap
        condition={editMode && active}
        wrap={children => (
          <animated.div key={key} style={flashLoop}>
            {children}
          </animated.div>
        )}
      >
        {console.log('❗❗TCL: Key -> label', label)}

        {active ? (
          <KeyContainer
            editableKey={editableKey}
            active={true}
            // active={active}
            defaultColor={defaultColor}
            activeColor={activeColor}
            label={label}
            wt={wt}
            ht={ht}
            color={keyColor}
            onClick={() => keyClicked(label)}
          >
            <KeyTop wt={wt} ht={ht} color={keyColor}>
              <KeyChar>{label}</KeyChar>
            </KeyTop>
          </KeyContainer>
        ) : (
          <ActiveKeyContainer
            editableKey={editableKey}
            active={true}
            // active={active}
            defaultColor={defaultColor}
            activeColor={activeColor}
            label={label}
            wt={wt}
            ht={ht}
            color={keyColor}
            onClick={() => keyClicked(label)}
          >
            <KeyTop container alignItems="center" justify="center" wt={wt} ht={ht} color={keyColor}>
              <KeyChar >
                <Typography variant="button" align="center"   >{label}</Typography>
              </KeyChar>
            </KeyTop>
          </ActiveKeyContainer>
        )}
      </ConditionalWrap>
    </React.Fragment>
  );
};

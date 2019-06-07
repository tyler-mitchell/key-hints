import styled from 'styled-components';
import React from 'react';
import { Box } from '@rebass/grid';
import { shade, linearGradient, lighten } from 'polished';
import Layer from '@material-ui/core/Box';
import { BufferContext } from '../KeyBuffer/BufferContext';


const Column = props => <Box {...props} />;

export const KeyContainer = styled(Column)`
  box-sizing: border-box;
  width: ${props => props.wt}px;
  height: ${props => props.ht}px;
  cursor: pointer;
  border-width: 10px 10px 20px 10px;

  transition: background-color 2s, color 300ms;
  &:active {
    transition: transform 300ms cubic-bezier(0.075, 0.82, 0.165, 1);
    transform: translateY(2px) scaleX(0.98);
    transform-origin: -100, 200;
  }
  &:last-child {
    border-width: 10px 12px 20px 10px;

  }
  &:first-child {
    margin-bottom: 3px;
    border-width: 10px 10px 20px 10px;
  }
  border-style: solid;


  height: ${props => props.height};
  border-top-color: ${props => shade(0.02, props.color)};
  border-bottom-color: ${props => shade(0.3, props.color)};
  border-left-color: ${props => shade(0.09, props.color)};
  border-right-color: ${props => shade(0.09, props.color)};
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;

  position: relative;
  z-index: -1;
  /* background-color: ${props => shade(0.02, props.color)}; */


  &:hover {
    /* background: inherit; */
    filter: invert(8%) contrast(145%);
  }

`;

KeyContainer.defaultProps = {};

export const KeyCap = styled.div`
  /* background-image: linear-gradient(
    0 0,
    rgba(255, 255, 255, 0.2) 0%,
    rgba(255, 255, 255, 0.2) 37%,
    rgba(255, 255, 255, 0.8) 45%,
    rgba(255, 255, 255, 0) 50%
  ); */

  border-radius: 1px;
  transition: all 0.3s;
`;

export const KeyChar = styled('Layer')`
  font-size: 15px;
  font-family: Roboto;
  font-weight: bold;
  color: rgba(0, 0, 0, 0.45);
  user-select: none;
`;

export const Span = styled('div')`
  top: 0;

  padding-top: 5px;
  border-radius: 8px;
  height: ${props => props.ht * 0.7}px;
  width: ${props => props.wt - 18}px;




  background-color: red;
  background: ${props =>
    linearGradient({
      colorStops: [`${shade(0.05, props.color)} 0%`, `${lighten(0.09, props.color)} 50%`],
      toDirection: '-30deg',
      fallback: '#FFF'
    })};


transition: 1s   ease;

`;

export const Key = ({ label, key, wt, ht, m }) => {

  const defaultColor = '#f9f9f9';
  const activeColor = '#3f51b5';
  const [keyColor, changeColor] = React.useState(defaultColor);
  const [active, toggleButton] = React.useState(true);
  const [keys, setKeys] = React.useContext(BufferContext);

  const keyClicked = (newKey) => {

    toggleButton(!active);
    if(active){
    changeColor(activeColor)
    setKeys([...keys, newKey]);
  } else {
    changeColor(defaultColor);
    setKeys(keys.filter((k)=> k !== newKey));

    }




    console.log("TCL: keyClicked -> keys", keys)
  }
  return (

    <React.Fragment>
      <KeyContainer
      label={label}
      wt={wt}
      ht={ht}
      m={m}
      color={keyColor}
      onClick={(()=> keyClicked(label))}
      >
        <KeyCap>
          <KeyChar>
            <Layer zIndex="2" position="absolute" margin="10px">
              {label}
            </Layer>
            <Span color={keyColor} wt={wt} ht={ht} marginTop="1px" />
          </KeyChar>
        </KeyCap>
      </KeyContainer>
    </React.Fragment>
  );
};

import React from "react";
import styled from "styled-components";
import { shade } from "polished";
import { Grid } from "@material-ui/core";
import { KeyboardArrowDownRounded } from "@material-ui/icons";
import { KeyboardArrowUpRounded } from "@material-ui/icons";
import { KeyboardArrowUp } from "@material-ui/icons";
import { KeyboardArrowDown } from "@material-ui/icons";
import { Cancel } from "@material-ui/icons";
const LeftMouseButton = styled.div`
  width: 50%;
  height: 45%;
  padding: 0;

  position: absolute;
  top: -2%;
  left: -1%;
  z-index: 20;

  /* box-shadow: inset 0 0px 0px 1px #ebebeb,  inset 0 0 0 rgba(0,0,0,0), inset 0 0 0 rgba(0,0,0,0), 0 0px 0 rgba(0,0,0,0.06); */

  /* border-radius: 20px 0px 0px 0px; */
  border-radius: 100% 0% 0% 100% / 80% 0% 100% 5%;
  border-style: solid;
  border-width: 0 1px 2px 0;

  border-color: black;
  background-clip: border-box;
  background: transparent;
  background: ${props => props.color};
  z-index: 3;
  transform-origin: 100% 35%;
  &:active {
    border-width: 3;
    transform: scale(0.99) translateY(1px);
    transition: transform 0.2s;
  }
`;
const MouseButton = styled.div`
  width: 8%;
  height: 30%;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  left: 0;
  right: 0;
  top: 10%;
  padding: 0 0.5%;
  margin: 0 auto;

  z-index: 30;
  background: black;

  border: 2px solid black;

  border-radius: 50%;
`;

const RightMouseButton = styled(LeftMouseButton)`
  transform-origin: 0% 35%;
  border-radius: 0% 100% 100% 0% / 0% 80% 5% 0%;
  border-width: 0 0px 2px 1px;
  background: transparent;
  background: ${props => props.color};
  right: -2%;
  left: initial;
  /* border-radius: 0px 90px 5px 2px; */

  /* border-radius: 0px 20px 0px 0px; */

  &:active {
    border-width: 3;
    /* box-shadow: 
  inset -1px -1px 0px 1px black  */
    transform: scale(0.99) translateY(1px);
    transition: transform 0.2s;
  }
`;

const IconBase = styled.div`
  width: 35px;
  height: 35px;
  justify-content: center;
  align-items: center;
`;
const MouseIconStyle = styled.div`
  width: 50%;
  height: 80%;
  position: absolute;
  /* overflow: hidden; */
  /* box-sizing: border-box; */
  top: 10%;
  right: 0;
  left: 0;
  margin-left: auto;
  margin-right: auto;
  border-radius: 15px;
  border-width: 3px;
  border-style: solid;
  background: transparent;
  border-color: black;
`;

export const LeftMouseClickIcon = () => {
  return (
    <IconBase>
      <MouseIconStyle>
        <LeftMouseButton color="#209CEE" />
        <RightMouseButton />
      </MouseIconStyle>
    </IconBase>
  );
};
export const RightMouseClickIcon = () => {
  return (
    <IconBase>
      <MouseIconStyle>
        <LeftMouseButton />
        <RightMouseButton color="#209CEE" />
      </MouseIconStyle>
    </IconBase>
  );
};
export const MouseScrollUpIcon = () => {
  return (
    <IconBase>
      <KeyboardArrowUpRounded
        style={{
          position: "absolute",
          top: "15px",
          right: "12px",
          color: "#209CEE"
        }}
      />
      <MouseIconStyle>
        <MouseButton />
      </MouseIconStyle>
    </IconBase>
  );
};
export const MiddleMouseButtonIcon = () => {
  return (
    <IconBase>
      <MouseIconStyle>
        <MouseButton
          style={{ borderColor: "#209CEE", background: "#209CEE" }}
        />
      </MouseIconStyle>
    </IconBase>
  );
};
export const MouseScrollDownIcon = () => {
  return (
    <IconBase>
      <KeyboardArrowDownRounded
        style={{
          position: "absolute",
          top: "15px",
          right: "12px",
          color: "#209CEE"
        }}
      />
      <MouseIconStyle>
        <MouseButton />
      </MouseIconStyle>
    </IconBase>
  );
};

// export default MouseIcon

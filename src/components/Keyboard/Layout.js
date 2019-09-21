import {
  LeftMouseClickIcon,
  RightMouseClickIcon,
  MouseScrollUpIcon,
  MouseScrollDownIcon,
  MiddleMouseButtonIcon
} from "../Key/Icons";

import React from "react";
// const keySize = 55;
// const tabSize = 1.5 * keySize;
// const regularSize = 1 * keySize;
// const shiftSize = 2.3 * keySize;
// const spaceSize = 6.58 * keySize;
// const enterSize = 2.28 * keySize;
// const backslashSize = 1.5 * keySize;
// const rshiftSize = 2.8 * keySize;
// const specialSize = 1.25 * keySize;
// const capslockSize = 1.77 * keySize;
// const backspaceSize = 2 * keySize;
import {
  KeyChar,
  KeyCharTopLeft,
  KeyCharBottomCenter,
  KeyCharTopCenter,
  KeyCharCenter
} from "../Key/Key.styles";

import {
  ArrowBack as LeftArrowIcon,
  ArrowForward as RightArrowIcon,
  ArrowUpward as UpArrowIcon,
  ArrowDownward as DownArrowIcon
} from "@material-ui/icons";
import { Windows10Logo } from "../../assets";

export const keySize = 70;
export const mw = keySize * 15;

// const regularSize = 1 * keySize;

// const backspaceSize = 2 * keySize;

// const tabSize = 1.5 * keySize;
// const backslashSize = 1.5 * keySize;

// const capslockSize = 1.75 * keySize;
// const enterSize = 2.27 * keySize;

// const shiftSize = 2.25 * keySize;
// const rshiftSize = 2.795 * keySize;

// const spaceSize = 6.35 * keySize;
// const specialSize = 1.257 * keySize;

const regularSize = keySize;
//   R1: 1*14 + 2*1 = 16      = 16 -> 16 +  16x = 15(1.5) + 1   +  16    = 40 - 40  =  0
//   R2: 1.5 + 1*13 + 1.5     = 16 -> 16 +  16x = 15(1.5) + 1   +  16    = 40 - 40  =  0
//   R3: 1.75 + 1*12 + 2.25   = 16 -> 16 +  15x = 15(1.5)   +  16    = 40 - 38.5 =  1.5
//   R4: 2.25 + 1*12 + 1.25   = 16 -> 16 +  15x = 15(1.5)   +  16    = 40 - 38.5 =  1.5
//   R5: 1.25*3 + 6.25 + 1*6  = 16 -> 16 +  11x = 11(1.5)   +  16    = 40 - 29.5 =  7.5

// R

// R1
const backspaceSize = 2 * keySize;
// R2
const tabSize = 1.5 * keySize;
const backslashSize = 1.5 * keySize;
// R3
const capslockSize = (1.75 + 0.041) * keySize;
const enterSize = 2.25 * keySize;
// R4
const shiftSize = 2.25 * keySize;
const rshiftSize = (1.75 + 0.041) * keySize;
// R5
const spaceSize = (6.25 + 0.207) * keySize;
const specialSize = 1.25 * keySize;

export const firstRow = {
  Backquote: { label: "`", size: regularSize, KeyChar: KeyCharTopLeft },
  Digit1: { label: "1", size: regularSize, KeyChar: KeyCharTopLeft },
  Digit2: { label: "2", size: regularSize, KeyChar: KeyCharTopLeft },
  Digit3: { label: "3", size: regularSize, KeyChar: KeyCharTopLeft },
  Digit4: { label: "4", size: regularSize, KeyChar: KeyCharTopLeft },
  Digit5: { label: "5", size: regularSize, KeyChar: KeyCharTopLeft },
  Digit6: { label: "6", size: regularSize, KeyChar: KeyCharTopLeft },
  Digit7: { label: "7", size: regularSize, KeyChar: KeyCharTopLeft },
  Digit8: { label: "8", size: regularSize, KeyChar: KeyCharTopLeft },
  Digit9: { label: "9", size: regularSize, KeyChar: KeyCharTopLeft },
  Digit0: { label: "0", size: regularSize, KeyChar: KeyCharTopLeft },
  Minus: { label: "-", size: regularSize, KeyChar: KeyCharTopLeft },
  Equal: { label: "=", size: regularSize, KeyChar: KeyCharTopLeft },
  Backspace: {
    label: "Backspace",
    size: backspaceSize,
    KeyChar: KeyCharCenter
  },
  PageUp: { label: "PgUp", size: regularSize, KeyChar: KeyCharCenter }
};

export const secondRow = {
  Tab: { label: "Tab", size: tabSize, KeyChar: KeyCharCenter },
  KeyQ: { label: "Q", size: regularSize, KeyChar: KeyCharTopLeft },
  KeyW: { label: "W", size: regularSize, KeyChar: KeyCharTopLeft },
  KeyE: { label: "E", size: regularSize, KeyChar: KeyCharTopLeft },
  KeyR: { label: "R", size: regularSize, KeyChar: KeyCharTopLeft },
  KeyT: { label: "T", size: regularSize, KeyChar: KeyCharTopLeft },
  KeyY: { label: "Y", size: regularSize, KeyChar: KeyCharTopLeft },
  KeyU: { label: "U", size: regularSize, KeyChar: KeyCharTopLeft },
  KeyI: { label: "I", size: regularSize, KeyChar: KeyCharTopLeft },
  KeyO: { label: "O", size: regularSize, KeyChar: KeyCharTopLeft },
  KeyP: { label: "P", size: regularSize, KeyChar: KeyCharTopLeft },
  BracketLeft: { label: "[", size: regularSize, KeyChar: KeyCharTopLeft },
  BracketRight: { label: "]", size: regularSize, KeyChar: KeyCharTopLeft },
  Backslash: { label: "\\", size: backslashSize, KeyChar: KeyCharTopLeft },
  PageDown: { label: "PgDn", size: regularSize, KeyChar: KeyCharCenter }
};
export const thirdRow = {
  CapsLock: {
    label: "Capslock",
    size: capslockSize,
    modifier: "modifier",
    KeyChar: KeyCharCenter
  },
  KeyA: { label: "A", size: regularSize, KeyChar: KeyCharTopLeft },
  KeyS: { label: "S", size: regularSize, KeyChar: KeyCharTopLeft },
  KeyD: { label: "D", size: regularSize, KeyChar: KeyCharTopLeft },
  KeyF: { label: "F", size: regularSize, KeyChar: KeyCharTopLeft },
  KeyG: { label: "G", size: regularSize, KeyChar: KeyCharTopLeft },
  KeyH: { label: "H", size: regularSize, KeyChar: KeyCharTopLeft },
  KeyJ: { label: "J", size: regularSize, KeyChar: KeyCharTopLeft },
  KeyK: { label: "K", size: regularSize, KeyChar: KeyCharTopLeft },
  KeyL: { label: "L", size: regularSize, KeyChar: KeyCharTopLeft },
  Semicolon: { label: ";", size: regularSize, KeyChar: KeyCharTopLeft },
  Quote: { label: "'", size: regularSize, KeyChar: KeyCharTopLeft },
  Enter: { label: "Enter", size: enterSize, KeyChar: KeyCharCenter },
  Insert: { label: "Insert", size: regularSize, KeyChar: KeyCharCenter }
};

export const fourthRow = {
  Shiftleft: { label: "Shift", size: shiftSize, KeyChar: KeyCharCenter },
  KeyZ: { label: "Z", size: regularSize, KeyChar: KeyCharTopLeft },
  KeyX: { label: "X", size: regularSize, KeyChar: KeyCharTopLeft },
  KeyC: { label: "C", size: regularSize, KeyChar: KeyCharTopLeft },
  KeyF: { label: "V", size: regularSize, KeyChar: KeyCharTopLeft },
  KeyH: { label: "B", size: regularSize, KeyChar: KeyCharTopLeft },
  KeyJ: { label: "N", size: regularSize, KeyChar: KeyCharTopLeft },
  KeyK: { label: "M", size: regularSize, KeyChar: KeyCharTopLeft },
  Comma: { label: ",", size: regularSize, KeyChar: KeyCharTopLeft },
  Period: { label: ".", size: regularSize, KeyChar: KeyCharTopLeft },
  Slash: { label: "/", size: regularSize, KeyChar: KeyCharTopLeft },
  ShiftRight: { label: "Shift", size: rshiftSize, KeyChar: KeyCharCenter },
  UpArrow: {
    label: <UpArrowIcon />,
    size: regularSize,
    KeyChar: KeyCharCenter
  },
  Delete: { label: "Delete", size: regularSize, KeyChar: KeyCharCenter }
};
export const excludedKeys = {
  ControlRight: { label: "Ctrl", size: specialSize, KeyChar: KeyCharTopLeft },
  ShiftRight: { label: "Shift", size: rshiftSize, KeyChar: KeyCharTopLeft },
  AltRight: { label: "Alt", size: specialSize, KeyChar: KeyCharTopLeft }
};
{
  /* <LeftArrowIcon>{label}</LeftArrowIcon>,
 <RightArrowIcon>{label}</RightArrowIcon>,
<UpArrowIcon>{label}</UpArrowIcon>,
<DownArrowIcon>{label}</DownArrowIcon> */
}
export const fifthRow = {
  ControlLeft: { label: "Ctrl", size: specialSize, KeyChar: KeyCharCenter },
  MetaLeft: {
    label: <Windows10Logo />,
    size: specialSize,
    KeyChar: KeyCharCenter
  },
  AltLeft: { label: "Alt", size: specialSize, KeyChar: KeyCharCenter },
  Space: { label: "", size: spaceSize, KeyChar: KeyCharTopLeft },
  AltRight: { label: "Alt", size: regularSize, KeyChar: KeyCharCenter },
  ContextMenu: { label: "≣", size: regularSize, KeyChar: KeyCharCenter },
  ControlRight: { label: "Ctrl", size: regularSize, KeyChar: KeyCharCenter },
  LeftArrow: {
    label: <LeftArrowIcon />,
    size: regularSize,
    KeyChar: KeyCharCenter
  },
  DownArrow: {
    label: <DownArrowIcon />,
    size: regularSize,
    KeyChar: KeyCharCenter
  },
  RightArrow: {
    label: <RightArrowIcon />,
    size: regularSize,
    KeyChar: KeyCharCenter
  }
};

export const miscKeys = {
  // Equal: ['=', regularSize*3],
  LeftClick: {
    label: <LeftMouseClickIcon />,
    size: regularSize,
    KeyChar: KeyChar
  },
  MiddleMouseButton: {
    label: <MiddleMouseButtonIcon />,
    size: regularSize,
    KeyChar: KeyChar
  },
  RightClick: {
    label: <RightMouseClickIcon />,
    size: regularSize,
    KeyChar: KeyChar
  },
  ScrollUp: {
    label: <MouseScrollUpIcon />,
    size: regularSize,
    KeyChar: KeyChar
  },
  ScrollDown: {
    label: <MouseScrollDownIcon />,
    size: regularSize,
    KeyChar: KeyChar
  },
  DragMouse: { label: "", size: regularSize, KeyChar: KeyCharTopLeft },
  Digit6: { label: "", size: regularSize, KeyChar: KeyCharTopLeft },
  Digit7: { label: "", size: regularSize, KeyChar: KeyCharTopLeft },
  Digit8: { label: "", size: regularSize, KeyChar: KeyCharTopLeft },
  Digit9: { label: "", size: regularSize, KeyChar: KeyCharTopLeft },
  Digit0: { label: "", size: regularSize, KeyChar: KeyCharTopLeft },
  Minus: { label: "", size: regularSize, KeyChar: KeyCharTopLeft }

  // Equal: ['=', regularSize],
  // Backspace: ['`', regularSize],
  // PageUp: ['PgUp', regularSize]
};

// export const fifthRow = {
//   ControlLeft: ['Ctrl', specialSize],
//   MetaLeft: ['⊞', specialSize],
//   AltLeft: ['Alt', specialSize],
//   Space: ['', spaceSize],
//   AltRight: ['Alt', specialSize],
//   Fn: ['Fn', specialSize],
//   ContextMenu: ['≣', specialSize],
//   ControlRight: ['Ctrl', specialSize],
//   LeftArrow: ['←', specialSize],
//   DownArrow: ['↓', specialSize],
//   RightArrow: ['→', specialSize],
// };

export default {
  firstRow,
  secondRow,
  thirdRow,
  fourthRow,
  fifthRow,
  keySize,
  mw
};

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
  Backquote: ["`", regularSize],
  Digit1: ["1", regularSize],
  Digit2: ["2", regularSize],
  Digit3: ["3", regularSize],
  Digit4: ["4", regularSize],
  Digit5: ["5", regularSize],
  Digit6: ["6", regularSize],
  Digit7: ["7", regularSize],
  Digit8: ["8", regularSize],
  Digit9: ["9", regularSize],
  Digit0: ["0", regularSize],
  Minus: ["-", regularSize],
  Equal: ["=", regularSize],
  Backspace: ["Backspace", backspaceSize],
  PageUp: ["PgUp", regularSize]
};

export const secondRow = {
  Tab: ["Tab", tabSize],
  KeyQ: ["Q", regularSize],
  KeyW: ["W", regularSize],
  KeyE: ["E", regularSize],
  KeyR: ["R", regularSize],
  KeyT: ["T", regularSize],
  KeyY: ["Y", regularSize],
  KeyU: ["U", regularSize],
  KeyI: ["I", regularSize],
  KeyO: ["O", regularSize],
  KeyP: ["P", regularSize],
  BracketLeft: ["[", regularSize],
  BracketRight: ["]", regularSize],
  Backslash: ["\\", backslashSize],
  PageDown: ["PgDn", regularSize]
};
export const thirdRow = {
  CapsLock: ["Capslock", capslockSize, "modifier"],
  KeyA: ["A", regularSize],
  KeyS: ["S", regularSize],
  KeyD: ["D", regularSize],
  KeyF: ["F", regularSize],
  KeyG: ["G", regularSize],
  KeyH: ["H", regularSize],
  KeyJ: ["J", regularSize],
  KeyK: ["K", regularSize],
  KeyL: ["L", regularSize],
  Semicolon: [";", regularSize],
  Quote: ["'", regularSize],
  Enter: ["Enter", enterSize],
  Insert: ["Insert", regularSize]
};

export const fourthRow = {
  Shiftleft: ["Shift", shiftSize],
  KeyZ: ["Z", regularSize],
  KeyX: ["X", regularSize],
  KeyC: ["C", regularSize],
  KeyF: ["V", regularSize],
  KeyH: ["B", regularSize],
  KeyJ: ["N", regularSize],
  KeyK: ["M", regularSize],
  Comma: [",", regularSize],
  Period: [".", regularSize],
  Slash: ["/", regularSize],
  ShiftRight: ["Shift", rshiftSize],
  UpArrow: ["↑", regularSize],
  Delete: ["Delete", regularSize]
};
export const excludedKeys = {
  ControlRight: ["Ctrl", specialSize],
  ShiftRight: ["Shift", rshiftSize],
  AltRight: ["Alt", specialSize]
};
{
  /* <LeftArrowIcon>{label}</LeftArrowIcon>,
 <RightArrowIcon>{label}</RightArrowIcon>,
<UpArrowIcon>{label}</UpArrowIcon>,
<DownArrowIcon>{label}</DownArrowIcon> */
}
export const fifthRow = {
  ControlLeft: ["Ctrl", specialSize],
  MetaLeft: ["⊞", specialSize],
  AltLeft: ["Alt", specialSize],
  Space: ["", spaceSize],
  AltRight: ["Alt", regularSize],
  ContextMenu: ["≣", regularSize],
  ControlRight: ["Ctrl", regularSize],
  LeftArrow: ["←", regularSize],
  DownArrow: ["↓", regularSize],
  RightArrow: ["→", regularSize]
};

export const miscKeys = {
  // Equal: ['=', regularSize*3],
  LeftClick: [<LeftMouseClickIcon />, regularSize],
  MiddleMouseButton: [<MiddleMouseButtonIcon />, regularSize],
  RightClick: [<RightMouseClickIcon />, regularSize],
  ScrollUp: [<MouseScrollUpIcon />, regularSize],
  ScrollDown: [<MouseScrollDownIcon />, regularSize],
  DragMouse: ["", regularSize],
  Digit6: ["", regularSize],
  Digit7: ["", regularSize],
  Digit8: ["", regularSize],
  Digit9: ["", regularSize],
  Digit0: ["", regularSize],
  Minus: ["", regularSize]

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

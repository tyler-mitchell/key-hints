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



// 1*14 + 2*1 = 16
// 1.5 + 1*13 + 1.5 = 16
// 1.75 + 1*12 + 2.25 = 16
// 2.25 + 1*12 + 1.25 = 16
// 1.25*3 + 6.25 + 1*6


const regularSize =  keySize;

const backspaceSize = 2 * keySize;

const tabSize = 1.5 * keySize;
const backslashSize = 1.5 * keySize;

const capslockSize = 1.75 * keySize;
const enterSize = 2.25 * keySize;

const shiftSize = 2.25 * keySize;
const rshiftSize = 1.8 * keySize;

const spaceSize = 6.52 * keySize;
const specialSize = 1.25 * keySize;

export const firstRow = {
  Backquote: ['`', regularSize],
  Digit1: ['1', regularSize],
  Digit2: ['2', regularSize],
  Digit3: ['3', regularSize],
  Digit4: ['4', regularSize],
  Digit5: ['5', regularSize],
  Digit6: ['6', regularSize],
  Digit7: ['7', regularSize],
  Digit8: ['8', regularSize],
  Digit9: ['9', regularSize],
  Digit0: ['0', regularSize],
  Minus: ['-', regularSize],
  Equal: ['=', regularSize],
  Backspace: ['Backspace', backspaceSize],
  PageUp: ['PgUp', regularSize]
};
export const secondRow = {
  Tab: ['Tab', tabSize],
  KeyQ: ['Q', regularSize],
  KeyW: ['W', regularSize],
  KeyE: ['E', regularSize],
  KeyR: ['R', regularSize],
  KeyT: ['T', regularSize],
  KeyY: ['Y', regularSize],
  KeyU: ['U', regularSize],
  KeyI: ['I', regularSize],
  KeyO: ['O', regularSize],
  KeyP: ['P', regularSize],
  BracketLeft: ['[', regularSize],
  BracketRight: [']', regularSize],
  Backslash: ['\\', backslashSize],
  PageDown: ['PgDn', regularSize]
};
export const thirdRow = {
  CapsLock: ['Caps Lock', capslockSize],
  KeyA: ['A', regularSize],
  KeyS: ['S', regularSize],
  KeyD: ['D', regularSize],
  KeyF: ['F', regularSize],
  KeyG: ['G', regularSize],
  KeyH: ['H', regularSize],
  KeyJ: ['J', regularSize],
  KeyK: ['K', regularSize],
  KeyL: ['L', regularSize],
  Semicolon: [';', regularSize],
  Quote: ["'", regularSize],
  Enter: ['Enter', enterSize],
  Insert: ['Insert', regularSize]
};

export const fourthRow = {
  Shiftleft: ['Shift', shiftSize],
  KeyZ: ['Z', regularSize],
  KeyX: ['X', regularSize],
  KeyC: ['C', regularSize],
  KeyF: ['V', regularSize],
  KeyH: ['B', regularSize],
  KeyJ: ['N', regularSize],
  KeyK: ['M', regularSize],
  Comma: [',', regularSize],
  Period: ['.', regularSize],
  Slash: ['/', regularSize],
  ShiftRight: ['Shift', rshiftSize],
  UpArrow: ['↑', regularSize],
  Delete: ['Delete', regularSize]
};
export const excludedKeys = {
  ControlRight: ['Ctrl', specialSize],
  ShiftRight: ['Shift', rshiftSize],
  AltRight: ['Alt', specialSize],
}


export const fifthRow = {
  ControlLeft: ['Ctrl', specialSize],
  MetaLeft: ['⊞', specialSize],
  AltLeft: ['Alt', specialSize],
  Space: ['', spaceSize],
  AltRight: ['Alt', regularSize],
  ContextMenu: ['≣', regularSize],
  ControlRight: ['Ctrl', regularSize],
  LeftArrow: ['←', regularSize],
  DownArrow: ['↓', regularSize],
  RightArrow: ['→', regularSize],
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

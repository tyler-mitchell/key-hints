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

export const keySize = 75;
export const mw = keySize * 15;

const regularSize = 1 * keySize;

const backspaceSize = 2 * keySize;

const tabSize = 1.5 * keySize;
const backslashSize = 1.5 * keySize;

const capslockSize = 1.75 * keySize;
const enterSize = 2.27 * keySize;

const shiftSize = 2.25 * keySize;
const rshiftSize = 2.795 * keySize;

const spaceSize = 6.35 * keySize;
const specialSize = 1.257 * keySize;

export const firstRow = {
  Backquote: ['` ∼', regularSize],
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
  Backspace: ['⌫ Backspace', backspaceSize]
};
export const secondRow = {
  Tab: ['Tab ⇄ ', tabSize],
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
  Backslash: ['\\', backslashSize]
};
export const thirdRow = {
  CapsLock: ['⇪ Caps Lock', capslockSize],
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
  Enter: ['Enter ⏎', enterSize]
};

export const fourthRow = {
  Shiftleft: ['⇧ Shift', shiftSize],
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
  ShiftRight: ['⇧ Shift', rshiftSize]
};
export const fifthRow = {
  ControlLeft: ['Ctrl', specialSize],
  MetaLeft: ['\u229E', specialSize],
  AltLeft: ['Alt', specialSize],
  Space: ['', spaceSize],
  AltRight: ['Alt', specialSize],
  Fn: ['Fn', specialSize],
  ContextMenu: ['≣', specialSize],
  ControlRight: ['Ctrl', specialSize]
};
export default {
  firstRow,
  secondRow,
  thirdRow,
  fourthRow,
  fifthRow,
  keySize,
  mw
};


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


export const keySize = 80;
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
  Digit1: ['Tab ⇄ ', tabSize],
  Digit2: ['Q', regularSize],
  Digit3: ['W', regularSize],
  Digit4: ['E', regularSize],
  Digit5: ['R', regularSize],
  Digit6: ['T', regularSize],
  Digit7: ['Y', regularSize],
  Digit8: ['U', regularSize],
  Digit9: ['I', regularSize],
  Digit0: ['O', regularSize],
  Minus: ['P', regularSize],
  Equal: ['[', regularSize],
  Backquote: [']', regularSize],
  Backspace: ['\\', backslashSize]
};
export const thirdRow = {
  Digit1: ['⇪ Caps Lock', capslockSize],
  Digit2: ['A', regularSize],
  Digit3: ['S', regularSize],
  Digit4: ['D', regularSize],
  Digit5: ['F', regularSize],
  Digit6: ['G', regularSize],
  Digit7: ['H', regularSize],
  Digit8: ['J', regularSize],
  Digit9: ['K', regularSize],
  Digit0: ['L', regularSize],
  Minus: [';', regularSize],
  Equal: ["'", regularSize],
  Backquote: ['Enter ⏎', enterSize]
};

export const fourthRow = {
  Digit1: ['⇧ Shift', shiftSize],
  Digit2: ['Z', regularSize],
  Digit3: ['X', regularSize],
  Digit4: ['C', regularSize],
  Digit5: ['F', regularSize],
  Digit6: ['H', regularSize],
  Digit7: ['J', regularSize],
  Digit8: ['K', regularSize],
  Digit9: ['L', regularSize],
  Digit0: [';', regularSize],
  Minus: ["'", regularSize],
  Equal: ['⇧ Shift', rshiftSize]
};
export const fifthRow = {
  Digit1: ['Ctrl', specialSize],
  Digit2: ['\u229E', specialSize],
  Digit3: ['Alt', specialSize],
  Digit4: ['', spaceSize],
  Digit5: ['Alt', specialSize],
  Digit6: ['Fn', specialSize],
  Digit7: ['≣', specialSize],
  Digit9: ['Ctrl', specialSize]
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
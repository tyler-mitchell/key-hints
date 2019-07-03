import * as firebase from 'firebase';

const Key = {
  Ctrl: 'Ctrl',
  Alt: 'Alt',
  Cmd: '⊞',
  Shift: 'Shift',
  Space: 'Space',
  ArrowLeft: '←',
  ArrowRight: '→',
  ArrowUp: '↑',
  ArrowDown: '↓'
};

export const KeyTable = {
  table: [
    {

      keys: {'key1': {0: 'Ctrl', 1: 'Shift', 2: 'P'}, 'key2': {0: 'F1'}},
      description: "Show Command Palette",
      category: "General"

    },

    {

      keys: {'key1': {0: 'Ctrl', 1: 'P'}},
      description: "Quick Open, Go to File…",
      category: "General"

    },

    {

      keys: {'key1': {0: 'Ctrl', 1: 'Shift', 2: 'N'}},
      description: "New window/instance",
      category: "General"

    },

    {

      keys: {'key1': {0: 'Ctrl', 1: 'Shift', 2: 'W'}},
      description: "Close window/instance",
      category: "General"

    },

    {

      keys: {'key1': {0: 'Ctrl', 1: ','}},
      description: "User Settings",
      category: "General"

    },

    {

      keys: {'key1': {0: 'Ctrl', 1: 'K'}, 'key2': {0: 'Ctrl', 1: 'S'}},
      description: "Keyboard Shortcuts",
      category: "General"

    },

    {

      keys: {'key1': {0: 'Ctrl', 1: 'X'}},
      description: "Cut line (empty selection)",
      category: "Basic editing"

    },

    {

      keys: {'key1': {0: 'Ctrl', 1: 'C'}},
      description: "Copy line (empty selection)",
      category: "Basic editing"

    },

    {

      keys: {'key1': {0: 'Alt', 1: ['↑', '↓']}},
      description: "Move line up/down",
      category: "Basic editing"

    },

    {

      keys: {'key1': {0: 'Shift', 1: 'Alt', 2: ['↓', '↑']}},
      description: "Copy line up/down",
      category: "Basic editing"

    },

    {

      keys: {'key1': {0: 'Ctrl', 1: 'Shift', 2: 'K'}},
      description: "Delete line",
      category: "Basic editing"

    },

    {

      keys: {'key1': {0: 'Ctrl', 1: 'Enter'}},
      description: "Insert line below",
      category: "Basic editing"

    },

    {

      keys: {'key1': {0: 'Ctrl', 1: 'T'}},
      description: "Show all Symbols",
      category: "Navigation"

    },

    {

      keys: {'key1': {0: 'Ctrl', 1: 'G'}},
      description: "Go to Line...",
      category: "Navigation"

    },

    {

      keys: {'key1': {0: 'Ctrl', 1: 'P'}},
      description: "Go to File...",
      category: "Navigation"

    },

    {

      keys: {'key1': {0: 'Ctrl', 1: 'Shift', 2: 'O'}},
      description: "Go to Symbol...",
      category: "Navigation"

    },

    {

      keys: {'key1': {0: 'Ctrl', 1: 'Shift', 2: 'M'}},
      description: "Show Problems panel",
      category: "Navigation"

    },

    {

      keys: {'key1': {0: 'F8'}},
      description: "Go to next error or warning",
      category: "Navigation"

    },

    {

      keys: {'key1': {0: 'Shift', 1: 'F8'}},
      description: "Go to previous error or warning",
      category: "Navigation"

    },

    {

      keys: {'key1': {0: 'Ctrl', 1: 'Shift', 2: 'Tab'}},
      description: "Navigate editor group history",
      category: "Navigation"

    },

    {

      keys: {'key1': {0: 'Alt', 1: ['←', '→']}},
      description: "Go back / forward",
      category: "Navigation"

    },

    {

      keys: {'key1': {0: 'Ctrl', 1: 'F'}},
      description: "Find",
      category: "Search and replace"

    },

    {

      keys: {'key1': {0: 'Ctrl', 1: 'H'}},
      description: "Replace",
      category: "Search and replace"

    },

    {

      keys: {'key1': {0: 'F3'}, 'key2': {0: 'Shift', 1: 'F3'}},
      description: "Find next/previous",
      category: "Search and replace"

    },

    {

      keys: {'key1': {0: 'Alt', 1: 'Enter'}},
      description: "Select all occurences of Find match",
      category: "Search and replace"

    },

    {

      keys: {'key1': {0: 'Ctrl', 1: 'D'}},
      description: "Add selection to next Find match",
      category: "Search and replace"

    },

    {

      keys: {'key1': {0: 'Ctrl', 1: 'K'}, 'key2': {0: 'Ctrl', 1: 'D'}},
      description: "Move last selection to next Find match",
      category: "Search and replace"

    },

    {

      keys: {'key1': {0: 'Alt', 1: ['C', 'R', 'W']}},
      description: "Toggle case-sensitive / regex / whole word",
      category: "Search and replace"

    },

    {

      keys: {'key1': {0: 'Alt', 1: 'Click'}},
      description: "Insert cursor",
      category: "Multi-cursor and selection"

    },

    {

      keys: {'key1': {0: 'Ctrl', 1: 'Alt', 2: ['↑', '↓']}},
      description: "Insert cursor above / below",
      category: "Multi-cursor and selection"

    },

    {

      keys: {'key1': {0: 'Ctrl', 1: 'U'}},
      description: "Undo last cursor operation",
      category: "Multi-cursor and selection"

    },

    {

      keys: {'key1': {0: 'Shift', 1: 'Alt', 2: 'I'}},
      description: "Insert cursor at end of each line selected",
      category: "Multi-cursor and selection"

    },

    {

      keys: {'key1': {0: 'Ctrl', 1: 'L'}},
      description: "Select current line",
      category: "Multi-cursor and selection"

    },

    {

      keys: {'key1': {0: 'Ctrl', 1: 'Shift', 2: 'L'}},
      description: "Select all occurrences of current selection",
      category: "Multi-cursor and selection"

    },

    {

      keys: {'key1': {0: 'Ctrl', 1: 'F2'}},
      description: "Select all occurrences of current word",
      category: "Multi-cursor and selection"

    },

    {

      keys: {'key1': {0: 'Shift', 1: 'Alt', 2: '→'}},
      description: "Expand selection",
      category: "Multi-cursor and selection"

    },

    {

      keys: {'key1': {0: 'Shift', 1: 'Alt', 2: '←'}},
      description: "Shrink selection",
      category: "Multi-cursor and selection"

    },

    {

      keys: {'key1': {0: 'Shift', 1: 'Alt', 2: '(drag mouse)'}},
      description: "Column (box) selection",
      category: "Multi-cursor and selection"

    },

    {

      keys: {'key1': {0: 'Ctrl', 1: 'Shift', 2: 'Alt', 3: '(arrow key)'}},
      description: "Column (box) selection",
      category: "Multi-cursor and selection"

    },

    {

      keys: {'key1': {0: 'Ctrl', 1: 'Shift', 2: 'Alt', 3: ['PgUp', 'PgDn']}},
      description: "Column (box) selection page up/down",
      category: "Multi-cursor and selection"

    },
  ],
  categories: [
    'GENERAL',
    'BASIC EDITING',
    'NAVIGATION',
    'SEARCH AND REPLACE',
    'MULTI-CURSOR AND SELECTION',
    'RICH LANGUAGES EDITING',
    'EDITOR MANAGEMENT',
    'FILE MANAGEMENT',
    'DISPLAY',
    'DEBUG',
    'INTEGRATED TERMINAL'
  ]
};

const MacKey = {
  WinKe: 'WinKe',
  Alt: '⌥',
  Cmd: '⌘',
  Shift: '⇧',
  Space: 'Space',
  ArrowLeft: '←',
  ArrowRight: '→',
  ArrowUp: '↑',
  ArrowDown: '↓'
};

const newData = Object.assign({}, KeyTable); 



// console.log(newData)
function convertToObj(data) {
  const newObj = {}
  for (let o in data) {
    const key = "key"+o
    const obj = data[o]
    newObj[key] = obj
  }
  // console.log(newObj)
  
  return newObj;
}
export const table = convertToObj(KeyTable.table)

export const TableTest = { categories: KeyTable.categories, table: {...table }}

export const SheetData = [{}, {}];




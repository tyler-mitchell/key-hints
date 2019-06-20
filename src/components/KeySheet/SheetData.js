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

      keys: {'key1': ['Ctrl', 'Shift', 'P'], 'key2': ['F1']},
      description: "Show Command Palette",
      category: "General"

    },

    {

      keys: {'key1': ['Ctrl', 'P']},
      description: "Quick Open, Go to File…",
      category: "General"

    },

    {

      keys: {'key1': ['Ctrl', 'Shift', 'N']},
      description: "New window/instance",
      category: "General"

    },

    {

      keys: {'key1': ['Ctrl', 'Shift', 'W']},
      description: "Close window/instance",
      category: "General"

    },

    {

      keys: {'key1': ['Ctrl', ',']},
      description: "User Settings",
      category: "General"

    },

    {

      keys: {'key1': ['Ctrl', 'K'], 'key2': ['Ctrl', 'S']},
      description: "Keyboard Shortcuts",
      category: "General"

    },

    {

      keys: {'key1': ['Ctrl', 'X']},
      description: "Cut line (empty selection)",
      category: "Basic editing"

    },

    {

      keys: {'key1': ['Ctrl', 'C']},
      description: "Copy line (empty selection)",
      category: "Basic editing"

    },

    {

      keys: {'key1': ['Alt', ['↑', '↓']]},
      description: "Move line up/down",
      category: "Basic editing"

    },

    {

      keys: {'key1': ['Shift', 'Alt', ['↓', '↑']]},
      description: "Copy line up/down",
      category: "Basic editing"

    },

    {

      keys: {'key1': ['Ctrl', 'Shift', 'K']},
      description: "Delete line",
      category: "Basic editing"

    },

    {

      keys: {'key1': ['Ctrl', 'Enter']},
      description: "Insert line below",
      category: "Basic editing"

    },

    {

      keys: {'key1': ['Ctrl', 'T']},
      description: "Show all Symbols",
      category: "Navigation"

    },

    {

      keys: {'key1': ['Ctrl', 'G']},
      description: "Go to Line...",
      category: "Navigation"

    },

    {

      keys: {'key1': ['Ctrl', 'P']},
      description: "Go to File...",
      category: "Navigation"

    },

    {

      keys: {'key1': ['Ctrl', 'Shift', 'O']},
      description: "Go to Symbol...",
      category: "Navigation"

    },

    {

      keys: {'key1': ['Ctrl', 'Shift', 'M']},
      description: "Show Problems panel",
      category: "Navigation"

    },

    {

      keys: {'key1': ['F8']},
      description: "Go to next error or warning",
      category: "Navigation"

    },

    {

      keys: {'key1': ['Shift', 'F8']},
      description: "Go to previous error or warning",
      category: "Navigation"

    },

    {

      keys: {'key1': ['Ctrl', 'Shift', 'Tab']},
      description: "Navigate editor group history",
      category: "Navigation"

    },

    {

      keys: {'key1': ['Alt', ['←', '→']]},
      description: "Go back / forward",
      category: "Navigation"

    },

    {

      keys: {'key1': ['Ctrl', 'F']},
      description: "Find",
      category: "Search and replace"

    },

    {

      keys: {'key1': ['Ctrl', 'H']},
      description: "Replace",
      category: "Search and replace"

    },

    {

      keys: {'key1': ['F3'], 'key2': ['Shift', 'F3']},
      description: "Find next/previous",
      category: "Search and replace"

    },

    {

      keys: {'key1': ['Alt', 'Enter']},
      description: "Select all occurences of Find match",
      category: "Search and replace"

    },

    {

      keys: {'key1': ['Ctrl', 'D']},
      description: "Add selection to next Find match",
      category: "Search and replace"

    },

    {

      keys: {'key1': ['Ctrl', 'K'], 'key2': ['Ctrl', 'D']},
      description: "Move last selection to next Find match",
      category: "Search and replace"

    },

    {

      keys: {'key1': ['Alt', ['C', 'R', 'W']]},
      description: "Toggle case-sensitive / regex / whole word",
      category: "Search and replace"

    },

    {

      keys: {'key1': ['Alt', 'Click']},
      description: "Insert cursor",
      category: "Multi-cursor and selection"

    },

    {

      keys: {'key1': ['Ctrl', 'Alt', ['↑', '↓']]},
      description: "Insert cursor above / below",
      category: "Multi-cursor and selection"

    },

    {

      keys: {'key1': ['Ctrl', 'U']},
      description: "Undo last cursor operation",
      category: "Multi-cursor and selection"

    },

    {

      keys: {'key1': ['Shift', 'Alt', 'I']},
      description: "Insert cursor at end of each line selected",
      category: "Multi-cursor and selection"

    },

    {

      keys: {'key1': ['Ctrl', 'L']},
      description: "Select current line",
      category: "Multi-cursor and selection"

    },

    {

      keys: {'key1': ['Ctrl', 'Shift', 'L']},
      description: "Select all occurrences of current selection",
      category: "Multi-cursor and selection"

    },

    {

      keys: {'key1': ['Ctrl', 'F2']},
      description: "Select all occurrences of current word",
      category: "Multi-cursor and selection"

    },

    {

      keys: {'key1': ['Shift', 'Alt', '→']},
      description: "Expand selection",
      category: "Multi-cursor and selection"

    },

    {

      keys: {'key1': ['Shift', 'Alt', '←']},
      description: "Shrink selection",
      category: "Multi-cursor and selection"

    },

    {

      keys: {'key1': ['Shift', 'Alt', '(drag mouse)']},
      description: "Column (box) selection",
      category: "Multi-cursor and selection"

    },

    {

      keys: {'key1': ['Ctrl', 'Shift', 'Alt', '(arrow key)']},
      description: "Column (box) selection",
      category: "Multi-cursor and selection"

    },

    {

      keys: {'key1': ['Ctrl', 'Shift', 'Alt', ['PgUp', 'PgDn']]},
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

export const SheetData = [{}, {}];


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



export const KeyTable = [

  {
    "keys": [Key.Ctrl, Key.Alt, 'C'],
    "description": "Cut line (empty selection)",
    "category": "Basic Editing",
    "when": '',
  },
  {
    "keys": [Key.Ctrl, Key.Shift, 'D'],
    "description": "Copy line (empty selection)",
    "category": "Basic Editing",
  },
  {
    "keys": [Key.Alt, Key.Shift, Key.ArrowUp],
    "description": "Move line up/down",
    "category": "Basic Editing",
  },
  {
    "keys": [Key.Alt, Key.Shift, 'S'],
    "description": "Copy line up/down",
    "category": "Basic Editing",
  },
  {
    "keys": [Key.Alt , Key.Shift, 'A'],
    "description": "Delete line",
    "category": "",
  },
  {
    "keys": [Key.Ctrl, Key.Alt, 'Z'],
    "description": "Insert line below",
    "category": "",
  },
  {
    "keys": [Key.Ctrl, Key.Alt , 'X'],
    "description": "Enter Insert line above",
    "category": "",
  },

]









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




export const SheetData = [
  {},{}


]


import React from 'react';

import _ from 'lodash'
import move from 'lodash-move'
import { Layers } from '@material-ui/icons';
import { setGlobalState } from '../../state';




const keyTable = {

  
  
  "000": {
    categories: [""],
    description: "",
    keys:{ key1: ["Ctrl", "X"]}
    
  },
  "001": {
    categories: [""],

    description: "",
    keys: { key1: ["Ctrl", 'Alt', "X"] }
    
  },
  "002": {
    categories: [""],

    description: "",
    keys: { key1: ["Ctrl", 'Alt', "Z"] }
    
  },
  "003": {
    categories: [""],

    description: "",
    keys: { key1: ["Ctrl", "C"] }
    
  },
  "004": {
    categories: [""],
    description: "",
    keys: { key1: ["Shift", "B"] }
    
  },
  "005": {
    categories: [""],
    description: "",
    keys: { key1: ["Ctrl", 'Alt', "C"] }
    
  },
  "006": {
    categories: [""],
    description: "",
    keys: { key1: ["Tab", "C"] }
  }
}

function getModDifference(keyData, mod) {
  return (_.chain(keyData).pickBy((shortcut) => {
    const diff = _.difference(mod, _.values(shortcut.keys.key1));
    
    const isDiff = diff.length === 0;

    // temporary implementation--the 'main key' will be determined by the user upon creation
    if (isDiff) {
      
      const mainKey = _.difference(_.values(shortcut.keys.key1), mod)
      
      mainKey.length === 1 && (shortcut.keys["mainKey"] = mainKey[0])
      
      
    }
    
    return (isDiff)
  }
      ).pickBy((o)=>!_.isEmpty(o)).value()
  )
}
function objectDifference(object, base) {
	function changes(object, base) {
		return _.transform(object, function(result, value, key) {
			if (!_.isEqual(value, base[key])) {
				result[key] = (_.isObject(value) && _.isObject(base[key])) ? changes(value, base[key]) : value;
			}
		});
	}
	return changes(object, base);
}
function filteredData(combinations, data) {
  let newData = data
  let relevantMods = []
  


 
  const filteredArr = _.chain(combinations).map((mod, i) => {
   
   
    const diff = getModDifference(newData, mod)
       newData = objectDifference(newData, diff)

    if (_.isEmpty(diff)) {
      return (diff)
    }
    else {
      relevantMods.push(mod)
      return ({ [mod]: diff })
    }
  }).filter((o) => !_.isEmpty(o)).value()

  // const keyMapObject = {}
  // for (let o in filteredArr) {
  //   const key = Object.keys(filteredArr[o])
  //   const objData = filteredArr[o][key]
  //   keyMapObject[key] = objData
  // }
  // const modifierArray = _.reverse(relevantMods)

  return {keyMapObject, modifierArray}
}
function k_combinations(set, k) {
	var i, j, combs, head, tailcombs;
	
	// There is no way to take e.g. sets of 5 elements from
	// a set of 4.
	if (k > set.length || k <= 0) {
		return [];
	}
	
	// K-sized set has only one K-sized subset.
	if (k == set.length) {
		return [set];
	}
	
	// There is N 1-sized subsets in a N-sized set.
	if (k == 1) {
		combs = [];
		for (i = 0; i < set.length; i++) {
			combs.push([set[i]]);
		}
		return combs;
	}
	combs = [];
	for (i = 0; i < set.length - k + 1; i++) {
		// head is a list that includes only our current element.
		head = set.slice(i, i + 1);
		// We take smaller combinations from the subsequent elements
		tailcombs = k_combinations(set.slice(i + 1), k - 1);
		// For each (k-1)-combination we join it with the current
		// and store it to the set of k-combinations.
		for (j = 0; j < tailcombs.length; j++) {
			combs.push(head.concat(tailcombs[j]));
		}
	}
	return combs;
}
function combinations(set) {
	var k, i, combs, k_combs;
	combs = [];
	
	// Calculate all non-empty k-combinations
	for (k = 1; k <= set.length; k++) {
		k_combs = k_combinations(set, k);
		for (i = 0; i < k_combs.length; i++) {
			combs.push(k_combs[i]);
		}
	}
	return _.reverse(combs);
}
// const organizedMods = filteredData(modifierCombinations, keyTable)

// TODO: 
// account for scenario: 
//    if active mapped keys include [CTRL+C] and [CTRL+SHIFT+D],
//    activate the lowest derivative ([CTRL+C] in this case)
// single keys (having no modifiers) are on the same layer

// filter modifiers using new filtered key table---
// use the new 'relavent modifiers' list to determine which shortcut Layers
// should be active by default

// ** each layer has a unique color **
// ** no layers with common modifiers should be active at the same time **
// ** each shortcut displayed in on the key map can have only one key that are not modifiers 
//    ( which means that each shortcut is split into two portions -- [...modifiers, key] )
export function keyMapFilter(kt) {

  const modifierKeys = ["Ctrl", "Alt", "Shift", "Capslock", "Tab"]
  const singleKeys = [['0'],['1'],['2'],['3'],['4'],['5'],['6'],['7'],['8'],['9'],['A'],['B'],['C'],['D'],['E'],['F'],['G'],['H'],['I'],['J'],['K'],['L'],['M'],['N'],['O'],['P'],['Q'],['R'],['S'],['T'],['U'],['V'],['W'],['X'],['Y'],['Z']];
  const modifierCombinations = _.concat(combinations(modifierKeys), singleKeys) 
  
  // const [filteredKeyMap, relevantMods] = filteredData(modifierCombinations, kt)
  const keyMap = filteredData(modifierCombinations, kt)
  
  // const testarrUserActiveModifiers = getDefaultActiveMods(swap(relevantMods, oldLayer, newLayer), filteredKeyMap)
  const filteredKeyMap = getDefaultActiveMods(keyMap.modifierArray, keyMap.keyMapObject)
  console.log(`⭐: keyMapFilter -> keyMap.modifierArray`, keyMap.modifierArray)
  console.log(`⭐: keyMapFilter -> filteredKeyMap`, filteredKeyMap)
  setGlobalState('activeLayers', filteredKeyMap)
  
  return keyMap
}


function swap(relMods, oldActiveLayer, newActiveLayer) {
  const oldIndex = _.findIndex(relMods, (e)=> `${e}`===`${oldActiveLayer}`)
  const newIndex = _.findIndex(relMods, (e)=> `${e}`===`${newActiveLayer}`)
  const newArr = move(relMods, newIndex, oldIndex )
  return newArr
}




function getDefaultActiveMods(userModsArr, filteredKeyMap, oldLayer = null, newLayer = null) {

  
  const modifierArray = (oldLayer && newLayer) ? swap(userModsArr, oldLayer, newLayer) : userModsArr


  // const mainKeyArr = [];
  const defaultActiveMods = _.reduce(modifierArray, (result, cur,k) => {
    const resultArr = _.flatten(result.res);
    
    const mainKey = _.valuesIn(filteredKeyMap[cur])[0].keys.mainKey;
    console.log(`⭐: filteredKeyMap[cur]`, _.valuesIn(filteredKeyMap[cur]))
    console.log(`🟢🟢🟢: getDefaultActiveMods -> mainKey`, mainKey)
    const noHasKey = cur[0].length === 1 ? !(_.includes(result.mainKeyArr, cur[0])) :  (mainKey && !(_.includes(result.mainKeyArr, mainKey)) )
    

    
    

    const curArr = _.flatten(cur)
    console.log(`⭐: getDefaultActiveMods -> mainKey`, mainKey)
    const numCommonElements = _.intersection(resultArr, curArr).length
    if (!(numCommonElements > 0) && noHasKey ) {
     
      cur[0].length === 1 ? result.mainKeyArr.push(cur[0]) : result.mainKeyArr.push(mainKey) 
      // result.mainKeyArr.push(mainKey) 
      result.res.push(cur)
    }
    return result
  }, {res:[], mainKeyArr:[]})
  console.log(`⭐: getDefaultActiveMods -> defaultActiveMods`, defaultActiveMods)

  const keyMapObject = _.pickBy(filteredKeyMap, (o, key) => { 
    const arrToString = _.map(defaultActiveMods.res, (i) => i.toString())
    const isIncluded = _.includes(arrToString, key)
    return(isIncluded)
   })
    
    return {keyMapObject, modifierArray}
  

  
}

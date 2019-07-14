

import React from 'react';

import _ from 'lodash'
import { Layers } from '@material-ui/icons';




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
  return(_.chain(keyData).pickBy((shortcut) => 
      _.difference( mod, _.values(shortcut.keys.key1)).length === 0
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
      return(diff)
    }
    else {
      relevantMods.push(mod)
      return({ [mod]: diff})
    }
    // return (_.isEmpty(diff) ? diff : { [mod]: diff})
  }).filter((o) => !_.isEmpty(o)).value()

  const newObj = {}
  for (let o in filteredArr) {
    const key = Object.keys(filteredArr[o])
    const objData = filteredArr[o][key]
    newObj[key] = objData
  }

  return [newObj, _.reverse(relevantMods)]
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

// ** no layers with common modifiers should be active at the same time **
// ** each shortcut displayed in on the key map can have only one key that are not modifiers 
//    ( which means that each shortcut is split into two portions -- [...modifiers, key] )
export function keyMapFilter(kt) {


  const modifierKeys = ["Alt", "Ctrl", "Shift", "Capslock", "Tab"]
  
  
  const modifierCombinations = combinations(modifierKeys)
  const [filteredKeyMap, relevantMods] = filteredData(modifierCombinations, kt)
  

  const defaultActiveMods = getDefaultActiveMods(relevantMods)

  // console.log("⭐: keyMapFilter -> relevantMods", relevantMods)
  // console.log("⭐: keyMapFilter -> modifierCombinations", modifierCombinations)
  
  console.log("⭐: keyMapFilter -> defaultActiveMods", defaultActiveMods)
  const activeFilteredKeys = _.pick(filteredKeyMap, [...defaultActiveMods])
  console.log("🚀: keyMapFilter -> activeFilteredKeys", activeFilteredKeys)
  
 
  return filteredKeyMap
}


function getDefaultActiveMods(relMods) {
  const defaultActiveMods = _.reduce(relMods, (result, cur) => {
    if (cur.length === 1) {
      result.push(cur)
    }
    if(!( _.intersection(_.flatten(result), _.flatten(cur)).length > 0)) {
      result.push(cur)
    }
    return result
  }, [])


  return defaultActiveMods
}



import React from 'react';

import _ from 'lodash'




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
function getModDifference(keyData, mod) {
  return(_.chain(keyData).pickBy((shortcut) => 
      _.difference( mod, _.values(shortcut.keys.key1)).length === 0
      ).pickBy((o)=>!_.isEmpty(o)).value()
  )
}
function filteredData(combinations, data) {
  let newData = data
  let modArr = []
  const filteredArr = _.chain(combinations).map((mod, i) => {
    const diff = getModDifference(newData, mod)
    newData = difference(newData, diff)
    return (_.isEmpty(diff) ? diff : { [mod]: diff})
  }).filter((o) => !_.isEmpty(o)).value()

  const newObj = {}
  for (let o in filteredArr) {
    const key = Object.keys(filteredArr[o])
    const objData = filteredArr[o][key]
    newObj[key] = objData
  }
  return newObj
}
function difference(object, base) {
	function changes(object, base) {
		return _.transform(object, function(result, value, key) {
			if (!_.isEqual(value, base[key])) {
				result[key] = (_.isObject(value) && _.isObject(base[key])) ? changes(value, base[key]) : value;
			}
		});
	}
	return changes(object, base);
}

// const organizedMods = filteredData(modifierCombinations, keyTable)


export function keyMapFilter(kt) {
  const modifierKeys = ["Alt", "Ctrl", "Shift", "Capslock", "Tab"]
  console.log("⭐: Test keyTable", keyTable)
  console.log("🚀: Real keyTablet", kt)
  const modifierCombinations = combinations(modifierKeys)
  

  // console.log("🔥: keyTable", keyTable)
  console.log("🚀: keyMapFilter -> filteredData(modifierCombinations, kt)", filteredData(modifierCombinations, kt))

  return filteredData(modifierCombinations, kt)
}


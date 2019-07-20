

import React from 'react';

import _ from 'lodash'
import move from 'lodash-move'
import { Layers } from '@material-ui/icons';
import { setGlobalState } from '../../state';
import { result } from 'lodash-es';




// const keyTable = {

  
  
//   "000": {
//     categories: [""],
//     description: "",
//     keys:{ key1: ["Ctrl", "X"]}
    
//   },
//   "001": {
//     categories: [""],

//     description: "",
//     keys: { key1: ["Ctrl", 'Alt', "X"] }
    
//   },
//   "002": {
//     categories: [""],

//     description: "",
//     keys: { key1: ["Ctrl", 'Alt', "Z"] }
    
//   },
//   "003": {
//     categories: [""],

//     description: "",
//     keys: { key1: ["Ctrl", "C"] }
    
//   },
//   "004": {
//     categories: [""],
//     description: "",
//     keys: { key1: ["Shift", "B"] }
    
//   },
//   "005": {
//     categories: [""],
//     description: "",
//     keys: { key1: ["Ctrl", 'Alt', "C"] }
    
//   },
//   "006": {
//     categories: [""],
//     description: "",
//     keys: { key1: ["Tab", "C"] }
//   }
// }

function getModDifference(keyData, mod) {
  return (_.chain(keyData).pickBy((shortcut) => {
    const diff = _.difference(mod, _.values(shortcut.keys.key1));
    
    const isDiff = diff.length === 0;

    // temporary implementation--the 'main key' will be determined by the user upon creation
    // if (isDiff) {
      
    //   const mainKey = _.difference(_.values(shortcut.keys.key1), mod)
      
    //   mainKey.length === 1 && (shortcut.keys["mainKey"] = mainKey[0])
      
      
    // }
    
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
function filteredData(combinations, data, colors) {
  const singleKeyLayerColor = '#1fe3ac';
  let newData = data
  let colorIndex = 0;
  
  const filteredArr = _.chain(combinations).map((layer, i) => {
   
    
    const data = getModDifference(newData, layer)
    newData = objectDifference(newData, data)

    if (_.isEmpty(data)) {
      return (data)
    }
    else {
      const keys = _.keys(data)
      
      const diffData = _.reduce(data, (result, next) => {
        const mainKey = next.keys.key1[_.size(next.keys.key1) - 1]
        
        !_.includes(result.mainKeys, mainKey) && result.mainKeys.push(mainKey)
        
        result.keyArr.push(_.values(next.keys.key1))
        result.keyDescription.push(next.keyDescription)
        return (result)
        
        
        
      }, { keyArr: [], mainKeys: [], keyDescription: [] })
      
      const {keyArr, mainKeys, keyDescription} = diffData
      const allKeys = _.union(layer, mainKeys);
      // const keyArr = _.map(diff, (o) => {
      //   const mainKey = o.keys.key1[_.size(o.keys.key1) - 1]
      //   !_.includes(mainKeys, mainKey) && mainKeys.push(mainKey)
        
      //   return (_.values(o.keys.key1))
      // })

      
      // const color = keyArr[0].length === 1 ? colors[0] : colors[colorIndex++]
      const filteredObj = { keys, keyArr, layer, data, mainKeys, allKeys, keyDescription }
      return (filteredObj)
    }
  }).filter((o) => !_.isEmpty(o)).value();
  

  const filteredDataWithColor = _.chain(filteredArr).reverse().map(o => {
    const color = o.keyArr[0].length === 1 ? singleKeyLayerColor : colors[colorIndex++];
    return (_.extend({ color }, o))
  }).value();

  
  // return (_.reverse(filteredArr))
  return (filteredDataWithColor)
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
const modifierKeys = ["Ctrl", "Alt", "Shift", "Capslock", "Tab", "Win"]
export function initializeKeyMap(keyTable) {


  const singleKeys = [['0'],['1'],['2'],['3'],['4'],['5'],['6'],['7'],['8'],['9'],['A'],['B'],['C'],['D'],['E'],['F'],['G'],['H'],['I'],['J'],['K'],['L'],['M'],['N'],['O'],['P'],['Q'],['R'],['S'],['T'],['U'],['V'],['W'],['X'],['Y'],['Z']];
  const modifierCombinations = _.concat(combinations(modifierKeys), singleKeys) 
  
  const colorTestArr = ["1", "2", "3","4","5","6","7","8","9","10","11","12","13","14","15","16", "17","18","19","20"]
  const keyMapColors = ['#FF0B00',  '#FFE433', '#21A6FF', '#f58231', '#911eb4', '#46f0f0', '#f032e6', '#bcf60c', '#fabebe', '#008080', '#e6beff', '#9a6324', '#fffac8', '#800000', '#aaffc3', '#808000', '#ffd8b1', '#000075', '#808080'];
  const allLayers = filteredData(modifierCombinations, keyTable, keyMapColors)
  
  const { activeLayers, layerKeys} = getActiveLayers(allLayers)
 
  setGlobalState('allLayers', allLayers)
  setGlobalState('activeLayers', activeLayers)
  setGlobalState('layerKeys', layerKeys)


}


function swap(keyMap, oldActiveLayer, newActiveLayer) {

  const oldIndex = _.findIndex(keyMap, (e)=> `${e.layer}`===`${oldActiveLayer}`)
  const newIndex = _.findIndex(keyMap, (e)=> `${e.layer}`===`${newActiveLayer}`)
  const newArr = move(keyMap, newIndex, oldIndex)
  
  return newArr
}

function testswap(keyMap, newActiveLayer) {

  // const oldIndex = _.findIndex(keyMap, (e)=> `${e.layer}`===`${oldActiveLayer}`)
  const newLayerIndex = _.findIndex(keyMap, (e)=> `${e.layer}`===`${newActiveLayer}`)
  const newArr = move(keyMap, newLayerIndex, 0)
  
  return newArr
}
function swapLayerKeys(keyMap, newActiveLayer) {

  // const oldIndex = _.findIndex(keyMap, (e)=> `${e.layer}`===`${oldActiveLayer}`)
  const newLayerIndex = _.findIndex(keyMap, (e)=> `${e.keybind}`===`${newActiveLayer}`)
  const newArr = move(keyMap, newLayerIndex, 0)
  
  return newArr
}






export function getActiveLayers(filteredKeyMap,  oldLayer = null, newLayer = null) {

// const singleKeys = [['0'],['1'],['2'],['3'],['4'],['5'],['6'],['7'],['8'],['9'],['A'],['B'],['C'],['D'],['E'],['F'],['G'],['H'],['I'],['J'],['K'],['L'],['M'],['N'],['O'],['P'],['Q'],['R'],['S'],['T'],['U'],['V'],['W'],['X'],['Y'],['Z']];
  const allLayers = (oldLayer && newLayer) ? swap(filteredKeyMap, oldLayer, newLayer) : filteredKeyMap;

  let layerData = [];
  let layerKeys = [];
  let i = 0;

  const activeLayers = _.reduce(allLayers, (result, cur, index) => {
  
    // const color = keyMapColors[i];
    const allKeys = _.union(cur.layer, cur.mainKeys);
    // const numCommonElements = _.intersection(layerData, allKeys).length;
    const hasNoCommonElements = !(_.intersection(layerData, allKeys).length > 0);
    
    
    
    if (cur.keyArr[0].length !== 1) {
      layerKeys.push({ keybind: cur.layer, active: false, color: cur.color, id: i++ })
    }

    if (hasNoCommonElements) {
      layerData = _.concat(layerData, allKeys);
      if (!_.isEmpty(layerKeys) && (cur.keyArr[0].length !== 1)) {
        _.last(layerKeys).active = true;
        
      }
      

      result.push(cur)
      
    }
    
    return result
  }, []);
  
  // _.unionBy(layerKeys, {active: true, color: "#21A6FF", keybind: ["Shift"]}, "active")
  // console.log(`⭐: getActiveLayers -> _.unionBy(layerKeys, {active: true, color: "#21A6FF", keybind: ["Shift"]}, "active")`, _.unionBy([{ keybind: ["Shift"], active: false, color: "#21A6FF"  }], layerKeys, 'active'))
  
  
  
  console.log(`🚀🚀🚀🚀🚀🚀🚀🚀: getActiveLayers -> activeLayers`, activeLayers)
    return {activeLayers, layerKeys}
}





export function updateActiveLayers(filteredKeyMap, layerKeys, newLayer = null) {

// const singleKeys = [['0'],['1'],['2'],['3'],['4'],['5'],['6'],['7'],['8'],['9'],['A'],['B'],['C'],['D'],['E'],['F'],['G'],['H'],['I'],['J'],['K'],['L'],['M'],['N'],['O'],['P'],['Q'],['R'],['S'],['T'],['U'],['V'],['W'],['X'],['Y'],['Z']];
  const allLayers = newLayer && testswap(filteredKeyMap, newLayer) 
  const tempLayerKeys = newLayer && swapLayerKeys(layerKeys, newLayer) 
  


  let layerData = [];

  const reducedMap = _.reduce(allLayers, (result, cur, index) => {
    // const color = keyMapColors[i];
    const allKeys = _.union(cur.layer, cur.mainKeys);
    const numCommonElements = _.intersection(layerData, cur.allKeys).length;
    const hasNoCommonElements = !(numCommonElements > 0);
    // tempLayerKeys[index].active = false
    if (hasNoCommonElements) {
      layerData = _.concat(layerData, cur.allKeys);
      if (!_.isEmpty(tempLayerKeys) && (cur.keyArr[0].length !== 1)) {
        // _.last(layerKeys).active = true;
        const layerKey = _.find(tempLayerKeys, (o) => `${o.keybind}` === `${cur.layer}`)
        layerKey.active = true;
        
        // tempLayerKeys[index].active = true
      } 
      
      result.activeLayers.push(cur)
      
    } else{
      const layerKey = _.find(tempLayerKeys, (o) => `${o.keybind}` === `${cur.layer}`)
      layerKey && (layerKey.active = false);
      tempLayerKeys[index] && (tempLayerKeys[index].active = false);
    }
    
    return result
  }, {activeLayers:[], layerIndices: []})
  
  // console.log(`⭐AFTER: updateActiveLayers -> layerKeys`, layerKeys)
  
  // console.log(`⭐: updateActiveLayers -> tempLayerKeys`, tempLayerKeys)
  // console.log(`⭐NEW ACTIVE LAYER DATA: `, activeLayers)

  const { activeLayers, layerIndices } = reducedMap;
  const sortedLayerKeys = _.sortBy(tempLayerKeys, 'id')
  setGlobalState('layerKeys', sortedLayerKeys)
  setGlobalState('activeLayers', activeLayers)
  console.log(`🚀🚀🚀🚀🚀🚀🚀🚀: update -> activeLayers`, activeLayers)
  console.log(`🚀🚀🚀🚀🚀🚀🚀🚀: update -> layerKeys`, layerKeys)

  console.log(`----------------------------------------------------`)

  return {activeLayers, layerKeys}
}










export function updateActiveSingleLayer(filteredKeyMap, layerKeys, newLayer = null) {
  console.log(`⭐:BEFORE filteredKeyMap`, filteredKeyMap)
  console.log(`⭐BEFORE: updateActiveLayers -> layerKeys`, layerKeys)
  
  
  var newLayerKeys = _.cloneDeep(layerKeys) 

  const activeLayer = [_.find(filteredKeyMap, (o) => `${o.layer}` === `${newLayer}`)];
  
  _.forEach(newLayerKeys, (obj) => {
    if (`${obj.keybind}` === `${newLayer}`){
      
      console.log(`⭐: updateActiveSingleLayer -> true`, true)
      obj.active = true;
    } else {
      obj.active = false;
      console.log(`⭐: updateActiveSingleLayer -> false`, false)
    }
  })
  console.log(`⭐: newLayerKeys`, newLayerKeys)

  setGlobalState('layerKeys', newLayerKeys)
  setGlobalState('activeLayers', activeLayer)

  
  

  
  
}

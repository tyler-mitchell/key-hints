

import React from 'react';

import _ from 'lodash'
import move from 'lodash-move'
import { Layers } from '@material-ui/icons';
import { setGlobalState } from '../../state';
import { result } from 'lodash-es';

function getModDifference(keyData, mod) {
  return (_.chain(keyData).pickBy((shortcut) => {
    const diff = _.difference(mod, _.values(shortcut.keys.key1));
    const isDiff = diff.length === 0;
    return (isDiff)
  }).pickBy((o)=>!_.isEmpty(o)).value())
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
  
  const filteredArr = _.chain(combinations).map((layer) => {
   
    let i = 0;
    const data = getModDifference(newData, layer)
    newData = objectDifference(newData, data)

    if (_.isEmpty(data)) {
      return (data)
    }
    else {
      const keys = _.keys(data)
      
      const diffData = _.reduce(data, (result, next) => {

        const key1 = next.keys.key1;
        const mainKey = key1[_.size(key1) - 1];
        (key1[0].length === 1) ? (result.isSingleKey = true) : (result.isSingleKey = false);
        (!_.includes(result.mainKeys, mainKey)) && result.mainKeys.push(mainKey)
        
        result.keyArr.push(_.values(key1))
        result.keyDescription.push(next.keyDescription)
        return (result)
      }, { keyArr: [], mainKeys: [], keyDescription: [], isSingleKey: false })
      
      const { keyArr, mainKeys, keyDescription, isSingleKey } = diffData;
      const allKeys = _.union(layer, mainKeys);
      const filteredObj = { keys, keyArr, layer, data, mainKeys, allKeys, keyDescription, isSingleKey }
      return (filteredObj)
    }
  }).filter((o) => !_.isEmpty(o)).value();
  
  let count = 0;
  const filteredDataWithColor = _.chain(filteredArr).reverse().map((o, i) => {
    const color = o.keyArr[0].length === 1 ? singleKeyLayerColor : colors[colorIndex++];
    const index = o.isSingleKey ? null : (count++);
    return (_.extend({ color, index }, o))
  }).value();
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

export function getActiveLayers(filteredKeyMap,  oldLayer = null, newLayer = null) {

// const singleKeys = [['0'],['1'],['2'],['3'],['4'],['5'],['6'],['7'],['8'],['9'],['A'],['B'],['C'],['D'],['E'],['F'],['G'],['H'],['I'],['J'],['K'],['L'],['M'],['N'],['O'],['P'],['Q'],['R'],['S'],['T'],['U'],['V'],['W'],['X'],['Y'],['Z']];
  const allLayers = (oldLayer && newLayer) ? swap(filteredKeyMap, oldLayer, newLayer) : filteredKeyMap;

  let layerData = [];
  let layerKeys = [];
  let i = 0;

  const activeLayers = _.reduce(filteredKeyMap, (result, cur, index) => {
  
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





export function updateActiveLayers(filteredKeyMap, newLayer = null) {
  const allLayers = newLayer && testswap(filteredKeyMap, newLayer) 
  const reducedMap = _.reduce(allLayers, (result, cur, index) => {

    const hasNoCommonElements = !(_.intersection(result.layerData, cur.allKeys).length > 0);

    if (hasNoCommonElements) {
      result.layerData.push(...cur.allKeys);
      if (!cur.isSingleKey) {
        result.layerIndices.add(cur.index)
      } 
      result.activeLayers.push(cur)
    } 
    return result
  }, {activeLayers:[], layerIndices: new Set([]), layerData: []})
  
  
  const { activeLayers, layerIndices} = reducedMap;

  return {layerIndices, activeLayers}
}










export function updateActiveSingleLayer(filteredKeyMap, layerKeys, index = null) {
  console.log(`⭐:BEFORE filteredKeyMap`, filteredKeyMap)
  console.log(`⭐BEFORE: updateActiveLayers -> layerKeys`, layerKeys)
  const activeLayer = [_.find(filteredKeyMap, (o) => o.index === index)];
  setGlobalState('activeLayers', activeLayer)

  
  

  
  
}

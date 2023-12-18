import { nanoid } from 'nanoid';
// nanoid(10) 生成 10 位的随机id

/**
 * 简单深拷贝
 * 无法拷贝：函数（带有闭包）、Symbol、在 HTML DOM API 中表示 HTML 元素的对象、递归数据以及许多其他情况
 * @param {Object} obj
 * @returns {Object}
 */
export function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

/**
 * 设置默认的自定义药品列表
 */
export function setDrugList(nub = 10) {
  const newList = new Array(nub).fill(0).map((val, index) => {
    return {
      id: nanoid(10),
      name: `测试药品${index + 1}`,
      volume: index * 10,
      weight: index * 10,
      dose: 'std',
      unitsVol: 'ml',
      unitsWt: 'g',
    };
  });
  saveDrugLStorage(newList);
}

/**
 * 保存自定义药品数据
 * @param {Array} drugList 自定义药品数据
 * @returns
 */
export function saveDrugLStorage(drugList) {
  if (drugList == null) {
    return;
  }
  const drugListStr = JSON.stringify(drugList);
  window.localStorage.setItem('DrugList', drugListStr);
}

/**
 * 获取自定义药品数据
 * @returns {Array} drugList
 */
export function getDrugLStorage() {
  const drugListStr = window.localStorage.getItem('DrugList');

  if (drugListStr == null) {
    return [];
  } else {
    return JSON.parse(drugListStr);
  }
}

/**
 * 获取自定义药品数据字符串
 * @returns {String} drugListStr
 */
export function getDrugLStorageStr() {
  const str = window.localStorage.getItem('DrugList');
  return str === '[]' ? null : str;
}

export function clearDrugLStorage() {
  window.localStorage.removeItem('DrugList');
}

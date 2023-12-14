/**
 * 简单深拷贝
 * 无法拷贝：函数（带有闭包）、Symbol、在 HTML DOM API 中表示 HTML 元素的对象、递归数据以及许多其他情况
 * @param {Object} obj
 * @returns {Object}
 */
export function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

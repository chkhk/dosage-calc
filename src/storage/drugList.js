/**
 * 药物信息
 * 默认单位：
 * volume: ml; weight: g
 * dose: std: 标准剂量/g  sm: 小剂量/mg
 */
export const drugList = {
  drug0: {
    value: 'drug0',
    name: '小儿氨基酸',
    volume: 20,
    weight: 1.2,
    dose: 'std',
    unitsVol: 'ml',
    unitsWt: 'g',
  },
  drug1: {
    value: 'drug1',
    name: '安定',
    volume: 2,
    weight: 10,
    dose: 'sm',
    unitsVol: 'ml',
    unitsWt: 'mg',
  },
  *[Symbol.iterator]() {
    const keys = Object.keys(this);
    for (let i = 0; i < keys.length; i++) {
      yield this[keys[i]];
    }
  },
};

export const drugCalc = {
  calc0: {
    value: 'calc0',
    name: '安定',
    bodyWt: 1,
    minWt: 0.3,
    maxWt: 0.5,
    dose: '小剂量',
    unitsBdWt: 'kg',
    unitsWt: 'mg',
  },
};

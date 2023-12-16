/**
 * 药物信息
 * 默认单位：
 * volume: ml; weight: g
 * dose: std: 标准剂量/g  sm: 小剂量/mg
 */
export const drugList = [
  {
    id: 'drug0',
    name: '小儿氨基酸',
    volume: 20,
    weight: 1.2,
    dose: 'std',
    unitsVol: 'ml',
    unitsWt: 'g',
  },
  {
    id: 'drug1',
    name: '安定',
    volume: 2,
    weight: 10,
    dose: 'sm',
    unitsVol: 'ml',
    unitsWt: 'mg',
  },
];

// 根据病人体重计算药量
export const drugCalc = [
  {
    id: 'drug1',
    name: '安定',
    volume: 2,
    weight: 10,
    dose: 'sm',
    unitsVol: 'ml',
    unitsWt: 'mg',
    rangeMin: 0.3,
    rangeMax: 0.5,
    drugWtUnits: 'mg',
    bodyWtUnits: 'kg',
  },
];

// 剂量类型标签颜色和内容
export const doseTypeData = {
  std: {
    label: '单位 g',
    theme: 'default',
  },
  sm: {
    label: '单位 mg',
    theme: 'warning',
  },
};

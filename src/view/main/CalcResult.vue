<template>
  <t-cell-group>
    <t-cell class="drug-title">
      <template #title>
        <span>结果</span>
        <span class="other-tips">（保留4位小数）</span>
        <span>&#9759;</span>
      </template>
    </t-cell>
    <t-cell>
      <template #title>
        <h2 class="calc-result"><code v-html="calcResultStr"></code></h2>
      </template>
    </t-cell>
  </t-cell-group>

  <t-divider />

  <t-cell-group>
    <t-cell class="drug-title">
      <template #title>
        <div class="f-c"><Functions1Icon />&nbsp;计算过程 &#9759;</div>
      </template>
    </t-cell>
    <t-cell>
      <template #title>
        <code v-html="calcProcessStr"></code>
      </template>
    </t-cell>
  </t-cell-group>
</template>

<script setup>
import { Functions1Icon } from 'tdesign-icons-vue-next';
import { Decimal } from 'decimal.js';

const props = defineProps({
  drugData: [Object],
  weight: [String, Number],
});

watch(
  props,
  () => {
    console.log(props.weight, props.drugData);
    genCalcResult(props.weight, props.drugData);
  },
  { deep: true }
);

// 计算过程字符串
const calcProcessStr = ref('&nbsp;');
// 计算结果
const calcResultStr = ref('&nbsp;');

/**
 * 生成计算结果
 * @param {(String|Number)} w 输入的重量
 * @param {Object} drugInfo 当前计算的药物信息
 */
function genCalcResult(w, drugInfo) {
  if (w == null || [0, '', '0', '0.'].indexOf(w) > -1) {
    calcProcessStr.value = '&nbsp;';
    calcResultStr.value = '&nbsp;';
    return;
  }

  let originVol = new Decimal(drugInfo.volume);
  let originWgt = new Decimal(drugInfo.weight);
  let newWgt = new Decimal(w);
  const nub = Decimal.div(Decimal.mul(originVol, newWgt), originWgt).toDP(
    4,
    Decimal.ROUND_DOWN
  );

  const unV = drugInfo.unitsVol;
  const unW = drugInfo.unitsWt;

  calcResultStr.value = nub + unV;
  calcProcessStr.value = `${originVol}${unV} × ${newWgt}${unW} ÷ ${originWgt}${unW} = ${nub}${unV}`;
}
</script>

<style lang="less" scoped>
.other-tips {
  font-size: smaller;
  font-style: italic;
  color: gray;
}

.calc-result {
  font-size: x-large;
  text-align: center;
}
</style>

<template>
  <main>
    <t-tabs :value="tabsValue" @change="tabsChange">
      <t-tab-panel :value="0">
        <template #label>
          <div>计算</div>
        </template>

        <SelectDrug v-model="currentDrugData" />

        <t-divider />

        <InputWeight
          :currentDrugUnits="currentDrugData.unitsWt"
          @weightChange="weightChange"
        />

        <t-divider />

        <CalcResult :drugData="currentDrugData" :weight="weightInput" />
      </t-tab-panel>
      <t-tab-panel :value="1">
        <template #label>
          <div>药品库</div>
        </template>

        <DrugStore @drugStoreChange="drugStoreChange" />
      </t-tab-panel>
    </t-tabs>
  </main>
</template>

<script setup>
import SelectDrug from './SelectDrug.vue';
import InputWeight from './InputWeight.vue';
import DrugStore from './DrugStore.vue';
import CalcResult from './CalcResult.vue';
import { drugList } from '@/storage/drugList.js';
import { deepClone } from '@/utils/utils';

// 选择的选项卡（计算，药品库）
const tabsValue = ref(0);
// 选择选项卡时
function tabsChange(tabVal) {
  tabsValue.value = tabVal;
}
/* todo： 选择框不能同步是因为元数据不一致 */

// 选择药物数据
const currentDrugData = reactive(deepClone(drugList[0]));
watch(currentDrugData, () => {
  console.log(currentDrugData.value);
});

// 输入重量
let weightInput = ref(0);
function weightChange(w) {
  weightInput.value = w;
}

// 选中药品库数据时跳转过来
function drugStoreChange(drugVal) {
  Object.assign(currentDrugData, drugVal);
  tabsValue.value = 0;
}
</script>

<style lang="less" scoped>
main {
  .t-divider {
    margin-top: 5px;
    margin-bottom: 5px;
  }
  :deep(.drug-title) {
    font-weight: bold;
  }
}
</style>

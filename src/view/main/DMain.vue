<template>
  <main>
    <t-tabs :swipeable="false" :value="tabsValue" @change="tabsChange">
      <t-tab-panel :value="0">
        <template #label>
          <div>计算</div>
        </template>

        <SelectDrug v-model="currentDrugData" :allDrugList="allDrugList" />

        <t-divider />

        <InputWeight
          ref="InputWeightRef"
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

        <DrugStore
          :defaultDrugList="defaultDrugList"
          :customDrugList="customDrugList"
          @refetchAllDrugList="refetchAllDrugList"
          @drugStoreChange="drugStoreChange"
        />
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
import { deepClone, setDrugList, getDrugLStorage } from '@/utils/utils';

setDrugList();

// 选择的选项卡（计算，药品库）
const tabsValue = ref(1);
// 选择选项卡时
function tabsChange(tabVal) {
  tabsValue.value = tabVal;
}
/* todo： 选择框不能同步是因为元数据不一致 */

// 初始默认的药品数据
const defaultDrugList = getDefaultDrugList();
function getDefaultDrugList() {
  return formatDrugList(drugList, true);
}

// 初始自定义的药品数据
const customDrugList = reactive(getCustomDrugList());
function getCustomDrugList() {
  return formatDrugList(getDrugLStorage(), false);
}

// 所有药品数据
const allDrugList = reactive([...defaultDrugList, ...customDrugList]);
console.log('allDrugList', allDrugList);

// 编辑数据后刷新所有药品数据
function refetchAllDrugList() {
  const cList = getCustomDrugList();
  customDrugList.splice(0, customDrugList.length, ...cList);
  allDrugList.splice(0, allDrugList.length, ...defaultDrugList, ...cList);
  Object.assign(currentDrugData, deepClone(defaultDrugList[0]));
  InputWeightRef.value.clearWeight();
}

// 格式化药物数据
function formatDrugList(arr, clone) {
  const newArr = clone ? deepClone(arr) : arr;
  return newArr.map((item) => {
    if (item.label != null) {
      return item;
    } else {
      item.value = item.id;
      item.label =
        item.name +
        ' ' +
        item.volume +
        item.unitsVol +
        ' ' +
        item.weight +
        item.unitsWt;
      return item;
    }
  });
}

// 选择药物数据
const currentDrugData = reactive(deepClone(defaultDrugList[0]));
watch(currentDrugData, () => {
  console.log('changeDrug', currentDrugData);
});

// 输入组件
const InputWeightRef = ref(null);
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

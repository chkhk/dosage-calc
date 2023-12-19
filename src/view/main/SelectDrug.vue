<template>
  <t-cell-group>
    <t-cell class="drug-title">
      <template #title>
        <span>选择要计算的药品 &#9759;</span>
      </template>
    </t-cell>
    <t-cell
      arrow
      :title="props.modelValue.name"
      :hover="true"
      @click="drugPickerShow = true"
    >
      <t-tag
        :theme="doseTypeData[props.modelValue.dose].theme"
        variant="outline"
        shape="round"
      >
        <code>
          {{ doseTypeData[props.modelValue.dose].label }}
        </code>
      </t-tag>
      <t-tag variant="outline" shape="round" style="margin-left: 10px">
        <code>
          {{ props.modelValue.volume }} {{ props.modelValue.unitsVol }} |
          {{ props.modelValue.weight }} {{ props.modelValue.unitsWt }}
        </code>
      </t-tag>
    </t-cell>
  </t-cell-group>

  <t-popup v-if="drugPickerIf" v-model="drugPickerShow" placement="bottom">
    <t-picker
      title="选择药品"
      :columns="drugPickerColumns"
      :value="changeValue"
      @cancel="() => (drugPickerShow = false)"
      @confirm="onConfirm"
    />
  </t-popup>
</template>

<script setup>
import { doseTypeData } from '@/storage/drugList.js';

defineExpose({
  resetPickerDom,
});

const props = defineProps({
  modelValue: Object,
  allDrugList: Array,
});

// 显示选择器
const drugPickerShow = ref(false);

// 保存标识
let saveState = false;
// 刷新标识
const resetData = ref(false);

const changeValue = computed(() => {
  return resetData.value ? ['drug0'] : [props.modelValue.value];
});

// 每次取消选择时，重新选择当前药品
watch(drugPickerShow, (val) => {
  if (val) {
    saveState = false;
  } else {
    if (!saveState) {
      resetData.value = true;
      nextTick(() => {
        resetData.value = false;
      });
    }
  }
});

// 设置显示的字段
function drugPickerColumns() {
  const arr = [props.allDrugList];
  return arr;
}

// 确认选择时
function onConfirm(val, content) {
  Object.assign(props.modelValue, props.allDrugList[content.index[0]]);
  saveState = true;
  drugPickerShow.value = false;
}

// 重置 dom，因为数据列表删除时最下面的空白行也能选中
const drugPickerIf = ref(true);
function resetPickerDom() {
  drugPickerIf.value = false;
  nextTick(() => {
    drugPickerIf.value = true;
  });
}
</script>

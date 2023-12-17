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

  <t-popup v-model="drugPickerShow" placement="bottom">
    <t-picker
      title="选择药品"
      :columns="drugPickerColumns"
      :value="changeValue"
      @cancel="drugPickerShow = false"
      @confirm="onConfirm"
    />
  </t-popup>
</template>

<script setup>
import { drugList, doseTypeData } from '@/storage/drugList.js';
import { deepClone } from '@/utils/utils';

const props = defineProps({
  modelValue: Object,
  allDrugList: Array,
});

const emit = defineEmits(['update:modelValue']);

const changeValue = computed(() => {
  const val = [props.modelValue.value];
  return val;
});

// 显示选择器
const drugPickerShow = ref(false);

// 设置显示的字段
function drugPickerColumns() {
  const arr = [props.allDrugList];
  return arr;
}

function onConfirm(val, content) {
  Object.assign(props.modelValue, props.allDrugList[content.index[0]]);
  drugPickerShow.value = false;
}
</script>

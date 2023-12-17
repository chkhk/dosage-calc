<template>
  <t-cell-group>
    <t-cell class="drug-title">
      <template #title>
        <span>输入重量 &#9759;</span>
      </template>
    </t-cell>
    <t-cell>
      <t-input
        v-model="weightInput"
        borderless
        label="克重"
        placeholder="在这里输入（0 ~ 1000）"
        :clearable="true"
        type="number"
        min="0"
        max="1000"
        class="weight-input"
      >
        <template #suffix>
          <code>{{ props.currentDrugUnits }}</code>
        </template>
      </t-input>
    </t-cell>
  </t-cell-group>
</template>

<script setup>
// 暴露出去的方法
defineExpose({
  clearWeight,
});

const props = defineProps({
  currentDrugUnits: {
    type: String,
    required: true,
  },
});

// 数据变更时通知父组件
const emit = defineEmits(['weightChange']);

// 缓存的重量
let weight = ref(null);
// 输入的重量
const weightInput = computed({
  set(val) {
    let valFormat = val.replace(/^0+(?=[1-9]|0\.)/g, '');
    let nub;
    if (valFormat < 0) {
      nub = 0;
    } else if (valFormat > 1000) {
      nub = 1000;
    } else {
      nub = valFormat;
    }
    emit('weightChange', nub);
    weight.value = nub;
  },
  get() {
    return weight.value;
  },
});

// 清空输入框
function clearWeight() {
  weightInput.value = '';
}
</script>

<style lang="less" scoped>
.weight-input {
  --td-input-vertical-padding: 0;
}
</style>

<template>
  <t-cell-group>
    <t-cell class="drug-title">
      <template #title>
        <span>输入重量 &#9759;</span>
      </template>
    </t-cell>
    <t-cell>
      <t-input
        v-model="weightNumber"
        borderless
        label="克重"
        placeholder="在这里输入（0g ~ 100g）"
        :clearable="true"
        :tips="weightNumber * 1000 + 'mg'"
        type="number"
        min="0"
        max="100"
        class="weight-input"
      >
        <template #suffix>
          <code>g</code>
        </template>
      </t-input>
    </t-cell>
  </t-cell-group>
</template>

<script setup></script>

<style lang="less" scoped></style>

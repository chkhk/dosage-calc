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
        <h2 class="calc-result"><code v-html="calcResult"></code></h2>
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
        <code v-html="calcStr"></code>
      </template>
    </t-cell>
  </t-cell-group>
</template>

<script setup></script>

<style lang="less" scoped></style>

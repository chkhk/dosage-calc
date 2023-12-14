<template>
  <t-cell-group>
    <t-cell class="drug-title">
      <template #title>
        <span>选择要计算的药品 &#9759;</span>
      </template>
    </t-cell>
    <t-cell
      arrow
      :title="changeDrugInfo.name"
      :hover="true"
      @click="drugPopupShow = true"
    >
      <t-tag variant="outline" shape="round">
        <code
          >{{ changeDrugInfo.volume }} ml | {{ changeDrugInfo.weight }} g</code
        >
      </t-tag>
    </t-cell>
  </t-cell-group>

  <t-popup v-model="drugPopupShow" placement="bottom">
    <t-picker
      title="选择药品"
      :columns="popupDrugInfo"
      :defaultValue="defaultDrugValue"
      @cancel="drugPopupShow = false"
      @confirm="onConfirm"
    />
  </t-popup>
</template>

<script setup></script>

<style lang="less" scoped></style>

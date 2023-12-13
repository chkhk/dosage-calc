<template>
  <t-navbar :fixed="false">
    <template #left>
      <Calculation1Icon size="large" />
      <h2>&nbsp;剂量快速计算</h2>
    </template>
    <template #right>
      <SunnyIcon
        v-if="themeMode === 'light'"
        size="24px"
        @click="changeThemeMode"
      />
      <MoonIcon
        v-else-if="themeMode === 'dark'"
        size="24px"
        @click="changeThemeMode"
      />
    </template>
  </t-navbar>
</template>

<script setup>
import { SunnyIcon, MoonIcon, Calculation1Icon } from 'tdesign-icons-vue-next';

const themeMode = ref('light');
// 设置主题模式
document.documentElement.setAttribute('theme-mode', 'light');
function changeThemeMode() {
  if (themeMode.value === 'light') {
    themeMode.value = 'dark';
    document.documentElement.setAttribute('theme-mode', 'dark');
  } else {
    themeMode.value = 'light';
    document.documentElement.setAttribute('theme-mode', 'light');
  }
}
</script>

<style lang="less" scoped></style>

<template>
  <t-navbar :fixed="false">
    <template #left>
      <Calculation1Icon size="large" />
      <h2>&nbsp;药品剂量快速计算</h2>
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
      <MenuUnfoldIcon
        size="24px"
        style="margin-left: 10px"
        @click="menuVisible = !menuVisible"
      />
    </template>
  </t-navbar>
  <t-drawer
    v-model:visible="menuVisible"
    :items="menuInfo"
    @item-click="menuClick"
  >
    <template #title>
      <div class="f-c">
        <h2>功能列表</h2>
        <t-button variant="outline" size="small" @click="menuVisible = false">
          关闭
        </t-button>
      </div>
    </template>
  </t-drawer>
</template>

<script setup>
import {
  SunnyIcon,
  MoonIcon,
  Calculation1Icon,
  MenuUnfoldIcon,
} from 'tdesign-icons-vue-next';

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

// 侧边栏信息
const menuInfo = ref([
  {
    title: '将克重转换为毫升',
  },
  {
    title: '根据体重计算药量',
  },
]);
// 侧边栏状态
const menuVisible = ref(false);
// 侧边栏事件
// eslint-disable-next-line no-unused-vars
const menuClick = (index, info, e) => {
  console.dir(info);
  menuVisible.value = false;
};
</script>

<style lang="less" scoped>
.f-c {
  justify-content: space-between;
}
</style>

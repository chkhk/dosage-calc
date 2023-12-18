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
        v-if="true"
        size="24px"
        style="margin-left: 15px"
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
        <h2>功能</h2>
        <t-button variant="outline" size="small" @click="menuVisible = false">
          关闭
        </t-button>
      </div>
    </template>
  </t-drawer>

  <!-- 删除提示 -->
  <t-dialog
    v-model:visible="delTipShow"
    :closeOnOverlayClick="true"
    content="删除后就无法找回，是否继续删除？"
    cancel-btn="取消"
    confirm-btn="确认"
    @confirm="onConfirmDel"
  >
  </t-dialog>
</template>

<script setup>
import {
  SunnyIcon,
  MoonIcon,
  Calculation1Icon,
  MenuUnfoldIcon,
} from 'tdesign-icons-vue-next';
import { Toast } from 'tdesign-mobile-vue';
import { getDrugLStorageStr, clearDrugLStorage } from '@/utils/utils';

const emit = defineEmits(['clear']);

const themeLS = localStorage.getItem('DrugThemeMode');
const themeMode = ref(themeLS || 'light');
// 设置主题模式
document.documentElement.setAttribute('theme-mode', themeMode.value);
function changeThemeMode() {
  if (themeMode.value === 'light') {
    themeMode.value = 'dark';
    document.documentElement.setAttribute('theme-mode', 'dark');
    localStorage.setItem('DrugThemeMode', 'dark');
  } else {
    themeMode.value = 'light';
    document.documentElement.setAttribute('theme-mode', 'light');
    localStorage.setItem('DrugThemeMode', 'light');
  }
}

// 侧边栏信息
const menuInfo = ref([
  /*   {
    title: '药品克重转换毫升',
  },
  {
    title: '根据体重计算剂量(暂未实现)',
  }, */
  {
    title: '删除所有自定义药品',
  },
  {
    title: '复制自定义药品信息',
  },
]);
// 侧边栏状态
const menuVisible = ref(false);
// 侧边栏事件
// eslint-disable-next-line no-unused-vars
const menuClick = (index, info, e) => {
  switch (index) {
    case 0:
      clearDrug();
      break;
    case 1:
      copyDrugStr();
      break;
  }
  menuVisible.value = false;
};

const delTipShow = ref(false);
/**
 * 清除所有自定义药品数据
 */
function clearDrug() {
  delTipShow.value = true;
}
function onConfirmDel() {
  clearDrugLStorage();
  Toast('删除成功');
  emit('clear');
}

/**
 * 复制药品信息
 */
function copyDrugStr() {
  let str = getDrugLStorageStr();
  if (str == null) return;
  str = str.replace(/\[|\]/g, '');
  const theClipboard = navigator.clipboard;
  if (!theClipboard) {
    Toast('浏览器不支持一键复制');
    return;
  }
  theClipboard
    .writeText(str)
    .then(() => {
      Toast('已复制到剪贴板');
    })
    .catch(() => {
      Toast('复制失败');
    });
}
</script>

<style lang="less" scoped>
.f-c {
  justify-content: space-between;
}
</style>

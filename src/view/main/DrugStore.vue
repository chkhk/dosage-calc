<template>
  <!-- 添加按钮 -->
  <t-fab text="添加药品" @click="addDrug">
    <template #icon>
      <AddIcon />
    </template>
  </t-fab>
  <t-fab :style="'left: 16px; bottom: 32px'" @click="tipShow = true">
    <template #icon>
      <ErrorIcon />
    </template>
  </t-fab>

  <!-- 提醒 -->
  <t-dialog
    v-model:visible="tipShow"
    title="注意"
    confirm-btn="知道了"
    :close-on-overlay-click="true"
  >
    <p>
      切换浏览器或清理缓存将会失去所有自定义的药品信息。如需添加到默认列表请联系管理员。
    </p>
  </t-dialog>

  <!-- 删除提示 -->
  <t-dialog
    v-model:visible="delTipShow"
    :content="delTipText"
    cancel-btn="取消"
    confirm-btn="确认"
    @confirm="onConfirmDel"
    @cancel="onCancelDel"
  >
  </t-dialog>

  <t-divider align="left">
    <template #content>
      <div>
        <span>自定义药品(</span>
        <GestureLeftSlipIcon />
        <span> 向左滑动进行编辑)</span>
      </div>
    </template>
  </t-divider>
  <div>
    <t-swipe-cell
      v-for="item in props.customDrugList"
      :key="item.id"
      :right="swipeMenuList"
      @click="clickDrugMenu(item, $event)"
    >
      <t-cell hover @click="changeDrugItem(item)">
        <template #title>
          <div>
            <span style="margin-right: 15px">{{ item.name }}</span>
            <t-tag
              :theme="doseTypeData[item.dose].theme"
              variant="outline"
              shape="mark"
            >
              <code>
                {{ item.volume }} {{ item.unitsVol }} | {{ item.weight }}
                {{ item.unitsWt }}
              </code>
            </t-tag>
          </div>
        </template>
      </t-cell>
    </t-swipe-cell>
  </div>

  <t-divider content="默认药品(不可编辑)" align="left" />

  <div>
    <t-cell-group>
      <t-cell
        hover
        v-for="item in props.defaultDrugList"
        :key="item.id"
        @click="changeDrugItem(item)"
      >
        <template #title>
          <div>
            <span style="margin-right: 15px">{{ item.name }}</span>
            <t-tag
              :theme="doseTypeData[item.dose].theme"
              variant="outline"
              shape="mark"
            >
              <code>
                {{ item.volume }} {{ item.unitsVol }} | {{ item.weight }}
                {{ item.unitsWt }}
              </code>
            </t-tag>
          </div>
        </template>
      </t-cell>
    </t-cell-group>
  </div>

  <EditDrug
    v-model="formShow"
    :formTitle="formTitle"
    :editFormData="editFormData"
    :editFormDataIndex="editFormDataIndex"
  />
</template>

<script setup>
import { Toast } from 'tdesign-mobile-vue';
import EditDrug from './EditDrug.vue';
import { doseTypeData } from '@/storage/drugList.js';
import {
  AddIcon,
  ErrorIcon,
  GestureLeftSlipIcon,
} from 'tdesign-icons-vue-next';
import { deepClone, saveDrugLStorage } from '@/utils/utils';

const props = defineProps({
  defaultDrugList: Array,
  customDrugList: Array,
});

const emit = defineEmits(['drugStoreChange', 'refetchAllDrugList']);

// 提醒弹窗
const tipShow = ref(false);

// 选择药品直接进入计算界面
function changeDrugItem(item) {
  emit('drugStoreChange', item);
}

// 滑动时的菜单数据
const swipeMenuList = [
  { text: '编辑', className: 'cell-edit edit-btn' },
  {
    text: '删除',
    className: 'cell-edit delete-btn',
  },
];

// 当前操作的数据下标
const currentEditIndex = ref(null);
// 删除提示框
const delTipShow = ref(false);
// 删除提示文字
const delTipText = ref('');
// 点击自定义药品菜单
function clickDrugMenu(item, e) {
  // 查找 index
  let index;
  for (let i = 0; i < props.customDrugList.length; i++) {
    if (props.customDrugList[i].id === item.id) {
      index = i;
      break;
    }
  }
  console.log('等待操作的药品序号：', index);
  if (e.action.text === '编辑') {
    editDrug(index);
  } else if (e.action.text === '删除') {
    delTipText.value = `确定要删除 ${props.customDrugList[index].name} 吗?`;
    currentEditIndex.value = index;
    delTipShow.value = true;
  }
}
// 删除时确认操作
function onCancelDel() {
  delTipText.value = '';
  currentEditIndex.value = null;
}
function onConfirmDel() {
  deleteDrug(currentEditIndex.value);
}

// 是否显示表单
const formShow = ref(false);
// 标题
const formTitle = ref('');
// 编辑 form 数据
const editFormData = ref(null);
// 编辑 form 数据的下标
const editFormDataIndex = ref(null);

// 新增药品
function addDrug() {
  formTitle.value = '新增药品';
  editFormData.value = null;
  editFormDataIndex.value = null;
  formShow.value = true;
}

// 编辑自定义药品
function editDrug(index) {
  formTitle.value = '编辑药品信息';
  const originArr = toRefs(props.customDrugList);
  editFormDataIndex.value = index;
  editFormData.value = deepClone(originArr[index].value);
  formShow.value = true;
}

// 删除自定义药品
function deleteDrug(index) {
  const originArr = toRefs(props.customDrugList);
  originArr.splice(index, 1);
  let newArr = [];
  if (originArr.length > 0) {
    newArr = originArr.map((item) => {
      return item.value;
    });
  }
  saveDrugLStorage(newArr);
  emit('refetchAllDrugList');
  Toast({
    theme: 'success',
    direction: 'column',
    message: '删除成功',
  });
}
</script>

<style lang="less" scoped>
:deep(.cell-edit) {
  color: #fff;

  &.edit-btn,
  &.delete-btn {
    z-index: 10;
  }
  &.edit-btn {
    background-color: var(--td-warning-color-4, #ed7b2f);
  }
  &.delete-btn {
    background-color: var(--td-error-color-4, #e34d59);
  }
}
</style>

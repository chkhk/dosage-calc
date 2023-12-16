<template>
  <t-fab text="添加药品" @click="editFormShow = true">
    <template #icon>
      <AddIcon />
    </template>
  </t-fab>
  <t-fab :style="'left: 16px; bottom: 32px'" @click="tipShow = true">
    <template #icon>
      <ErrorIcon />
    </template>
  </t-fab>

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

  <t-divider content="自定义(左滑编辑)" align="left" />
  <div>
    <!-- 
    <t-cell
      arrow
      :title="currentDrugData.name"
      :hover="true"
      @click="drugPickerShow = true"
    >
      <t-tag
        :theme="doseTypeData[currentDrugData.dose]theme"
        variant="outline"
        shape="round"
      >
        <code>
          {{ doseTypeData[currentDrugData.dose]label }}
        </code>
      </t-tag>
      <t-tag variant="outline" shape="round" style="margin-left: 10px">
        <code>
          {{ currentDrugData.volume }} {{ currentDrugData.unitsVol }} |
          {{ currentDrugData.weight }} {{ currentDrugData.unitsWt }}
        </code>
      </t-tag>
    </t-cell> -->
  </div>

  <t-divider content="默认(不可编辑)" align="left" />

  <div>
    <t-cell-group>
      <t-cell
        hover
        v-for="(item, index) in drugList"
        :key="item.id"
        @click="
          () => {
            changeDefDrug(index);
          }
        "
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

  <EditDrug v-model="editFormShow" />
</template>

<script setup>
import EditDrug from './EditDrug.vue';
import { drugList, doseTypeData } from '@/storage/drugList.js';
import { AddIcon, ErrorIcon } from 'tdesign-icons-vue-next';

const emit = defineEmits(['drugStoreChange']);

// 提醒弹窗
const tipShow = ref(false);
// 新增form
const editFormShow = ref(false);

function changeDefDrug(index) {
  emit('drugStoreChange', drugList[index]);
}
</script>

<style lang="less" scoped></style>

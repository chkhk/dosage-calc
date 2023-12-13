<template>
  <main>
    <t-divider />

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
            >{{ changeDrugInfo.volume }} ml |
            {{ changeDrugInfo.weight }} g</code
          >
        </t-tag>
      </t-cell>
    </t-cell-group>

    <t-divider />

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

    <t-divider />

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

    <t-divider />

    <t-collapse
      :value="collapseValues"
      @change="handleChange"
      style="margin-top: 30px"
    >
      <t-collapse-panel
        :value="1"
        :header-right-content="collapseValues.includes(1) ? '收起' : '展开'"
      >
        <template #header>
          <div>{{ formTitle }}</div>
        </template>
        <div>
          <t-form
            ref="form"
            :data="formData"
            :rules="rules"
            reset-type="initial"
            :show-error-message="true"
            label-align="left"
            @submit="onSubmit"
          >
            <t-form-item label="名称" name="name" class="d-form-item">
              <t-input
                v-model="formData.name"
                borderless
                placeholder="10个字以内"
                :clearable="true"
              ></t-input>
            </t-form-item>
            <t-form-item label="容积" name="volume" class="d-form-item">
              <t-input
                v-model="formData.volume"
                borderless
                placeholder="0 ~ 1000"
                :clearable="true"
                type="number"
                min="0"
                max="1000"
              >
                <template #suffix>
                  <code>ml</code>
                </template>
              </t-input>
            </t-form-item>
            <t-form-item label="重量" name="weight" class="d-form-item">
              <t-input
                v-model="formData.weight"
                borderless
                placeholder="0 ~ 100"
                :clearable="true"
                type="number"
                min="0"
                max="100"
              >
                <template #suffix>
                  <code>g</code>
                </template>
              </t-input>
            </t-form-item>

            <div class="button-group">
              <t-button theme="light" type="submit"> 提交 </t-button>
              <t-button theme="default" type="reset"> 重置 </t-button>
            </div>
          </t-form>
        </div>
      </t-collapse-panel>
      <t-collapse-panel
        :value="2"
        :header-right-content="collapseValues.includes(2) ? '收起' : '展开'"
      >
        <template #header>
          <div>向左滑动要编辑的药品</div>
        </template>
        <div>
          此处可自定义内容此处可自定义内容此处可自定义内容此处可自定义内容此处可自定义内容此处可自定义内容此处可自定义内容此处可自定义内容此处可自定义内容此处可自定义内容此处可自定义内容此处可自定义内容此处可自定义内容此处可自定义内容可自定义内容
        </div>
      </t-collapse-panel>
    </t-collapse>

    <t-divider
      content="自定义的数据清除缓存后会丢失"
      style="margin-top: 30px"
    />

    <t-popup v-model="drugPopupShow" placement="bottom">
      <t-picker
        title="选择药品"
        :columns="popupDrugInfo"
        :defaultValue="defaultDrugValue"
        @cancel="drugPopupShow = false"
        @confirm="onConfirm"
      />
    </t-popup>

    <t-message
      :visible="addMsgVisible"
      theme="success"
      :offset="[20, 16]"
      content="添加成功！"
    />
  </main>
</template>

<!-- eslint-disable no-unused-vars -->
<script setup>
import { Functions1Icon } from 'tdesign-icons-vue-next';
import { Decimal } from 'decimal.js';
import { nanoid } from 'nanoid';
// nanoid(10) 生成 10 位的随机数
import { drugList } from '@/storage/drugList.js';

// 显示选择器
const drugPopupShow = ref(false);
// 选择器数据
const popupDrugInfo = [generatePopupData(drugList)];

// 生成选择器数据
function generatePopupData(data) {
  const arr = [];
  for (const key in data) {
    const i = data[key];
    arr.push({ label: i.name + ' ' + i.volume + 'ml', value: key });
  }
  return arr;
}

// 选择器当前默认选择的药物id
const defaultDrugValue = reactive([popupDrugInfo[0][0].value]);

// 已选中的药物数据
const changeDrugInfo = reactive(drugList[defaultDrugValue[0]]);

// 输入的重量
const weight = ref('');
// 计算过程字符串
const calcStr = ref('&nbsp;');
// 计算结果
const calcResult = ref('&nbsp;');

// 输入的重量
const weightNumber = computed({
  set(val) {
    let valFormat = val.replace(/^0+(?=[1-9]|0\.)/g, '');
    let nub;
    if (valFormat < 0) {
      nub = 0;
    } else if (valFormat > 100) {
      nub = 100;
    } else {
      nub = valFormat;
    }
    weight.value = nub;
  },
  get() {
    return weight.value;
  },
});

watch(weightNumber, (val) => {
  generateCalcResult(val);
});

// 确认选择的时候
function onConfirm(val) {
  const changeValue = val[0];
  defaultDrugValue.splice(0, defaultDrugValue.length, changeValue);
  Object.assign(changeDrugInfo, drugList[changeValue]);
  drugPopupShow.value = false;

  generateCalcResult(weight.value);
}

// 计算结果
function generateCalcResult(w) {
  if (w == null || ['', '0', '0.'].indexOf(w) > -1) {
    calcStr.value = '&nbsp;';
    calcResult.value = '&nbsp;';
    return;
  }
  let originVol = new Decimal(changeDrugInfo.volume);
  let originWgt = new Decimal(changeDrugInfo.weight);
  let newWgt = new Decimal(w);
  const nub = Decimal.div(Decimal.mul(originVol, newWgt), originWgt).toDP(
    4,
    Decimal.ROUND_DOWN
  );
  calcResult.value = nub + 'ml';
  calcStr.value = `${originVol}ml × ${newWgt}g ÷ ${originWgt}g = ${nub} ml`;
}

/**
 * 新增修改药品
 */

// 当前展开了的面板
const collapseValues = ref([1, 2]);
const handleChange = (val) => {
  collapseValues.value = val;
};

// form
// add form 组件
const formTitle = '新增药品信息';
const form = ref(null);
const formData = ref({
  name: '',
  volume: null,
  weight: null,
});
const rules = ref({
  name: [
    {
      validator: (val) => {
        return val.length < 11 && val.length > 0;
      },
      message: '最多输入10个文字',
    },
  ],
  volume: [
    {
      validator: (val) => val > 0 && val < 1000,
      message: '只能大于0ml，小于1000ml',
    },
  ],
  weight: [
    {
      validator: (val) => val > 0 && val < 100,
      message: '必须大于0g，小于100g',
    },
  ],
});

//
const addMsgVisible = ref(false);
function onSubmit(args) {
  if (args.validateResult === true) {
    console.dir(formData.value);
    addMsgVisible.value = true;
    setTimeout(() => {
      addMsgVisible.value = false;
    }, 3000);
    form.value.reset();
    return;
  }
  console.dir(args.validateResult);
}
</script>

<style lang="less" scoped>
main {
  .t-divider {
    margin-top: 5px;
    margin-bottom: 5px;
  }
  .drug-title {
    font-weight: bold;
  }

  .weight-input {
    --td-input-vertical-padding: 0;
  }

  .other-tips {
    font-size: smaller;
    font-style: italic;
    color: gray;
  }
  .calc-result {
    font-size: x-large;
    text-align: center;
  }

  .d-form-item {
    min-height: 80px;
  }

  .button-group {
    box-sizing: border-box;
    padding: 16px;
    display: flex;
    justify-content: space-between;
    position: relative;
    .t-button {
      height: 32px;
      flex: 1;
      transition-duration: 0s;
      &:first-child {
        margin-right: 16px;
      }
    }
  }
}
</style>

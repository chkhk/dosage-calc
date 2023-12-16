<template>
  <t-popup
    v-model="showEditPop"
    :closeOnOverlayClick="true"
    :placement="'bottom'"
  >
    <div class="header">
      <div class="btn btn--cancel" aria-role="button" @click="cancelEdit">
        取消
      </div>
      <div class="title">标题文字</div>
      <div class="btn btn--confirm" aria-role="button" @click="saveEdit">
        保存
      </div>
    </div>
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
        <t-form-item label="重量单位" name="unitsWt" class="d-form-item">
          <t-radio-group
            v-model="formData.unitsWt"
            class="radio-box"
            borderless
          >
            <t-radio :block="false" name="unitsWt" value="g">
              <template #label>克<code>/g</code></template>
            </t-radio>
            <t-radio :block="false" name="unitsWt" value="mg">
              <template #label>毫克<code>/mg</code></template>
            </t-radio>
          </t-radio-group>
        </t-form-item>
      </t-form>
    </div>
  </t-popup>

  <t-message
    :visible="msgVisible"
    theme="success"
    :offset="[20, 16]"
    content="添加成功！"
  />
</template>

<script setup>
import { nanoid } from 'nanoid';
// nanoid(10) 生成 10 位的随机数

const props = defineProps({
  modelValue: {
    type: Boolean,
  },
});
const emit = defineEmits(['update:modelValue']);

// 是否显示编辑弹框
const showEditPop = ref(false);
// popup组件必须是v-model绑定才能支持点击遮罩关闭，只能这么做
watch(
  () => props.modelValue,
  (val) => {
    showEditPop.value = val;
  },
  {
    immediate: true,
  }
);
watch(showEditPop, (val) => {
  emit('update:modelValue', val);
});

// 编辑药品结果提示
const msgVisible = ref(false);

// 保存
function saveEdit() {
  emit('update:modelValue', false);
}

// 取消
function cancelEdit() {
  emit('update:modelValue', false);
}

// form
// add form 组件

const formTitle = '新增药品信息';
const form = ref(null);
const formData = ref({
  name: '',
  volume: null,
  weight: null,
  unitsWt: 'g',
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
    addMsgVisible.value = true;
    setTimeout(() => {
      addMsgVisible.value = false;
    }, 3000);
    form.value.reset();
    return;
  }
}
</script>

<style lang="less" scoped>
.header {
  display: flex;
  align-items: center;
  height: 116rpx;

  .title {
    flex: 1;
    text-align: center;
    font-weight: 600;
    font-size: 18px;
    color: var(--td-text-color-primary, rgba(0, 0, 0, 0.9));
  }

  .btn {
    font-size: 16px;
    padding: 16px;
  }

  .btn--cancel {
    color: var(--td-text-color-secondary, rgba(0, 0, 0, 0.6));
  }

  .btn--confirm {
    color: #0052d9;
  }
}

.d-form-item {
}

.radio-box > div {
  margin-right: 20px;
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
</style>

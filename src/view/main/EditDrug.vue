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
      <div class="title">{{ formTitle }}</div>
      <div class="btn btn--confirm" aria-role="button" @click="saveEdit">
        保存
      </div>
    </div>
    <div>
      <t-form
        ref="editFormRef"
        :data="formData"
        :rules="rules"
        reset-type="initial"
        :show-error-message="showErrorMessage"
        label-align="left"
        @submit="onEditFormSubmit"
        :novalidate="true"
      >
        <t-form-item label="名称" name="name" class="d-form-item">
          <t-input
            ref="nameInputRef"
            v-model="formData.name"
            borderless
            :maxlength="10"
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
            placeholder="0 ~ 1000"
            :clearable="true"
            type="number"
          >
            <template #suffix>
              <code>{{ unitsWtText }}</code>
            </template>
          </t-input>
        </t-form-item>
        <t-form-item label="重量单位" name="unitsWt" class="d-form-item">
          <t-radio-group
            v-model="formData.unitsWt"
            class="radio-box"
            borderless
            @change="unitsWtChange"
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
</template>

<script setup>
import { Toast } from 'tdesign-mobile-vue';
import { nanoid } from 'nanoid';
// nanoid(10) 生成 10 位的随机数
import { deepClone, saveDrugLStorage, getDrugLStorage } from '@/utils/utils';

const props = defineProps({
  modelValue: Boolean,
  formTitle: String,
  editFormData: Object,
  editFormDataIndex: Number,
});
const emit = defineEmits(['update:modelValue']);

// 是否显示编辑弹框
const showEditPop = ref(false);

// 自动聚焦名字框
const nameInputRef = ref(null);

// popup组件必须是v-model绑定才能支持点击遮罩关闭，因为 props 是单向的
watch(
  () => props.modelValue,
  (val) => {
    showEditPop.value = val;
    if (val) {
      nextTick(() => {
        nameInputRef.value.focus();
      });
    }
  },
  {
    immediate: true,
  }
);
watch(showEditPop, (val) => {
  emit('update:modelValue', val);
});

// 保存
function saveEdit() {
  editFormRef.value.submit();
}

// 取消
function cancelEdit() {
  emit('update:modelValue', false);
}

// 重量单位输入框显示的单位
const unitsWtText = ref('g');
function unitsWtChange(val) {
  unitsWtText.value = val;
}

const editFormRef = ref(null);
// form 初始值
const emptyFormData = {
  name: '',
  volume: null,
  weight: null,
  unitsWt: 'g',
};
const formData = ref(deepClone(emptyFormData));
// 是否显示验证信息
const showErrorMessage = ref(true);
watch(
  () => props.editFormData,
  (val) => {
    if (val == null) {
      editFormRef.value.reset();
    } else {
      unitsWtChange(val.unitsWt);
      Object.assign(formData.value, {
        name: val.name,
        volume: val.volume,
        weight: val.weight,
        unitsWt: val.unitsWt,
      });
    }
  }
);

const rules = ref({
  name: [
    {
      validator: (val) => {
        return val.length < 11 && val.length > 0;
      },
      message: '请输入药品名称',
    },
  ],
  volume: [
    {
      validator: (val) => val > 0 && val < 1000,
      message: '范围：大于0, 小于等于1000',
    },
  ],
  weight: [
    {
      validator: (val) => val > 0 && val < 1000,
      message: '范围：大于0, 小于等于1000',
    },
  ],
});

const refetchAllDrugList = inject('refetchAllDrugList');

// 提交表单
function onEditFormSubmit(args) {
  if (args.validateResult === true) {
    const formDataObj = formData.value;
    const drugLStorage = getDrugLStorage();
    let editFormTipText = '新增成功';
    const newData = {
      id: nanoid(10),
      name: formDataObj.name,
      volume: +formDataObj.volume,
      weight: +formDataObj.weight,
      dose: formDataObj.unitsWt === 'g' ? 'std' : 'sm',
      unitsVol: 'ml',
      unitsWt: formDataObj.unitsWt,
    };
    if (props.editFormData == null && props.editFormDataIndex == null) {
      // 新增
      drugLStorage.push(newData);
    } else {
      // 编辑
      drugLStorage.splice(props.editFormDataIndex, 1, newData);
      editFormTipText = '修改成功';
    }
    console.log('操作的药品：', newData);
    saveDrugLStorage(drugLStorage);
    refetchAllDrugList();
    showEditPop.value = false;
    Toast({
      theme: 'success',
      direction: 'column',
      message: editFormTipText,
    });
    editFormRef.value.reset();
  } else {
    Toast('检查输入的内容');
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
    color: var(--td-brand-color-7, #0052d9);
  }
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

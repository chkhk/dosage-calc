<template>
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
          <t-form-item label="名称" for="name" name="name" class="d-form-item">
            <t-input
              v-model="formData.name"
              borderless
              name="name"
              placeholder="10个字以内"
              :clearable="true"
            ></t-input>
          </t-form-item>
          <t-form-item
            label="容积"
            for="volume"
            name="volume"
            class="d-form-item"
          >
            <t-input
              v-model="formData.volume"
              borderless
              name="volume"
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
          <t-form-item
            label="重量"
            for="weight"
            name="weight"
            class="d-form-item"
          >
            <t-input
              v-model="formData.weight"
              borderless
              name="weight"
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
</template>

<script setup></script>

<style lang="less" scoped></style>

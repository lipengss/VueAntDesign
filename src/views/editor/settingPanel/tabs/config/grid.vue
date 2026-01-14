<template>
  <a-row align="middle" :gutter="[10, 10]">
    <a-col :span="6">图表边距</a-col>
    <a-col :span="18">
      <div class="margin">
        <div><input-number v-model:value="grid.left" size="small" :min="0" :max="100" /></div>
        <div class="center">
          <input-number v-model:value="grid.top" size="small" :min="0" :max="100" />
          <div class="box">
            <div class="child"></div>
          </div>
          <input-number v-model:value="grid.bottom" size="small" :min="0" :max="100" />
        </div>
        <div><input-number v-model:value="grid.right" size="small" :min="0" :max="100" /></div>
      </div>
    </a-col>
    <a-col :span="6">背景颜色</a-col>
    <a-col :span="18">
      <popuColor v-model:color="grid.backgroundColor" />
    </a-col>
    <a-col :span="6">包含标签</a-col>
    <a-col :span="18">
      <a-switch v-model:checked="grid.containLabel" size="small" />
    </a-col>
    <a-col :span="6">边框宽度</a-col>
    <a-col :span="18">
      <input-number v-model:value="grid.borderWidth" :min="0" :max="100" size="small" />
    </a-col>
  </a-row>
</template>
<script setup lang="ts">
  import { computed } from 'vue'
  import { storeToRefs } from 'pinia'
  import popuColor from '@/components/popuColor/popuColor.vue'
  import { useComponentStore } from '@/stores/component'

  const emits = defineEmits(['change'])

  const { curComponent } = storeToRefs(useComponentStore())

  const grid = computed(() => curComponent.value.bases.chart.grid)
</script>
<style lang="less" scoped>
  .margin {
    display: flex;
    align-items: center;
    border: 1px dashed #666;
    padding: 8px;
    .center {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      .box {
        width: 100%;
        height: 50px;
        padding: 8px;
        .child {
          width: 100%;
          height: 100%;
          border: 1px solid #666;
        }
      }
    }
    /deep/.ant-input-number {
      width: 40px;
      text-align: center;
      &:hover {
        .ant-input-number-handler-wrap {
          display: none;
        }
      }
      .ant-input-number-input {
        text-align: center;
      }
    }
  }
  /deep/.ant-input-group-addon {
    padding: 0 4px;
  }
</style>

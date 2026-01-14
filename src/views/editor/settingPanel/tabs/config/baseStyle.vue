<template>
  <Divider title="基础样式" />
  <a-form class="set-panel-from" v-if="bases">
    <a-form-item label="图表尺寸">
      <a-space>
        <input-number v-model:value="bases.width" prefix="W" />
        <input-number v-model:value="bases.height" prefix="H" />
      </a-space>
    </a-form-item>
    <template v-if="bases.chart">
      <a-form-item label="背景颜色">
        <popuColor v-model:color="bases.chart.backgroundColor" />
      </a-form-item>
    </template>
    <a-form-item label="图表位置">
      <a-space>
        <input-number v-model:value="bases.translateX" prefix="X" />
        <input-number v-model:value="bases.translateY" prefix="Y" />
      </a-space>
    </a-form-item>
    <a-form-item label="旋转角度">
      <a-space>
        <input-number v-model:value="bases.rotate" prefix="°" />
        <a-button size="small" title="水平翻转"><svg-icon name="horizontal" /></a-button>
        <a-button size="small" title="垂直翻转"><svg-icon name="vertical" /></a-button>
      </a-space>
    </a-form-item>
    <a-form-item label="不透明度">
      <a-space>
        <a-slider style="width: 140px" v-model:value="bases.opacity" :min="0" :max="1" :step="0.1" />
        <input-number v-model:value="bases.opacity" :min="0" :max="1" :step="0.1" :dragSensitivity="1" />
      </a-space>
    </a-form-item>
  </a-form>
</template>
<script setup lang="ts">
  import { computed } from 'vue'
  import Divider from '@/components/Divider/Divider.vue'
  import popuColor from '@/components/popuColor/popuColor.vue'
  import { useComponentStore } from '@/stores/component'
  import { storeToRefs } from 'pinia'

  const { curComponent } = storeToRefs(useComponentStore())

  const bases = computed(() => curComponent.value?.bases || ({} as BaseStyle))
</script>

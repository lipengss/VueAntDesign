<template>
  <a-form class="set-panel-from">
    <template v-if="legend.show">
      <a-form-item label="图形宽度">
        <a-space>
          <a-slider size="small" v-model:value="legend.itemWidth" :max="60" style="width: 140px" />
          <a-input-number v-model:value="legend.itemWidth" size="small" />
        </a-space>
      </a-form-item>
      <a-form-item label="图形高度">
        <a-space>
          <a-slider size="small" v-model:value="legend.itemHeight" :max="60" style="width: 140px" />
          <a-input-number v-model:value="legend.itemHeight" size="small" />
        </a-space>
      </a-form-item>
      <a-form-item label="排列方式">
        <a-radio-group v-model:value="legend.orient" size="small">
          <a-radio-button value="horizontal">水平</a-radio-button>
          <a-radio-button value="vertical">垂直</a-radio-button>
        </a-radio-group>
      </a-form-item>
      <a-form-item label="图形类型">
        <a-select v-model:value="legend.icon" style="width: 100%" size="small">
          <a-select-option v-for="item in legendType" :key="item" :value="item">
            {{ item }}
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="水平对齐">
        <a-radio-group v-model:value="legend.left" size="small">
          <a-radio-button value="left"><svg-icon name="left-align" /></a-radio-button>
          <a-radio-button value="center"><svg-icon name="center-align" /></a-radio-button>
          <a-radio-button value="right"><svg-icon name="right-align" /></a-radio-button>
        </a-radio-group>
      </a-form-item>
      <a-form-item label="垂直对齐">
        <a-radio-group v-model:value="legend.top" size="small">
          <a-radio-button value="top"><svg-icon name="top-align" /></a-radio-button>
          <a-radio-button value="middle"><svg-icon name="middle-align" /></a-radio-button>
          <a-radio-button value="bottom"><svg-icon name="bottom-align" /></a-radio-button>
        </a-radio-group>
      </a-form-item>
      <a-form-item label="字体颜色">
        <popuColor v-model:color="legend.textStyle.color" />
      </a-form-item>
      <a-form-item label="字体大小">
        <a-space>
          <a-slider
            size="small"
            v-model:value="legend.textStyle.fontSize"
            :max="60"
            style="width: 140px"
          />
          <a-input-number v-model:value="legend.textStyle.fontSize" size="small" />
        </a-space>
      </a-form-item>
    </template>
  </a-form>
</template>
<script setup lang="ts">
  import { legendType } from '@/components/ChartConfig/data'
  import popuColor from '@/components/popuColor/popuColor.vue'
  import { computed } from 'vue'
  import { storeToRefs } from 'pinia'
  import { useComponentStore } from '@/stores/component'

  const { curComponent } = storeToRefs(useComponentStore())

  const legend = computed(() => curComponent.value.bases.chart.legend)
</script>

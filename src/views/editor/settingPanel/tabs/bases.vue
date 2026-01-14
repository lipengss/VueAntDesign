<template>
  <!-- 基础样式 -->
  <baseStyle />
  <!-- 图表设置 -->
  <Divider :title="curComponent?.title" />
  <a-collapse v-model="activeKeys" expandIconPosition="right" :bordered="false" style="margin: 0 -8px" @change="collapseChange">
    <template v-if="bases.chart">
      <a-collapse-panel key="legend" :disabled="!legend.show">
        <template #header>
          <a-switch size="small" v-model:checked="legend.show" @change="legendChange" />
          图例组件
        </template>
        <legendTemp />
      </a-collapse-panel>
      <a-collapse-panel key="grid" :disabled="!grid.show">
        <template #header>
          <a-switch size="small" v-model:checked="grid.show" @change="gridChange" />
          网格线
        </template>
        <gridTemp @change="switchChange" />
      </a-collapse-panel>
      <a-collapse-panel header="系列设置">
        <a-form v-for="(ser, index) in series" :key="index" class="set-panel-from">
          <a-form-item label="系列名称">
            <a-input v-model:value="ser.name" size="small" />
          </a-form-item>
          <template v-if="type === 'pie'">
            <a-form-item label="饼图半径">
              <a-space>
                <a-input addon-before="in" v-model:value="ser.radius[0]" size="small" />
                <a-input addon-before="out" v-model:value="ser.radius[1]" size="small" />
              </a-space>
            </a-form-item>
            <template v-if="ser.itemStyle">
              <a-form-item label="边框宽度">
                <a-space>
                  <a-slider size="small" v-model:value="ser.itemStyle.borderWidth" :max="20" />
                  <a-input-number v-model:value="ser.itemStyle.borderWidth" size="small" :step="1" />
                </a-space>
              </a-form-item>
              <a-form-item label="圆角半径">
                <a-input-number v-model:value="ser.itemStyle.borderRadius" size="small" :step="1" />
              </a-form-item>
              <a-form-item label="边框颜色">
                <popuColor v-model:color="ser.itemStyle.borderColor" />
              </a-form-item>
            </template>
            <a-form-item>
              <a-collapse v-model="childActives" :bordered="false" style="margin: 0 -8px" @change="childCollapseChange">
                <a-collapse-panel key="pieLabel" :disabled="!ser.label.show">
                  <template #header>
                    <a-switch v-model:checked="ser.label.show" size="small" @change="childSwitchChange('pieLabel')" />
                    文本标签
                  </template>
                  <a-form :gutter="[0, 10]">
                    <label-style v-model:label="ser.label" />
                  </a-form>
                </a-collapse-panel>
              </a-collapse>
            </a-form-item>
          </template>
          <template v-if="['bar', 'strip'].includes(type)">
            <a-form-item label="柱条宽度">
              <a-space>
                <a-slider style="width: 100%" size="small" v-model:value="ser.barWidth" :step="1" :max="60" />
                <a-input-number v-model:value="ser.barWidth" size="small" />
              </a-space>
            </a-form-item>
            <a-form-item label="柱条圆角">
              <a-slider style="width: 100%" size="small" v-model:value="ser.itemStyle.borderRadius" :step="1" :max="100" />
            </a-form-item>
            <a-form-item label="柱间距">
              <a-space>
                <a-slider style="width: 100%" size="small" v-model:value="ser.barGap" :step="0.1" :max="1" />
                <a-input-number v-model:value="ser.barGap" size="small" :step="0.1" />
              </a-space>
            </a-form-item>
            <a-form-item>
              <a-collapse v-model="childActives" @change="childCollapseChange" :bordered="false">
                <a-collapse-panel :key="`label${index}`" :disabled="!ser.label.show">
                  <template #header>
                    <a-switch v-model:checked="ser.label.show" size="small" @change="childSwitchChange('label')" />
                    标签
                  </template>
                  <a-form>
                    <a-form-item label="字体大小">
                      <a-space>
                        <a-slider style="width: 100%" size="small" v-model:value="ser.label.fontSize" :step="1" :min="6" :max="60" />
                        <a-input-number v-model:value="ser.label.fontSize" size="small" :step="1" />
                      </a-space>
                    </a-form-item>
                    <a-form-item label="字体颜色">
                      <popuColor v-model:color="ser.label.color" />
                    </a-form-item>
                    <a-form-item label="标签位置">
                      <a-select v-model:value="ser.label.position" size="small" style="width: 100%">
                        <a-select-option v-for="item in LABEL_POSITION" :key="item" :value="item">
                          {{ item }}
                        </a-select-option>
                      </a-select>
                    </a-form-item>
                  </a-form>
                </a-collapse-panel>
              </a-collapse>
            </a-form-item>
          </template>
          <template v-if="type === 'line'">
            <a-form-item label="平滑曲线">
              <a-switch v-model:checked="ser.smooth" size="small" />
            </a-form-item>
            <a-form-item label="线宽">
              <a-space>
                <a-slider style="width: 100%" size="small" v-model:value="ser.lineStyle.width" :step="1" :min="1" :max="60" />
                <a-input-number v-model:value="ser.lineStyle.width" size="small" :step="1" />
              </a-space>
            </a-form-item>
            <a-form-item label="区域色">
              <popuColor v-model:color="ser.areaStyle.color.colorStops[0].color" />
            </a-form-item>
            <a-form-item>
              <a-collapse v-model="childActives" @change="childCollapseChange">
                <a-collapse-panel key="mark" :disabled="!ser.showSymbol">
                  <template #header>
                    <a-switch v-model:checked="ser.showSymbol" size="small" @change="childSwitchChange('mark')" />
                    记号显示
                  </template>
                  <a-form>
                    <a-form-item label="数值显示">
                      <a-switch v-model:checked="ser.label.show" size="small" />
                    </a-form-item>
                    <template v-if="ser.label.show">
                      <a-form-item label="字体大小">
                        <a-space>
                          <a-slider style="width: 100%" size="small" v-model:value="ser.label.fontSize" :step="1" :min="6" :max="60" />
                          <a-input-number v-model:value="ser.label.fontSize" size="small" :step="1" />
                        </a-space>
                      </a-form-item>
                      <a-form-item label="字体颜色">
                        <popuColor v-model:color="ser.label.color" />
                      </a-form-item>
                      <a-form-item label="标签位置">
                        <a-select v-model:value="ser.label.position" size="small" style="width: 100%">
                          <a-select-option v-for="item in LABEL_POSITION" :key="item" :value="item">
                            {{ item }}
                          </a-select-option>
                        </a-select>
                      </a-form-item>
                    </template>
                  </a-form>
                </a-collapse-panel>
              </a-collapse>
            </a-form-item>
          </template>
        </a-form>
      </a-collapse-panel>
      <!-- <a-collapse-panel key="xAxis" v-if="!!chart.xAxis" :disabled="!chart.xAxis.show">
				<template #header> <a-switch size="small" v-model:checked="chart.xAxis.show" @change="switchChange('xAxis')" /> X轴 </template>
				<axis :axis="chart.xAxis" dire="xAxis" />
			</a-collapse-panel>
			<a-collapse-panel key="yAxis" v-if="!!chart.yAxis" :disabled="!chart.yAxis.show">
				<template #header> <a-switch size="small" v-model:checked="chart.yAxis.show" @change="switchChange('yAxis')" /> Y轴 </template>
				<axis :axis="chart.yAxis" dire="yAxis" />
			</a-collapse-panel>
			<a-collapse-panel key="tooltip" :disabled="!chart.tooltip.show">
				<template #header> <a-switch size="small" v-model:checked="chart.tooltip.show" @change="switchChange('tooltip')" /> 提示框 </template>
				<tooltip :tooltip="chart.tooltip" />
			</a-collapse-panel>
			<a-collapse-panel key="series" header="系列颜色">
				<colors :color="chart.color" />
			</a-collapse-panel>
			<a-collapse-panel key="animation" header="动画">
				<p>动画</p>
			</a-collapse-panel> -->
    </template>
    <template v-if="curComponent.tab === 'control'">
      <a-collapse-panel key="control" header="全局设置">
        <a-form>
          <template v-if="curComponent?.type === 'btn'">
            <a-form-item>内容</a-form-item>
            <a-form-item :span="18">
              <a-input v-model:value="bases.control.propValue" size="small" />
            </a-form-item>
            <a-form-item>文字颜色</a-form-item>
            <a-form-item :span="18">
              <popuColor v-model:color="bases.control.style.color" />
            </a-form-item>
            <a-form-item>文字大小</a-form-item>
            <a-form-item>
              <a-slider v-model:value="bases.control.style.fontSize" size="small" :min="12" :max="60" />
            </a-form-item>
            <a-form-item>
              <a-input-number v-model:value="bases.control.style.fontSize" size="small" />
            </a-form-item>
            <a-form-item>边框宽度</a-form-item>
            <a-form-item>
              <a-slider v-model:value="bases.control.style.borderWidth" size="small" :min="0" :max="60" />
            </a-form-item>
            <a-form-item>
              <a-input-number v-model:value="bases.control.style.borderWidth" size="small" />
            </a-form-item>
            <a-form-item>边框圆角</a-form-item>
            <a-form-item>
              <a-slider v-model:value="bases.control.style.borderRadius" size="small" :min="0" :max="100" />
            </a-form-item>
            <a-form-item>
              <a-input-number v-model:value="bases.control.style.borderRadius" size="small" />
            </a-form-item>
            <a-form-item>边框类型</a-form-item>
            <a-form-item :span="18">
              <a-select v-model:value="bases.control.style.borderStyle" size="small" style="width: 100%">
                <a-select-option v-for="item in LineStyle" :key="item.value">
                  {{ item.label }}
                </a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item>边框颜色</a-form-item>
            <a-form-item :span="18">
              <popuColor v-model:color="bases.control.style.borderColor" />
            </a-form-item>
            <a-form-item>背景颜色</a-form-item>
            <a-form-item :span="18">
              <popuColor v-model:color="bases.control.style.backgroundColor" />
            </a-form-item>
          </template>
          <template v-if="curComponent?.type === 'select'">
            <a-form-item>占位符</a-form-item>
            <a-form-item :span="18">
              <a-input size="small" v-model:value="bases.control.placeholder" />
            </a-form-item>
            <a-form-item>是否展开</a-form-item>
            <a-form-item :span="18">
              <a-switch size="small" v-model:checked="bases.control.open" />
            </a-form-item>
          </template>
        </a-form>
      </a-collapse-panel>
    </template>
  </a-collapse>
</template>
<script setup lang="ts">
  import { computed, ref } from 'vue'

  import legendTemp from './config/legend.vue'
  import gridTemp from './config/grid.vue'

  import baseStyle from './config/baseStyle.vue'
  import Divider from '@/components/Divider/Divider.vue'
  import { storeToRefs } from 'pinia'
  import { useComponentStore } from '@/stores/component'
  import { LineStyle, LabelStyle } from '@/components/ChartConfig/index'
  import { LABEL_POSITION } from '@/components/ChartConfig/data'
  import popuColor from '@/components/popuColor/popuColor.vue'
  import { Chart } from '@/custom-components/chart'
  import { useCollapseEvent } from '@/hooks/useCollapseEvent'

  const chartOpt = new Chart()

  const { curComponent } = storeToRefs(useComponentStore())

  const activeKeys = ref<string[]>([])
  const [collapseChange, switchChange] = useCollapseEvent(activeKeys)

  const childActives = ref([])
  const [childCollapseChange, childSwitchChange] = useCollapseEvent(childActives)

  const type = computed(() => curComponent.value.type)
  const bases = computed(() => curComponent.value.bases)
  const series = computed({
    get: () => curComponent.value.bases.chart.series,
    set: (val) => (curComponent.value.bases.chart.series = val),
  })

  const grid = computed({
    get: () => curComponent.value.bases.chart.grid,
    set: (val) => (curComponent.value.bases.chart.grid = val),
  })
  function gridChange(check: Boolean) {
    curComponent.value.bases.chart.grid = check ? { ...chartOpt.grid } : { show: false }
    switchChange('grid')
  }

  const legend = computed({
    get: () => curComponent.value.bases.chart.legend,
    set: (val) => (curComponent.value.bases.chart.legend = val),
  })
  function legendChange(check: Boolean) {
    curComponent.value.bases.chart.legend = check ? { ...chartOpt.legend } : { show: false }
    switchChange('legend')
  }
</script>

<template>
	<div class="global">
		<a-row align="middle" :gutter="[10, 10]" style='width:100%'>
			<a-col :span="6">legend</a-col>
			<a-col :span="18">
				<a-switch v-model:checked="legend.show" size="small" @change="legendChange" />
			</a-col>
			<template v-if="legend.show">
				<a-col :span="6">图形宽度</a-col>
				<a-col :span="10">
					<a-slider size="small" v-model:value="legend.itemWidth" :max="60" />
				</a-col>
				<a-col :span="8">
					<a-input-number v-model:value="legend.itemWidth" size="small" />
				</a-col>
				<a-col :span="6">图形高度</a-col>
				<a-col :span="10">
					<a-slider size="small" v-model:value="legend.itemHeight" :max="60" />
				</a-col>
				<a-col :span="8">
					<a-input-number v-model:value="legend.itemHeight" size="small" />
				</a-col>
				<a-col :span="6">排列方式</a-col>
				<a-col :span="18">
					<a-radio-group v-model:value="legend.orient" size="small">
						<a-radio-button value="horizontal">水平</a-radio-button>
						<a-radio-button value="vertical">垂直</a-radio-button>
					</a-radio-group>
				</a-col>
				<a-col :span="6">图形类型</a-col>
				<a-col :span="18">
					<a-select v-model:value="legend.icon" style="width: 100%" size="small">
						<a-select-option v-for="item in legendType" :key="item" :value="item">{{ item }}</a-select-option>
					</a-select>
				</a-col>
				<a-col :span="6">水平对齐</a-col>
				<a-col :span="18">
					<a-radio-group v-model:value="legend.left" size="small">
						<a-radio-button value="left"><svg-icon name="left-align" /></a-radio-button>
						<a-radio-button value="center"><svg-icon name="center-align" /></a-radio-button>
						<a-radio-button value="right"><svg-icon name="right-align" /></a-radio-button>
					</a-radio-group>
				</a-col>
				<a-col :span="6">垂直对齐</a-col>
				<a-col :span="18">
					<a-radio-group v-model:value="legend.top" size="small">
						<a-radio-button value="top"><svg-icon name="top-align" /></a-radio-button>
						<a-radio-button value="middle"><svg-icon name="middle-align" /></a-radio-button>
						<a-radio-button value="bottom"><svg-icon name="bottom-align" /></a-radio-button>
					</a-radio-group>
				</a-col>
				<a-col :span="6">字体颜色</a-col>
				<a-col :span="18">
					<popuColor v-model:color="legend.textStyle.color" />
				</a-col>
				<a-col :span="6">字体大小</a-col>
				<a-col :span="10">
					<a-slider style="width: 100%" size="small" v-model:value="legend.textStyle.fontSize" :max="60" />
				</a-col>
				<a-col :span="8">
					<a-input-number v-model:value="legend.textStyle.fontSize" size="small" />
				</a-col>
				<a-divider />
			</template>
      <template v-for="(ser, index) in series" :key="index" :header="ser.name">
        <a-col :span="6">系列名称</a-col>
        <a-col :span="18">
          <a-input v-model:value="ser.name" size="small" />
        </a-col>
        <template v-if="type === 'pie'">
          <a-col :span="6">饼图半径</a-col>
          <a-col :span="9">
            <a-input addon-before="in" v-model:value="ser.radius[0]" size="small" />
          </a-col>
          <a-col :span="9">
            <a-input addon-before="out" v-model:value="ser.radius[1]" size="small" />
          </a-col>
          <template v-if="ser.itemStyle">
            <a-col :span="6">边框宽度</a-col>
              <a-col :span="9">
                <a-slider size="small" v-model:value="ser.itemStyle.borderWidth" :max="20" />
              </a-col>
              <a-col :span="9">
                <a-input-number v-model:value="ser.itemStyle.borderWidth" size="small" :step="1" />
              </a-col>
              <a-col :span="6">圆角半径</a-col>
              <a-col :span="18">
                <a-input-number v-model:value="ser.itemStyle.borderRadius" size="small" :step="1" />
              </a-col>
              <a-col :span="6">边框颜色</a-col>
              <a-col :span="18">
                <popuColor v-model:color="ser.itemStyle.borderColor" />
              </a-col>
          </template>
          <a-col :span="24">
            <a-collapse v-model="data.childActives" @change="childCollapseChange">
              <a-collapse-panel key="pieLabel" :disabled="!ser.label.show">
                <template #header>
                  <a-switch v-model:checked="ser.label.show" size="small" @change="switchChange('pieLabel')" /> 文本标签
                </template>
                <a-row align="middle" :gutter="[0, 10]">
                  <label-style v-model:label="ser.label" />
                  <!-- <a-col :span="7">内容格式</a-col>
                  <a-col :span="17">
                    <a-textarea v-model:value="ser.label.formatter"></a-textarea>
                  </a-col>
                  <a-col :span="7">字体大小</a-col>
                  <a-col :span="9">
                    <a-slider style="width: 100%" size="small" v-model:value="ser.label.fontSize" :step="1" :min="6" :max="60" />
                  </a-col>
                  <a-col :span="8">
                    <a-input-number v-model:value="ser.label.fontSize" size="small" :step="1" />
                  </a-col>
                  <a-col :span="6">字体粗细</a-col>
                  <a-col :span="18">
                    <a-select v-model:value="ser.label.fontWeight" size="small" style="width: 100%">
                      <a-select-option v-for="item in weights" :key="item.value" :value="item.value">{{ item.label }}</a-select-option>
                    </a-select>
                  </a-col>
                  <a-col :span="6">字体颜色</a-col>
                  <a-col :span="18">
                    <popuColor v-model:color="ser.label.color" />
                  </a-col>
                  <a-col :span="6">标签位置</a-col>
                  <a-col :span="18">
                    <a-select v-model:value="ser.label.position" size="small" style="width: 100%">
                      <a-select-option v-for="item in pieLabelPositions" :key="item" :value="item">{{ item }}</a-select-option>
                    </a-select>
                  </a-col> -->
                </a-row>
              </a-collapse-panel>
            </a-collapse>
          </a-col>
        </template>
        <template v-if="['bar', 'strip'].includes(type)">
          <a-col :span="7">柱条宽度</a-col>
          <a-col :span="9">
            <a-slider style="width: 100%" size="small" v-model:value="ser.barWidth" :step="1" :max="60" />
          </a-col>
          <a-col :span="8">
            <a-input-number v-model:value="ser.barWidth" size="small" />
          </a-col>
          <a-col :span="7">柱条圆角</a-col>
          <a-col :span="17">
            <a-slider style="width: 100%" size="small" v-model:value="ser.itemStyle.borderRadius" :step="1" :max="100" />
          </a-col>
          <a-col :span="7">柱间距</a-col>
          <a-col :span="9">
            <a-slider style="width: 100%" size="small" v-model:value="ser.barGap" :step="0.1" :max="1" />
          </a-col>
          <a-col :span="8">
            <a-input-number v-model:value="ser.barGap" size="small" :step="0.1" />
          </a-col>
          <a-col :span="24">
            <a-collapse v-model="data.childActives" @change="childCollapseChange">
              <a-collapse-panel :key="`label${index}`" :disabled="!ser.label.show">
                <template #header> <a-switch v-model:checked="ser.label.show" size="small" @change="switchChange('label')" /> 标签 </template>
                <a-row align="middle" :gutter="[10, 10]">
                  <a-col :span="7">字体大小</a-col>
                  <a-col :span="9">
                    <a-slider style="width: 100%" size="small" v-model:value="ser.label.fontSize" :step="1" :min="6" :max="60" />
                  </a-col>
                  <a-col :span="8">
                    <a-input-number v-model:value="ser.label.fontSize" size="small" :step="1" />
                  </a-col>
                  <a-col :span="7">字体颜色</a-col>
                  <a-col :span="17">
                    <popuColor v-model:color="ser.label.color" />
                  </a-col>
                  <a-col :span="7">标签位置</a-col>
                  <a-col :span="17">
                    <a-select v-model:value="ser.label.position" size="small" style="width: 100%">
                      <a-select-option v-for="item in labelPositions" :key="item" :value="item">{{ item }}</a-select-option>
                    </a-select>
                  </a-col>
                </a-row>
              </a-collapse-panel>
            </a-collapse>
          </a-col>
        </template>
        <template v-if="type === 'line'">
          <a-col :span="7">平滑曲线</a-col>
          <a-col :span="17">
            <a-switch v-model:checked="ser.smooth" size="small" />
          </a-col>
          <a-col :span="7">线宽</a-col>
          <a-col :span="9">
            <a-slider style="width: 100%" size="small" v-model:value="ser.lineStyle.width" :step="1" :min="1" :max="60" />
          </a-col>
          <a-col :span="8">
            <a-input-number v-model:value="ser.lineStyle.width" size="small" :step="1" />
          </a-col>
          <a-col :span="7">区域色</a-col>
          <a-col :span="17">
            <popuColor v-model:color="ser.areaStyle.color.colorStops[0].color" />
          </a-col>
          <a-col :span="24">
            <a-collapse v-model="data.childActives" @change="childCollapseChange">
              <a-collapse-panel key="mark" :disabled="!ser.showSymbol">
                <template #header> <a-switch v-model:checked="ser.showSymbol" size="small" @change="switchChange('mark')" /> 记号显示 </template>
                <a-row align="middle" :gutter="[10, 10]">
                  <a-col :span="7">数值显示</a-col>
                  <a-col :span="17">
                    <a-switch v-model:checked="ser.label.show" size="small" />
                  </a-col>
                  <template v-if="ser.label.show">
                    <a-col :span="7">字体大小</a-col>
                    <a-col :span="9">
                      <a-slider style="width: 100%" size="small" v-model:value="ser.label.fontSize" :step="1" :min="6" :max="60" />
                    </a-col>
                    <a-col :span="8">
                      <a-input-number v-model:value="ser.label.fontSize" size="small" :step="1" />
                    </a-col>
                    <a-col :span="7">字体颜色</a-col>
                    <a-col :span="17">
                      <popuColor v-model:color="ser.label.color" />
                    </a-col>
                    <a-col :span="7">标签位置</a-col>
                    <a-col :span="17">
                      <a-select v-model:value="ser.label.position" size="small" style="width: 100%">
                        <a-select-option v-for="item in labelPositions" :key="item" :value="item">{{ item }}</a-select-option>
                      </a-select>
                    </a-col>
                  </template>
                </a-row>
              </a-collapse-panel>
            </a-collapse>
          </a-col>
        </template>
			</template>
		</a-row>
	</div>
</template>
<script setup lang="ts">
import { labelPositions, legendType } from '@/components/ChartConfig/data';
import popuColor from '@/components/popuColor/popuColor.vue';
import { computed, reactive } from 'vue';
import { LabelStyle } from '@/components/ChartConfig';
import { Chart } from '@/custom-components/chart'
import { storeToRefs } from 'pinia';
import { useComponentStore } from '@/stores/component';

const { curComponent } = storeToRefs(useComponentStore())

const chart = new Chart()

const type = computed(() => curComponent.value.type)

const series = computed({
  get() {
    return curComponent.value.bases.chart.series
  },
  set(val) {
    curComponent.value.bases.chart.series = val
  }
})

const legend = computed(() => curComponent.value.bases.chart.legend)

function legendChange(check:Boolean) {
  curComponent.value.bases.chart.legend = check ? { ...chart.legend} : { show: false }
}

const grid = computed(() => curComponent.value.bases.chart.grid)

function gridChange(check:Boolean) {
  curComponent.value.bases.chart.grid = check ? { ...chart.grid} : { show: false }
}


const data = reactive({
	childActives: [],
});
const switchChange = (axis: string) => {
	const index = data.childActives.findIndex((item: string) => item === axis);
	index !== -1 && data.childActives.splice(index, 1);
};
const childCollapseChange = (keys: any) => {
	data.childActives = keys;
};

</script>


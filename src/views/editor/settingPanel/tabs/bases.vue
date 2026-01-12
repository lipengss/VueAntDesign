<template>
	<!-- 基础样式 -->
	<baseStyle />
	<!-- 图表设置 -->
	<Divider :title="curComponent.title" />
	<a-collapse v-model="activeKeys" expandIconPosition="right" @change="collapseChange">
		<template v-if="bases.chart">
			<a-collapse-panel key="global" header="全局设置">
				<global />
			</a-collapse-panel>
			<a-collapse-panel key="grid" :disabled="!curComponent.bases.chart.grid.show">
				<template #header> <a-switch size="small" v-model:checked="curComponent.bases.chart.grid.show" @change="gridChange" /> 网格线 </template>
				<grid @change="switchChange" />
			</a-collapse-panel>
			<a-collapse-panel header="系列设置">
				<a-row :gutter="[10, 10]" align="middle"  v-for="(ser, index) in series" :key="index" :header="ser.name">
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
				</a-row>
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
		<template v-if="bases.control">
			<a-collapse-panel key="control" header="全局设置">
				<a-row align="middle" :gutter="[10, 10]">
					<template v-if="curComponent.type === 'btn'">
						<a-col :span="6">内容</a-col>
						<a-col :span="18">
							<a-input v-model:value="bases.control.propValue" size="small" />
						</a-col>
						<a-col :span="6">文字颜色</a-col>
						<a-col :span="18">
							<popuColor v-model:color="bases.control.style.color" />
						</a-col>
						<a-col :span="6">文字大小</a-col>
						<a-col :span="9">
							<a-slider v-model:value="bases.control.style.fontSize" size="small" :min="12" :max="60" />
						</a-col>
						<a-col :span="9">
							<a-input-number v-model:value="bases.control.style.fontSize" size="small" />
						</a-col>
						<a-col :span="6">边框宽度</a-col>
						<a-col :span="9">
							<a-slider v-model:value="bases.control.style.borderWidth" size="small" :min="0" :max="60" />
						</a-col>
						<a-col :span="9">
							<a-input-number v-model:value="bases.control.style.borderWidth" size="small" />
						</a-col>
						<a-col :span="6">边框圆角</a-col>
						<a-col :span="9">
							<a-slider v-model:value="bases.control.style.borderRadius" size="small" :min="0" :max="100" />
						</a-col>
						<a-col :span="9">
							<a-input-number v-model:value="bases.control.style.borderRadius" size="small" />
						</a-col>
						<a-col :span="6">边框类型</a-col>
						<a-col :span="18">
							<a-select v-model:value="bases.control.style.borderStyle" size="small" style="width: 100%">
								<a-select-option v-for="item in LineStyle" :key="item.value">{{ item.label }}</a-select-option>
							</a-select>
						</a-col>
						<a-col :span="6">边框颜色</a-col>
						<a-col :span="18">
							<popuColor v-model:color="bases.control.style.borderColor" />
						</a-col>
						<a-col :span="6">背景颜色</a-col>
						<a-col :span="18">
							<popuColor v-model:color="bases.control.style.backgroundColor" />
						</a-col>
					</template>
					<template v-if="curComponent.type === 'select'">
						<a-col :span="6">占位符</a-col>
						<a-col :span="18">
							<a-input size="small" v-model:value="bases.control.placeholder" />
						</a-col>
						<a-col :span="6">是否展开</a-col>
						<a-col :span="18">
							<a-switch size="small" v-model:checked="bases.control.open" />
						</a-col>
					</template>
				</a-row>
			</a-collapse-panel>
		</template>
	</a-collapse>
</template>
<script setup lang="ts">
import { computed, reactive, ref, Ref } from 'vue';

import axis from './config/axis.vue';
import global from './config/global.vue';
import colors from './config/colors.vue';
import tooltip from './config/tooltip.vue';
import grid from './config/grid.vue';

import baseStyle from './config/baseStyle.vue';
import Divider from '@/components/Divider/Divider.vue';
import { storeToRefs } from 'pinia';
import { useComponentStore } from '@/stores/component';
import { LineStyle, LabelStyle } from '@/components/ChartConfig/index';
import popuColor from '@/components/popuColor/popuColor.vue';
import { Chart } from '@/custom-components/chart';

const chartOpt = new Chart();

const { curComponent } = storeToRefs(useComponentStore());

const activeKeys = ref<string[]>([]);

const data:any = reactive({
	childActives: [],
})

const type = computed(() => curComponent.value.type)
const bases = computed(() => curComponent.value.bases);
const series = computed({
  get() {
    return curComponent.value.bases.chart.series
  },
  set(val) {
    curComponent.value.bases.chart.series = val
  }
})


function gridChange(check: Boolean) {
	curComponent.value.bases.chart.grid = check ? { ...chartOpt.grid } : { show: false };
	switchChange('grid');
}

function childCollapseChange(keys: string[]) {
	data.childActives = keys;
}

// 开关
const switchChange = (axis: string) => {
	const index = activeKeys.value.findIndex((item: string) => item === axis);
	index !== -1 && activeKeys.value.splice(index, 1);
	console.log('activeKeys.value', activeKeys.value);
};
// 展开收起
const collapseChange = (keys: string[]) => {
	activeKeys.value = keys;
};
</script>
<style lang="less" scoped>
.ant-collapse {
	:deep .ant-collapse-content-box {
		padding: 10px;
	}
}
</style>

<template>
	<!-- 基础样式 -->
	<baseStyle />
	<!-- 图表设置 -->
	<Divider :title="curComponent.title" />
	<a-collapse v-model="activeKeys" expandIconPosition="right" @change="collapseChange">
		<template v-if="bases.chart">
			<a-collapse-panel key="global" header="全局设置">
				<global :series="chart.series" :grid="chart.grid" :legend="chart.legend" :type="curComponent.type" />
			</a-collapse-panel>
			<a-collapse-panel key="xAxis" v-if="!!chart.xAxis" :disabled="!chart.xAxis.show">
				<template #header> <a-switch size="small" v-model:checked="chart.xAxis.show" @change="switchChange('xAxis')" /> X轴 </template>
				<axis :axis="chart.xAxis" dire="xAxis" />
			</a-collapse-panel>
			<a-collapse-panel key="yAxis" v-if="!!chart.yAxis" :disabled="!chart.yAxis.show">
				<template #header> <a-switch size="small" v-model:checked="chart.yAxis.show" @change="switchChange('yAxis')" /> Y轴 </template>
				<axis :axis="chart.yAxis" dire="yAxis" />
			</a-collapse-panel>
			<a-collapse-panel key="tooltip" :disabled="!chart.tooltip.show">
				<template #header> <a-switch size="small" v-model:checked="chart.tooltip.show" @change="switchChange('yAxis')" /> 提示框 </template>
				<tooltip :tooltip="chart.tooltip" />
			</a-collapse-panel>
			<a-collapse-panel key="series" header="系列颜色">
				<colors :color="chart.color" />
			</a-collapse-panel>
			<a-collapse-panel key="animation" header="动画">
				<p>动画</p>
			</a-collapse-panel>
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
								<a-select-option v-for="item in lineStyle" :key="item.value">{{ item.label }}</a-select-option>
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
import { computed, ref, Ref } from 'vue';

import axis from './config/axis.vue';
import global from './config/global.vue';
import colors from './config/colors.vue';
import tooltip from './config/tooltip.vue';
import baseStyle from './config/baseStyle.vue';
import Divider from '@/components/Divider/Divider.vue';
import { storeToRefs } from 'pinia';
import { useComponentStore } from '@/stores/component';
import { lineStyle } from './data';
import popuColor from '@/components/popuColor/popuColor.vue';

const { curComponent } = storeToRefs(useComponentStore());

const activeKeys: Ref<string[]> = ref([]);
const bases = computed(() => curComponent.value.bases);
const chart = computed(() => bases.value.chart);
// 开关
const switchChange = (axis: string) => {
	const index = activeKeys.value.findIndex((item: string) => item === axis);
	index !== -1 && activeKeys.value.splice(index, 1);
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

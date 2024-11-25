<template>
	<a-collapse v-model="activeKeys" expandIconPosition="right" @change="collapseChange">
		<a-collapse-panel key="title" :collapsible="collapsible(title.show)">
			<template #header> <a-switch size="small" v-model:checked="title.show" @change="switchChange('title')" /> 标题组件 </template>
			<TitleStyle :title="title" />
		</a-collapse-panel>
		<a-collapse-panel key="legend" :collapsible="collapsible(legend.show)">
			<template #header> <a-switch size="small" v-model:checked="legend.show" @change="switchChange('legend')" /> 图例组件 </template>
			<a-row :gutter="[10, 10]" align="middle">
				<a-col :span="24">
					<flex-item title="图例朝向">
						<a-radio-group v-model:value="legend.orient" button-style="solid">
							<a-radio-button value="horizontal">水平</a-radio-button>
							<a-radio-button value="vertical">垂直</a-radio-button>
						</a-radio-group>
					</flex-item>
				</a-col>
				<a-col :span="24">
					<Align v-model:value="legend.left" horizontal title="图例左间距" placeholder="图例组件离容器左侧的距离" />
				</a-col>
				<a-col :span="24">
					<Align v-model:value="legend.top" title="图例上间距" placeholder="图例组件离容器上侧的距离" />
				</a-col>
				<a-col :span="24">
					<flex-item title="图例项间隔">
						<a-input-number v-model:value="legend.itemGap" :defaultValue="10" allowClear placeholder="图例每项之间的间隔" />
					</flex-item>
				</a-col>
			</a-row>
		</a-collapse-panel>
		<a-collapse-panel key="tooltip" :collapsible="collapsible(tooltip.show)">
			<template #header> <a-switch size="small" v-model:checked="tooltip.show" @change="switchChange('tooltip')" /> 提示框 </template>
			<a-row :gutter="[10, 10]" align="middle">
				<a-col :span="24">
					<flex-item title="触发类型">
						<a-select v-model:value="tooltip.trigger" placeholder="请选择触发类型">
							<a-select-option value="item">数据项图形触发</a-select-option>
							<a-select-option value="axis">坐标轴触发</a-select-option>
							<a-select-option value="none">不触发</a-select-option>
						</a-select>
					</flex-item>
				</a-col>
				<a-col :span="24">
					<flex-item title="指示器类型">
						<a-select v-model:value="tooltip.axisPointer.type" placeholder="请选择指示器类型">
							<a-select-option value="line">直线指示器</a-select-option>
							<a-select-option value="shadow">阴影指示器</a-select-option>
							<a-select-option value="cross">十字准星指示器</a-select-option>
							<a-select-option value="none">无指示器</a-select-option>
						</a-select>
					</flex-item>
				</a-col>
				<LabelStyle :label="tooltip.axisPointer.label" />
			</a-row>
		</a-collapse-panel>
	</a-collapse>
</template>
<script setup lang="ts">
import { ref, computed } from 'vue';
import TitleStyle from './TitleStyle.vue';
import { collapsible } from '@/utils/tools';
import { Align } from '@/components/ChartConfig/index';
import FlexItem from '@/components/FlexItem/index.vue';
import LabelStyle from './LabelStyle.vue';

const props = defineProps(['chartOption']);

const title = computed(() => props.chartOption.title);
const legend = computed(() => props.chartOption.legend);
const tooltip = computed(() => props.chartOption.tooltip);

const activeKeys = ref<string[]>([]);

const switchChange = (axis: string) => {
	const index = activeKeys.value.findIndex((item: string) => item === axis);
	index !== -1 && activeKeys.value.splice(index, 1);
};
// 展开收起
const collapseChange = (keys: string[]) => {
	activeKeys.value = keys;
};
</script>

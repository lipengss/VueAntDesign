<template>
	<a-collapse v-model="activeKeys" expandIconPosition="right" @change="collapseChange">
		<a-collapse-panel key="title" :disabled="!chartOption.title.show">
			<template #header> <a-switch size="small" v-model:checked="chartOption.title.show" @change="switchChange('title')" /> 标题组件 </template>
			<TitleStyle :title="title" />
		</a-collapse-panel>
		<a-collapse-panel key="legend" :disabled="!chartOption.legend.show">
			<template #header> <a-switch size="small" v-model:checked="chartOption.legend.show" @change="switchChange('legend')" /> 图例组件 </template>
			<a-row :gutter="[10, 10]" align="middle">
				<a-col :span="24">
					<flex-item title="图例朝向">
						<a-radio-group v-model:value="chartOption.legend.orient" button-style="solid">
							<a-radio-button value="horizontal">水平</a-radio-button>
							<a-radio-button value="vertical">垂直</a-radio-button>
						</a-radio-group>
					</flex-item>
				</a-col>
				<a-col :span="24">
					<Align v-model:value="chartOption.legend.left" horizontal title="图例左间距" placeholder="图例组件离容器左侧的距离" />
				</a-col>
				<a-col :span="24">
					<Align v-model:value="chartOption.legend.top" title="图例上间距" placeholder="图例组件离容器上侧的距离" />
				</a-col>
				<a-col :span="24">
					<flex-item title="图例项间隔">
						<a-input-number v-model:value="chartOption.legend.itemGap" :defaultValue="10" allowClear placeholder="图例每项之间的间隔" />
					</flex-item>
				</a-col>
			</a-row>
		</a-collapse-panel>
		<a-collapse-panel key="tooltip" :disabled="!chartOption.tooltip.show">
			<template #header> <a-switch size="small" v-model:checked="chartOption.tooltip.show" @change="switchChange('tooltip')" /> 提示框 </template>
		</a-collapse-panel>
	</a-collapse>
</template>
<script setup lang="ts">
import { ref, computed } from 'vue';
import TitleStyle from './TitleStyle.vue';
import { Align } from '@/components/ChartConfig/index';
import FlexItem from '@/components/FlexItem/index.vue';

const props = defineProps(['chartOption']);

const title = computed(() => props.chartOption.title);

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

<template>
	<SpliltPanes v-model:size="state.paneSize">
		<template #left>
			<div class="chart-container">
				<chart :option="chartOption" />
			</div>
		</template>
		<template #right>
			<a-select
				v-if="tabs"
				style="width: 120px"
				:options="tabs.filter((n) => n.type !== 'all')"
				:fieldNames="{ label: 'title', value: 'type' }"
				v-model:value="state.chartType"
			/>
			<a-collapse v-model="state.activeKeys" expandIconPosition="right" @change="collapseChange">
				<a-collapse-panel key="title" :disabled="!chartOption.title.show">
					<template #header> <a-switch size="small" v-model:checked="chartOption.title.show" @change="switchChange('title')" /> 标题组件 </template>
					<a-row :gutter="[10, 10]" align="middle">
						<a-col :span="24">
							<flex-item title="主标题文本">
								<a-input v-model:value="title.text" allowClear placeholder="支持使用 \n 换行" />
							</flex-item>
						</a-col>
						<Divider title="主标题样式" />
						<TextStyle :textStyle="title.textStyle" />
					</a-row>
				</a-collapse-panel>
				<a-collapse-panel key="tooltip" :disabled="!chartOption.tooltip.show">
					<template #header> <a-switch size="small" v-model:checked="chartOption.tooltip.show" @change="switchChange('tooltip')" /> 提示框 </template>
				</a-collapse-panel>
			</a-collapse>
		</template>
	</SpliltPanes>
</template>
<script lang="ts" setup>
import { computed, reactive } from 'vue';
import SpliltPanes from '@/components/SplitPanes/SpliltPanes.vue';
import { allComponentData } from '@/custom-components/componentData';
import FlexItem from '@/components/FlexItem/index.vue';
import { TextStyle } from '@/components/ChartConfig/index';
import Divider from '@/components/Divider/Divider.vue';
import chart from './chart.vue';
import { theme } from 'ant-design-vue';

const { token } = theme.useToken();

const { tabs } = allComponentData.echarts;

const state = reactive({
	chartType: 'bar',
	paneSize: 50,
	activeKeys: [],
});

const chartOption = reactive({
	title: {
		show: false,
		text: '主标题文本',
		textStyle: {
			color: '#333',
			fontSize: 18,
			fontWeight: 400,
		},
	},
	tooltip: {
		show: false,
	},
});

const title = computed(() => chartOption.title);

const switchChange = (axis: string) => {
	const index = state.activeKeys.findIndex((item: string) => item === axis);
	index !== -1 && state.activeKeys.splice(index, 1);
};
// 展开收起
const collapseChange = (keys: string[]) => {
	state.activeKeys = keys;
};
</script>
<style lang="less" scoped>
// global Style
:deep .ant-row {
	width: 100%;
	margin-left: 0;
	margin-right: 0;
	margin-bottom: 10px;
	font-size: 12px;
	color: v-bind('token.colorTextLabel');
	.ant-input-number {
		width: 100%;
	}
}
.chart-container {
	width: 80%;
	height: 40%;
	margin: auto;
	margin-top: 20%;
	border: 1px solid #ccc;
}
</style>

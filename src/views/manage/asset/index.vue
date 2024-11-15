<template>
	<SpliltPanes v-model:size="state.paneSize">
		<template #left>
			<div class="chart-container">
				<Chart class="chart" :option="chartOption" />
			</div>
		</template>
		<template #right>
			<div class="setting-conatiner">
				<a-select
					v-if="tabs"
					class="marigin-bottom-1"
					style="width: 200px"
					:options="tabs.filter((n) => n.type !== 'all')"
					:fieldNames="{ label: 'title', value: 'type' }"
					v-model:value="state.chartType"
				/>
				<a-timeline>
					<a-timeline-item>
						<p>公共样式</p>
						<Global :chartOption="chartOption" />
					</a-timeline-item>
					<a-timeline-item>
						<p class="flex-between">
							<span>系列样式</span>
							<a-button size="small" shape="circle" title="添加系列" @click="onAddSeries">
								<template #icon><PlusOutlined /></template>
							</a-button>
						</p>
						<Series :chartOption="chartOption" />
					</a-timeline-item>
					<a-timeline-item>Technical testing 2015-09-01</a-timeline-item>
					<a-timeline-item>Network problems being solved 2015-09-01</a-timeline-item>
				</a-timeline>
			</div>
		</template>
	</SpliltPanes>
</template>
<script lang="ts" setup>
import { reactive, watch } from 'vue';
import SpliltPanes from '@/components/SplitPanes/SpliltPanes.vue';
import { allComponentData } from '@/custom-components/componentData';
import { PlusOutlined } from '@ant-design/icons-vue';
import Chart from './Chart.vue';
import Global from './Global.vue';
import Series from './Series.vue';
import { theme } from 'ant-design-vue';
import { DefaultOption } from '@/components/ChartConfig/defaultOption';

const { token } = theme.useToken();

const { tabs } = allComponentData.echarts;

const { getSeries } = new DefaultOption();

const state = reactive({
	chartType: 'pie',
	paneSize: 50,
	activeKeys: [],
});

const chartOption: any = reactive({
	title: {
		show: false,
		text: '主标题文本',
		left: 'center',
		top: '10',
		textStyle: {
			color: '#333',
			fontSize: 18,
			fontWeight: 400,
		},
	},
	legend: {
		show: false,
		top: '10',
		orient: 'horizontal',
	},
	tooltip: {
		show: false,
	},
	series: [],
});

function onAddSeries() {
	chartOption.series.push(getSeries[state.chartType](chartOption.series.length + 1));
}

watch(
	() => state.chartType,
	(type) => {
		chartOption.series = [getSeries[state.chartType](1)];
	},
	{ immediate: true }
);
</script>
<style lang="less" scoped>
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
	width: 100%;
	height: 100%;
	padding: 20px;
	.chart {
		width: 100%;
		height: 56.25%;
		margin-top: 20%;
		border-radius: 10px;
		background-color: v-bind('token.colorFillSecondary');
	}
}
.setting-conatiner {
	padding: 20px;
}
</style>

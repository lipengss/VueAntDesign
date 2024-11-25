<template>
	<SpliltPanes v-model:size="paneSize">
		<template #left>
			<div class="chart-container">
				<a-space class="canvas-config">
					<a-radio-group v-model:value="canvasOpt.aspect" button-style="solid" size="small">
						<a-radio-button value="aspect-1-1">1:1</a-radio-button>
						<a-radio-button value="aspect-4-3">4:3</a-radio-button>
						<a-radio-button value="aspect-16-9">16:9</a-radio-button>
						<a-radio-button value="aspect-21-9">21:9</a-radio-button>
					</a-radio-group>
					<a-input :value="canvasOpt.height" size="small" suffix="PX" style="width: 140px" @pressEnter="pressEnter">
						<template #addonBefore> height: </template>
					</a-input>
				</a-space>
				<div class="chart-content">
					<div class="chart-wrap" :class="canvasOpt.aspect">
						<Chart :option="chartOption" />
					</div>
				</div>
			</div>
		</template>
		<template #right>
			<div class="right-content">
				<a-select
					v-if="tabs"
					class="marigin-bottom-1"
					style="width: 200px"
					:options="tabs.filter((n) => n.type !== 'all')"
					:fieldNames="{ label: 'title', value: 'type' }"
					v-model:value="seriesType"
				/>
				<a-timeline>
					<a-timeline-item>
						<p>公共样式</p>
						<Global :chartOption="chartOption" />
					</a-timeline-item>
					<template v-if="seriesType !== 'pie'">
						<a-timeline-item>
							<p>直角坐标系</p>
							<Grid :chartOption="chartOption" />
						</a-timeline-item>
						<a-timeline-item>
							<p>xAxis</p>
							<xAxis :chartOption="chartOption" />
						</a-timeline-item>
						<a-timeline-item>
							<p>yAxis</p>
							<yAxis :chartOption="chartOption" />
						</a-timeline-item>
					</template>
					<a-timeline-item>
						<p class="flex-between">
							<span>系列样式</span>
							<a-button size="small" @click="onAddSeries">
								<template #icon><PlusOutlined /></template>添加系列
							</a-button>
						</p>
						<Series :chartOption="chartOption" />
					</a-timeline-item>
					<a-timeline-item>
						<p>系列色</p>
						<a-card :body-style="{ padding: '10px' }" style="width: 100%">
							<a-flex v-for="(item, index) in chartOption.color" justify="flex-start" align="center" gap="small" class="marigin-bottom-1">
								<a-checkbox style="flex-shrink: 0" :checked="typeof item === 'object'" :key="item" @change="onChange(item, index)">渐变</a-checkbox>
								<popuColor v-if="typeof item === 'string'" :color="chartOption.color[index]" @pureColorChange="pureColorChange($event, index)" />
								<a-row v-else :gutter="[10, 10]">
									<a-col :span="24">
										<flex-item title="渐变类型">
											<a-radio-group v-model:value="item.type" size="small" button-style="solid">
												<a-radio-button value="linear">线性渐变</a-radio-button>
												<a-radio-button value="radial">径向渐变</a-radio-button>
											</a-radio-group>
										</flex-item>
									</a-col>
									<a-col>
										<ArrayTable
											:data-source="item.colorStops"
											:columns="[
												{ title: '偏移', key: 'offset' },
												{ title: '颜色', key: 'color', slot: true },
											]"
											:temp="{
												offset: 0,
												color: '#fff',
											}"
										>
											<template #color="{ data }">
												<popuColor v-model:color="data.color" />
											</template>
										</ArrayTable>
									</a-col>
								</a-row>
							</a-flex>
						</a-card>
					</a-timeline-item>
				</a-timeline>
			</div>
		</template>
	</SpliltPanes>
</template>
<script lang="ts" setup>
import { reactive, watch, ref, computed } from 'vue';
import SpliltPanes from '@/components/SplitPanes/SpliltPanes.vue';
import popuColor from '@/components/popuColor/popuColor.vue';
import ArrayTable from '@/components/ChartConfig/ArrayTable.vue';
import FlexItem from '@/components/FlexItem/index.vue';
import { allComponentData } from '@/custom-components/componentData';
import { PlusOutlined } from '@ant-design/icons-vue';
import Chart from './Chart.vue';
import Global from './Global.vue';
import Grid from './AxisCollapse/Grid.vue';
import xAxis from './AxisCollapse/xAxis.vue';
import yAxis from './AxisCollapse/yAxis.vue';
import Series from './Series.vue';
import { theme } from 'ant-design-vue';
import { storeToRefs } from 'pinia';
import { useAssetStore } from '@/stores/asset';
import { DefaultOption } from './defaultOption';
import { cloneDeep } from 'lodash-es';

const { seriesType } = storeToRefs(useAssetStore());

const { token } = theme.useToken();

const { tabs } = allComponentData.echarts;

const { getChart } = new DefaultOption();

const canvasOpt = reactive({
	aspect: 'aspect-21-9',
	height: 144,
});

const paneSize = ref(50);

const chartOption: any = ref({});

const canvasHeight = computed(() => canvasOpt.height + 'px');

function onChange(item, index) {
	if (typeof item === 'object') {
		chartOption.value.color.splice(index, 1, item.colorStops[1].color);
	} else {
		const linear = {
			type: 'linear',
			x: 0,
			y: 0,
			x2: 0,
			y2: 1,
			colorStops: [
				{
					offset: 0,
					color: 'transparent', // 0% 处的颜色
				},
				{
					offset: 1,
					color: item, // 100% 处的颜色
				},
			],
		};
		chartOption.value.color.splice(index, 1, linear);
	}
}

// const formatColor = ref(
// 	color.map((color) => ({
// 		color,
// 		selected: false,
// 		id: nanoid(),
// 	}))
// );

// let colorMap = new Map();
// function onChange(e: any, { item, index }: { item: { id: string; color: string; selected: boolean }; index: number }) {
// 	const check = e.target.checked;
// 	if (check) {
// 		colorMap.set(item.id, item.color);
// 		formatColor.value.splice(index, 1, { color: { type: 'linear' }, selected: true, id: item.id });
// 		chartOption.value.color.splice(index, 1, formatColor.value[index].color);
// 	} else {
// 		formatColor.value.splice(index, 1, { color: colorMap.get(item.id) || 'transparent', selected: false, id: item.id });
// 	}
// }

function pureColorChange(color: string, index: number) {
	chartOption.value.color.splice(index, 1, color);
}

function pressEnter(e) {
	canvasOpt.height = e.target.value;
}

function onAddSeries() {
	const seriesLength = chartOption.value.series.length;
	const cloneSeries = cloneDeep(getChart[seriesType.value]().series[0]);
	cloneSeries.name = '系列' + (seriesLength + 1);
	chartOption.value.series.push(cloneSeries);
}

watch(
	() => seriesType.value,
	() => {
		chartOption.value = cloneDeep(getChart[seriesType.value](1));
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
	.ant-col {
		line-height: 26px;
	}
}
:deep .ant-collapse-header-text {
	width: 100%;
	display: flex;
	align-items: center;
	.ant-switch {
		margin-right: 10px;
	}
}
:deep .ant-input-number {
	width: 120px;
}
:deep .ant-select {
	min-width: 160px;
}

.chart-container {
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	.canvas-config {
		display: flex;
		justify-content: center;
		margin-bottom: 20px;
	}
	.chart-content {
		width: 100%;
		height: v-bind('canvasHeight');
		overflow: hidden;
		position: relative;
		.chart-wrap {
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			margin: auto;
			height: 100%; /* 填满容器高度 */
			width: 100%; /* 填满容器宽度 */
			background-color: v-bind('token.colorFillSecondary');
			transition: all 0.2s ease;
			overflow: hidden;
		}
		.aspect-1-1 {
			width: auto;
			height: 100%; /* 按比例调整宽度 */
			aspect-ratio: 1 / 1;
		}

		.aspect-4-3 {
			width: auto;
			height: 100%;
			aspect-ratio: 4 / 3;
		}

		.aspect-16-9 {
			width: auto;
			height: 100%;
			aspect-ratio: 16 / 9;
		}
		.aspect-21-9 {
			width: auto;
			height: 100%;
			aspect-ratio: 21 / 9;
		}
	}
}
.right-content {
	height: calc(100vh - 64px);
	padding: 20px;
	overflow-y: auto;
}
.setting-conatiner {
	padding: 20px;
}
</style>

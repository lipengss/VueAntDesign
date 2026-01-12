<template>
	<a-card :bodyStyle="{ padding: '14px' }">
		<a-row :gutter="[10, 10]" align="middle">
			<Axis :axis="xAxis" direction="xAxis" />
			<a-col :span="24">
				<a-collapse v-model="xAxisActiveKeys" expandIconPosition="right" @change="collapseChange">
					<a-collapse-panel key="xAxisLine" :collapsible="collapsible(xAxisLine.show)">
						<template #header> <a-switch size="small" v-model:checked="xAxisLine.show" @change="switchChange('xAxisLine')" /> X轴线 </template>
						<axisLine :axisLine="xAxisLine" />
					</a-collapse-panel>
					<a-collapse-panel key="xAxisTick" :collapsible="collapsible(xAxisTick.show)">
						<template #header> <a-switch size="small" v-model:checked="xAxisTick.show" @change="switchChange('xAxisTick')" /> X刻度 </template>
						<axisTick :axisTick="xAxisTick" />
					</a-collapse-panel>
					<a-collapse-panel key="xAxisLabel" :collapsible="collapsible(xAxisLabel.show)">
						<template #header> <a-switch size="small" v-model:checked="xAxisLabel.show" @change="switchChange('xAxisLabel')" /> 标签 </template>
						<a-row :gutter="[10, 10]" align="middle">
							<a-col :span="24">
								<FlexItem title="刻度标签格式化">
									<a-input v-model:value="xAxisLabel.formatter" placeholder="{value} kg" />
								</FlexItem>
							</a-col>
							<LabelStyle :label="xAxisLabel" />
						</a-row>
					</a-collapse-panel>
					<a-collapse-panel key="splitLine" :collapsible="collapsible(splitLine.show)">
						<template #header> <a-switch size="small" v-model:checked="splitLine.show" @change="switchChange('splitLine')" /> 分隔线 </template>
						<a-row :gutter="[10, 10]" align="middle">
							<LineStyle :lineStyle="splitLine.lineStyle" />
						</a-row>
					</a-collapse-panel>
				</a-collapse>
			</a-col>
			<a-col :span="24">
				<ArrayTable :data-source="xAxis.data" :columns="[{ title: '名称', key: 'value' }]">
					<template #color="{ data }">
						<popu-color v-model:color="data.itemStyle.color" />
					</template>
				</ArrayTable>
			</a-col>
		</a-row>
	</a-card>
</template>
<script setup lang="ts">
import { ref, computed } from 'vue';
import popuColor from '@/components/popuColor/popuColor.vue';
import { ArrayTable } from '@/components/ChartConfig/index';
import Axis from './axis.vue';
import axisLine from './axisLine.vue';
import axisTick from './axisTick.vue';
import { collapsible } from '@/utils/tools';
import FlexItem from '@/components/FlexItem/index.vue';
import { LineStyle, LabelStyle } from '@/components/ChartConfig/index';

import { useCollapseEvent } from '@/hooks/useCollapseEvent';

const props = defineProps(['chartOption']);

// -------------------- xAxis --------------------
const xAxis = computed(() => props.chartOption.xAxis);
const xAxisLine = computed(() => xAxis.value.axisLine);
const xAxisTick = computed(() => xAxis.value.axisTick);
const xAxisLabel = computed(() => xAxis.value.axisLabel);
const splitLine = computed(() => xAxis.value.splitLine);

const xAxisActiveKeys = ref<string[]>([]);
const [collapseChange, switchChange] = useCollapseEvent(xAxisActiveKeys);
</script>

<template>
	<a-card :bodyStyle="{ padding: '14px' }">
		<a-row :gutter="[10, 10]" align="middle">
			<Axis :axis="yAxis" direction="yAxis" />
			<a-col :span="24">
				<a-collapse v-model="yAxisActiveKeys" expandIconPosition="right" @change="collapseChange">
					<a-collapse-panel key="yAxisLine" :collapsible="collapsible(yAxisLine.show)">
						<template #header> <a-switch size="small" v-model:checked="yAxisLine.show" @change="switchChange('yAxisLine')" /> Y轴线 </template>
						<axisLine :axisLine="yAxisLine" />
					</a-collapse-panel>
					<a-collapse-panel key="yAxisTick" :collapsible="collapsible(yAxisTick.show)">
						<template #header> <a-switch size="small" v-model:checked="yAxisTick.show" @change="switchChange('yAxisTick')" /> Y刻度 </template>
						<axisTick :axisTick="yAxisTick" />
					</a-collapse-panel>
					<a-collapse-panel key="yAxisLabel" :collapsible="collapsible(yAxisLabel.show)">
						<template #header> <a-switch size="small" v-model:checked="yAxisLabel.show" @change="switchChange('yAxisLabel')" /> 标签 </template>
						<a-row :gutter="[10, 10]" align="middle">
							<a-col :span="24">
								<FlexItem title="刻度标签格式化">
									<a-input v-model:value="yAxisLabel.formatter" placeholder="{value} kg" />
								</FlexItem>
							</a-col>
							<LabelStyle :label="yAxisLabel" />
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
		</a-row>
	</a-card>
</template>
<script setup lang="ts">
import { ref, computed } from 'vue';
import Axis from './axis.vue';
import axisLine from './axisLine.vue';
import axisTick from './axisTick.vue';
import { collapsible } from '@/utils/tools';
import FlexItem from '@/components/FlexItem/index.vue';
import { LineStyle, LabelStyle } from '@/components/ChartConfig/index';

import { useCollapseEvent } from '@/hooks/useCollapseEvent';

const props = defineProps(['chartOption']);

// -------------------- yAxis --------------------
const yAxis = computed(() => props.chartOption.yAxis);
const yAxisLine = computed(() => yAxis.value.axisLine);
const yAxisTick = computed(() => yAxis.value.axisTick);
const yAxisLabel = computed(() => yAxis.value.axisLabel);
const splitLine = computed(() => yAxis.value.splitLine);

const yAxisActiveKeys = ref<string[]>([]);
const [collapseChange, switchChange] = useCollapseEvent(yAxisActiveKeys);
</script>

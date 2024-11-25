<template>
	<a-row :gutter="[10, 10]" align="middle">
		<a-col :span="24">
			<FlexItem title="轴线两边箭头">
				<a-select :options="formatStrArr(axisSymbol)" v-model:value="axisLine.symbol[0]" @change="onSymbolChange($event)" />
				<svg-icon :name="syncArrow ? 'link' : 'disconnection'" />
				<a-select :options="formatStrArr(axisSymbol)" v-model:value="axisLine.symbol[1]" @change="onSymbolChange($event)" />
				<a-tooltip title="同步设置">
					<a-checkbox v-model:checked="syncArrow" />
				</a-tooltip>
			</FlexItem>
		</a-col>
		<template v-if="axisLine.symbol.every((n) => n !== 'none')">
			<a-col :span="24">
				<FlexItem title="箭头大小">
					<a-input-number v-model:value="axisLine.symbolSize[0]" addonAfter="Y" />
					<a-input-number v-model:value="axisLine.symbolSize[1]" addonAfter="X" />
				</FlexItem>
			</a-col>
			<a-col :span="24">
				<FlexItem title="箭头偏移">
					<a-input-number v-model:value="axisLine.symbolOffset[0]" addonAfter="左" />
					<a-input-number v-model:value="axisLine.symbolOffset[1]" addonAfter="右" />
				</FlexItem>
			</a-col>
		</template>
		<LineStyle :lineStyle="axisLine.lineStyle" />
	</a-row>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import FlexItem from '@/components/FlexItem/index.vue';
import { LineStyle } from '@/components/ChartConfig/index';
import { axisSymbol, formatStrArr } from '@/components/ChartConfig/data';

const props = defineProps(['axisLine']);

const syncArrow = ref(true);

function onSymbolChange(val: string) {
	if (syncArrow.value) {
		props.axisLine.symbol[0] = val;
		props.axisLine.symbol[1] = val;
	}
}
</script>

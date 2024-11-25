<template>
	<a-row :gutter="[10, 10]" align="middle">
		<a-col :span="24">
			<FlexItem title="刻度线和标签对齐">
				<a-switch v-model:checked="axisTick.alignWithLabel" />
			</FlexItem>
		</a-col>
		<a-col :span="24">
			<FlexItem title="刻度朝内">
				<a-switch v-model:checked="axisTick.inside" />
			</FlexItem>
		</a-col>
		<a-col :span="24">
			<FlexItem title="刻度长度">
				<a-input-number v-model:value="axisTick.length" default-value="5" />
			</FlexItem>
		</a-col>
		<LineStyle :lineStyle="axisTick.lineStyle" />
	</a-row>
</template>
<script setup lang="ts">
import FlexItem from '@/components/FlexItem/index.vue';
import { LineStyle } from '@/components/ChartConfig/index';

defineProps(['axisTick']);
</script>

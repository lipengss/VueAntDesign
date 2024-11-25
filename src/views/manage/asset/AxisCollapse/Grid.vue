<template>
	<a-card :bodyStyle="{ padding: '14px' }">
		<a-row :gutter="[10, 10]" align="middle">
			<a-col :span="24">
				<flex-item title="显示直角坐标系网格">
					<a-switch size="small" v-model:checked="chartOption.grid.show" />
				</flex-item>
			</a-col>
			<a-col :span="24">
				<flex-item title="上侧距离">
					<NumType v-model:value="grid.top" />
				</flex-item>
			</a-col>
			<a-col :span="24">
				<flex-item title="下侧距离">
					<NumType v-model:value="grid.bottom" />
				</flex-item>
			</a-col>
			<a-col :span="24">
				<flex-item title="左侧距离">
					<NumType v-model:value="grid.left" />
				</flex-item>
			</a-col>
			<a-col :span="24">
				<flex-item title="右侧距离">
					<NumType v-model:value="grid.right" />
				</flex-item>
			</a-col>
			<a-col :span="24">
				<flex-item title="防止溢出">
					<a-switch size="small" v-model:checked="chartOption.grid.containLabel" />
				</flex-item>
			</a-col>
		</a-row>
	</a-card>
</template>
<script setup lang="ts">
import { computed } from 'vue';
import { NumType } from '@/components/ChartConfig/index';
import FlexItem from '@/components/FlexItem/index.vue';

const props = defineProps(['chartOption']);

const grid = computed(() => props.chartOption.grid);
</script>

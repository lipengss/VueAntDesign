<template>
	<a-collapse v-model="activeKeys" expandIconPosition="right" @change="collapseChange">
		<a-collapse-panel v-for="(ser, index) in series" :key="ser.id" :header="ser.name">
			<template #extra>
				<a-button v-if="index !== 0" type="primary" danger size="small" @click="onDelete($event, ser.id)">删除</a-button>
			</template>
			<a-row :gutter="[10, 10]" align="middle">
				<a-col :span="24">
					<flex-item title="禁用鼠标事件">
						<a-switch v-model:checked="ser.silent" />
					</flex-item>
				</a-col>
				<a-col :span="24">
					<flex-item title="系列名称">
						<a-input v-model:value="ser.name" allowClear />
					</flex-item>
				</a-col>
				<LabelStyle :label="ser.label" />
				<template v-if="ser.type === 'pie'">
					<a-col :span="24">
						<flex-item title="饼图半径">
							<a-space direction="vertical">
								<NumType v-model:value="ser.radius[0]" title="内径" />
								<NumType v-model:value="ser.radius[1]" title="外径" />
							</a-space>
						</flex-item>
					</a-col>
					<a-col :span="24">
						<flex-item title="饼图中心">
							<a-space direction="vertical">
								<NumType v-model:value="ser.center[0]" title="横坐标" />
								<NumType v-model:value="ser.center[1]" title="纵坐标" />
							</a-space>
						</flex-item>
					</a-col>
				</template>
			</a-row>
		</a-collapse-panel>
	</a-collapse>
</template>
<script setup lang="ts">
import { ref, computed } from 'vue';
import { NumType } from '@/components/ChartConfig/index.ts';
import FlexItem from '@/components/FlexItem/index.vue';
import LabelStyle from './LabelStyle.vue';

const props = defineProps(['chartOption']);

const series = computed(() => props.chartOption.series || []);

const activeKeys = ref<string[]>([]);

function onDelete(e, id: string) {
	e.stopPropagation();
	const index = series.value.findIndex((item: any) => item.id === id);
	series.value.splice(index, 1);
}

const switchChange = (axis: string) => {
	const index = activeKeys.value.findIndex((item: string) => item === axis);
	index !== -1 && activeKeys.value.splice(index, 1);
};
// 展开收起
const collapseChange = (keys: string[]) => {
	activeKeys.value = keys;
};
</script>

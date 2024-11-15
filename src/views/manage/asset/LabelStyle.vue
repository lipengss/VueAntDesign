<template>
	<a-collapse v-model="activeKeys" expandIconPosition="right" @change="collapseChange" style="width: 100%">
		<a-collapse-panel key="label" :disabled="!label.show">
			<template #header> <a-switch size="small" v-model:checked="label.show" @change="switchChange('label')" /> 文本标签 </template>
			<a-row :gutter="[10, 10]" align="middle">
				<TextStyle :textStyle="label" />
				<a-col :span="24">
					<FlexItem title="标签位置"> </FlexItem>
				</a-col>
			</a-row>
		</a-collapse-panel>
	</a-collapse>
</template>
<script setup lang="ts">
import { ref, computed } from 'vue';
import TitleStyle from './TitleStyle.vue';
import { Align, TextStyle } from '@/components/ChartConfig/index';
import FlexItem from '@/components/FlexItem/index.vue';

const props = defineProps(['label']);

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

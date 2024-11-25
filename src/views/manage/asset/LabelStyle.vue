<template>
	<a-collapse v-model="activeKeys" expandIconPosition="right" @change="collapseChange" style="width: 100%">
		<a-collapse-panel key="label" :collapsible="collapsible(label.show)">
			<template #header> <a-switch size="small" v-model:checked="label.show" @change="switchChange('label')" /> 文本标签 </template>
			<a-row :gutter="[10, 10]" align="middle">
				<TextStyle :textStyle="label" />
				<a-col :span="24">
					<FlexItem title="标签位置">
						<a-radio-group v-model:value="label.position" button-style="solid">
							<a-radio-button v-for="item in position" :value="item">{{ item }}</a-radio-button>
						</a-radio-group>
					</FlexItem>
				</a-col>
			</a-row>
		</a-collapse-panel>
		<a-collapse-panel v-if="labelLine" key="labelLine" :collapsible="collapsible(labelLine.show)">
			<template #header> <a-switch size="small" v-model:checked="labelLine.show" @change="switchChange('labelLine')" /> 标签引导线 </template>
			<a-row :gutter="[10, 10]" align="middle">
				<a-col :span="24">
					<FlexItem title="显示在图形上方">
						<a-switch v-model:checked="labelLine.showAbove" />
					</FlexItem>
				</a-col>
				<a-col v-if="seriesType === 'pie'" :span="24">
					<FlexItem title="引导线第一段的长度">
						<a-input-number size="small" v-model:value="labelLine.length" :min="15" :defaultValue="15" @change="onLengthChange" />
					</FlexItem>
				</a-col>
				<a-col v-if="['pie', 'line'].includes(seriesType)" :span="24">
					<FlexItem title="引导线第二段的长度">
						<a-input-number size="small" v-model:value="labelLine.length2" :min="15" :defaultValue="15" @change="onLength2Change" />
					</FlexItem>
				</a-col>
			</a-row>
		</a-collapse-panel>
	</a-collapse>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { TextStyle } from '@/components/ChartConfig/index';
import FlexItem from '@/components/FlexItem/index.vue';
import { storeToRefs } from 'pinia';
import { useAssetStore } from '@/stores/asset';
import { collapsible } from '@/utils/tools';
import { debounce } from 'lodash-es';

const { seriesType } = storeToRefs(useAssetStore());

const props = defineProps(['label', 'labelLine']);

const activeKeys = ref<string[]>([]);

const position = ['outside', 'inside', 'center'];

const onLengthChange = debounce(
	(val: null | number) => {
		if (val === null) {
			delete props.labelLine.length;
		}
	},
	1000,
	{ trailing: true }
);

const onLength2Change = debounce(
	(val: null | number) => {
		if (val === null) {
			delete props.labelLine.length2;
		}
	},
	1000,
	{ trailing: true }
);

// const length2 = ref(false);

// const isLength2 = computed(() => {
// 	const labelLine = props.labelLine;
// 	return labelLine && isObject(labelLine) && hasOwn(labelLine, 'length2');
// });

// watch(
// 	() => isLength2.value,
// 	(newValue) => {
// 		length2.value = newValue;
// 	},
// 	{
// 		immediate: true,
// 	}
// );

const switchChange = (axis: string) => {
	const index = activeKeys.value.findIndex((item: string) => item === axis);
	index !== -1 && activeKeys.value.splice(index, 1);
};
// 展开收起
const collapseChange = (keys: string[]) => {
	activeKeys.value = keys;
};
</script>

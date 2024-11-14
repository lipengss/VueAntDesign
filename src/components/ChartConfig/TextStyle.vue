<template>
	<a-col :span="24">
		<flex-item title="字体颜色">
			<popuColor v-model:color="props.textStyle.color" />
		</flex-item>
	</a-col>
	<a-col :span="24">
		<flex-item title="字体大小">
			<a-slider style="width: 80%" size="small" v-model:value="props.textStyle.fontSize" :max="60" />
			<a-input-number style="width: auto" v-model:value="props.textStyle.fontSize" size="small" />
		</flex-item>
	</a-col>
	<a-col :span="24">
		<flex-item title="字体粗细">
			<a-select v-model:value="props.textStyle.fontWeight" size="small" style="width: 100%">
				<a-select-option v-for="item in weights" :key="item.value" :value="item.value">{{ item.label }}</a-select-option>
			</a-select>
		</flex-item>
	</a-col>
</template>
<script setup lang="ts">
import FlexItem from '@/components/FlexItem/index.vue';
import popuColor from '@/components/popuColor/popuColor.vue';
import { weights } from './data';

const props = defineProps({
	textStyle: {
		type: Object,
		default: () => {},
	},
});
</script>

<template>
	<a-col :span="24">
		<flex-item title="字体大小">
			<a-slider style="width: 200px" v-model:value="textStyle.fontSize" :min="6" :max="60" :default-value="defaultFontSize" />
			<a-input-number style="width: 120px" v-model:value="textStyle.fontSize" :min="6" :max="60" :default-value="defaultFontSize">
				<template #addonAfter><svg-icon name="font-size" /></template>
			</a-input-number>
		</flex-item>
	</a-col>
	<a-col :span="24">
		<flex-item title="字体粗细">
			<a-select v-model:value="textStyle.fontWeight" placeholder="默认不加粗">
				<a-select-option v-for="item in weights" :key="item.value" :value="item.value">{{ item.label }}</a-select-option>
			</a-select>
		</flex-item>
	</a-col>
	<a-col :span="24">
		<flex-item title="字体颜色">
			<popuColor v-model:color="textStyle.color" />
		</flex-item>
	</a-col>
</template>
<script setup lang="ts">
import FlexItem from '@/components/FlexItem/index.vue';
import popuColor from '@/components/popuColor/popuColor.vue';
import { weights } from './data';

defineProps({
	textStyle: {
		type: Object,
		default: () => {},
	},
	defaultFontSize: {
		type: Number,
		default: 6,
	},
});
</script>

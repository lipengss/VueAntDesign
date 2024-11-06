<template>
	<SketchRule
		:thick="defailtRule.thick"
		v-model:scale="defailtRule.scale"
		:width="defailtRule.width"
		:height="defailtRule.height"
		:start-x="defailtRule.startX"
		:start-y="defailtRule.startY"
		:corner-active="true"
		:lines="defailtRule.lines"
		:palette="{
			bgColor: '#1a1a1a',
		}"
	/>
</template>
<script setup lang="ts">
import { computed, defineProps, reactive } from 'vue';
import SketchRule from 'vue3-sketch-ruler';
import 'vue3-sketch-ruler/lib/style.css';

const props = defineProps({
	ruler: { type: Object, default: () => {} },
});

const defailtRule = reactive({
	thick: 20,
	scale: 1,
	width: 1402,
	height: 600,
	startX: 0,
	startY: 0,
	lines: {
		h: [],
		v: [],
	},
});

const ruler = computed(() => {
	return {
		...defailtRule,
		...props.ruler,
	};
});
</script>
<style lang="less" scoped>
/deep/.indicator {
	.value {
		background-color: #0d0d0d;
	}
}
</style>

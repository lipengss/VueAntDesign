<template>
	<div class="preview" :style="canvasStyle" loading>
		<template v-for="item in componentData" :key="item.id">
			<component :is="item.component" :style="formatStyle(item.bases, [])" :prop-value="item.propValue" :element="item" />
		</template>
	</div>
</template>
<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { formatStyle } from '@/utils/tools';
import { useRoute } from 'vue-router';
import autofit from 'autofit.js';

const { query } = useRoute();

const canvasStyle = computed(() => {
	const pageDataStr = query.canvasStyle;
	if (typeof pageDataStr === 'string') {
		const sty = JSON.parse(pageDataStr);
		return sty;
	}
	return {};
});

const componentData = computed(() => {
	const data = query.componentData;
	if (typeof data === 'string') {
		return Array.isArray(JSON.parse(data)) ? JSON.parse(data) : [];
	}
	return [];
});

const autoFilOption = computed(() => {
	const { width, height }: any = query.canvasStyle;
	return {
		el: '#app',
		dw: !width ? 1920 : parseInt(width),
		dh: !height ? 911 : parseInt(height),
	};
});

onMounted(() => {
	autofit.init(autoFilOption.value, false);
});
</script>
<style lang="less" scoped></style>

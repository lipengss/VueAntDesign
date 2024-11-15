<template>
	<v-chart class="chart" :option="defaultOption" :update-options="{ notMerge: true }" />
</template>

<script setup>
import { ref, provide, watchEffect, watch } from 'vue';
import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { PieChart } from 'echarts/charts';
import { TitleComponent, TooltipComponent, LegendComponent } from 'echarts/components';
import VChart, { THEME_KEY } from 'vue-echarts';
import { mergeWith } from 'lodash-es';

use([CanvasRenderer, PieChart, TitleComponent, TooltipComponent, LegendComponent]);

provide(THEME_KEY, 'light');

const props = defineProps(['option']);

const defaultOption = ref({
	series: [],
});

function isObject(obj) {
	return Object.prototype.toString.call(obj) === '[object Object]';
}

// 判断这个对象是否有这个属性
function hasOwn(obj, key) {
	return Object.prototype.hasOwnProperty.call(obj, key);
}

watchEffect(() => {
	mergeWith(defaultOption.value, props.option, (objValue, srcValue) => {
		if (Array.isArray(objValue)) {
			return srcValue;
		} else if (isObject(srcValue) && hasOwn(srcValue, 'show')) {
			return srcValue.show ? srcValue : { show: false };
		}
	});
});
</script>

<style scoped>
.chart {
	height: 100%;
}
</style>

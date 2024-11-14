<template>
	<v-chart class="chart" :option="defaultOption" />
</template>

<script setup>
import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { PieChart } from 'echarts/charts';
import { TitleComponent, TooltipComponent, LegendComponent } from 'echarts/components';
import VChart, { THEME_KEY } from 'vue-echarts';
import { ref, provide, watchEffect } from 'vue';
import { mergeWith } from 'lodash-es';

use([CanvasRenderer, PieChart, TitleComponent, TooltipComponent, LegendComponent]);

provide(THEME_KEY, 'light');

const props = defineProps({
	option: {
		type: Object,
		default: () => {},
	},
});

const defaultOption = ref({
	series: [
		{
			name: 'Traffic Sources',
			type: 'pie',
			radius: ['55%', '70%'],
			center: ['50%', '50%'],
			label: {
				color: '#fff',
			},
			data: [
				{ value: 335, name: 'Direct' },
				{ value: 310, name: 'Email' },
				{ value: 234, name: 'Ad Networks' },
				{ value: 135, name: 'Video Ads' },
				{ value: 1548, name: 'Search Engines' },
			],
			emphasis: {
				itemStyle: {
					shadowBlur: 10,
					shadowOffsetX: 0,
					shadowColor: 'rgba(0, 0, 0, 0.5)',
				},
			},
		},
	],
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
	console.log(defaultOption.value);
});
</script>

<style scoped>
.chart {
	height: 100%;
}
</style>

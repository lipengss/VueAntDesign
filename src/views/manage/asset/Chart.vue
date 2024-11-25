<template>
	<v-chart class="chart" :option="option" :update-options="{ notMerge: true }" autoresize />
</template>

<script setup>
import { ref, provide, watchEffect, watch } from 'vue';
import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { PieChart, BarChart } from 'echarts/charts';
import { TitleComponent, TooltipComponent, LegendComponent, ToolboxComponent, GridComponent, DatasetComponent } from 'echarts/components';
import VChart, { THEME_KEY } from 'vue-echarts';
import { mergeWith } from 'lodash-es';

use([CanvasRenderer, PieChart, BarChart, GridComponent, TitleComponent, TooltipComponent, DatasetComponent, ToolboxComponent, LegendComponent]);

provide(THEME_KEY, 'light');

const props = defineProps(['option']);
</script>

<style scoped>
.chart {
	height: 100%;
}
</style>

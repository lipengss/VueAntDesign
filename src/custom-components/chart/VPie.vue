<template>
	<v-chart class="chart" :option="option" autoresize />
</template>

<script setup>
import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { PieChart } from 'echarts/charts';
import { TitleComponent, TooltipComponent, LegendComponent, GridComponent, DatasetComponent } from 'echarts/components';
import VChart, { THEME_KEY } from 'vue-echarts';
import { ref, provide } from 'vue';

use([CanvasRenderer, PieChart, GridComponent, DatasetComponent, TitleComponent, TooltipComponent, LegendComponent]);

provide(THEME_KEY, 'light');

defineProps(['option']);
</script>

<style scoped>
.chart {
	height: 100%;
}
</style>

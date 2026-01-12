<template>
	<div class="global">
		<a-row align="middle" :gutter="[10, 10]" style='width:100%'>
			<a-col :span="6">legend</a-col>
			<a-col :span="18">
				<a-switch v-model:checked="legend.show" size="small" @change="legendChange" />
			</a-col>
			<template v-if="legend.show">
				<a-col :span="6">图形宽度</a-col>
				<a-col :span="10">
					<a-slider size="small" v-model:value="legend.itemWidth" :max="60" />
				</a-col>
				<a-col :span="8">
					<a-input-number v-model:value="legend.itemWidth" size="small" />
				</a-col>
				<a-col :span="6">图形高度</a-col>
				<a-col :span="10">
					<a-slider size="small" v-model:value="legend.itemHeight" :max="60" />
				</a-col>
				<a-col :span="8">
					<a-input-number v-model:value="legend.itemHeight" size="small" />
				</a-col>
				<a-col :span="6">排列方式</a-col>
				<a-col :span="18">
					<a-radio-group v-model:value="legend.orient" size="small">
						<a-radio-button value="horizontal">水平</a-radio-button>
						<a-radio-button value="vertical">垂直</a-radio-button>
					</a-radio-group>
				</a-col>
				<a-col :span="6">图形类型</a-col>
				<a-col :span="18">
					<a-select v-model:value="legend.icon" style="width: 100%" size="small">
						<a-select-option v-for="item in legendType" :key="item" :value="item">{{ item }}</a-select-option>
					</a-select>
				</a-col>
				<a-col :span="6">水平对齐</a-col>
				<a-col :span="18">
					<a-radio-group v-model:value="legend.left" size="small">
						<a-radio-button value="left"><svg-icon name="left-align" /></a-radio-button>
						<a-radio-button value="center"><svg-icon name="center-align" /></a-radio-button>
						<a-radio-button value="right"><svg-icon name="right-align" /></a-radio-button>
					</a-radio-group>
				</a-col>
				<a-col :span="6">垂直对齐</a-col>
				<a-col :span="18">
					<a-radio-group v-model:value="legend.top" size="small">
						<a-radio-button value="top"><svg-icon name="top-align" /></a-radio-button>
						<a-radio-button value="middle"><svg-icon name="middle-align" /></a-radio-button>
						<a-radio-button value="bottom"><svg-icon name="bottom-align" /></a-radio-button>
					</a-radio-group>
				</a-col>
				<a-col :span="6">字体颜色</a-col>
				<a-col :span="18">
					<popuColor v-model:color="legend.textStyle.color" />
				</a-col>
				<a-col :span="6">字体大小</a-col>
				<a-col :span="10">
					<a-slider style="width: 100%" size="small" v-model:value="legend.textStyle.fontSize" :max="60" />
				</a-col>
				<a-col :span="8">
					<a-input-number v-model:value="legend.textStyle.fontSize" size="small" />
				</a-col>
				<a-divider />
			</template>
		</a-row>
	</div>
</template>
<script setup lang="ts">
import { legendType } from '@/components/ChartConfig/data';
import popuColor from '@/components/popuColor/popuColor.vue';
import { computed } from 'vue';
import { Chart } from '@/custom-components/chart'
import { storeToRefs } from 'pinia';
import { useComponentStore } from '@/stores/component';

const { curComponent } = storeToRefs(useComponentStore())

const chart = new Chart()

const legend = computed(() => curComponent.value.bases.chart.legend)

function legendChange(check:Boolean) {
  curComponent.value.bases.chart.legend = check ? { ...chart.legend} : { show: false }
}
</script>


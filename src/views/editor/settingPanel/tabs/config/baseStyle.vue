<template>
	<div>
		<Divider title="基础样式" />
		<a-row align="middle" :gutter="[10, 10]">
			<a-col :span="6">图表尺寸</a-col>
			<a-col :span="18">
				<a-flex gap="small">
					<input-number v-model:value="bases.width" prefix="W"  />
					<input-number v-model:value="bases.height" prefix="H" />
				</a-flex>
			</a-col>
			<template v-if="bases.chart">
				<a-col :span="6">背景颜色</a-col>
				<a-col :span="18">
					<popuColor v-model:color="bases.chart.backgroundColor" />
				</a-col>
			</template>
			<a-col :span="6" class="name">图表位置</a-col>
			<a-col :span="18">
				<a-flex gap="small">
					<input-number v-model:value="bases.translateX" prefix="X" />
					<input-number v-model:value="bases.translateY" prefix="Y" />
				</a-flex>
			</a-col>
			<a-col :span="6" class="name">旋转角度</a-col>
			<a-col :span="9">
				<input-number v-model:value="bases.rotate" prefix="°" />
			</a-col>
			<a-col :span="9">
				<a-flex gap="small">
					<a-button size="small" class="icon-btn"><svg-icon name="horizontal" /></a-button>
					<a-button size="small" class="icon-btn"><svg-icon name="vertical" /></a-button>
				</a-flex>
			</a-col>
			<a-col :span="6" class="name">不透明度</a-col>
			<a-col :span="18">
				<a-flex gap="small">
					<a-slider style="width: 100%" v-model:value="bases.opacity" :min="0" :max="1" :step="0.1" />
					<input-number v-model:value="bases.opacity" :min="0" :max="1" :step="0.1" :dragSensitivity="1" />
				</a-flex>
			</a-col>
		</a-row>
	</div>
</template>
<script setup lang="ts">
import { computed } from 'vue';
import Divider from '@/components/Divider/Divider.vue';
import popuColor from '@/components/popuColor/popuColor.vue';
import { useComponentStore } from '@/stores/component';
import { storeToRefs } from 'pinia';

const { curComponent } = storeToRefs(useComponentStore());

const bases = computed(() => curComponent.value.bases);


</script>

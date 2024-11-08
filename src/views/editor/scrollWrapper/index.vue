<template>
	<div class="wrapper" :style="wrapperStyle">
		<sketch-ruler v-model:scale="canvasOption.scale" v-bind="canvasOption" :palette="cpuPalette">
			<template #default>
				<div data-type="page" :style="canvasStyle" @mousedown="handleMouseDown"></div>
			</template>
			<!-- <template #btn="{ reset, zoomIn, zoomOut }">
				<div class="bot-footer">
					<button @click.stop="reset">还原</button>
					<button @click.stop="zoomIn">放大</button>
					<button @click.stop="zoomOut">缩小</button>
				</div>
			</template> -->
		</sketch-ruler>
	</div>
</template>
<script setup lang="ts">
// import ruler from './ruler/index.vue';
// import VCanvas from '../canvas/canvas.vue';
import { computed, nextTick, onMounted } from 'vue';
import SketchRuler from 'vue3-sketch-ruler';
import type { PaletteType } from 'vue3-sketch-ruler';
import 'vue3-sketch-ruler/lib/style.css';
import { storeToRefs } from 'pinia';
import { useCanvasStore } from '@/stores/canvas';
import elementResizeDetectorMaker from 'element-resize-detector';

const { canvasOption } = storeToRefs(useCanvasStore());

const cpuPalette = computed<PaletteType>(() => {
	return false
		? {
				bgColor: 'transparent',
				hoverBg: '#fff',
				bb: '#fff',
				hoverColor: '#000',
				longfgColor: '#BABBBC', // ruler longer mark color
				fontColor: '#DEDEDE', // ruler font color
				shadowColor: '#525252', // ruler shadow color
				lineColor: '#51d6a9',
				borderColor: '#B5B5B5',
		  }
		: {
				bgColor: 'transparent',
				lineColor: '#51d6a9',
				lineType: 'dashed',
		  };
});

const canvasStyle = computed(() => {
	const { canvasWidth, canvasHeight, backgroundColor } = canvasOption.value;
	return {
		width: `${canvasWidth}px`,
		height: `${canvasHeight}px`,
		backgroundColor,
	};
});

const wrapperStyle = computed(() => {
	const { width, height } = canvasOption.value;
	return {
		width: `${width}px`,
		height: `${height}px`,
	};
});

function initDomRect() {
	nextTick(() => {
		const { clientWidth, clientHeight }: any = document.querySelector('.layout-content');
		canvasOption.value.width = clientWidth;
		canvasOption.value.height = clientHeight;
	});
}

onMounted(() => {
	initDomRect();
	let erd = elementResizeDetectorMaker();
	erd.listenTo(document.querySelector('.layout-content'), function (element: any) {
		canvasOption.value.width = element.clientWidth;
		canvasOption.value.height = element.clientHeight;
	});
});

const handleMouseDown = (e: MouseEvent) => {
	console.log('handleMouseDown', e);
};
</script>
<style lang="less" scoped>
.wrapper {
	flex: 1;
	// background: url(@/assets/point_bg.png);
	.bot-footer {
		width: 100%;
		height: 30px;
		flex-shrink: 0;
		display: flex;
		align-items: center;
		justify-content: flex-end;
		padding: 0 4px;
		border-top: 1px solid #000;
		background-color: #222528;
		.mg-r {
			margin-right: 10px;
		}
	}
}
</style>

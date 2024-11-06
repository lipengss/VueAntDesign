<template>
	<div class="wrapper">
		<SketchRuler
			v-model:scale="canvasStyleData.scale"
			:width="canvasStyleData.width"
			v-bind="post"
			:height="canvasStyleData.height"
			:palette="cpuPalette"
		>
			<template #default>
				<div data-type="page" :style="canvasStyle" @mousedown="handleMouseDown"></div>
			</template>
			<template #btn="{ reset, zoomIn, zoomOut }">
				<div class="btns">
					<button @click.stop="reset">还原</button>
					<button @click.stop="zoomIn">放大</button>
					<button @click.stop="zoomOut">缩小</button>
				</div>
			</template>
		</SketchRuler>
	</div>
</template>
<script setup lang="ts">
import ruler from './ruler/index.vue';
import VCanvas from '../canvas/canvas.vue';
import SketchRuler from 'vue3-sketch-ruler';
import type { PaletteType } from 'vue3-sketch-ruler';
import { computed, nextTick, onMounted, reactive } from 'vue';
import { storeToRefs } from 'pinia';
import { useComponentStore } from '@/stores/component';
import elementResizeDetectorMaker from 'element-resize-detector';
import type { PanzoomEventDetail, PanzoomEvent } from 'simple-panzoom';

const { canvasStyleData } = storeToRefs(useComponentStore());
const stateData: any = reactive({
	wrapper: {
		width: 0,
		height: 0,
	},
	canvas: {
		thick: 20,
		startX: 0,
		startY: 0,
	},
	isSpace: false,
});

const panzoomOption = reactive({
	canvas: true,
	maxScale: 3,
	minScale: 0.3,
	// startX: 0,   // 画布距离左边框距离, 如果想自动,那么不要传
	// startY: 0,   // 画布距离顶边框距离, 如果想自动,那么不要传
	disablePan: false,
	disableZoom: false,
	contain: 'none', // 'inside' | 'outside' | 'none'
	handleStartEvent: (event: PanzoomEvent['panzoomstart']) => {
		event.preventDefault();
		console.log('handleStartEvent', event);
	},
});

const post = reactive({
	thick: 20,
	width: 1470,
	height: 750,
	showShadowText: false,
	canvasWidth: 1920,
	canvasHeight: 1080,
	showRuler: true,
	snapsObj: { h: [0, 100, 200], v: [130] },
	shadow: {
		x: 0,
		y: 0,
		width: 300,
		height: 300,
	},
	panzoomOption: panzoomOption,
	isShowReferLine: true,
	lines: {
		h: [0, 250],
		v: [0, 500],
	},
});

const cpuPalette = computed<PaletteType>(() => {
	return true
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
	return {
		width: `${post.canvasWidth}px`,
		height: `${post.canvasHeight}px`,
	};
});

const handleMouseDown = (e: MouseEvent) => {
	console.log('handleMouseDown', e);
};
</script>
<style lang="less" scoped>
.wrapper {
	flex: 1;
	// width: 100%;
	// height: 100%;
	// position: relative;
	// box-sizing: border-box;
	// .scroll-wrapper {
	// 	position: absolute;
	// 	left: 22px;
	// 	top: 22px;
	// 	right: 0;
	// 	bottom: 0;
	// 	overflow: scroll;
	// 	&::-webkit-scrollbar {
	// 		width: 4px;
	// 		height: 4px;
	// 	}
	// 	&::-webkit-scrollbar-thumb {
	// 		border-radius: 6px;
	// 		background-color: #666;
	// 	}
	// 	&::-webkit-scrollbar-track {
	// 		box-shadow: inset 0 0 5px #434b55;
	// 		border-radius: 6px;
	// 	}
	// 	&::-webkit-scrollbar-corner {
	// 		box-shadow: inset 0 0 5px #434b55;
	// 	}
	// 	.big-wrapper {
	// 		width: 10000px;
	// 		height: 8000px;
	// 		position: absolute;
	// 		left: 0;
	// 		top: 0;
	// 		background: url(../../../assets/point_bg.png) repeat;
	// 		.canvas {
	// 			position: absolute;
	// 			left: 50%;
	// 			top: 50%;
	// 			transform: translate(-150px, -100px);
	// 			transform-origin: center;
	// 			background-color: rgba(0, 0, 0, 0.5);
	// 		}
	// 		.space {
	// 			width: 100%;
	// 			height: 100%;
	// 			position: absolute;
	// 			left: 0;
	// 			top: 0;
	// 			z-index: 10;
	// 		}
	// 	}
	// }
}
</style>

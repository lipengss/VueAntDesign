<template>
	<div class="wrapper" :style="ruleWrapperStyle">
		<sketch-ruler ref="sketchruleRef" v-model:scale="canvasOption.scale" v-bind="canvasOption" :palette="palette">
			<template #default>
				<VCanvas @drop="handleDrop" />
			</template>
			<template #btn="{ reset, zoomIn, zoomOut }">
				<div class="bot-footer">
					<a-button shape="circle" type="text" @click.stop="reset" title="复位画布">
						<template #icon><ExpandOutlined /></template>
					</a-button>
					<a-button shape="circle" type="text" @click.stop="zoomIn" title="放大画布">
						<template #icon><ZoomInOutlined style="font-size: 16px" /></template>
					</a-button>
					<a-slider style="width: 130px" :min="0.3" :max="3" :step="0.1" v-model:value="canvasOption.scale" @change="onChange" />
					<a-button shape="circle" type="text" @click.stop="zoomOut" title="缩小画布">
						<template #icon><ZoomOutOutlined style="font-size: 16px" /></template>
					</a-button>
				</div>
			</template>
		</sketch-ruler>
	</div>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue';
import SketchRuler from 'vue3-sketch-ruler';
import 'vue3-sketch-ruler/lib/style.css';
import { storeToRefs } from 'pinia';
import { useCanvasStore } from '@/stores/canvas';
import { useComponentStore } from '@/stores/component';
import { allComponentData } from '@/custom-components/componentData';
import { ZoomInOutlined, ZoomOutOutlined, ExpandOutlined } from '@ant-design/icons-vue';
import elementResizeDetectorMaker from 'element-resize-detector';
import { cloneDeep } from 'lodash-es';
import VCanvas from './canvas.vue';
import { theme } from 'ant-design-vue';
import { nanoid } from 'nanoid';

const { token } = theme.useToken();

const { addComponentData } = useComponentStore();
const { canvasOption, palette, ruleWrapperStyle } = storeToRefs(useCanvasStore());

const sketchruleRef = ref();

function onChange() {
	if (sketchruleRef.value) {
		const panzoomInstance = sketchruleRef.value.panzoomInstance;
		panzoomInstance.zoom(canvasOption.value.scale);
	}
}

// 释放组件
function handleDrop(e: any) {
	const transfer = e.dataTransfer;
	const index = transfer.getData('index').split('_');
	const downOffsetX = transfer.getData('downOffsetX');
	const downOffsetY = transfer.getData('downOffsetY');
	const curSide = allComponentData[index[0]];
	const component =
		curSide.clas === 'tab' && curSide.tabs ? cloneDeep(curSide.tabs[index[1]].components[index[2]]) : cloneDeep(curSide.components[index[1]]);
	component.id = 'component_' + nanoid();
	component.offsetX = downOffsetX;
	component.offsetY = downOffsetY;
	component.bases.transform = `translate(${e.offsetX - downOffsetX}px, ${e.offsetY - downOffsetY}px)`;
	addComponentData({ component });
}

onMounted(() => {
	let erd = elementResizeDetectorMaker();
	erd.listenTo(document.querySelector('.layout-content'), function (element: any) {
		canvasOption.value.width = element.clientWidth;
		canvasOption.value.height = element.clientHeight;
	});
});
</script>
<style lang="less" scoped>
.wrapper {
	flex: 1;
	.bot-footer {
		width: 100%;
		height: 34px;
		position: absolute;
		bottom: 0;
		left: 0;
		z-index: 100;
		border-top: 1px solid v-bind('token.colorBorder');
		background-color: v-bind('token.colorBgBase');
		flex-shrink: 0;
		display: flex;
		align-items: center;
		justify-content: flex-end;
		padding: 0 4px;
		.mg-r {
			margin-right: 10px;
		}
		:deep .ant-btn:hover {
			transform: scale(1.2);
			background-color: transparent !important;
		}
	}
}
.whitewrapper {
	background-color: #fafafc;
	background-image: linear-gradient(#fafafc 20px, transparent 0), linear-gradient(90deg, transparent 20px, #373739 0);
}
.balckwrapper {
	background-color: #18181c;
	background-image: linear-gradient(#18181c 20px, transparent 0), linear-gradient(90deg, transparent 20px, #86909c 0);
}
</style>

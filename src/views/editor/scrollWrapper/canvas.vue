<template>
	<div data-type="page" class="editor" ref="editorRef" :style="canvasStyle" @mousedown="handleMouseDown">
		<div
			v-for="item in componentData"
			:class="['shape']"
			:id="item.id"
			:key="item.id"
			@mousedown="handleMouseDownShape($event, item)"
			:style="getShapeStyle(item.boxStyle)"
		>
			<component :is="item.component" :option="item.chartOption" :style="getComponentStyle(item.boxStyle)" />
		</div>
		<Moveable
			className="moveable"
			:container="editorRef"
			:target="isTarget"
			:resizable="true"
			:draggable="true"
			:rotatable="true"
			:zoom="0.5"
			:isDisplaySnapDigit="true"
			:snappable="true"
			:snapThreshold="5"
			:snapVertical="true"
			:snapHorizontal="true"
			:elementSnapDirections="true"
			:horizontalGuidelines="[0, 200, 400]"
			:verticalGuidelines="[0, 200, 400]"
			:elementGuidelines="elementGuidelines"
			@drag="onDrag"
			@resize="onResize"
			@rotate="onRotate"
			@mousedown="handleMouseDownShape($event, curComponent)"
		/>
	</div>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import Moveable from 'vue3-moveable';
import { storeToRefs } from 'pinia';
import { useComponentStore } from '@/stores/component';
import { useCanvasStore } from '@/stores/canvas';

const { componentData, curComponent, isTarget } = storeToRefs(useComponentStore());
const { setCurComponent, setTargets } = useComponentStore();
const { canvasStyle, canvasOption } = storeToRefs(useCanvasStore());

const editorRef = ref(null);
const elementGuidelines: any = ref([]);
onMounted(() => {
	initElementGuidelines();
});

const handleMouseDown = (e: MouseEvent) => {
	console.log('handleMouseDown', e);
};
function initElementGuidelines() {
	const arr: any = [];
	const ids: any = componentData.value.map((item: any) => item.id);
	ids.forEach((id: string) => {
		arr.push(document.querySelector(`#${id}`));
	});
	elementGuidelines.value = arr;
}
// 鼠标摁下
function handleMouseDownShape(e: any, component: ComponentItem) {
	e.preventDefault();
	e.stopPropagation();
	initElementGuidelines();
	const {
		offsetX,
		offsetY,
		boxStyle: { width, height },
	} = component;
	canvasOption.value.shadow.x = offsetX;
	canvasOption.value.shadow.y = offsetY;
	canvasOption.value.shadow.width = width;
	canvasOption.value.shadow.height = height;
	setCurComponent(component);
	setTargets([`#${component.id}`]);
}
// 移动
function onDrag(e: any) {
	const currentNode: any = document.querySelector(`${isTarget.value}`);
	currentNode.style.transform = e.transform;
	curComponent.value.boxStyle.transform = e.transform;
	curComponent.value.boxStyle.transformNum = e.translate;
}
// 旋转
function onRotate({ drag }: any) {
	curComponent.value.boxStyle.transform = `${drag.transform}`;
	curComponent.value.boxStyle.transformNum = drag.translate;
}
// 重置大小
function onResize(e: any) {
	e.target.style.width = e.width + 'px';
	e.target.style.height = e.height + 'px';
	e.target.style.transform = e.drag.transform;
	curComponent.value.boxStyle.width = e.width;
	curComponent.value.boxStyle.height = e.height;
	curComponent.value.boxStyle.transform = e.drag.transform;
}
// 组件样式
const getComponentStyle = (style: any) => {
	const result: any = {};
	const needUnit = ['opacity'];
	Object.keys(style).forEach((key: string) => {
		if (needUnit.includes(key)) {
			result[key] = style[key];
		}
	});
	return result;
};
// 位置
const getShapeStyle = (style: any): any => {
	const result: BaseStyle = {};
	const arr = ['width', 'height', 'transform', 'opacity'];
	arr.forEach((attr) => {
		if (attr !== 'transform') {
			result[attr] = style[attr] + 'px';
		} else {
			result.transform = style[attr];
		}
	});
	return result;
};
</script>
<style lang="less" scoped>
.editor {
	height: 100%;
	.shape {
		position: relative;
		&::before {
			content: '';
			width: 100%;
			height: 100%;
			position: absolute;
			left: 0;
			top: 0;
		}
	}
}
</style>

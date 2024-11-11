<template>
	<div data-type="page" class="editor" ref="editorRef" :style="canvasStyle" @mousedown="handleMouseDown">
		<div
			v-for="(item, index) in componentData"
			:class="['shape']"
			:id="item.id"
			:key="item.id"
			@mousedown="handleMouseDownShape($event, item, index)"
			:style="getShapeStyle(item.bases)"
		>
			<component :is="item.component" :element="item" :style="getComponentStyle(item.bases)" />
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
			@mousedown="handleMouseDownShape($event, curComponent, curComponentIndex)"
		/>
	</div>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import Moveable from 'vue3-moveable';
import { storeToRefs } from 'pinia';
import { useComponentStore } from '@/stores/component';
import { useCanvasStore } from '@/stores/canvas';

const { componentData, curComponent, curComponentIndex, isTarget } = storeToRefs(useComponentStore());
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
	ids.forEach((item: string) => {
		arr.push(document.querySelector(`#${item}`));
	});
	elementGuidelines.value = arr;
}
// 鼠标摁下
function handleMouseDownShape(e: any, component: ComponentItem, index: number) {
	e.preventDefault();
	e.stopPropagation();
	initElementGuidelines();
	console.log('component', component);
	const {
		offsetX,
		offsetY,
		bases: { width, height },
	} = component;
	canvasOption.value.shadow.x = offsetX;
	canvasOption.value.shadow.y = offsetY;
	canvasOption.value.shadow.width = width;
	canvasOption.value.shadow.height = height;
	setCurComponent({ component: component, index: index });
	setTargets([`#${component.id}`]);
}
// 移动
function onDrag(e: any) {
	const currentNode: any = document.querySelector(`${isTarget.value}`);
	currentNode.style.transform = e.transform;
	curComponent.value.bases.transform = e.transform;
	curComponent.value.bases.transformNum = e.translate;
}
// 旋转
function onRotate({ drag }: any) {
	curComponent.value.bases.transform = `${drag.transform}`;
	curComponent.value.bases.transformNum = drag.translate;
}
// 重置大小
function onResize(e: any) {
	e.target.style.width = e.width + 'px';
	e.target.style.height = e.height + 'px';
	e.target.style.transform = e.drag.transform;
	curComponent.value.bases.width = e.width;
	curComponent.value.bases.height = e.height;
	curComponent.value.bases.transform = e.drag.transform;
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

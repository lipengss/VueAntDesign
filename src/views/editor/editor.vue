<template>
	<a-layout class="manage-layout">
		<header-tool-bar />
		<a-layout class="main">
			<layer-panel />
			<component-panel />
			<a-layout-content
				class="layout-content"
				@drop="handleDrop"
				@dragover="handleDragOver"
				@mousedown="handleMouseDown"
				@mouseup="deselectCurComponent"
			>
				<scroll-wrapper />
				<!-- <footer-tool-bar /> -->
			</a-layout-content>
			<setting-panel />
		</a-layout>
		<source-code />
	</a-layout>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useComponentStore } from '@/stores/component';
import { useRoute } from 'vue-router';
import { notification } from 'ant-design-vue';
import { uniqueId, cloneDeep } from 'lodash-es';
import headerToolBar from './headerToolBar/index.vue';
import layerPanel from './layerPanel/index.vue';
import componentPanel from './componentPanel/index.vue';
import settingPanel from './settingPanel/index.vue';
import scrollWrapper from './scrollWrapper/index.vue';
import sourceCode from './sourceCode/index.vue';
import footerToolBar from '@/views/editor/footerToolBar/index.vue';
import { componentData } from '@/custom-components/componentData';

const { params } = useRoute();
const spinning = ref(false);
// const { state, commit } = useStore();

const { canvasStyleData, isTarget } = storeToRefs(useComponentStore());
const { addComponentData, setTargets, setCurComponent, clearComponent, setCanvasStyleData } = useComponentStore();

// 释放组件
function handleDrop(e: any) {
	const transfer = e.dataTransfer;
	const index = transfer.getData('index').split('_');
	const downOffsetX = transfer.getData('downOffsetX');
	const downOffsetY = transfer.getData('downOffsetY');
	const curSide = componentData[index[0]];
	const component = curSide.clas === 'tab' ? cloneDeep(curSide.tabs[index[1]].components[index[2]]) : cloneDeep(curSide.components[index[1]]);
	component.id = uniqueId('component_');
	console.log(`translate(${e.offsetX - downOffsetX}px, ${e.offsetY - downOffsetY}px)`);
	component.bases.transform = `translate(${e.offsetX - downOffsetX}px, ${e.offsetY - downOffsetY}px)`;
	addComponentData(component);
}
// // 组件在目标区域中移动时触发
function handleDragOver(e: any) {
	e.preventDefault();
	e.dataTransfer.dropEffect = 'copy';
}
// 鼠标按下事件
function handleMouseDown(e): void {
	console.log('触发大盒子的鼠标摁下事件了');
	e.stopPropagation();
	e.preventDefault();
	setTargets([]);
}
// 鼠标抬起事件
function deselectCurComponent(): void {
	console.log('触发大盒子的鼠标抬起事件了', isTarget.value.length);
	if (!isTarget.value.length) {
		setTargets([]);
		setCurComponent({ component: null, index: 0 });
	}
}
// 获取数据
function getData() {
	clearComponent();
	spinning.value = true;
	fetch(`api/product/${params.id}`).then(
		async (res) => {
			spinning.value = false;
			const { code, data, desc } = await res.json();
			if (code !== 0) return notification['error']({ message: '接口报错', duration: 6, description: desc });
			data.components.forEach((component: any) => {
				addComponentData(component);
			});
			for (const key in data.pageData) {
				if (Object.prototype.hasOwnProperty.call(canvasStyleData.value, key)) {
					setCanvasStyleData({ key: key, value: data.pageData[key] });
				}
			}
		},
		() => {}
	);
}
getData();
</script>
<style lang="less" scoped>
.manage-layout {
	height: 100vh;
	overflow: hidden;
	box-sizing: border-box;
	.main {
		flex: 1;
		width: 100%;
		.layout-content {
			display: flex;
			flex-direction: column;
			overflow: hidden;
		}
	}
}
.drawer-scroll {
	height: calc(100vh - 103px);
	overflow-y: scroll;
}
</style>

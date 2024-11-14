<template>
	<a-layout class="manage-layout">
		<header-tool-bar />
		<a-layout class="main">
			<layer-panel />
			<component-panel />
			<a-layout-content class="layout-content" @dragover="handleDragOver" @mousedown="handleMouseDown" @mouseup="deselectCurComponent">
				<scroll-wrapper />
			</a-layout-content>
			<setting-panel />
		</a-layout>
		<source-code />
	</a-layout>
</template>
<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { storeToRefs } from 'pinia';
import { useProductStore } from '@/stores/product';
import { useComponentStore } from '@/stores/component';
import { useRoute } from 'vue-router';
import { notification } from 'ant-design-vue';
import headerToolBar from './headerToolBar/index.vue';
import layerPanel from './layerPanel/index.vue';
import componentPanel from './componentPanel/index.vue';
import settingPanel from './settingPanel/index.vue';
import scrollWrapper from './scrollWrapper/index.vue';
import sourceCode from './sourceCode/index.vue';

const { params } = useRoute();
const spinning = ref(false);

const { product } = storeToRefs(useProductStore());
const { isTarget } = storeToRefs(useComponentStore());
const { addComponentData, setTargets, setCurComponent, clearComponent } = useComponentStore();

const productId = computed(() => params.id);

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
	fetch(`api/product/${productId.value}`).then(
		async (res) => {
			spinning.value = false;
			const { code, data, desc } = await res.json();
			if (code !== 0) return notification['error']({ message: '接口报错', duration: 6, description: desc });
			data.components.forEach((component: any) => {
				addComponentData(component);
			});
			// for (const key in data.pageData) {
			// 	if (Object.prototype.hasOwnProperty.call(canvasStyleData.value, key)) {
			// 		setCanvasStyleData({ key: key, value: data.pageData[key] });
			// 	}
			// }
		},
		() => {}
	);
}
getData();

watch(
	() => productId.value,
	(id) => {
		if (id && typeof id === 'string') product.value.productId = id;
	},
	{ immediate: true }
);
</script>
<style lang="less" scoped>
.manage-layout {
	height: 100vh;
	overflow: hidden;
	box-sizing: border-box;
	user-select: none;
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

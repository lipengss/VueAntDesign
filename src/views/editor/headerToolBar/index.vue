<template>
	<a-layout-header :style="{ backgroundColor: token.colorBgContainer, borderBottom: `1px solid ${token.colorBorderSecondary}` }">
		<a-space class="left">
			<btnIcon title="图层" svg-name="layer" :selected="layer" @on-cilck="toggleCollapsed('layer')" />
			<btnIcon title="组件列表" svg-name="components" :selected="component" @on-cilck="toggleCollapsed('component')" />
			<btnIcon title="组件配置" svg-name="settings" :selected="setting" @on-cilck="toggleCollapsed('setting')" />
			<btnIcon title="数据源码" svg-name="sourceCode" :selected="sourceCode" @on-cilck="toggleCollapsed('sourceCode')" />
			<btnIcon title="清空画布" svg-name="clear" @on-cilck="clearCanvas" />
		</a-space>
		<div class="center">
			<router-link class="back" to="/" title="返回主界面"><svg-icon name="manage" /></router-link>
			<svg-icon name="line" />
			<a-input
				v-if="isEditTitle"
				ref="inputTitleRef"
				showCount
				:maxlength="10"
				style="width: 180px"
				:value="computedProductTitle"
				@pressEnter="pressEnter"
				@blur="isEditTitle = false"
			/>
			<span v-else title="双击编辑" @dblclick="dblclick">{{ curProduct.title }}</span>
		</div>
		<a-space class="right">
			<btnIcon title="保存" svg-name="save" />
			<btnIcon title="预览" svg-name="preview" @on-cilck="preview" />
			<btnIcon title="发布" svg-name="release" />
		</a-space>
	</a-layout-header>
</template>
<script setup lang="ts">
import { createVNode, computed, ref, nextTick } from 'vue';
import { Modal } from 'ant-design-vue';
import { ExclamationCircleOutlined } from '@ant-design/icons-vue';
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useSettingStore } from '@/stores/setting';
import { useComponentStore } from '@/stores/component';
import { useCanvasStore } from '@/stores/canvas';
import { useProductStore } from '@/stores/product';
import btnIcon from '@/components/BtnIcon/index.vue';
import { theme } from 'ant-design-vue';
const { token } = theme.useToken();
const { canvasStyle } = storeToRefs(useCanvasStore());
const { layer, component, setting, sourceCode } = storeToRefs(useSettingStore());
const { toggleCollapsed } = useSettingStore();
const { componentData } = storeToRefs(useComponentStore());
const { clearComponent } = useComponentStore();

const { product, curProduct } = storeToRefs(useProductStore());

const { resolve } = useRouter();

const isEditTitle = ref(false);
const inputTitleRef = ref();

const computedProductTitle = computed({
	get() {
		return curProduct.value.title;
	},
	set(newValue) {
		curProduct.value.title = newValue;
	},
});

function pressEnter(e) {
	curProduct.value.title = e.target.value;
	isEditTitle.value = false;
}
function dblclick() {
	isEditTitle.value = true;
	nextTick(() => {
		inputTitleRef.value.focus();
	});
}

// 清空画布事件
function clearCanvas() {
	Modal.confirm({
		title: '你确定要清空画布吗？',
		icon: createVNode(ExclamationCircleOutlined),
		content: '画布清空将无法撤回，请您谨慎操作啊！ 不然半天白忙活了~',
		okText: '确认清空',
		okType: 'danger',
		cancelText: '取消',
		okButtonProps: { type: 'primary' },
		onOk() {
			clearComponent();
		},
		onCancel() {},
	});
}
// 预览
function preview() {
	const { href } = resolve({
		path: '/preview',
		// query: params
		query: { componentData: JSON.stringify(componentData.value), canvasStyle: JSON.stringify(canvasStyle.value) },
	});
	window.open(href, '_blank');
}
</script>
<style lang="less" scoped>
.ant-layout-header {
	padding: 0;
	display: flex;
	.left,
	.right {
		flex: 2;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.left {
		justify-content: flex-start;
		padding-left: 20px;
	}
	.right {
		justify-content: flex-end;
		padding-right: 20px;
	}
	.center {
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: center;
		.back {
			cursor: pointer;
		}
	}
}
</style>

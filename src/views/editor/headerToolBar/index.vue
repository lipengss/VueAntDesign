<template>
	<a-layout-header>
		<div class="left">
			<!-- #303640 -->
			<span class="btn" :class="{ '--selected': !layer }" title="图层" @click="toggleCoolapsed('layer')">
				<svg-icon name="layer" />
			</span>
			<span class="btn" :class="{ '--selected': !component }" title="组件列表" @click="toggleCoolapsed('component')">
				<svg-icon name="components" />
			</span>
			<span class="btn" :class="{ '--selected': !setting }" title="组件配置" @click="toggleCoolapsed('setting')">
				<svg-icon name="settings" />
			</span>
			<span class="btn" :class="{ '--selected': sourceCode }" title="数据源码" @click="toggleCoolapsed('sourceCode')">
				<svg-icon name="sourceCode" />
			</span>
			<span class="btn" title="清空画布" @click="clearCanvas">
				<svg-icon name="clear" />
			</span>
		</div>
		<div class="center">
			<router-link class="back" to="/"><svg-icon name="manage" /></router-link>
			<svg-icon name="line" />
			项目名称
		</div>
		<div class="right">
			<span class="btn" title="保存"><svg-icon name="save" /></span>
			<span class="btn" title="预览" @click="preview"><svg-icon name="preview" /></span>
			<span class="btn" title="发布"><svg-icon name="release" /></span>
		</div>
	</a-layout-header>
</template>
<script setup lang="ts">
import { Modal } from 'ant-design-vue';
import { ExclamationCircleOutlined } from '@ant-design/icons-vue';
import { useRouter } from 'vue-router';
import { createVNode } from 'vue';
import { storeToRefs } from 'pinia';
import { useSettingStore } from '@/stores/setting';
import { useComponentStore } from '@/stores/component';

const { layer, component, setting, sourceCode } = storeToRefs(useSettingStore());
const { toggleCollapsed } = useSettingStore();
const { componentData, canvasStyleData } = storeToRefs(useComponentStore());
const { clearComponent } = useComponentStore();

const { resolve } = useRouter();

const toggleCoolapsed = (coll: string): void => toggleCollapsed(coll);

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
		query: { data: JSON.stringify(componentData), pageData: JSON.stringify(canvasStyleData) },
	});
	window.open(href, '_blank');
}
</script>
<style lang="less" scoped>
.ant-layout-header {
	padding: 0;
	display: flex;
	border-bottom: 1px solid #000;
	.left,
	.right {
		flex: 2;
		display: flex;
		align-items: center;
		justify-content: center;
		.btn {
			height: 24px;
			line-height: 24px;
			padding: 0 8px;
			background-color: #303640;
			box-shadow: inset 0 0 0 1px rgba(255, 235, 235, 0.1), 0 0 0 1px #181818;
			cursor: pointer;
			transition: all 0.2s;
			&:hover {
				background-color: #414750;
			}
		}
		.--selected {
			background-color: #2681ff;
			&:hover {
				background-color: #409fff;
			}
		}
	}
	.left {
		justify-content: flex-start;
		.btn {
			margin-left: 10px;
		}
	}
	.right {
		justify-content: flex-end;
		.btn {
			margin-right: 10px;
			&:hover {
				background-color: #2681ff;
			}
		}
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

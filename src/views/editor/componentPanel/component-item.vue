<template>
	<div class="component-item">
		<div class="title">{{ props.component.title }}</div>
		<div
			class="component"
			draggable="true"
			:data-index="props.index"
			@dragstart="handleDragStart"
			:style="{
				backgroundImage: `url(${props.component.image})`,
				backgroundSize: 'auto 100%',
				backgroundRepeat: 'no-repeat',
				backgroundPosition: 'center',
			}"
		></div>
	</div>
</template>
<script setup lang="ts">
import { defineProps } from 'vue';
import { theme } from 'ant-design-vue';
const { token } = theme.useToken();

const props = defineProps({
	component: {
		type: Object,
		default: () => {},
	},
	index: {
		type: String,
		default: '',
	},
});
const handleDragStart = (e: any): void => {
	const transfer = e.dataTransfer;
	const index = e.target.dataset.index;
	transfer.setData('index', index);
	// 鼠标摁下  获取光标在组件内偏移的位置
	transfer.setData('downOffsetX', e.offsetX);
	transfer.setData('downOffsetY', e.offsetY);
};
</script>
<style lang="less" scoped>
.component-item {
	margin-bottom: 8px;
	border-radius: 3px;
	overflow: hidden;
	background-color: v-bind('token.colorFillSecondary');
	.title {
		font-size: 12px;
		line-height: 22px;
		text-align: left;
		padding: 0 6px;
		letter-spacing: 1px;
		background-color: v-bind('token.colorFillSecondary');
		color: v-bind('token.colorTextLabel');
	}
	.component {
		min-height: 80px;
	}
}
</style>

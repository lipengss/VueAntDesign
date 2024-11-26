<template>
	<PerfectScrollbar class="wrapper-component">
		<div v-if="components && components.length">
			<div class="component-item" v-for="component in components">
				<div class="title">{{ component.title }}</div>
				<div
					class="component"
					draggable="true"
					@dragstart="handleDragStart($event, component)"
					:style="{ backgroundImage: `url(${component.image})` }"
				></div>
			</div>
		</div>
		<a-empty v-else description="暂无组件" :image="Empty.PRESENTED_IMAGE_SIMPLE" />
	</PerfectScrollbar>
</template>
<script setup lang="ts">
import { defineProps } from 'vue';
import { theme } from 'ant-design-vue';
import { Empty } from 'ant-design-vue';
const { token } = theme.useToken();

const props = defineProps({
	components: {
		type: Object,
		default: () => {},
	},
	sideKey: {
		type: String,
		default: '',
	},
});
const handleDragStart = (e: any, component: ComponentItem): void => {
	const transfer = e.dataTransfer;
	transfer.setData('sideKey', props.sideKey);
	transfer.setData('id', component.id);
	// 鼠标摁下  获取光标在组件内偏移的位置
	transfer.setData('downOffsetX', e.offsetX);
	transfer.setData('downOffsetY', e.offsetY);
};
</script>
<style lang="less" scoped>
.wrapper-component {
	height: calc(100vh - 64px);
	padding: 8px;
	padding-bottom: 0;
	background-color: v-bind('token.colorBgLayout');
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
			background-size: auto 100%;
			background-repeat: no-repeat;
			background-position: center;
		}
	}
}
</style>

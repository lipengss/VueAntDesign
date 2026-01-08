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
	transfer.setData('id_component', component.id);
	transfer.setData('type_component', component.type);
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
	background-color: v-bind('token.colorBgContainer');
	.component-item {
		margin-bottom: 8px;
		border-radius: 3px;
		overflow: hidden;
		transition: all 0.2s ease-in-out;
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
			border: 1px solid v-bind('token.colorFillSecondary');
		}
		&:hover {
			cursor: pointer;
			box-shadow: v-bind('token.boxShadow');
			transform: translateY(-1px);
			
		}
	}
}
</style>

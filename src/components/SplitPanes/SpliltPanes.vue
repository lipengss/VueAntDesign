<template>
	<div class="model layout-padding">
		<splitpanes class="default-theme" @resized="setSize">
			<pane class="pane-left" :size="props.size" :min-size="14" :max-size="50">
				<slot name="left" />
			</pane>
			<pane class="pane-right" :size="100 - props.size">
				<slot name="right" />
			</pane>
		</splitpanes>
	</div>
</template>
<script setup lang="ts">
import { Splitpanes, Pane } from 'splitpanes';
import 'splitpanes/dist/splitpanes.css';

const props = defineProps({
	size: {
		type: Number,
		default: 18,
	},
});

const emits = defineEmits(['update:size']);

function setSize(event: Array<{ size: number }>) {
	emits('update:size', event[0].size);
}
</script>
<style lang="scss" scoped>
// 用于界面高度自适应
.layout-padding {
	height: 100%;
	// 侧边栏
	.pane-left {
		position: relative;
		.btn-expand {
			position: absolute;
			right: -15px;
			top: 80%;
			z-index: 100;
			width: 16px;
			height: 70px;
			background-color: var(--next-bg-color);
			border-top-right-radius: 6px;
			border-bottom-right-radius: 6px;
			border: 1px solid var(--el-border-color-light);
			display: flex;
			align-items: center;
			justify-content: center;
			cursor: pointer;
			transition: all 0.3s ease;
			&:hover {
				box-shadow: 4px 4px 8px var(--el-border-color-light);
			}
		}
	}
	// 右侧主体
	.pane-right {
	}
}

:deep .splitpanes__splitter {
	background-color: transparent !important;
}
</style>

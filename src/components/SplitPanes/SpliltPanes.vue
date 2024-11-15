<template>
	<splitpanes class="default-theme" @resized="setSize">
		<pane class="pane-left" :size="props.size" :min-size="14" :max-size="50">
			<slot name="left" />
		</pane>
		<pane class="pane-right" :size="100 - props.size">
			<slot name="right" />
		</pane>
	</splitpanes>
</template>
<script setup lang="ts">
import { Splitpanes, Pane } from 'splitpanes';
import 'splitpanes/dist/splitpanes.css';
import { theme } from 'ant-design-vue';

const { token } = theme.useToken();

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
.splitpanes.default-theme {
	height: 100%;
	.splitpanes__pane {
		background-color: v-bind('token.colorBgLayout');
	}
	:deep .splitpanes__splitter {
		border-color: transparent;
		background-color: v-bind('token.colorSplit');
		&::before,
		&::after {
			background-color: v-bind('token.colorBorder');
		}
	}
}
</style>

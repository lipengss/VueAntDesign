<template>
	<span class="btn" :class="{ '--selected': props.selected }" :title="props.title" @click="onClick">
		<svg-icon :name="props.svgName" />
	</span>
</template>

<script setup lang="ts">
import { theme } from 'ant-design-vue';
const { token } = theme.useToken();

const props = defineProps({
	title: {
		type: String,
		default: '',
	},
	selected: {
		type: Boolean,
		default: false,
	},
	svgName: {
		type: String,
		default: '',
	},
});

const emit = defineEmits(['onCilck']);

function onClick() {
	emit('onCilck');
}
</script>
<style lang="less" scoped>
.btn {
	height: 24px;
	display: flex;
	align-items: center;
	padding: 0 8px;
	background-color: v-bind('token.colorFillSecondary');
	border: 1px solid v-bind('token.colorFillSecondary');
	cursor: pointer;
	transition: all 0.2s;
	color: v-bind('token.colorText');
	&:hover {
		background-color: v-bind('token.colorTextQuaternary');
	}
}
.--selected {
	background-color: v-bind('token.colorPrimary');
	color: #fff;
	&:hover {
		background-color: v-bind('token.colorPrimary');
	}
}
</style>

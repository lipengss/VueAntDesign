<template>
	<div class="drag-input-wrapper" @mouseenter="onMouseEnter" @mouseleave="onMouseLeave" @mousedown="onMouseDown">
    <span v-if="$slots.prefix || props.prefix" class="icon">
       <slot name="prefix" />{{ props.prefix }}
    </span>
		<a-input-number
			:style="{ cursor: showResizeCursor ? 'ew-resize' : 'auto' }"
			v-model:value="innerValue"
			:keyboard="true"
			:size="size"
			@pressEnter="onPressEnter"
		/>
	</div>
</template>
<script setup lang="ts">
import { ref, watch, onBeforeUnmount } from 'vue';
import { debounce } from 'lodash-es';
const props = defineProps({
	value: {
		type: Number,
		default: 0,
	},
	size: {
		type: String,
		default: 'small',
	},
	min: {
		type: Number,
		default: -Infinity,
	},
	max: {
		type: Number,
		default: Infinity,
	},
	step: {
		type: Number,
		default: 1,
	},
  prefix: {
    type: String,
    default: '',
  },
	dragSensitivity: {
		type: Number,
		default: 0.5,
	},
});

const emit = defineEmits(['pressEnter', 'update:value', 'change']);

const innerValue = ref<number>(props.value);
const size = props.size;
const showResizeCursor = ref(false);
const dragging = ref(false);
let startX = 0;
let startValue = 0;

watch(
	() => props.value,
	(v) => {
		innerValue.value = v;
	}
);

watch(innerValue, debounce((v) => {
	emit('update:value', v);
	emit('change', v);
}, 300));

function clamp(val: number) {
	return Math.min(Math.max(val, props.min), props.max);
}

function onPressEnter() {
	emit('pressEnter', innerValue.value);
}

function onMouseEnter() {
	showResizeCursor.value = true;
}

function onMouseLeave() {
	if (!dragging.value) showResizeCursor.value = false;
}

function onMouseDown(e: MouseEvent) {
	dragging.value = true;
	startX = e.clientX;
	startValue = innerValue.value;
	document.body.style.userSelect = 'none';
	document.body.style.cursor = 'ew-resize';
	showResizeCursor.value = true;
	window.addEventListener('mousemove', onMouseMove);
	window.addEventListener('mouseup', onMouseUp);
}

function onMouseMove(e: MouseEvent) {
	if (!dragging.value) return;
	const dx = e.clientX - startX;
	const deltaSteps = Math.round(dx / props.dragSensitivity);
	const next = clamp(startValue + deltaSteps * props.step);
	if (next !== innerValue.value) innerValue.value = next;
}

function onMouseUp() {
	dragging.value = false;
	document.body.style.userSelect = '';
	showResizeCursor.value = false;
	document.body.style.cursor = 'auto';
	window.removeEventListener('mousemove', onMouseMove);
	window.removeEventListener('mouseup', onMouseUp);
}

onBeforeUnmount(() => {
	window.removeEventListener('mousemove', onMouseMove);
	window.removeEventListener('mouseup', onMouseUp);
	document.body.style.userSelect = '';
});
</script>
<style scoped>
.drag-input-wrapper {
	display: flex;
  align-items: center;
  .icon{
    margin-right: 6px;
  }
	:deep input {
		cursor: ew-resize;
	}
  .ant-input-number-affix-wrapper{
    padding-inline-start: 8px;
  }
}
</style>

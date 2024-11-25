<template>
	<a-space>
		<div v-if="title" style="min-width: 60px">{{ title }}</div>
		<a-radio-group v-model:value="numType" button-style="solid" size="small" @change="radioChange">
			<a-radio-button value="abs">绝对值</a-radio-button>
			<a-radio-button value="per">百分比</a-radio-button>
		</a-radio-group>
		<a-slider :value="formatValue" :min="0" :max="100" :step="1" @change="onChange" style="width: 140px" />
		<a-input-number :value="formatValue" :min="0" :max="100" size="small" @change="onChange" style="width: 80px" />
		{{ numType === 'abs' ? '' : '%' }}
	</a-space>
</template>
<script lang="ts" setup>
import { ref, defineProps, defineEmits, watchEffect } from 'vue';

const props = defineProps({
	title: {
		type: String,
		default: '',
	},
	value: {
		typeof: String || Number,
		default: '50',
	},
});

const emit = defineEmits(['update:value']);

const numType = ref<string>('per');

const formatValue = ref();

watchEffect(() => {
	if (typeof props.value === 'number') numType.value = 'abs';
	formatValue.value = parseInt(props.value);
});

function onChange(val) {
	emit('update:value', numType.value === 'abs' ? val : `${val}%`);
}

function radioChange() {
	if (numType.value === 'abs') {
		emit('update:value', parseInt(props.value));
	} else {
		if (typeof props.value === 'string') {
			emit('update:value', props.value);
		} else {
			emit('update:value', `${props.value}%`);
		}
	}
}
</script>

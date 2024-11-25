<template>
	<template v-for="(num, index) in arrayNum" :key="index">
		<a-input-number :value="num" :min="0" :max="100" size="small" style="width: 60px" @change="onChange($event, index)" />
		<svg-icon v-if="index < arrayNum.length - 1" :name="syncArrow ? 'link' : 'disconnection'" />
	</template>
	<a-tooltip title="同步设置">
		<a-checkbox v-model:checked="syncArrow" />
	</a-tooltip>
</template>
<script setup lang="ts">
import { computed, ref } from 'vue';

const props = defineProps(['value']);

const emits = defineEmits(['update:value']);

const arrayNum = computed(() => {
	return props.value && Array.isArray(props.value) ? props.value : [0, 0, 0, 0];
});

const syncArrow = ref(true);

function onChange(val, index) {
	if (syncArrow.value) {
		arrayNum.value.forEach((n, index) => {
			arrayNum.value[index] = val;
		});
		emits('update:value', arrayNum.value);
	} else {
		arrayNum.value[index] = val;
		emits('update:value', arrayNum.value);
	}
}
</script>

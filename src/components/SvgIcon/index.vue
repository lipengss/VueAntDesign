<template>
	<svg class="svg-icon" aria-hidden="true">
		<use :xlink:href="symbolId" :fill="props.color" />
	</svg>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
	prefix: {
		type: String,
		default: 'icon',
	},
	name: {
		type: String,
		required: true,
	},
	color: {
		type: String,
		default: 'currentColor',
	},
});

const symbolId = computed(() => `#${props.prefix}-${props.name}`);
</script>
<style scoped>
.svg-icon {
	width: 1em;
	height: 1em;
	vertical-align: -0.2em;
	overflow: hidden;
}
</style>

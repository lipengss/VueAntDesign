<template>
	<a-flex align="center" :gap="10">
		<span class="title">{{ props.title }}</span>
		<slot />
	</a-flex>
</template>
<script setup lang="ts">
const props = defineProps({
	title: {
		type: String,
		default: '',
	},
});
</script>
<style lang="less" scoped>
.title {
	flex-shrink: 0;
	min-width: 80px;
}
</style>

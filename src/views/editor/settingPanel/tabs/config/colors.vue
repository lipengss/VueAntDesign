<template>
	<div class="colors">
		<a-row align="middle" :gutter="[10, 10]" v-for="(item, index) in color" :key="index">
			<a-col :span="24">
				<a-flex gap="small">
					<span style="width: 60px">系列{{ index + 1 }}</span>
					<popuColor v-model:color="color[index]" />
				</a-flex>
			</a-col>
		</a-row>
	</div>
</template>
<script setup lang="ts">
import { theme } from 'ant-design-vue';
import popuColor from '@/components/popuColor/popuColor.vue';

const { token } = theme.useToken();

interface Props {
	color: string[];
}

withDefaults(defineProps<Props>(), {});
</script>
<style lang="less" scoped>
.ant-row {
	margin-bottom: 10px;
	padding-bottom: 10px;
	border-bottom: 1px solid v-bind('token.colorBorder');
}
</style>

<template>
	<a-row :gutter="[10, 10]" align="middle">
		<a-col :span="24">
			<flex-item title="主标题文本">
				<a-input v-model:value="title.text" allowClear placeholder="支持使用 \n 换行" />
			</flex-item>
		</a-col>
		<a-col :span="24">
			<Align v-model:value="title.left" horizontal title="标题左间距" placeholder="标题离容器左侧的距离" />
		</a-col>
		<a-col :span="24">
			<Align v-model:value="title.top" title="标题上间距" placeholder="标题离容器顶部的距离" />
		</a-col>
		<Divider title="主标题样式" />
		<TextStyle :textStyle="title.textStyle" />
	</a-row>
</template>
<script setup lang="ts">
import FlexItem from '@/components/FlexItem/index.vue';
import { TextStyle, Align } from '@/components/ChartConfig/index';
import Divider from '@/components/Divider/Divider.vue';

defineProps({
	title: {
		type: Object,
		default: () => {},
	},
});
</script>

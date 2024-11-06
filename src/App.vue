<template>
	<a-config-provider
		:locale="locale"
		:theme="{
			algorithm: theme.darkAlgorithm,
		}"
	>
		<router-view />
	</a-config-provider>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { theme } from 'ant-design-vue';
import zhCN from 'ant-design-vue/es/locale/zh_CN';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
dayjs.locale('zh-cn');

const locale = ref(zhCN);
</script>
<style lang="less">
#app {
	width: 100vw;
	height: 100vh;
	overflow: hidden;
	position: relative;
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #bcc9d4;
	user-select: none;
}
</style>

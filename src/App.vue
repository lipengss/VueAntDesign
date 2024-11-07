<template>
	<a-config-provider :locale="locale" :theme="theme">
		<router-view />
		<a-float-button @click="toggleMode">
			<template #icon>
				<svg-icon :name="modeIcon" />
			</template>
		</a-float-button>
	</a-config-provider>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useThemeStore } from './stores/theme';
import zhCN from 'ant-design-vue/es/locale/zh_CN';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
dayjs.locale('zh-cn');

const { theme, modeIcon } = storeToRefs(useThemeStore());

const { toggleMode } = useThemeStore();

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
	// color: #bcc9d4;
	user-select: none;
}
</style>

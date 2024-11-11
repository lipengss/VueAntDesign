<template>
	<a-spin class="global-spin" tip="Loading..." :spinning="spinning">
		<a-config-provider :locale="locale" :theme="_theme">
			<router-view />
			<a-float-button @click="toggleMode">
				<template #icon>
					<svg-icon :name="modeIcon" />
				</template>
			</a-float-button>
		</a-config-provider>
	</a-spin>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useThemeStore } from './stores/theme';
import zhCN from 'ant-design-vue/es/locale/zh_CN';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
dayjs.locale('zh-cn');

import { theme } from 'ant-design-vue';

const { token } = theme.useToken();

const { theme: _theme, modeIcon } = storeToRefs(useThemeStore());

const { toggleMode } = useThemeStore();

const locale = ref(zhCN);

const spinning = ref(true);

onMounted(() => {
	setTimeout(() => {
		spinning.value = false;
	}, 1000);
});
</script>
<style lang="less" scoped>
:deep .ant-spin-nested-loading {
	width: 100vw;
	height: 100vh;
}
:deep .global-spin {
	width: 100vw;
	height: 100vh;
	max-height: 100% !important;
	background-color: v-bind('token.colorBgBase');
}
</style>

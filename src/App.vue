<template>
	<a-config-provider :locale="locale" :theme="theme">
		<router-view />
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

const { theme } = storeToRefs(useThemeStore());

const locale = ref(zhCN);
</script>

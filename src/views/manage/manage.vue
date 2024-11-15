<template>
	<a-layout class="manage">
		<a-layout-header class="header" :style="{ backgroundColor: token.colorBgContainer, borderBottom: `1px solid ${token.colorBorderSecondary}` }">
			<div class="logo">
				<div class="text">PICOHOOD</div>
			</div>
			<a-menu v-model:selectedKeys="current" mode="horizontal" @select="onMenuSelect">
				<a-menu-item v-for="item in manages" :key="item.name">
					<template #icon>
						<svg-icon :name="item?.meta?.icon" />
					</template>
					{{ item?.meta?.title }}
				</a-menu-item>
			</a-menu>
		</a-layout-header>
		<a-layout class="main-content">
			<a-layout-sider :width="240" :style="{ backgroundColor: token.colorBgContainer }">
				<component :is="componentTmp[current]" />
			</a-layout-sider>
			<a-layout-content>
				<router-view />
			</a-layout-content>
		</a-layout>
	</a-layout>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import assetsAside from './asset/aside.vue';
import dashboardAside from './dashboard/aside.vue';
import dataAside from './data/aside.vue';
import { theme } from 'ant-design-vue';
const { token } = theme.useToken();

const componentTmp: any = {
	assets: assetsAside,
	dashboard: dashboardAside,
	data: dataAside,
};

const { push, currentRoute, getRoutes } = useRouter();
const manages = getRoutes().filter((item) => item.name === 'manage')[0].children;
const current = ref([currentRoute.value.name]);

function onMenuSelect(current: any) {
	current.value = [current.key];
	push({ path: current.key });
}
</script>
<style lang="less" scoped>
.manage {
	height: 100vh;
	display: flex;
	flex-direction: column;
	user-select: none;
	.header {
		padding: 0;
		.logo {
			width: 240px;
			height: 100%;
			float: left;
			padding: 10px;
			display: flex;
			align-items: center;
			justify-content: center;
			.text {
				width: 100%;
				height: 24px;
				line-height: 24px;
			}
		}
		.ant-menu-horizontal {
			border-bottom: none;
		}
	}
	.main-content {
		flex: 1;
	}
}
</style>

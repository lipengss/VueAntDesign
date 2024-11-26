<template>
	<a-layout-sider class="layout-sider" :collapsed="!component" :collapsedWidth="52" :width="324" :style="{ backgroundColor: token.colorBgContainer }">
		<ul class="side">
			<li v-for="(val, key) in allComponentData" :key="key" :class="{ 'side-active': data.sideActive === key }" @click="handleSideClick(key)">
				<component :is="val.icon" />
				<div class="title">{{ val.name }}</div>
			</li>
		</ul>
		<div class="side-content" :class="{ collapsed: component }">
			<a-tabs v-if="curComopnent.tabs" v-model:activeKey="data.tabActive" :tabBarGutter="0" type="card" tabPosition="left" @change="handleTabChange">
				<a-tab-pane v-for="tab in curComopnent.tabs" :key="tab.type" :tab="tab.title">
					<componentList :components="tab.components" :side-key="data.sideActive" />
				</a-tab-pane>
			</a-tabs>
			<componentList v-else :components="curComopnent.components" :side-key="data.sideActive" />
		</div>
	</a-layout-sider>
</template>
<script setup lang="ts">
import { computed, reactive } from 'vue';
import { allComponentData } from '@/custom-components/componentData';
import componentList from '@/views/editor/componentPanel/componentList.vue';
import { storeToRefs } from 'pinia';
import { useSettingStore } from '@/stores/setting';
import { theme } from 'ant-design-vue';

const { token } = theme.useToken();

const { component } = storeToRefs(useSettingStore());

const data: SideData = reactive({
	sideActive: 'echarts',
	tabActive: 'all',
});
const curComopnent = computed(() => allComponentData[data.sideActive]);

const handleSideClick = (key: SideComponentType) => {
	data.sideActive = key;
};

const handleTabChange = (key: SeiresType) => {
	data.tabActive = key;
};
</script>

<style lang="less" scoped>
.layout-sider {
	:deep .ant-layout-sider-children {
		display: flex;
		.side {
			width: 52px;
			display: flex;
			flex-direction: column;
			li {
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				padding: 10px 14px;
				cursor: pointer;
				.anticon {
					font-size: 16px;
					margin-bottom: 6px;
				}
				.title {
					font-size: 12px;
				}
			}
			li:last-child {
				border-top: 1px solid v-bind('token.colorBorder');
			}
			.side-active {
				width: 52px;
				position: relative;
				background-color: v-bind('token.colorPrimary');
				color: #fff;
				&::after {
					content: '';
					width: 3px;
					height: 100%;
					position: absolute;
					left: 0;
					top: 0;
					background-color: v-bind('token.colorPrimaryActive');
				}
			}
		}
		.side-content {
			opacity: 0;
			flex: 1;
			transition: all 0.2s;
			flex-shrink: 0;
			border-right: 1px solid v-bind('token.colorBorderSecondary');
			.ant-tabs-left {
				.ant-tabs-nav-wrap {
					background-color: v-bind('token.colorFillQuaternary');
				}
				.ant-tabs-tab {
					border-radius: 0;
					border-color: v-bind('token.colorBorder');
					border: none;
					background-color: transparent;
				}
				.ant-tabs-tab-active {
					border-right-color: v-bind('token.colorBgContainer');
					background-color: v-bind('token.colorFillSecondary');
				}
				.ant-tabs-content-holder {
					border-left: none;
					margin-left: 0;
				}
				.ant-tabs-content {
					.ant-tabs-tabpane {
						padding-left: 0;
					}
				}
			}
		}
		.collapsed {
			opacity: 1;
			transition: all 0.2s;
		}
	}
}
.side-content {
	.ant-tabs-vertical {
		height: calc(100vh - 40px);
	}
}
</style>

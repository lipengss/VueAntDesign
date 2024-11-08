<template>
	<a-layout-sider class="layout-sider" :collapsed="!component" :collapsedWidth="52" :width="324" :style="{ backgroundColor: token.colorBgContainer }">
		<ul class="side">
			<li v-for="(val, key) in componentData" :key="key" :class="{ 'side-active': data.sideActive === key }" @click="handleSideClick(key)">
				<component :is="val.icon" />
				<div class="title">{{ val.name }}</div>
			</li>
		</ul>
		<div class="side-content" :class="{ collapsed: component }">
			<template v-if="curSide.clas === 'tab'">
				<a-tabs v-model:activeKey="data.tabActive" :tabBarGutter="0" type="card" tabPosition="left" @change="handleTabChange">
					<a-tab-pane v-for="(tab, index) in curSide.tabs" :key="tab.type" :tab="tab.title">
						<div class="wrapper-component my-scroll">
							<div v-if="tab.components && tab.components.length">
								<template v-for="(component, idx) in tab.components" :key="`${data.sideActive}_${index}_${idx}`">
									<component-item :component="component" :index="`${data.sideActive}_${index}_${idx}`" />
								</template>
							</div>
							<a-empty v-else description="暂无组件" :image="Empty.PRESENTED_IMAGE_SIMPLE" />
						</div>
					</a-tab-pane>
				</a-tabs>
			</template>
			<template v-else>
				<div class="wrapper-component my-scroll">
					<div v-if="curSide.components && curSide.components.length">
						<template v-for="(component, index) in curSide.components" :key="component">
							<component-item :component="component" :index="`${data.sideActive}_${index}`" />
						</template>
					</div>
					<a-empty v-else description="暂无组件" :image="Empty.PRESENTED_IMAGE_SIMPLE" />
				</div>
			</template>
		</div>
	</a-layout-sider>
</template>
<script setup lang="ts">
import { Empty } from 'ant-design-vue';
import { computed, reactive } from 'vue';
import { componentData } from '@/custom-components/componentData';
import componentItem from '@/views/editor/componentPanel/component-item.vue';
import { storeToRefs } from 'pinia';
import { useSettingStore } from '@/stores/setting';
import { theme } from 'ant-design-vue';

const { token } = theme.useToken();

const { component } = storeToRefs(useSettingStore());

const data: SideData = reactive({
	scroll: null,
	sideActive: 'echarts',
	tabActive: 'all',
	componentData,
	tabs: [
		{ title: '全部', key: 'all' },
		{ title: '柱状', key: 'ss' },
	],
});
const curSide = computed(() => componentData[data.sideActive] || {});

const handleSideClick = (key: SideComponentType) => {
	data.sideActive = key;
};
const setComponent = () => {
	const curSide = componentData[data.sideActive];
	const comp = curSide.tabs && curSide.tabs.find((item: any) => item.type === data.tabActive);
	if (!comp) return;
	comp.components = comp.type === 'all' ? curSide.components : curSide.components.filter((item: any) => item.type === data.tabActive);
};
setComponent();
const handleTabChange = (key: string) => {
	data.tabActive = key;
	setComponent();
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
			.wrapper-component {
				height: calc(100vh - 64px);
				padding: 8px;
				padding-bottom: 0;
				overflow-y: scroll;
				background-color: v-bind('token.colorBgLayout');
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

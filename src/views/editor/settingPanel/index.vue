<template>
	<a-layout-sider :collapsed="!setting" :collapsedWidth="0" :width="324" :style="{ backgroundColor: token.colorBgContainer }">
		<a-tabs v-if="isTarget.length" v-model:activeKey="state.activeKey" size="small">
			<template v-for="tab in state.tabs" :key="tab.property">
				<a-tab-pane v-if="compInTabProp(tab.property)" :tab="tab.label" :key="tab.property">
					<component :is="tab.component" />
				</a-tab-pane>
			</template>
		</a-tabs>
		<div v-else class="page-set">
			<div class="title">页面设置</div>
			<div class="content my-scroll">
				<a-row class="line" :gutter="[10, 10]" align="middle">
					<a-col :span="6" class="name">画布大小</a-col>
					<a-col :span="9">
						<a-input-number :value="canvasOption.canvasWidth" size="small" @pressEnter="(e) => (canvasOption.canvasWidth = e.target.value)" />
					</a-col>
					<a-col :span="9">
						<a-input-number :value="canvasOption.canvasHeight" size="small" @pressEnter="(e) => (canvasOption.canvasHeight = e.target.value)" />
					</a-col>
				</a-row>
				<a-row class="line" :gutter="[10, 10]" align="middle">
					<a-col :span="6" class="name">画布颜色</a-col>
					<a-col :span="18">
						<popuColor v-model:color="canvasOption.backgroundColor" />
					</a-col>
				</a-row>
				<a-row class="line" :gutter="[10, 10]" align="middle">
					<a-col :span="6" class="name">参考线色</a-col>
					<a-col :span="18">
						<popuColor v-model:color="ruleOption.lineColor" />
					</a-col>
				</a-row>
			</div>
		</div>
	</a-layout-sider>
</template>
<script setup lang="ts">
import { defineAsyncComponent, reactive } from 'vue';
import popuColor from '@/components/popuColor/popuColor.vue';
import { storeToRefs } from 'pinia';
import { useSettingStore } from '@/stores/setting';
import { useComponentStore } from '@/stores/component';
import { useCanvasStore } from '@/stores/canvas';
import { theme } from 'ant-design-vue';

const { token } = theme.useToken();
const { setting } = storeToRefs(useSettingStore());
const { isTarget, curComponent } = storeToRefs(useComponentStore());
const { canvasOption, ruleOption } = storeToRefs(useCanvasStore());

const state = reactive({
	activeKey: 'bases',
	tabs: [
		{ label: '样式', property: 'bases', component: defineAsyncComponent(() => import('./tabs/events.vue')) },
		{ label: '事件', property: 'events', component: defineAsyncComponent(() => import('./tabs/bases.vue')) },
		{ label: '数据', property: 'dataSource', component: defineAsyncComponent(() => import('./tabs/dataSource.vue')) },
		{ label: '动画', property: 'animation', component: defineAsyncComponent(() => import('./tabs/animation.vue')) },
	],
});

// 当前选中的组件是否有tab属性
function compInTabProp(property: string) {
	console.log('curComponent.value, property', curComponent.value, property);
	if (curComponent.value && Object.prototype.hasOwnProperty.call(curComponent.value, property)) {
		return true;
	}
	return false;
}
</script>
<style lang="less" scoped>
@import './tabs/style.less';
.ant-tabs {
	:deep .ant-tabs-nav .ant-tabs-tab {
		margin-right: 0;
	}
	:deep .ant-tabs-bar {
		margin: 0 !important;
	}
}
.page-set {
	.title {
		height: 30px;
		line-height: 30px;
		text-align: center;
		background-color: v-bind('token.colorFillSecondary');
	}
	.content {
		height: calc(100vh - 70px);
		padding: 10px;
		.name {
			color: v-bind('token.colorTextLabel');
		}
	}
}
</style>

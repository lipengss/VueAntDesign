<template>
	<a-layout-sider :collapsed="!setting" :collapsedWidth="0" :width="324" :style="{ backgroundColor: token.colorBgContainer }">
		<a-tabs v-if="isTarget.length" v-model:activeKey="state.activeKey" size="small">
			<template v-for="tab in state.tabs" :key="tab.component">
				<template v-if="Object.keys(curComponent).length">
					<a-tab-pane v-if="isInclude(tab.component)" :tab="tab.label" :key="tab.component">
						<component :is="tab.component" :curComponent="curComponent" />
					</a-tab-pane>
				</template>
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
import { computed, defineComponent, reactive, toRefs, watch } from 'vue';
// import events from './tabs/events.vue';
// import bases from './tabs/bases.vue';
// import dataSource from './tabs/dataSource.vue';
// import animation from './tabs/animation.vue';
import popuColor from '@/components/popuColor/popuColor.vue';
import { storeToRefs } from 'pinia';
import { useSettingStore } from '@/stores/setting';
import { useComponentStore } from '@/stores/component';
import { useCanvasStore } from '@/stores/canvas';
import { theme } from 'ant-design-vue';

const { token } = theme.useToken();

const { setting } = storeToRefs(useSettingStore());
const { isTarget } = storeToRefs(useComponentStore());
const { canvasOption, ruleOption } = storeToRefs(useCanvasStore());

const state = reactive({
	activeKey: 'bases',
	tabs: [
		{ label: '样式', component: 'bases' },
		{ label: '事件', component: 'events' },
		{ label: '数据', component: 'dataSource' },
		{ label: '动画', component: 'animation' },
	],
});
const curComponent = computed(() => {
	if (isTarget.value.length && curComponent.value !== null) {
		return curComponent.value;
	}
	return {};
});

function isInclude(component: string) {
	if (Object.prototype.hasOwnProperty.call(curComponent.value, component)) {
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

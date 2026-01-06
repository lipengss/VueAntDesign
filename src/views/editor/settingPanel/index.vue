<template>
	<a-layout-sider
		:collapsed="!setting"
		:collapsedWidth="0"
		:width="324"
		:style="{ backgroundColor: token.colorBgContainer, borderLeft: `1px solid ${token.colorBorderSecondary}` }"
	>
		<a-tabs v-if="isTarget.length" v-model:activeKey="tabActive" size="small">
			<template v-for="tab in tabs" :key="tab.property">
				<a-tab-pane v-if="compInTabProp(tab.property)" :tab="tab.label" :key="tab.property">
					<PerfectScrollbar class="tab-scroll">
						<component :is="tab.component" />
					</PerfectScrollbar>
				</a-tab-pane>
			</template>
		</a-tabs>
		<div v-else class="page-set">
			<div class="title">页面设置</div>
			<div class="content my-scroll">
				<a-collapse v-model:activeKey="activeKey">
					<a-collapse-panel key="1" header="画布设置">
						<a-row class="line" :gutter="[10, 10]" align="middle">
							<a-col :span="6" class="name">画布大小</a-col>
							<a-col :span="9">
								<input-number v-model:value="canvasOption.canvasWidth" prefix="W" />
							</a-col>
							<a-col :span="9">
								<input-number v-model:value="canvasOption.canvasHeight" prefix="H" />
							</a-col>
							<a-col :span="6" class="name">画布颜色</a-col>
							<a-col :span="18">
								<popuColor v-model:color="canvasOption.backgroundColor" />
							</a-col>
							<a-col :span="6" class="name">画布背景</a-col>
							<a-col :span="18">
								<a-upload-dragger
									name="file"
									action="#"
									:disabled="!!canvasOption.backgroundImage"
									:show-upload-list="false"
									:beforeUpload="beforeUpload"
									:customRequest="customRequest"
								>
									<div v-if="canvasOption.backgroundImage" class="upload-img-box">
										<a-image width="100%" :src="canvasOption.backgroundImage" />
									</div>
									<template v-else>
										<p class="ant-upload-drag-icon">
											<inbox-outlined></inbox-outlined>
										</p>
										<p class="ant-upload-hint">点击或拖拽文件到此区域上传</p>
									</template>
								</a-upload-dragger>
							</a-col>
							<a-col :span="6" class="name">背景位置</a-col>
							<a-col :span="18">
								<a-select v-model:value="canvasOption.backgroundPosition" :options="BACKGROUND_POSITION" size="small" style="width: 140px" />
							</a-col>
							<a-col :span="6" class="name">背景大小</a-col>
							<a-col :span="18">
								<a-select v-model:value="canvasOption.backgroundSize" :options="BACKGROUND_SIZE" size="small" style="width: 140px" />
							</a-col>
							<a-col :span="6" class="name">背景重复</a-col>
							<a-col :span="18">
								<a-select v-model:value="canvasOption.backgroundRepeat" :options="BACKGROUND_REPEAT" size="small" style="width: 140px" />
							</a-col>
						</a-row>
					</a-collapse-panel>
					<a-collapse-panel key="2" header="参考线">
						<a-row class="line" :gutter="[10, 10]" align="middle">
							<a-col :span="6" class="name">参考线色</a-col>
							<a-col :span="18">
								<popuColor v-model:color="ruleOption.lineColor" />
							</a-col>
							<a-col :span="6" class="name">参考线色</a-col>
							<a-col :span="18">
								<a-select v-model:value="ruleOption.lineType" :options="lineStyleList" size="small" style="width: 140px" />
							</a-col>
						</a-row>
					</a-collapse-panel>
				</a-collapse>
			</div>
		</div>
	</a-layout-sider>
</template>
<script setup lang="ts">
import { defineAsyncComponent, ref, toRef } from 'vue';
import popuColor from '@/components/popuColor/popuColor.vue';
import { storeToRefs } from 'pinia';
import { useSettingStore } from '@/stores/setting';
import { useComponentStore } from '@/stores/component';
import { useCanvasStore } from '@/stores/canvas';
import { theme } from 'ant-design-vue';
import { lineStyleList } from '@/components/ChartConfig/data';
import useUpload from '@/hooks/useUpload';
import { InboxOutlined } from '@ant-design/icons-vue';
import { BACKGROUND_REPEAT, BACKGROUND_POSITION, BACKGROUND_SIZE } from '@/components/ChartConfig/data';

const { token } = theme.useToken();
const { setting } = storeToRefs(useSettingStore());
const { isTarget, curComponent } = storeToRefs(useComponentStore());
const { canvasOption, ruleOption } = storeToRefs(useCanvasStore());

const { beforeUpload, customRequest } = useUpload(toRef(canvasOption.value, 'backgroundImage'));

const tabActive = ref('bases');
const activeKey = ref(['1', '2']);
const tabs = [
	{ label: '样式', property: 'bases', component: defineAsyncComponent(() => import('./tabs/bases.vue')) },
	{ label: '事件', property: 'events', component: defineAsyncComponent(() => import('./tabs/events.vue')) },
	{ label: '数据', property: 'dataSource', component: defineAsyncComponent(() => import('./tabs/dataSource.vue')) },
	{ label: '动画', property: 'animation', component: defineAsyncComponent(() => import('./tabs/animation.vue')) },
];

// 当前选中的组件是否有tab属性
function compInTabProp(property: string) {
	if (curComponent.value && Object.prototype.hasOwnProperty.call(curComponent.value, property)) {
		return true;
	}
	return false;
}
</script>
<style lang="less" scoped>
// global Style
:deep .ant-row {
	width: 100%;
	margin-left: 0;
	margin-right: 0;
	margin-bottom: 10px;
	font-size: 12px;
	color: v-bind('token.colorTextLabel');
	.ant-input-number {
		width: 100%;
	}
}
// globa end

:deep .ant-tabs {
	.ant-tabs-nav {
		margin-bottom: 0;
	}
	.ant-tabs-nav-wrap {
		justify-content: center;
	}
	.tab-scroll {
		height: calc(100vh - 98px);
		padding: 8px 8px 20px 8px;
		box-sizing: border-box;
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
:deep .ant-upload {
	padding: 0 !important;
	.ant-upload-drag-icon {
		padding-top: 16px;
	}
}
.upload-img-box {
	border-radius: 8px;
	overflow: hidden;
}
</style>

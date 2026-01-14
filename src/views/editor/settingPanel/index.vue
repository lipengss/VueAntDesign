<template>
  <a-layout-sider
    :collapsed="!setting"
    :collapsedWidth="0"
    :width="324"
    :style="{
      backgroundColor: token.colorBgContainer,
      borderLeft: `1px solid ${token.colorBorderSecondary}`,
    }"
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
    <a-tabs v-else class="page-set" size="small">
      <a-tab-pane tab="页面设置">
        <PerfectScrollbar class="tab-scroll">
          <Divider title="页面设置" />
          <a-form class="set-panel-from">
            <a-form-item label="框内移动">
              <a-switch checkedValue="inside" unCheckedValue="none" v-model:checked="canvasOption.panzoomOption.contain" />
            </a-form-item>
            <a-form-item label="画布大小">
              <a-space>
                <input-number v-model:value="canvasOption.canvasWidth" prefix="W" />
                <input-number v-model:value="canvasOption.canvasHeight" prefix="H" />
              </a-space>
            </a-form-item>
            <a-form-item label="画布颜色">
              <popuColor v-model:color="canvasOption.backgroundColor" />
            </a-form-item>
          </a-form>
          <a-collapse v-model:activeKey="activeKeys" :bordered="false" style="margin: 0 -8px">
            <a-collapse-panel key="background" :collapsible="collapsible(canvasOption.isShowBackgroundImage)">
              <template #header>
                <a-space>
                  <a-switch size="small" v-model:checked="canvasOption.isShowBackgroundImage" @change="switchChange('background')" />
                  <span>背景图片</span>
                </a-space>
              </template>
              <a-form class="set-panel-from">
                <a-form-item>
                  <a-upload-dragger name="file" action="#" :disabled="!!canvasOption.backgroundImage" :show-upload-list="false" :beforeUpload="beforeUpload" :customRequest="customRequest">
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
                </a-form-item>
                <a-form-item label="背景位置">
                  <a-select v-model:value="canvasOption.backgroundPosition" :options="BACKGROUND_POSITION" size="small" style="width: 140px" />
                </a-form-item>
                <a-form-item label="背景大小">
                  <a-select v-model:value="canvasOption.backgroundSize" :options="BACKGROUND_SIZE" size="small" style="width: 140px" />
                </a-form-item>
                <a-form-item label="背景重复">
                  <a-select v-model:value="canvasOption.backgroundRepeat" :options="BACKGROUND_REPEAT" size="small" style="width: 140px" />
                </a-form-item>
              </a-form>
            </a-collapse-panel>
            <a-collapse-panel key="showRuler" :collapsible="collapsible(canvasOption.showRuler)">
              <template #header>
                <a-space>
                  <a-switch size="small" v-model:checked="canvasOption.showRuler" @change="switchChange('showRuler')" />
                  <span>显示标尺</span>
                </a-space>
              </template>
              <a-form class="set-panel-from">
                <a-form-item label="参考线色">
                  <popuColor v-model:color="ruleOption.lineColor" />
                </a-form-item>
                <a-form-item label="参考线类型">
                  <a-select v-model:value="ruleOption.lineType" :options="lineStyleList" size="small" style="width: 140px" />
                </a-form-item>
                <a-form-item label="显示参考线">
                  <a-switch v-model:checked="canvasOption.isShowReferLine" />
                </a-form-item>
                <a-form-item label="锁定参考线">
                  <a-switch v-model:checked="canvasOption.lockLine" />
                </a-form-item>
                <a-form-item v-if="canvasOption.lockLine" label="锁定颜色">
                  <popuColor v-model:color="ruleOption.lockLineColor" />
                </a-form-item>
                <a-tabs>
                  <a-tab-pane key="h" tab="横线吸附">
                    <spanObj direction="h" />
                  </a-tab-pane>
                  <a-tab-pane key="v" tab="竖线吸附">
                    <spanObj direction="v" />
                  </a-tab-pane>
                </a-tabs>
              </a-form>
            </a-collapse-panel>
          </a-collapse>
        </PerfectScrollbar>
      </a-tab-pane>
    </a-tabs>
  </a-layout-sider>
</template>
<script setup lang="ts">
  import { defineAsyncComponent, ref, toRef } from 'vue'
  import popuColor from '@/components/popuColor/popuColor.vue'
  import { storeToRefs } from 'pinia'
  import { useSettingStore } from '@/stores/setting'
  import { useComponentStore } from '@/stores/component'
  import { useCanvasStore } from '@/stores/canvas'
  import { theme } from 'ant-design-vue'
  import { lineStyleList } from '@/components/ChartConfig/data'
  import useUpload from '@/hooks/useUpload'
  import { InboxOutlined } from '@ant-design/icons-vue'
  import Divider from '@/components/Divider/Divider.vue'
  import { BACKGROUND_REPEAT, BACKGROUND_POSITION, BACKGROUND_SIZE } from '@/components/ChartConfig/data'
  import { collapsible } from '@/utils/tools'
  import spanObj from './spanObj.vue'

  const { token } = theme.useToken()
  const { setting } = storeToRefs(useSettingStore())
  const { isTarget, curComponent } = storeToRefs(useComponentStore())
  const { canvasOption, ruleOption } = storeToRefs(useCanvasStore())

  const { beforeUpload, customRequest } = useUpload(toRef(canvasOption.value, 'backgroundImage'))

  const tabActive = ref('bases')
  const activeKeys = ref(['1', 'showRuler'])
  const tabs = [
    {
      label: '样式',
      property: 'bases',
      component: defineAsyncComponent(() => import('./tabs/bases.vue')),
    },
    {
      label: '事件',
      property: 'events',
      component: defineAsyncComponent(() => import('./tabs/events.vue')),
    },
    {
      label: '数据',
      property: 'dataSource',
      component: defineAsyncComponent(() => import('./tabs/dataSource.vue')),
    },
    {
      label: '动画',
      property: 'animation',
      component: defineAsyncComponent(() => import('./tabs/animation.vue')),
    },
  ]

  const switchChange = (key: string) => {
    const index = activeKeys.value.findIndex((item: string) => item === key)
    index !== -1 && activeKeys.value.splice(index, 1)
  }

  // 当前选中的组件是否有tab属性
  function compInTabProp(property: string) {
    if (curComponent.value && Object.prototype.hasOwnProperty.call(curComponent.value, property)) {
      return true
    }
    return false
  }
</script>
<style lang="less" scoped>
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

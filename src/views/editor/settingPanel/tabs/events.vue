<template>
  <a-form class="events">
    <a-card title="事件" size="small" v-for="event in curComponent.events" :key="event.id">
      <template #extra>
        <svg-icon name="delete" @click="deleteEvents(event.id)" />
      </template>
      <a-form-item>
        <a-radio-group class="line" size="small" v-model:value="event.cursor">
          <a-radio-button value="default"><svg-icon name="default" /></a-radio-button>
          <a-radio-button value="pointer"><svg-icon name="pointer" /></a-radio-button>
        </a-radio-group>
      </a-form-item>
      <a-form-item>
        <a-select v-model:value="event.type" style="width: 100%">
          <a-select-option v-for="event in state.events" :key="event.value" :value="event.value">
            <span>
              <svg-icon :name="event.icon" style="margin-right: 10px" />
              {{ event.label }}
            </span>
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-divider />
      <a-form-item label="行为">
        <a-select v-model:value="event.action.type" placeholder="请选择事件行为">
          <a-select-option value="url">跳转超链接</a-select-option>
          <a-select-option value="toggleComp">切换组件状态</a-select-option>
        </a-select>
      </a-form-item>
      <template v-if="event.action.type === 'url'">
        <a-form-item label="跳转">
          <a-select v-model:value="event.action.url.jump" placeholder="请选择跳转方式">
            <a-select-option value="_blank">新开窗口</a-select-option>
            <a-select-option value="_self">当前页跳转</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="地址">
          <a-textarea v-model:value="event.action.url.address" :rows="4" placeholder="请输入http/https协议的地址" allow-clear />
        </a-form-item>
      </template>
      <template v-if="event.action.type === 'toggleComp'">切换组件状态</template>
    </a-card>
    <a-button size="small" block type="primary" @click="addEvents">添加事件</a-button>
  </a-form>
</template>
<script setup lang="ts">
  import { reactive } from 'vue'
  import { storeToRefs } from 'pinia'
  import { useComponentStore } from '@/stores/component'

  const { curComponent } = storeToRefs(useComponentStore())

  const eventObj = {
    id: 0,
    cursor: 'default',
    type: 'click',
    action: {
      type: undefined,
      url: {
        jump: '_blank',
        address: 'https://www.baidu.com/',
      },
      toggleComp: {},
    },
  }
  const state = reactive({
    events: [
      { label: '单击', value: 'click', icon: 'click' },
      { label: '双击', value: 'dblclick', icon: 'dblclick' },
      { label: '长按', value: 'mouseup', icon: 'longPress' },
      { label: '右键', value: 'contextmenu', icon: 'contextmenu' },
    ],
  })
  const addEvents = () => {
    eventObj.id++
    curComponent.value.events.push(JSON.parse(JSON.stringify(eventObj)))
  }
  const deleteEvents = (id: number) => {
    const events = curComponent.value.events
    const index = events.findIndex((item: any) => item.id === id)
    events.splice(index, 1)
  }
</script>
<style lang="less" scoped>
  .events {
    .ant-btn {
      margin-bottom: 16px;
    }
    .ant-card {
      margin-bottom: 10px;
    }
  }
</style>

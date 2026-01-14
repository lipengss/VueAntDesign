<template>
  <a-table :data-source="canvasOption.snapsObj[props.direction].map((n: number) => ({ value: n }))" size="small" bordered :pagination="false" :scroll="{ y: 200 }">
    <a-table-column dataIndex="value" :title="`${props.direction === 'v' ? '竖线' : '横线'}吸附（${canvasOption.snapsObj[props.direction].length}）`" align="center" defaultSortOrder="ascend">
      <template #default="{ index }">
        <input-number v-model:value="canvasOption.snapsObj[props.direction][index]" @change="changeSnaps(index, props.direction)" />
      </template>
    </a-table-column>
    <a-table-column dataIndex="value" title="操作" align="center">
      <template #default="{ index }">
        <a-space>
          <a-button type="primary" ghost shape="circle" size="small" @click="addLine(index, props.direction)"><PlusOutlined /></a-button>
          <a-button type="primary" ghost danger shape="circle" size="small" @click="removeLine(index, props.direction)"><MinusOutlined /></a-button>
        </a-space>
      </template>
    </a-table-column>
    <template #emptyText>
      <a-button type="primary" ghost size="small" @click="addLine(canvasOption.snapsObj[props.direction].length - 1, props.direction)">添加</a-button>
    </template>
  </a-table>
</template>
<script setup lang="ts">
  import { watch } from 'vue'
  import { storeToRefs } from 'pinia'
  import { useCanvasStore } from '@/stores/canvas'
  import { PlusOutlined, MinusOutlined } from '@ant-design/icons-vue'

  interface props {
    direction: 'v' | 'h'
  }
  const props = withDefaults(defineProps<props>(), {
    direction: 'v',
  })

  const { canvasOption } = storeToRefs(useCanvasStore())

  // 参考线值改变
  const changeSnaps = (index: number, type: string) => {
    canvasOption.value.snapsObj[type][index] = Number(canvasOption.value.snapsObj[type][index])
  }

  // 添加参考线
  const addLine = (index: number, type: string) => {
    canvasOption.value.snapsObj[type].splice(index + 1, 0, canvasOption.value.snapsObj[type][index] + 100)
  }

  // 删除参考线
  const removeLine = (index: number, type: string) => {
    canvasOption.value.snapsObj[type].splice(index, 1)
  }

  watch(
    () => canvasOption.value.snapsObj[props.direction],
    (newVal) => {
      canvasOption.value.lines[props.direction] = newVal
    },
    {
      deep: true,
      immediate: true,
    }
  )
</script>
<style lang="less" scoped>
  .ant-table-wrapper {
    margin-top: 10px;
  }
</style>

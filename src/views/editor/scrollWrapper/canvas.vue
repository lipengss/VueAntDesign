<template>
  <div data-type="page" class="editor" ref="editorRef" :style="canvasStyle">
    <div v-for="item in componentData" :class="['shape']" :id="item.id" :key="item.id" @mousedown="handleMouseDownShape($event, item)" :style="getShapeStyle(item.bases)">
      <component v-if="item.tab === 'echarts'" :is="item.component" :option="item.bases.chart" :style="getComponentStyle(item.bases)" />
    </div>
    <Moveable
      ref="moveableRef"
      className="moveable"
      :container="editorRef"
      :target="isTarget"
      :resizable="true"
      :draggable="true"
      :rotatable="true"
      :zoom="canvasOption.scale"
      :isDisplaySnapDigit="true"
      :snappable="true"
      :snapThreshold="5"
      :snapVertical="true"
      :snapHorizontal="true"
      :elementSnapDirections="true"
      :horizontalGuidelines="[0, 200, 400]"
      :verticalGuidelines="[0, 200, 400]"
      :elementGuidelines="elementGuidelines"
      @drag="onDrag"
      @resize="onResize"
      @rotate="onRotate"
      @mousedown="handleMouseDownShape($event, curComponent)"
    />
    <Selecto :editorRef="editorRef" />
  </div>
</template>
<script setup lang="ts">
  import { ref, onMounted, watch, nextTick } from 'vue'
  import Moveable from 'vue3-moveable'
  import Selecto from './Selecto.vue'
  import { storeToRefs } from 'pinia'
  import { useComponentStore } from '@/stores/component'
  import { useCanvasStore } from '@/stores/canvas'

  const { componentData, curComponent, isTarget } = storeToRefs(useComponentStore())
  const { setCurComponent, setTargets } = useComponentStore()

  const { canvasStyle, canvasOption } = storeToRefs(useCanvasStore())
  const { setRuleShadow } = useCanvasStore()

  const editorRef = ref(null)
  const elementGuidelines: any = ref([])
  onMounted(() => {
    initElementGuidelines()
  })

  function initElementGuidelines() {
    const arr: any = []
    const ids: any = componentData.value.map((item: any) => item.id)
    ids.forEach((id: string) => {
      arr.push(document.querySelector(`#${id}`))
    })
    elementGuidelines.value = arr
  }
  // 鼠标摁下
  function handleMouseDownShape(e: any, component: ComponentItem | null) {
    if (!component) return
    e.preventDefault()
    e.stopPropagation()
    initElementGuidelines()
    setCurComponent(component)
    setTargets([`#${component.id}`])
    setRuleShadow()
  }
  // 移动
  function onDrag(e: any) {
    if (!curComponent.value) return
    curComponent.value.bases.translateX = parseInt(e.translate[0])
    curComponent.value.bases.translateY = parseInt(e.translate[1])
    setRuleShadow()
  }
  // 旋转
  function onRotate({ drag }: any) {
    if (!curComponent.value) return
    curComponent.value.bases.rotate = parseInt(drag.transform.split('rotate(')[1].split('deg')[0])
  }
  // 重置大小
  function onResize(e: any) {
    if (!curComponent.value) return
    e.target.style.width = e.width + 'px'
    e.target.style.height = e.height + 'px'
    // e.target.style.transform = e.drag.transform;
    curComponent.value.bases.width = e.width
    curComponent.value.bases.height = e.height
    setRuleShadow()
    // curComponent.value.bases.transform = e.drag.transform;
  }
  // 组件样式
  const getComponentStyle = (style: any) => {
    const result: any = {}
    const needUnit = ['opacity']
    Object.keys(style).forEach((key: string) => {
      if (needUnit.includes(key)) {
        result[key] = style[key]
      }
    })
    return result
  }
  // 位置
  const getShapeStyle = (style: any): any => {
    const result: BaseStyle = {}
    const arr = ['width', 'height', 'transform', 'opacity']
    arr.forEach((attr) => {
      if (attr !== 'transform') {
        result[attr] = style[attr] + 'px'
      } else {
        result.transform = `translate(${style.translateX}px, ${style.translateY}px) rotate(${style.rotate}deg)`
      }
    })
    return result
  }
  const moveableRef = ref<Moveable>()

  watch(
    () => [curComponent.value?.bases?.width, curComponent.value?.bases?.height, curComponent.value?.bases?.translateX, curComponent.value?.bases?.translateY],
    () => {
      nextTick(() => {
        if (moveableRef.value) {
          moveableRef.value.updateRect()
        }
      })
    }
  )
</script>
<style lang="less" scoped>
  .editor {
    position: relative;
    height: 100%;
    .shape {
      position: absolute;
      left: 0;
      top: 0;
      &::before {
        content: '';
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
      }
    }
  }
</style>

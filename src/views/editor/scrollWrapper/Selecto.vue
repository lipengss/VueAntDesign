<template>
  <Selecto
    :container="editorRef"
    :dragContainer="editorRef"
    :selectableTargets="['.shape']"
    :selectByClick="true"
    :selectFromInside="false"
    :toggleContinueSelect="['shift']"
    :hitRate="0"
    :zoom="canvasOption.scale"
    @drag-start="onDragStart"
  />
</template>
<script setup lang="ts">
  import Selecto from 'vue3-selecto'
  import { storeToRefs } from 'pinia'
  import { useCanvasStore } from '@/stores/canvas'

  const { canvasOption } = storeToRefs(useCanvasStore())

  interface Props {
    editorRef: any
  }
  const props = withDefaults(defineProps<Props>(), {})

  function onDragStart(e: any) {
    console.log('e', e)
  }
</script>

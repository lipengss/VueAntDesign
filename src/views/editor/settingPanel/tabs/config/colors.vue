<template>
  <div class="colors">
    <a-form v-for="(_, index) in color" :key="index">
      <a-form-item :label="`系列{{ index + 1 }}`">
        <popuColor v-model:color="color[index]" />
      </a-form-item>
    </a-form>
  </div>
</template>
<script setup lang="ts">
  import popuColor from '@/components/popuColor/popuColor.vue'
  interface Props {
    color: string[]
  }
  withDefaults(defineProps<Props>(), {})
</script>

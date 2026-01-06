<template>
	<a-drawer width="80%" title="画板中的数据" placement="right" v-model:open="sourceCode" :destroyOnClose="true">
		<Codemirror :code="componentData" />
	</a-drawer>
</template>
<script setup lang="ts">
import Codemirror from '@/components/Codemirror/Codemirror.vue';
import { storeToRefs } from 'pinia';
import { useComponentStore } from '@/stores/component';
import { useSettingStore } from '@/stores/setting';

const { componentData } = storeToRefs(useComponentStore());
const { sourceCode } = storeToRefs(useSettingStore());
</script>

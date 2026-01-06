<template>
	<a-col :span="24">
		<flex-item title="轴线宽度">
			<a-input-number v-model:value="lineStyle.width" :min="0" :max="10" placeholder="轴线宽度" default-value="1" />
		</flex-item>
	</a-col>
	<a-col :span="24">
		<flex-item title="轴线类型">
			<a-select v-model:value="lineStyle.type" :options="lineStyleList" placeholder="选择轴线类型" />
		</flex-item>
	</a-col>
	<a-col :span="24">
		<flex-item title="轴线颜色">
			<template v-if="Array.isArray(colorList)">
				<a-space direction="vertical">
					<a-flex v-for="(color, index) in colorList" :key="index" align="center" gap="small">
						<popuColor v-model:color="colorList[index]" style="width: 200px" />
						<a-button size="small" type="primary" @click="onPush(index)" style="flex-shrink: 0">
							<template #icon>
								<PlusOutlined />
							</template>
						</a-button>
						<a-button v-if="index" size="small" danger @click="onDelete(index)" style="flex-shrink: 0">
							<template #icon>
								<MinusOutlined />
							</template>
						</a-button>
					</a-flex>
				</a-space>
			</template>
			<popuColor v-else v-model:color="lineStyle.color" />
		</flex-item>
	</a-col>
	<a-col :span="24">
		<flex-item title="透明度">
			<a-slider v-model:value="lineStyle.opacity" :min="0" :max="1" :step="0.1" style="min-width: 100px" />
			<a-input-number v-model:value="lineStyle.opacity" :min="0" :max="1" :step="0.1" placeholder="轴线宽度" default-value="1" />
		</flex-item>
	</a-col>
</template>
<script setup lang="ts">
import { computed } from 'vue';
import FlexItem from '@/components/FlexItem/index.vue';
import popuColor from '@/components/popuColor/popuColor.vue';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons-vue';
import { lineStyleList } from './data';

const props = defineProps({
	lineStyle: {
		type: Object,
		default: () => {},
	},
});

const colorList = computed(() => props.lineStyle.color);

function onPush(index: number) {
	colorList.value.splice(index + 1, 0, '#ffffff');
}

function onDelete(index: number) {
	colorList.value.splice(index, 1);
}
</script>

<template>
	<a-form-item label="标签格式器">
		<a-textarea
			:value="formatter"
			placeholder="{b|{b}} {d|{d}%}"
			size="small"
			@change="(e) => (label.formatter = e.target.value.split(',').join('/n'))"
		/>
	</a-form-item>
	<a-form-item label="字体大小">
		<input-number size="small" v-model:value="label.fontSize" :min="6" :max="60">
			<template #prefix><svg-icon name="font-size" /></template>
		</input-number>
	</a-form-item>
	<a-form-item label="字体粗细">
		<a-select v-model:value="label.fontWeight" size="small" placeholder="默认不加粗">
			<a-select-option v-for="item in weights" :key="item.value" :value="item.value">{{ item.label }}</a-select-option>
		</a-select>
	</a-form-item>
	<a-form-item label="字体颜色">
		<popuColor v-model:color="label.color" />
	</a-form-item>
	<a-form-item label="标签位置">
		<a-radio-group v-model:value="label.position" button-style="solid" size="small">
			<a-radio-button v-for="item in LABEL_POSITION" :value="item">{{ item }}</a-radio-button>
		</a-radio-group>
	</a-form-item>
	<a-form-item label="富文本样式">
		<a-space justify="flex-between">
			<a-checkbox v-model:checked="label.rich" size="small" />
			<a-button size="small" @click="onAddRich">添加</a-button>
		</a-space>
	</a-form-item>
	<a-form-item v-if="label.rich">
		<a-collapse expandIconPosition="right" style="width: 100%">
			<a-collapse-panel v-for="[name, obj] in richData">
				<template #header>
					<a-input :value="name" @change="onChange($event, name)"></a-input>
				</template>
				<a-form-item label="颜色">
					<popuColor v-model:color="obj.color" />
				</a-form-item>
				<a-form-item label="宽度">
					<NumType v-model:value="obj.width" />
				</a-form-item>
			</a-collapse-panel>
		</a-collapse>
	</a-form-item>
</template>
<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import popuColor from '@/components/popuColor/popuColor.vue';
import { weights, LABEL_POSITION } from './data';
import { hasOwn } from '@/utils/tools';
import { NumType } from '@/components/ChartConfig/index';

const props = defineProps({
	label: {
		type: Object,
		default: () => {},
	},
});

const emits = defineEmits(['update:label']);

const formatter = ref('');

const isRich = ref(false);

const richData = ref(new Map());

function onAddRich() {
	richData.value.set('', { color: '' });
}
function onChange(e: any, name: string) {
	if (richData.value.has(name)) {
		const obj = richData.value.get(name);
		richData.value.set(e.target.value, obj);
		richData.value.delete(name);
	}
}

onMounted(() => {
	if (hasOwn(props.label, 'rich')) {
		isRich.value = true;
		richData.value = new Map(Object.entries(props.label.rich));
	} else {
		isRich.value = false;
		delete props.label.rich;
	}
});

watch(
	() => richData.value,
	(val) => {
		props.label.rich = Object.fromEntries(val);
	},
	{
		deep: true,
	}
);

watch(
	() => props.label.formatter,
	(val) => {
		if (val) {
			formatter.value = val.join(',');
		} else {
			formatter.value = '';
		}
	}
);
</script>
<style lang="less" scoped>
:deep .ant-collapse-header {
	align-items: center !important;
}
</style>

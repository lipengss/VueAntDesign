<template>
	<a-col :span="24">
		<FlexItem title="标签格式器">
			<a-textarea
				:value="formatter"
				placeholder="{b|{b}} {d|{d}%}"
				auto-size
				@change="(e) => (textStyle.formatter = e.target.value.split(',').join('/n'))"
			/>
		</FlexItem>
	</a-col>
	<a-col :span="24">
		<flex-item title="字体大小">
			<a-slider style="width: 200px" v-model:value="textStyle.fontSize" :min="6" :max="60" :default-value="defaultFontSize" />
			<a-input-number style="width: 120px" v-model:value="textStyle.fontSize" :min="6" :max="60" :default-value="defaultFontSize">
				<template #addonAfter><svg-icon name="font-size" /></template>
			</a-input-number>
		</flex-item>
	</a-col>
	<a-col :span="24">
		<flex-item title="字体粗细">
			<a-select v-model:value="textStyle.fontWeight" placeholder="默认不加粗">
				<a-select-option v-for="item in weights" :key="item.value" :value="item.value">{{ item.label }}</a-select-option>
			</a-select>
		</flex-item>
	</a-col>
	<a-col :span="24">
		<flex-item title="字体颜色">
			<popuColor v-model:color="textStyle.color" />
		</flex-item>
	</a-col>
	<a-col :span="24">
		<FlexItem title="标签位置">
			<a-radio-group v-model:value="textStyle.position" button-style="solid">
				<a-radio-button v-for="item in position" :value="item">{{ item }}</a-radio-button>
			</a-radio-group>
		</FlexItem>
	</a-col>
	<a-col :span="24">
		<FlexItem title="富文本样式" justify="flex-between">
			<a-checkbox v-model:checked="textStyle.rich" />
			<a-button size="small" @click="onAddRich">添加</a-button>
		</FlexItem>
	</a-col>
	<a-col :span="24" v-if="textStyle.rich">
		<a-collapse expandIconPosition="right" style="width: 100%">
			<a-collapse-panel v-for="[name, obj] in richData">
				<template #header>
					<a-input :value="name" @change="onChange($event, name)"></a-input>
				</template>
				<a-row :gutter="[10, 10]">
					<a-col :span="24">
						<FlexItem title="颜色">
							<popuColor v-model:color="obj.color" />
						</FlexItem>
					</a-col>
					<a-col :span="24">
						<FlexItem title="宽度">
							<NumType v-model:value="obj.width" />
						</FlexItem>
					</a-col>
				</a-row>
			</a-collapse-panel>
		</a-collapse>
	</a-col>
</template>
<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import FlexItem from '@/components/FlexItem/index.vue';
import popuColor from '@/components/popuColor/popuColor.vue';
import { weights } from './data';
import { hasOwn } from '@/utils/tools';
import { NumType } from '@/components/ChartConfig/index';
import { nanoid } from 'nanoid';

const props = defineProps({
	textStyle: {
		type: Object,
		default: () => {},
	},
	defaultFontSize: {
		type: Number,
		default: 6,
	},
});

const formatter = ref('');

const isRich = ref(false);

const richData = ref(new Map());

const position = ['outside', 'inside', 'center'];

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
	if (hasOwn(props.textStyle, 'rich')) {
		isRich.value = true;
		richData.value = new Map(Object.entries(props.textStyle.rich));
	} else {
		isRich.value = false;
		delete props.textStyle.rich;
	}
});

watch(
	() => richData.value,
	(val) => {
		props.textStyle.rich = Object.fromEntries(val);
	},
	{
		deep: true,
	}
);

watch(
	() => props.textStyle.formatter,
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

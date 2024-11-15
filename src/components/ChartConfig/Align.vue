<template>
	<flex-item :title="title">
		<a-input-group compact>
			<a-auto-complete
				:value="value"
				allowClear
				:options="list.map((n) => ({ value: n }))"
				style="width: 200px"
				:placeholder="placeholder"
				@change="onChange"
			/>
			<a-tooltip>
				<template #title>
					<component :is="InputNumberTip" />
				</template>
				<a-button>
					<template #icon><QuestionCircleOutlined /></template>
				</a-button>
			</a-tooltip>
		</a-input-group>
	</flex-item>
</template>
<script setup lang="ts">
import { horizontalAlign, verticalAlign } from '@/components/ChartConfig/data';
import { InputNumberTip } from '@/utils/commonNode';
import { QuestionCircleOutlined } from '@ant-design/icons-vue';
import FlexItem from '@/components/FlexItem/index.vue';

const props = defineProps({
	title: {
		type: String,
		default: '',
	},
	value: {
		type: String,
		default: '',
	},
	horizontal: {
		type: Boolean,
		default: true,
	},
	placeholder: {
		type: String,
		default: '',
	},
});

const emit = defineEmits(['update:value']);

const list = props.horizontal ? horizontalAlign : verticalAlign;

function onChange(e) {
	emit('update:value', e);
}
</script>

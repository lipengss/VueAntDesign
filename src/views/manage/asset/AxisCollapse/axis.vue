<template>
	<a-col :span="24">
		<flex-item title="坐标轴类型">
			<a-select :options="AxisType" v-model:value="axis.type" />
		</flex-item>
	</a-col>
	<a-col :span="24">
		<flex-item title="坐标轴名称">
			<a-input v-model:value="axis.name" allowClear placeholder="轴名称" />
		</flex-item>
	</a-col>
	<a-col :span="24">
		<flex-item title="轴的位置">
			<a-radio-group v-model:value="axis.position" button-style="solid">
				<a-radio-button v-for="item in directionList" :value="item.value">
					<component :is="item.icon" />
					{{ item.label }}
				</a-radio-button>
			</a-radio-group>
		</flex-item>
	</a-col>
	<a-col :span="24">
		<flex-item title="标签位置偏移">
			<a-input-number v-model:value="axis.offset">
				<template #addonAfter>
					<component :is="props.direction === 'yAxis' ? ArrowLeftOutlined : ArrowDownOutlined" />
				</template>
			</a-input-number>
		</flex-item>
	</a-col>
</template>
<script setup lang="ts">
import { computed } from 'vue';
import FlexItem from '@/components/FlexItem/index.vue';
import { AxisType } from '@/components/ChartConfig/data';
import {
	ArrowDownOutlined,
	ArrowLeftOutlined,
	VerticalAlignBottomOutlined,
	VerticalAlignTopOutlined,
	VerticalLeftOutlined,
	VerticalRightOutlined,
} from '@ant-design/icons-vue';
const props = defineProps(['axis', 'direction']);

const directionList = computed(() => {
	if (props.direction === 'yAxis') {
		return [
			{ label: '左侧', value: 'left', icon: VerticalRightOutlined },
			{ label: '右侧', value: 'right', icon: VerticalLeftOutlined },
		];
	} else {
		return [
			{ label: '顶部', value: 'top', icon: VerticalAlignTopOutlined },
			{ label: '底部', value: 'bottom', icon: VerticalAlignBottomOutlined },
		];
	}
});
</script>

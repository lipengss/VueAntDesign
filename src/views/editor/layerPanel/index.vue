<template>
	<a-layout-sider :collapsed="!layer" :collapsedWidth="0" :width="200" :style="{ backgroundColor: token.colorBgLayout }">
		<a-flex class="top-tools" justify="space-around" align="center">
			<btn-icon v-for="item in topTools" :key="item.value" :svg-name="item.value" :title="item.label" @click="handleTools(item.value)" />
		</a-flex>
		<PerfectScrollbar class="layer-list my-scroll">
			<draggable v-model="componentData" item-key="id">
				<template #item="{ element }">
					<div class="item" :class="{ 'item-active': !!curComponent && element.id === curComponent.id }" @click="selectComponent(element)">
						<div class="img-wrap" :style="{ backgroundImage: `url(${element.image})` }" />
						<span>{{ element.title }}</span>
					</div>
				</template>
			</draggable>
		</PerfectScrollbar>
		<a-flex class="bot-tools" justify="space-around" align="center">
			<btn-icon v-for="item in botTools" :key="item.value" :svg-name="item.value" :title="item.label" @click="handleTools(item.value)" />
		</a-flex>
	</a-layout-sider>
</template>
<script setup lang="ts">
import draggable from 'vuedraggable';
import { storeToRefs } from 'pinia';
import { useSettingStore } from '@/stores/setting';
import { useComponentStore } from '@/stores/component';
import BtnIcon from '@/components/BtnIcon/index.vue';
import { theme } from 'ant-design-vue';

const { token } = theme.useToken();

const { layer } = storeToRefs(useSettingStore());
const { componentData, curComponent } = storeToRefs(useComponentStore());
const { setCurComponent, setTargets } = useComponentStore();

const topTools = [
	{ label: '上移一层', value: 'moveUp' },
	{ label: '下移一层', value: 'moveDown' },
	{ label: '置顶', value: 'toTop' },
	{ label: '置底', value: 'toBot' },
];
const botTools = [
	{ label: '删除', value: 'delete' },
	{ label: '锁定', value: 'lock' },
	{ label: '隐藏', value: 'eyesHide' },
];
const dragOptions = {
	animation: 200,
	group: 'description',
	disabled: false,
	ghostClass: 'ghost',
};
const selectComponent = (item: any) => {
	console.log(item.id);
	setCurComponent({ component: item, index: 0 });
	setTargets([`#${item.id}`]);
};
const handleTools = (pos: string) => {
	if (curComponent.value === null) return;
	const index = componentData.value.findIndex((item: any) => item.id === curComponent.value.id);
	const execute: any = {
		moveUp() {
			if (index === 0) return;
			const preData = componentData.value[index - 1];
			componentData.value.splice(index - 1, 1);
			componentData.value.splice(index, 0, preData);
		},
		moveDown() {
			if (index + 1 < componentData.value.length) {
				const nextData = componentData.value[index + 1];
				componentData.value.splice(index + 1, 1);
				componentData.value.splice(index, 0, nextData);
			}
		},
		toTop() {
			if (index === 0) return;
			const curData = componentData.value[index];
			componentData.value.splice(index, 1);
			componentData.value.unshift(curData);
		},
		toBot() {
			if (index + 1 === componentData.value.length) return;
			const curData = componentData.value[index];
			componentData.value.splice(index, 1);
			componentData.value.push(curData);
		},
		delete() {
			componentData.value.splice(index, 1);
			setCurComponent({ component: null, index: 0 });
			setTargets([]);
		},
		lock() {},
		eyesHide() {},
	};
	execute[pos]();
};
</script>
<style lang="less" scoped>
.ant-layout-sider {
	:deep .ant-layout-sider-children {
		display: flex;
		flex-direction: column;
	}
	.top-tools {
		padding: 6px;
		border-bottom: 1px solid v-bind('token.colorBorder');
	}
	.bot-tools {
		padding: 6px;
		border-top: 1px solid v-bind('token.colorBorder');
	}
	.layer-list {
		flex: 1;
		overflow-y: auto;
		.item {
			display: flex;
			align-items: center;
			padding: 8px;
			cursor: pointer;
			border-bottom: 1px solid v-bind('token.colorBorder');
			.img-wrap {
				width: 53px;
				height: 38px;
				background-color: v-bind('token.colorFillSecondary');
				border-radius: 4px;
				margin-right: 6px;
				background-size: 100% auto;
				background-position: center;
				background-repeat: no-repeat;
			}
			&:hover:not(.item-active) {
				background: v-bind('token.colorInfoBgHover');
			}
		}
		.item-active {
			background-color: v-bind('token.colorInfoBg');
			border-bottom: 1px solid v-bind('token.colorInfoBorder');
		}
	}
}
</style>

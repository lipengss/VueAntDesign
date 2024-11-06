<template>
	<a-layout-sider :collapsed="layer" :collapsedWidth="0" :width="200">
		<div class="block">
			<div class="top-tools">
				<span v-for="item in topTools" :key="item.value" :title="item.label" @click="handleTools(item.value)">
					<svg-icon :name="item.value" />
				</span>
			</div>
			<ul class="layer-list my-scroll">
				<draggable v-model="componentData" item-key="id">
					<template #item="{ element }">
						<li class="item" :class="{ 'item-active': !!curComponent && element.id === curComponent.id }" @click="selectComponent(element)">
							<div class="img-wrap">
								<div class="img" :style="{ backgroundImage: element.image }" height="100%" />
							</div>
							<span>{{ element.title }}</span>
						</li>
					</template>
				</draggable>
			</ul>
			<div class="bot-tools">
				<span v-for="item in botTools" :key="item.value" :title="item.label" @click="handleTools(item.value)">
					<svg-icon :name="item.value" />
				</span>
			</div>
		</div>
	</a-layout-sider>
</template>
<script setup lang="ts">
import { computed } from 'vue';
import draggable from 'vuedraggable';
import { storeToRefs } from 'pinia';
import { useSettingStore } from '@/stores/setting';
import { useComponentStore } from '@/stores/component';

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
	.block {
		width: 200px;
	}
	div[class*='tools'] {
		height: 32px;
		display: flex;
		justify-content: center;
		align-items: center;
		span {
			width: 20px;
			height: 20px;
			display: flex;
			justify-content: center;
			align-items: center;
			margin: 0 9px;
			border-radius: 1px;
			transition: background 0.2s;
			font-size: 14px;
			color: #bcc9d4;
			background-color: #282f3a;
			opacity: 0.3;
			cursor: pointer;
			&:hover {
				opacity: 0.5;
				background-color: #3a4650;
			}
		}
	}
	.top-tools {
		border-bottom: 1px solid #282f3a;
	}
	.bot-tools {
		border-top: 1px solid #282f3a;
	}
	.layer-list {
		height: calc(100vh - 105px);
		overflow-y: scroll;
		.item {
			display: flex;
			align-items: center;
			padding: 8px 6px;
			cursor: pointer;
			.img-wrap {
				width: 53px;
				height: 34px;
				border: 1px solid #3a4659;
				background-color: #17191c;
				margin-right: 6px;
				.img {
					height: 100%;
					background-size: 100% auto;
					background-position: center;
					background-repeat: no-repeat;
				}
			}
			&:hover:not(.item-active) {
				background: rgba(143, 255, 255, 0.1);
			}
		}
		.item-active {
			background-color: #2681ff;
		}
	}
}
</style>

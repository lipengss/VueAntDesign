<template>
	<a-collapse :bordered="false" class="dashboard-aside" ghost :activeKey="['application']">
		<a-collapse-panel key="application" header="应用列表" :showArrow="true">
			<ul class="list">
				<template v-for="item in group.list" :key="item.id">
					<li class="item" :class="{ active: group.activeId === item.id, enable: item.enable }" @click="group.activeId = item.id">
						<template v-if="item.type === 'text'">
							<span>{{ item.title }}</span>
							<span v-if="item.enable" class="action">
								<a-button type="text" shape="circle" size="small" :icon="h(EditOutlined)" @click="onEdit" />
								<a-button type="text" shape="circle" size="small" :icon="h(DeleteOutlined)" @click="onDelete" />
							</span>
							<span class="count">{{ item.count }}</span>
						</template>
						<a-input
							v-else
							ref="inputRef"
							v-model:value="item.title"
							placeholder="输入分类名称"
							allowClear
							@blur="onBlur"
							@pressEnter="onPressEnter"
						/>
					</li>
				</template>
			</ul>
			<template #extra>
				<PlusCircleOutlined @click="addClass" />
			</template>
		</a-collapse-panel>
		<a-collapse-panel key="recycle" header="回收站" :show-arrow="false">
			<template #extra>
				<DeleteOutlined />
			</template>
		</a-collapse-panel>
	</a-collapse>
</template>
<script setup lang="ts">
import { nextTick, ref, createVNode, h } from 'vue';
import { storeToRefs } from 'pinia';
import { useProductStore } from '@/stores/product';
import { Modal } from 'ant-design-vue';
import { ExclamationCircleOutlined, PlusCircleOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons-vue';
import { theme } from 'ant-design-vue';
import { nanoid } from 'nanoid';

const { token } = theme.useToken();
const { group, allAppId, currentGroup } = storeToRefs(useProductStore());

const inputRef: any = ref(null);

function onBlur() {
	const { title, id }: any = currentGroup.value;
	if (title === '') {
		group.value.list.splice(
			group.value.list.findIndex((item) => item.id === id),
			1
		);
		group.value.activeId = allAppId.value;
		return;
	}
	currentGroup.value && (currentGroup.value.type = 'text');
}
function onPressEnter(e) {
	console.log(e);
}
function addClass(event: any) {
	event.stopPropagation();
	if (group.value.list.some((item) => item.type === 'input')) return;
	const id = nanoid();
	group.value.list.splice(group.value.list.length - 1, 0, {
		title: '',
		enable: true,
		type: 'input',
		id: id,
		count: 0,
	});
	group.value.activeId = id;
	nextTick(() => inputRef.value[0].input.focus());
}
function onEdit() {
	if (group.value.list.some((item) => item.type === 'input')) return;
	currentGroup.value && (currentGroup.value.type = 'input');
	nextTick(() => inputRef.value[0].input.focus());
}
function onDelete() {
	const { title } = currentGroup.value as { title: string };
	Modal.confirm({
		title: title,
		icon: createVNode(ExclamationCircleOutlined),
		content: `${title}分组删除后，分组下的项会被移入未分组中。确认删除吗？`,
		okText: '删除',
		okType: 'danger',
		cancelText: '取消',
		okButtonProps: { type: 'primary' },
		onOk() {
			const index = group.value.list.findIndex((item) => item.id === group.value.activeId);
			group.value.list.splice(index, 1);
			group.value.activeId = allAppId.value;
		},
		onCancel() {},
	});
}
</script>
<style lang="less" scoped>
.dashboard-aside {
	text-align: left;

	:deep .ant-collapse-content {
		.ant-collapse-content-box {
			padding: 0;
		}
	}
	.list {
		.item {
			height: 40px;
			text-align: left;
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 8px 14px 8px 16px;
			cursor: pointer;
			&:hover:not(.active) {
				// background-color: rgba(255, 255, 255, 0.08);
				background-color: v-bind('token.colorPrimaryBg');
				.action {
					display: inline-block;
				}
			}
			.count {
				padding-right: 6px;
			}
			.action {
				display: none;
			}
		}
		.enable {
			&:hover {
				.count {
					display: none;
				}
			}
			&.active {
				.count {
					display: none;
				}
			}
		}
		.active {
			background-color: v-bind('token.colorPrimaryActive');
			color: #fff;
			.action {
				display: inline-block;
				.ant-btn-text {
					color: #fff;
				}
			}
		}
	}
}
</style>

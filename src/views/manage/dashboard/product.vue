<template>
	<a-card hoverable>
		<template #cover>
			<img :src="item.cover" alt="" width="300" height="140" />
			<div class="hover-active">
				<div class="line">
					<a-button type="text" size="small" title="预览"><svg-icon name="preview" /></a-button>
					<a-button type="text" size="small" title="发布"><svg-icon name="release" /></a-button>
				</div>
				<div class="line">
					<a-button type="primary" class="edit" @click="editor">编辑</a-button>
				</div>
				<div class="line">
					<a-button type="text" size="small" @click="remove"><svg-icon name="delete" /></a-button>
					<a-button type="text" size="small" @click="copy"><svg-icon name="copy" /></a-button>
				</div>
			</div>
		</template>
		<a-card-meta>
			<template #title>
				<span class="title" @click="onRename(item.id)">
					<template v-if="isActive === item.id">
						<a-input ref="inputRef" v-model:value="item.title" size="small" @blur="onRenameChange(item.id)" @pressEnter="onRenameChange(item.id)" />
					</template>
					<template v-else>
						<a-button type="text" shape="circle" size="small" :icon="h(EditOutlined)" />
						{{ item.title }}
					</template>
				</span>
				<span class="status">
					<i class="round" :class="{ push: item.status === 'push' }" />
					{{ item.status === 'push' ? '已发布' : '未发布' }}
				</span>
			</template>
		</a-card-meta>
	</a-card>
</template>
<script setup lang="ts">
import { useRouter } from 'vue-router';
import { h, nextTick, ref } from 'vue';
import { theme } from 'ant-design-vue';
import { EditOutlined } from '@ant-design/icons-vue';

const { token } = theme.useToken();

const props = defineProps({
	item: {
		type: Object,
		default: () => {},
	},
});

const emit = defineEmits(['deletes']);

const { push } = useRouter();
const isActive = ref(0);
const inputRef: any = ref(null);
const { product, id } = props.item;
const editor = () => {
	push({
		path: `/editor/${product}`,
	});
};
const remove = () => {
	emit('deletes', id);
};
function copy() {}
function onRename(id: number) {
	isActive.value = id;
	nextTick(() => {
		inputRef.value.input.focus();
	});
}
function onRenameChange(id: number) {
	if (props.item.title === '') return;
	isActive.value = 0;
}
</script>
<style lang="less" scoped>
.ant-card {
	:deep .ant-card-cover {
		border-bottom: 1px solid v-bind('token.colorBorder');
		position: relative;
		.hover-active {
			width: 100%;
			height: 100%;
			position: absolute;
			left: 0;
			top: 0;
			opacity: 0;
			animation: all 0.5s;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			background-color: v-bind('token.colorBgMask');
			border-top-left-radius: 8px;
			border-top-right-radius: 8px;
			.line {
				padding: 6px 6px;
			}
			.line:first-child {
				text-align: right;
			}
			.line:nth-child(2) {
				text-align: center;
				.edit {
					padding: 0 30px;
				}
			}
			.line:last-child {
				text-align: center;
			}
		}
		&:hover {
			.hover-active {
				opacity: 1;
			}
		}
	}
	:deep .ant-card-body {
		padding: 16px 10px;
		.ant-card-meta-title {
			display: flex;
			align-items: center;
			justify-content: space-between;
			.title {
				font-size: 14px;
				flex: 1;
			}
			.status {
				display: flex;
				align-items: center;
				.round {
					width: 8px;
					height: 8px;
					margin-left: 6px;
					margin-right: 6px;
					border-radius: 50%;
					display: inline-block;
					background-color: #666;
				}
				.push {
					background-color: #2681db;
				}
				font-size: 12px;
			}
		}
	}
}
</style>

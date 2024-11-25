<template>
	<a-table :size="size" :data-source="dataSource" :pagination="false" style="flex: 1" bordered>
		<a-table-column v-for="column in columns" :key="column.key" :title="column.title" :data-index="column.key" :align="column.align || 'center'">
			<template #default="{ record }">
				<slot v-if="column.slot" :name="column.key" :data="record" />
				<a-input v-else v-model:value="record[column.key]" size="small" :placeholder="`请输入${column.title}`" allowClear />
			</template>
		</a-table-column>
		<a-table-column key="action" title="操作" align="center">
			<template #default="{ record }">
				<a-space>
					<a-button size="small" type="primary" @click="onPush(record.id)">
						<template #icon>
							<PlusOutlined />
						</template>
					</a-button>
					<a-button size="small" danger @click="onDelete(record.id)">
						<template #icon>
							<MinusOutlined />
						</template>
					</a-button>
				</a-space>
			</template>
		</a-table-column>
		<template #emptyText>
			<a-button type="primary" shape="round" @click="onPush()">添加数据</a-button>
		</template>
	</a-table>
</template>
<script lang="ts" setup>
import { PlusOutlined, MinusOutlined } from '@ant-design/icons-vue';
import { cloneDeep } from 'lodash-es';
import { nanoid } from 'nanoid';
interface Props {
	columns: { title: string; key: string; align?: 'left' | 'right' | 'center'; slot?: boolean }[];
	dataSource: any[];
	size?: string;
	bordered?: boolean;
	temp?: any;
}
const props = withDefaults(defineProps<Props>(), {
	size: 'small',
	bordered: true,
	temp: {
		id: nanoid(),
		itemStyle: {},
	},
});

function onPush(id?: string) {
	if (id) {
		const index = props.dataSource.findIndex((item) => item.id === id);
		if (index !== -1) props.dataSource.splice(index + 1, 0, cloneDeep(props.temp));
	} else {
		props.dataSource.push(cloneDeep(props.temp));
	}
}

function onDelete(id: any) {
	props.dataSource.splice(
		props.dataSource.findIndex((item) => item.id === id),
		1
	);
}
</script>

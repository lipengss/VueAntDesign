<template>
	<div class="content">
		<a-button type="primary" @click="onCreate">PC端创建</a-button>
		<div class="slider">
			<div class="lt">
				{{ currentGroup?.title }}
				<span class="count">
					（<strong> {{ currentGroup?.count }} </strong>）个
				</span>
			</div>
			<div class="rt">
				<a-input-search v-model:value="search" placeholder="搜索" style="width: 180px; margin-right: 10px" />
				<a-select v-model:value="sort" style="width: 140px" placeholder="排序选择">
					<a-select-option value="time">按修改时间排序</a-select-option>
				</a-select>
			</div>
		</div>
		<a-list :grid="{ gutter: 16, column: 6 }" :data-source="productList">
			<template #renderItem="{ item }">
				<a-list-item style="padding: 0">
					<product :item="item" />
				</a-list-item>
			</template>
		</a-list>
	</div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { theme } from 'ant-design-vue';
import product from './product.vue';
import { storeToRefs } from 'pinia';
import { useProductStore } from '@/stores/product';
const { token } = theme.useToken();

const { productList, currentGroup } = storeToRefs(useProductStore());

const search = ref('');
const sort = ref(undefined);
const { push } = useRouter();

function onCreate() {
	push({
		path: `/editor/11695`,
	});
}
</script>
<style lang="less" scoped>
.content {
	padding: 16px;
	text-align: left;
	.slider {
		display: flex;
		align-items: center;
		justify-content: space-between;
		border-bottom: 1px solid v-bind('token.colorSplit');
		margin-bottom: 16px;
		padding: 10px 0;
		.count {
			color: v-bind('token.colorPrimary');
		}
		.lt {
			padding-left: 10px;
			position: relative;
			display: flex;
			align-items: center;
			&::before {
				content: '';
				width: 3px;
				height: 16px;
				margin-right: 10px;
				background-color: v-bind('token.colorPrimary');
			}
		}
	}
}
</style>

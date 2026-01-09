<template>
	<el-row align="middle" :gutter="[10, 10]">
		<a-col :span="6">图表边距</a-col>
		<a-col :span="18">
			<div class="margin">
				<div><a-input-number v-model:value="grid.left" size="small" /></div>
				<div class="center">
					<div><a-input-number v-model:value="grid.top" size="small" /></div>
					<div class="box">
						<div class="child"></div>
					</div>
					<div><a-input-number v-model:value="grid.bottom" size="small" /></div>
				</div>
				<div><a-input-number v-model:value="grid.right" size="small" /></div>
			</div>
		</a-col>
	</el-row>
</template>
<script setup lang="ts">
import { computed } from 'vue';
import { storeToRefs } from 'pinia';
import { useComponentStore } from '@/stores/component';

const emits = defineEmits(['change']);

const { curComponent } = storeToRefs(useComponentStore());

const grid = computed(() => curComponent.value.bases.chart.grid);


</script>
<style lang="less" scoped>
.margin {
	display: flex;
	align-items: center;
	border: 1px dashed #666;
	padding: 8px;
	.center {
		flex: 1;
		text-align: center;
		.box {
			width: 100%;
			height: 50px;
			padding: 8px;
			.child {
				width: 100%;
				height: 100%;
				border: 1px solid #666;
			}
		}
	}
	/deep/.ant-input-number {
		width: 40px;
		text-align: center;
		&:hover {
			.ant-input-number-handler-wrap {
				display: none;
			}
		}
		.ant-input-number-input {
			text-align: center;
		}
	}
}
/deep/.ant-input-group-addon {
	padding: 0 4px;
}
</style>

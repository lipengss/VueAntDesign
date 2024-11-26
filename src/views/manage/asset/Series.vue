<template>
	<a-collapse v-model="activeKeys" expandIconPosition="right">
		<a-collapse-panel v-for="(ser, index) in series" :key="ser.id" :header="ser.name">
			<template #extra>
				<a-button v-if="index !== 0" type="primary" danger size="small" @click="onDelete($event, ser.id)">删除</a-button>
			</template>
			<a-row :gutter="[10, 10]" align="middle">
				<a-col :span="24">
					<flex-item title="禁用鼠标事件">
						<a-switch v-model:checked="ser.silent" />
					</flex-item>
				</a-col>
				<a-col :span="24">
					<flex-item title="系列名称">
						<a-input v-model:value="ser.name" allowClear />
					</flex-item>
				</a-col>
				<a-col :span="24">
					<flex-item title="取色策略">
						<a-radio-group v-model:value="ser.colorBy" button-style="solid" size="small">
							<a-radio-button value="series">series</a-radio-button>
							<a-radio-button value="data">data</a-radio-button>
						</a-radio-group>
					</flex-item>
				</a-col>
				<template v-if="ser.type !== 'pie'">
					<a-col :span="24">
						<flex-item title="柱条宽度">
							<NumType v-model:value="ser.barWidth" />
						</flex-item>
					</a-col>
					<a-col :span="24">
						<flex-item title="圆角">
							<RespecSetNum v-model:value="ser.itemStyle.borderRadius" />
						</flex-item>
					</a-col>
					<a-col :span="24">
						<flex-item title="数据堆叠">
							<a-switch v-model:checked="ser.stack" />
						</flex-item>
					</a-col>
					<a-col :span="24">
						<flex-item title="柱条背景色">
							<a-switch
								v-model:checked="ser.showBackground"
								@change="(checked:boolean) => checked ? ser.backgroundStyle = {} : delete ser.backgroundStyle"
							/>
						</flex-item>
					</a-col>
					<a-card v-if="ser.showBackground" style="width: 100%" :body-style="{ padding: '10px' }">
						<a-row :gutter="[10, 10]" align="middle">
							<a-col :span="24">
								<flex-item title="背景色">
									<popu-color v-model:color="ser.backgroundStyle.color" />
								</flex-item>
							</a-col>
							<a-col :span="24">
								<flex-item title="边框宽度">
									<a-input-number v-model:value="ser.backgroundStyle.borderWidth" />
								</flex-item>
							</a-col>
							<a-col :span="24">
								<flex-item title="描边类型">
									<a-select v-model:value="ser.backgroundStyle.borderType" placeholder="选择描边类型">
										<a-select-option value="solid">实线</a-select-option>
										<a-select-option value="dashed">虚线</a-select-option>
										<a-select-option value="dotted">电线</a-select-option>
									</a-select>
								</flex-item>
							</a-col>
							<a-col :span="24">
								<flex-item title="边框颜色">
									<popu-color v-model:color="ser.backgroundStyle.borderColor" />
								</flex-item>
							</a-col>
							<a-col :span="24">
								<flex-item title="圆角">
									<RespecSetNum v-model:value="ser.backgroundStyle.borderRadius" />
								</flex-item>
							</a-col>
						</a-row>
					</a-card>
				</template>
				<LabelStyle :label="ser.label" :labelLine="ser.labelLine" />
				<template v-if="ser.type === 'pie'">
					<a-col :span="24">
						<flex-item title="饼图半径">
							<a-space direction="vertical">
								<NumType v-model:value="ser.radius[0]" title="内径" />
								<NumType v-model:value="ser.radius[1]" title="外径" />
							</a-space>
						</flex-item>
					</a-col>
					<a-col :span="24">
						<flex-item title="饼图中心">
							<a-space direction="vertical">
								<NumType v-model:value="ser.center[0]" title="横坐标" />
								<NumType v-model:value="ser.center[1]" title="纵坐标" />
							</a-space>
						</flex-item>
					</a-col>
					<a-col :span="24">
						<flex-item title="数据">
							<ArrayTable
								:data-source="ser.data"
								:columns="[
									{ title: '名称', key: 'name' },
									{ title: '数值', key: 'value' },
									{ title: '颜色', key: 'color', slot: true },
								]"
							>
								<template #color="{ data }">
									<popu-color v-model:color="data.itemStyle.color" />
								</template>
							</ArrayTable>
						</flex-item>
					</a-col>
				</template>
				<ArrayTable v-if="seriesType !== 'pie'" :data-source="ser.data" :columns="[{ title: '数值', key: 'value' }]">
					<template #color="{ data }">
						<popu-color v-model:color="data.itemStyle.color" />
					</template>
				</ArrayTable>
			</a-row>
		</a-collapse-panel>
	</a-collapse>
</template>
<script setup lang="ts">
import { ref, computed } from 'vue';
import { NumType, ArrayTable, RespecSetNum } from '@/components/ChartConfig/index.ts';
import FlexItem from '@/components/FlexItem/index.vue';
import LabelStyle from './LabelStyle.vue';
import { storeToRefs } from 'pinia';
import { useAssetStore } from '@/stores/asset';
import popuColor from '@/components/popuColor/popuColor.vue';

const props = defineProps(['chartOption']);

const { seriesType } = storeToRefs(useAssetStore());

const series = computed(() => props.chartOption.series || []);

const activeKeys = ref<string[]>([]);

function onDelete(e, id: string) {
	e.stopPropagation();
	const index = series.value.findIndex((item: any) => item.id === id);
	series.value.splice(index, 1);
}
</script>

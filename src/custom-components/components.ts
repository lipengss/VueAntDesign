import { defineAsyncComponent } from 'vue';
import { Chart } from './chart';
import deepmerge from 'deepmerge';
import { cloneDeep, merge } from 'lodash-es';
import { nanoid } from 'nanoid';

export function bg(_path: string): string {
	return new URL(`../assets/${_path}`, import.meta.url).href;
}

// interface Color {
// 	textColor: string;
// 	bgColor: string;
// 	themeColor: string;
// 	viceColor: string;
// 	colorList: string[];
// }
// export class Components extends Chart {
// 	// constructor() {
// 	// 	super(textColor, bgColor, themeColor, viceColor, colorList);
// 	// 	this.textColor = textColor;
// 	// 	this.bgColor = bgColor;
// 	// 	this.themeColor = themeColor;
// 	// 	this.viceColor = viceColor;
// 	// 	this.colorList = colorList;
// 	// }
// 	get pies() {
// 		return [
// 			{
// 				title: '基本饼状图',
// 				type: 'pie',
// 				component: 'v-pie',
// 				image: bg('echarts/pie/pie1.png'),
// 				dataSource: cloneDeep(this.dataSource),
// 				boxStyle: {
// 					width: 300,
// 					height: 150,
// 					opacity: 1,
// 				},
// 				chartOption: {
// 					color: this.colorList,
// 					backgroundColor: 'transparent',
// 					legend: merge(cloneDeep(this.legend), { show: false }),
// 					tooltip: cloneDeep(this.tooltip),
// 					series: [
// 						{
// 							type: 'pie',
// 							data: [
// 								{ value: 70, name: '数据1' },
// 								{ value: 30, name: '数据2' },
// 							],
// 						},
// 					],
// 				},
// 			},
// 			// {
// 			// 	title: '基本环形图',
// 			// 	type: 'pie',
// 			// 	component: 'v-chart',
// 			// 	image: bg('echarts/pie/pie2.png'),
// 			// 	dataSource: cloneDeep(this.dataSource),
// 			// 	bases: {
// 			// 		width: 300,
// 			// 		height: 150,
// 			// 		rotate: 0,
// 			// 		opacity: 1,
// 			// 		chart: {
// 			// 			color: this.colorList,
// 			// 			backgroundColor: 'transparent',
// 			// 			legend: merge(cloneDeep(this.legend), { show: false }),
// 			// 			tooltip: cloneDeep(this.tooltip),
// 			// 			dataset: {
// 			// 				dimensions: ['product', 'count'],
// 			// 				source: this.mockData(['A', 'B'], ['product', 'count', 'score']),
// 			// 			},
// 			// 			series: [
// 			// 				merge(cloneDeep(this.series.pie), {
// 			// 					radius: ['60%', '75%'],
// 			// 					label: {
// 			// 						position: 'center',
// 			// 					},
// 			// 				}),
// 			// 				merge(cloneDeep(this.series.pie), {
// 			// 					radius: ['45%', '45%'],
// 			// 					label: {
// 			// 						show: false,
// 			// 					},
// 			// 					itemStyle: {
// 			// 						borderWidth: 1,
// 			// 						borderColor: '#333',
// 			// 					},
// 			// 				}),
// 			// 			],
// 			// 		},
// 			// 	},
// 			// },
// 			// {
// 			// 	title: '分割环形图',
// 			// 	type: 'pie',
// 			// 	component: 'v-chart',
// 			// 	image: bg('echarts/pie/pie5.png'),
// 			// 	dataSource: cloneDeep(this.dataSource),
// 			// 	bases: {
// 			// 		width: 300,
// 			// 		height: 150,
// 			// 		rotate: 0,
// 			// 		opacity: 1,
// 			// 		chart: {
// 			// 			color: this.colorList,
// 			// 			backgroundColor: 'transparent',
// 			// 			legend: merge(cloneDeep(this.legend), { show: false }),
// 			// 			tooltip: cloneDeep(this.tooltip),
// 			// 			dataset: {
// 			// 				dimensions: ['product', 'count'],
// 			// 				source: this.mockData(['A', 'B', 'C'], ['product', 'count', 'score']),
// 			// 			},
// 			// 			series: [
// 			// 				merge(cloneDeep(this.series.pie), {
// 			// 					itemStyle: {
// 			// 						borderWidth: 2,
// 			// 						borderColor: '#0d2a42',
// 			// 					},
// 			// 					radius: ['60%', '75%'],
// 			// 					label: {
// 			// 						position: 'outside',
// 			// 					},
// 			// 				}),
// 			// 			],
// 			// 		},
// 			// 	},
// 			// },
// 		];
// 	}
// 	get bars() {
// 		return [
// 			{
// 				title: '基本柱状图',
// 				type: 'bar',
// 				component: 'v-bar',
// 				image: bg('echarts/bar/bar2.png'),
// 				dataSource: cloneDeep(this.dataSource),
// 				bases: {
// 					width: 300,
// 					height: 150,
// 					rotate: 0,
// 					opacity: 1,
// 					chart: {
// 						color: this.colorList,
// 						backgroundColor: 'transparent',
// 						grid: cloneDeep(this.grid),
// 						legend: merge(cloneDeep(this.legend), { show: false }),
// 						tooltip: cloneDeep(this.tooltip),
// 						dataset: {
// 							dimensions: ['product', 'count'],
// 							source: this.mockData(['A', 'B', 'C', 'D', 'E'], ['product', 'count']),
// 						},
// 						xAxis: merge(cloneDeep(this.xAxis), {
// 							axisLine: {
// 								show: false,
// 							},
// 						}),
// 						yAxis: merge(cloneDeep(this.yAxis), {
// 							axisLine: {
// 								show: false,
// 							},
// 							splitLine: {
// 								show: true,
// 							},
// 							splitNumber: 4,
// 						}),
// 						series: [cloneDeep(this.series.bar)],
// 					},
// 				},
// 			},
// 			{
// 				title: '堆叠柱状图',
// 				type: 'bar',
// 				component: 'v-bar',
// 				image: bg('echarts/bar/bar3.png'),
// 				dataSource: cloneDeep(this.dataSource),
// 				bases: {
// 					width: 300,
// 					height: 150,
// 					rotate: 0,
// 					opacity: 1,
// 					chart: {
// 						color: this.colorList,
// 						backgroundColor: 'transparent',
// 						grid: cloneDeep(this.grid),
// 						legend: merge(cloneDeep(this.legend), { show: false }),
// 						tooltip: cloneDeep(this.tooltip),
// 						dataset: {
// 							dimensions: ['product', 'count'],
// 							source: this.mockData(['A', 'B', 'C', 'D', 'E'], ['product', 'count']),
// 						},
// 						xAxis: merge(cloneDeep(this.xAxis), {
// 							axisLine: {
// 								show: false,
// 							},
// 						}),
// 						yAxis: merge(cloneDeep(this.yAxis), {
// 							axisLine: {
// 								show: false,
// 							},
// 							splitLine: {
// 								show: true,
// 							},
// 							splitNumber: 4,
// 						}),
// 						series: [cloneDeep(this.series.bar)],
// 					},
// 				},
// 			},
// 			{
// 				title: '多系列柱状图',
// 				type: 'bar',
// 				component: 'v-chart',
// 				image: bg('echarts/bar/bar5.png'),
// 				dataSource: { ...this.dataSource },
// 				bases: {
// 					width: 300,
// 					height: 150,
// 					rotate: 0,
// 					opacity: 1,
// 					chart: {
// 						color: this.colorList,
// 						backgroundColor: 'transparent',
// 						grid: deepmerge(this.grid, { top: 30 }),
// 						legend: cloneDeep(this.legend),
// 						tooltip: cloneDeep(this.tooltip),
// 						dataset: {
// 							dimensions: ['product', 'count', 'series'],
// 							source: this.mockData(['A', 'B', 'C', 'D', 'E'], ['product', 'count', 'series']),
// 						},
// 						xAxis: deepmerge(this.xAxis, {
// 							axisLine: {
// 								show: false,
// 							},
// 						}),
// 						yAxis: deepmerge(this.yAxis, {
// 							axisLine: {
// 								show: false,
// 							},
// 							minInterval: 80,
// 							splitLine: {
// 								show: true,
// 							},
// 						}),
// 						series: [
// 							cloneDeep(this.series.bar),
// 							deepmerge(this.series.bar, {
// 								name: '系列2',
// 								fields: 'series',
// 								barGap: 0.2,
// 							}),
// 						],
// 					},
// 				},
// 			},
// 			// {
// 			//   title: '斑马柱状图',
// 			//   type: 'bar',
// 			//   component: 'v-chart',
// 			//   image: bg('echarts/bar/bar7.png'),
// 			//   dataSource: cloneDeep(this.dataSource),
// 			//   bases: {
// 			//     width: 300,
// 			//     height: 150,
// 			//     rotate: 0,
// 			//     opacity: 1,
// 			//     chart: {
// 			//       color: this.colorList,
// 			//       grid: cloneDeep(this.grid),
// 			//       legend: cloneDeep(this.legend),
// 			//       tooltip: cloneDeep(this.tooltip),
// 			//       dataset: {
// 			//         dimensions: ['product', 'count'],
// 			//         source: this.mockData(['A', 'B', 'C', 'D', 'E'], ['product', 'count'])
// 			//       },
// 			//       xAxis: cloneDeep(this.xAxis),
// 			//       yAxis: cloneDeep(this.yAxis),
// 			//       series: [
// 			//         deepmerge(this.series.bar, {
// 			//           type: 'pictorialBar',
// 			//           symbol: 'rect',
// 			//           symbolRepeat: 'fixed',
// 			//           barWidth: 10,
// 			//           symbolSize: [20, 6],
// 			//         })
// 			//       ]
// 			//     }
// 			//   }
// 			// }
// 		];
// 	}
// 	get strip() {
// 		return [
// 			{
// 				title: '基本条形图',
// 				type: 'strip',
// 				component: 'v-chart',
// 				image: bg('echarts/strip/strip1.png'),
// 				dataSource: cloneDeep(this.dataSource),
// 				bases: {
// 					width: 300,
// 					height: 150,
// 					rotate: 0,
// 					opacity: 1,
// 					chart: {
// 						color: this.colorList,
// 						backgroundColor: 'transparent',
// 						grid: cloneDeep(this.grid),
// 						legend: cloneDeep(this.legend),
// 						tooltip: cloneDeep(this.tooltip),
// 						dataset: {
// 							dimensions: ['product', 'count', 'series1'],
// 							source: this.mockData(['A', 'B', 'C', 'D', 'E'], ['product', 'count', 'series1']),
// 						},
// 						xAxis: deepmerge(this.xAxis, {
// 							type: 'value',
// 							boundaryGap: 0,
// 							axisLine: {
// 								show: false,
// 							},
// 						}),
// 						yAxis: deepmerge(this.yAxis, {
// 							type: 'category',
// 							boundaryGap: '20%',
// 							inverse: true,
// 							axisLine: {
// 								show: false,
// 							},
// 						}),
// 						series: [
// 							deepmerge(this.series.bar, {
// 								name: '系列1',
// 								barWidth: 6,
// 							}),
// 							deepmerge(this.series.bar, {
// 								name: '系列2',
// 								barWidth: 6,
// 								barGap: 0.3,
// 							}),
// 						],
// 					},
// 				},
// 			},
// 			// {
// 			//   title: '圆角进度图',
// 			//   type: 'strip',
// 			//   component: 'v-chart',
// 			//   image: bg('echarts/strip/strip3.png'),
// 			//   dataSource: cloneDeep(this.dataSource),
// 			//   bases: {
// 			//     width: 300,
// 			//     height: 150,
// 			//     rotate: 0,
// 			//     opacity: 1,
// 			//     chart: {
// 			//       color: this.colorList,
// 			//       grid: cloneDeep(this.grid),
// 			//       legend: cloneDeep(this.legend),
// 			//       tooltip: cloneDeep(this.tooltip),
// 			//       dataset: {
// 			//         dimensions: ['product', 'count', 'series1'],
// 			//         source: this.mockData(['A', 'B', 'C', 'D', 'E'], ['product', 'count', 'series1'])
// 			//       },
// 			//       xAxis: deepmerge(this.xAxis, {
// 			//         type: 'value',
// 			//         boundaryGap: 0
// 			//       }),
// 			//       yAxis: deepmerge(this.xAxis, {
// 			//         type: 'category',
// 			//         boundaryGap: '20%',
// 			//         inverse: true
// 			//       }),
// 			//       series: [
// 			//         deepmerge(this.series.bar, {
// 			//           name: '系列1',
// 			//           barWidth: 6,
// 			//           itemStyle: {
// 			//             borderRadius: 100
// 			//           }
// 			//         }),
// 			//         deepmerge(this.series.bar, {
// 			//           name: '系列2',
// 			//           barWidth: 6,
// 			//           barGap: -1,
// 			//           barCategoryGap: '100%',
// 			//           itemStyle: {
// 			//             borderRadius: 100
// 			//           },
// 			//           showBackground: true,
// 			//           backgroundStyle: {
// 			//             color: 'transparent',
// 			//             borderWidth: 1,
// 			//             borderRadius: 100,
// 			//             borderColor: this.viceColor
// 			//           }
// 			//         }),
// 			//       ]
// 			//     }
// 			//   }
// 			// },
// 			{
// 				title: '直角进度图',
// 				type: 'strip',
// 				component: 'v-chart',
// 				image: bg('echarts/strip/strip2.png'),
// 				dataSource: cloneDeep(this.dataSource),
// 				bases: {
// 					width: 300,
// 					height: 150,
// 					rotate: 0,
// 					opacity: 1,
// 					chart: {
// 						color: this.colorList,
// 						backgroundColor: 'transparent',
// 						grid: cloneDeep(this.grid),
// 						legend: cloneDeep(this.legend),
// 						tooltip: cloneDeep(this.tooltip),
// 						dataset: {
// 							dimensions: ['product', 'count', 'series1', 'series2'],
// 							source: this.mockData(['A', 'B', 'C', 'D', 'E'], ['product', 'count', 'series1', 'series2']),
// 						},
// 						xAxis: deepmerge(this.xAxis, {
// 							type: 'value',
// 							boundaryGap: 0,
// 						}),
// 						yAxis: deepmerge(this.xAxis, {
// 							type: 'category',
// 							boundaryGap: '20%',
// 							inverse: true,
// 						}),
// 						series: [
// 							deepmerge(this.series.bar, {
// 								name: '系列1',
// 								barWidth: 10,
// 							}),
// 							deepmerge(this.series.bar, {
// 								name: '系列2',
// 								barWidth: 10,
// 							}),
// 							deepmerge(this.series.bar, {
// 								name: '系列3',
// 								barWidth: 10,
// 								barGap: -1,
// 								barCategoryGap: '100%',
// 								showBackground: true,
// 								backgroundStyle: {
// 									color: 'transparent',
// 									borderWidth: 1,
// 									borderColor: this.viceColor,
// 								},
// 							}),
// 						],
// 					},
// 				},
// 			},
// 		];
// 	}
// 	get lines() {
// 		return [
// 			{
// 				title: '折线图',
// 				type: 'line',
// 				component: 'v-chart',
// 				image: bg('echarts/line/line1.png'),
// 				dataSource: cloneDeep(this.dataSource),
// 				bases: {
// 					width: 300,
// 					height: 150,
// 					rotate: 0,
// 					opacity: 1,
// 					chart: {
// 						color: this.colorList,
// 						backgroundColor: 'transparent',
// 						grid: cloneDeep(this.grid),
// 						legend: cloneDeep(this.legend),
// 						tooltip: cloneDeep(this.tooltip),
// 						dataset: {
// 							dimensions: ['product', 'count'],
// 							source: this.mockData(['A', 'B', 'C', 'D', 'E'], ['product', 'count']),
// 						},
// 						xAxis: deepmerge(this.xAxis, {
// 							boundaryGap: false,
// 						}),
// 						yAxis: cloneDeep(this.xAxis),
// 						series: [cloneDeep(this.series.line)],
// 					},
// 				},
// 			},
// 		];
// 	}
// 	get control() {
// 		return [
// 			{
// 				title: '按钮',
// 				type: 'btn',
// 				component: 'v-button',
// 				image: bg('control/button.png'),
// 				events: [],
// 				bases: {
// 					width: 88,
// 					height: 32,
// 					rotate: 0,
// 					opacity: 1,
// 					control: {
// 						propValue: '主题按钮',
// 						cursor: 'default',
// 						style: {
// 							backgroundColor: '#177ddc',
// 							borderWidth: 1,
// 							borderRadius: 0,
// 							borderStyle: 'solid',
// 							borderColor: '#177ddc',
// 							fontSize: 14,
// 							color: '#fff',
// 							fontWeight: 400,
// 						},
// 					},
// 				},
// 			},
// 			{
// 				title: '下拉框选择器',
// 				type: 'select',
// 				component: 'v-select',
// 				image: bg('control/select.png'),
// 				bases: {
// 					width: 120,
// 					height: 32,
// 					rotate: 0,
// 					opacity: 1,
// 					control: {
// 						open: false,
// 						placeholder: '请选择...',
// 						options: [],
// 					},
// 				},
// 			},
// 		];
// 	}
// }

export const chartComponents = [
	{
		title: '基本饼状图',
		type: 'pie',
		tab: 'echarts',
		component: 'v-pie',
		image: bg('echarts/pie/pie1.png'),

		id: nanoid(),
		boxStyle: {
			width: 300,
			height: 150,
			opacity: 1,
		},
		dataSource: {},
		bases: {
			width: 300,
			height: 150,
			rotate: 0,
			opacity: 1,
			chart: {
				color: ['#1f87e8ff', '#91cc75'],
				series: [
					{
						type: 'pie',
						radius: [0, '90%'],
						data: [
							{ value: 75, name: '数据1' },
							{ value: 25, name: '数据2' },
						],
						label: {
							position: 'inside',
							formatter: '{d}%',
							color: '#fff',
							fontSize: 14,
							fontWieght: 'bold',
						},
					},
				],
			},
		},
		events: [],
		animation: [],
	},
	{
		title: '环形饼状图',
		type: 'pie',
		tab: 'echarts',
		component: 'v-pie',
		image: bg('echarts/pie/pie2.png'),
		id: nanoid(),
		boxStyle: {
			width: 300,
			height: 150,
			opacity: 1,
		},
		dataSource: {},
		bases: {
			width: 300,
			height: 150,
			rotate: 0,
			opacity: 1,
			chart: {
				color: ['#1f87e8ff', '#91cc75'],
				legend: {
					left: '90%',
					top: 'center',
					label: {
						show: true,
					},
				},
				series: [
					{
						type: 'pie',
						radius: ['70%', '86%'],
						data: [
							{ value: 335, name: 'A' },
							{ value: 200, name: 'B' },
							{ value: 600, name: 'C' },
						],
						label: {
							position: 'center',
							formatter: '{d}%',
							color: '#a9a9a9ff',
							fontSize: 14,
							fontWieght: 'bold',
						},
					},
				],
			},
		},
		events: [],
		animation: [],
	},
];

export function registerGlobalComponents(app) {
	// 使用 import.meta.glob 来批量导入组件
	const components = import.meta.glob('./**/*.vue');
	// 遍历所有组件，异步导入并全局注册
	for (const [path, resolver] of Object.entries(components)) {
		const componentName = path
			.split('/')
			.pop()
			.replace(/\.\w+$/, ''); // 去掉文件扩展名，得到组件名称
		app.component(componentName, defineAsyncComponent(resolver));
	}
}

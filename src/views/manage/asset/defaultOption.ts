import { nanoid } from 'nanoid';

export class DefaultOption {
	color: string[] | any[];
	title: { show: boolean; text: string; left: string; top: string; textStyle: { color: string; fontSize: number; fontWeight: number } };
	legend: { show: boolean; top: string; orient: string };
	tooltip: {
		show: boolean;
		trigger: 'item' | 'axis' | 'none';
		axisPointer: {
			type: 'shadow' | 'line' | 'cross' | 'none';
			label: {
				show: boolean;
			};
		};
	};
	data: { name: string; value: number; id: string; itemStyle: {} }[];
	constructor() {
		this.title = {
			show: false,
			text: '主标题文本',
			left: 'center',
			top: '10',
			textStyle: {
				color: '#333',
				fontSize: 18,
				fontWeight: 400,
			},
		};
		this.legend = {
			show: false,
			top: '10',
			orient: 'horizontal',
		};
		this.tooltip = {
			show: false,
			trigger: 'item',
			axisPointer: {
				type: 'shadow',
				label: {
					show: false,
				},
			},
		};
		this.color = [
			{
				type: 'linear',
				x: 0,
				y: 0,
				x2: 0,
				y2: 1,
				colorStops: [
					{
						offset: 0,
						color: '#77D8FF', // 0% 处的颜色
					},
					{
						offset: 1,
						color: '#0C75FF', // 100% 处的颜色
					},
				],
			},
			'#91cc75',
			'#fac858',
			'#ee6666',
			'#73c0de',
			'#3ba272',
			'#fc8452',
			'#9a60b4',
			'#ea7ccc',
		];
		this.data = [{ name: '数据1', value: 335, id: nanoid(), itemStyle: {} }];
	}
	mergeGlobal() {
		return {
			color: this.color,
			title: this.title,
			legend: this.legend,
			tooltip: this.tooltip,
			toolbox: {
				right: 10,
				feature: {
					saveAsImage: {
						type: 'png',
						title: '保存图片',
						backgroundColor: 'transparent',
					},
				},
			},
		};
	}
	get getChart(): any {
		return {
			pie: () => {
				return {
					...this.mergeGlobal(),
					series: [
						{
							name: `系列1`,
							id: nanoid(),
							type: 'pie',
							radius: ['55%', '70%'],
							center: ['50%', '50%'],
							colorBy: 'data',
							label: {
								show: true,
								color: '#fff',
								fontSize: 12,
								fontWeight: 400,
							},
							labelLine: {
								show: true,
							},
							data: [{ value: 335, name: '数据2', id: nanoid(), itemStyle: {} }],
							emphasis: {
								itemStyle: {
									shadowBlur: 10,
									shadowOffsetX: 0,
									shadowColor: 'rgba(0, 0, 0, 0.5)',
								},
							},
						},
					],
				};
			},
			bar: () => {
				const global = this.mergeGlobal();
				global.tooltip.show = true;
				global.tooltip.trigger = 'axis';
				return {
					...global,
					grid: {
						left: 50,
						bottom: 40,
						right: 40,
						top: 40,
					},
					xAxis: {
						show: true,
						name: '',
						type: 'category',
						position: 'bottom',
						offset: 0,
						data: [
							{
								value: 'A',
							},
							{
								value: 'B',
							},
							{
								value: 'C',
							},
							{
								value: 'D',
							},
							{
								value: 'E',
							},
						],
						axisLine: {
							show: true,
							symbol: ['none', 'none'],
							symbolSize: [10, 15],
							symbolOffset: [0, 0],
							lineStyle: {
								opacity: 1,
							},
						},
						axisTick: {
							show: true,
							lineStyle: {
								opacity: 1,
							},
						},
						axisLabel: {
							show: true,
						},
						splitLine: {
							show: false,
							lineStyle: {
								color: ['#ccc'],
								opacity: 1,
							},
						},
					},
					yAxis: {
						show: true,
						type: 'value',
						axisLine: {
							show: true,
							symbol: ['none', 'none'],
							symbolSize: [10, 15],
							symbolOffset: [0, 0],
							lineStyle: {
								opacity: 1,
							},
						},
						axisTick: {
							show: true,
							lineStyle: {
								opacity: 1,
							},
						},
						axisLabel: {
							show: true,
						},
						splitLine: {
							show: false,
							lineStyle: {
								color: ['#ccc'],
								opacity: 1,
							},
						},
					},
					series: [
						{
							name: `系列1`,
							id: nanoid(),
							type: 'bar',
							colorBy: 'series',
							label: {
								show: false,
								color: '#fff',
								fontSize: 12,
								fontWeight: 400,
							},
							data: [
								{
									value: 110,
								},
								{
									value: 120,
								},
								{
									value: 160,
								},
								{
									value: 60,
								},
								{
									value: 90,
								},
							],
							labelLine: {
								show: false,
							},
							itemStyle: {},
							emphasis: {
								itemStyle: {
									shadowBlur: 10,
									shadowOffsetX: 0,
									shadowColor: 'rgba(0, 0, 0, 0.5)',
								},
							},
						},
					],
				};
			},
			strip: () => {},
			line: () => {},
			area: () => {},
			point: () => {},
			radar: () => {},
			relation: () => {},
			other: () => {},
			all: () => {},
		};
	}
}

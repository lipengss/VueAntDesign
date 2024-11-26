import { chartComponents, bg } from './components';

import { BarChartOutlined, TableOutlined, StarOutlined, ApartmentOutlined, SecurityScanOutlined } from '@ant-design/icons-vue';

// 类型： chart
export const allComponentData: AsideComponentTypeItem = {
	echarts: {
		name: '图表',
		icon: BarChartOutlined,
		tabs: [
			{
				title: '全部',
				type: 'all',
				components: chartComponents,
			},
			{
				title: '柱状图',
				type: 'bar',
				components: chartComponents.filter((n) => n.type === 'bar'),
			},
			{
				title: '条形图',
				type: 'strip',
				components: [],
			},
			{
				title: '折线图',
				type: 'line',
				components: chartComponents.filter((n) => n.type === 'line'),
			},
			{
				title: '区域图',
				type: 'area',
				components: [],
			},
			{
				title: '饼环图',
				type: 'pie',
				components: chartComponents.filter((n) => n.type === 'pie'),
			},
			{
				title: '散点图',
				type: 'point',
				components: [],
			},
			{
				title: '雷达图',
				type: 'radar',
				components: chartComponents.filter((n) => n.type === 'radar'),
			},
			{
				title: '关系图',
				type: 'relation',
				components: [],
			},
			{
				title: '其他',
				type: 'other',
				components: [],
			},
		],
	},
	info: {
		name: '信息',
		icon: ApartmentOutlined,
		components: [
			{
				title: '通用标题',
				image: bg('info/info1.png'),
			},
			{
				title: '跑马灯',
				image: bg('info/info2.png'),
			},
			{
				title: '词云',
				image: bg('info/info3.png'),
			},
			{
				title: '业务指标趋势',
				image: bg('info/info4.png'),
			},
		],
	},
	table: {
		name: '表格',
		icon: TableOutlined,
		components: [
			{
				title: '轮播列表',
				image: bg('table/table1.png'),
			},
			{
				title: '键值表格',
				image: bg('table/table2.png'),
			},
		],
	},
	control: {
		name: '控件',
		icon: SecurityScanOutlined,
		components: [
			{
				title: '开关',
				image: bg('control/switch.png'),
			},
			{
				title: 'Tab列表',
				image: bg('control/tab.png'),
			},
			{
				title: '时间轴',
				image: bg('control/axis.png'),
			},
			{
				title: '单选框',
				image: bg('control/checkbox.png'),
			},
			{
				title: '时间选择器',
				image: bg('control/date.png'),
			},
			{
				title: '输入框',
				image: bg('control/input.png'),
			},
			{
				title: '进度条',
				image: bg('control/progress.png'),
			},
		],
	},
	like: {
		name: '收藏',
		icon: StarOutlined,
		components: [],
	},
};

export const lineStyleList = [
	{ label: '实线', value: 'solid' },
	{ label: '虚线', value: 'dashed' },
	{ label: '点线', value: 'dotted' },
];
export const pointers = [
	{ label: '直线指示器', value: 'line' },
	{ label: '阴影指示器', value: 'shadow' },
	{ label: '十字准星指示器', value: 'cross' },
	{ label: '无指示器', value: 'none' },
];
export const positions = [
	{ label: '上', value: 'top' },
	{ label: '左', value: 'left' },
	{ label: '右', value: 'right' },
	{ label: '下', value: 'bottom' },
];
export const dataSource = [
	{ label: '选项名', key: 'label', placeholder: '选项名', dom: 'input', type: 'string' },
	{ label: '选项标识', key: 'value', placeholder: '选项标识', dom: 'input', type: 'string' },
	{ label: '操作', key: 'operation', placeholder: '删除', dom: 'button' },
];
export const weights = [
	{ label: '默认', value: 400 },
	{ label: '粗体', value: 700 },
];

export const chartsType = [
	{ label: '柱状图', value: 'bar' },
	{ label: '折线图', value: 'line' },
];

export const AxisType = [
	{ label: '数值轴', value: 'value' },
	{ label: '类目轴', value: 'category' },
	{ label: '时间轴', value: 'time' },
	{ label: '对数轴', value: 'log' },
];

export const pieLabelPositions = ['outside', 'inside', 'center'];
export const legendType = ['circle', 'rect', 'roundRect', 'triangle', 'diamond', 'none'];
export const labelPositions = [
	'top',
	'left',
	'right',
	'bottom',
	'inside',
	'insideLeft',
	'insideRight',
	'insideTop',
	'insideBottom',
	'insideTopLeft',
	'insideBottomLeft',
	'insideTopRight',
	'insideBottomRight',
];

export const horizontalAlign = ['left', 'center', 'right'];
export const verticalAlign = ['top', 'middle', 'bottom'];

export const axisSymbol = ['circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow', 'none'];

export function formatStrArr(arr: any) {
	return arr.map((item: any) => {
		return { label: item, value: item };
	});
}


export const BACKGROUND_REPEAT = [
	{ label: '不重复', value: 'no-repeat' },
	{ label: '重复', value: 'repeat' },
	{ label: '水平重复', value: 'repeat-x' },
	{ label: '垂直重复', value: 'repeat-y' },
	{ label: '间距重复', value: 'round' },
];

export const BACKGROUND_POSITION = [
	{ label: '顶部', value: 'top' },
	{ label: '底部', value: 'bottom' },
	{ label: '左侧', value: 'left' },
	{ label: '右侧', value: 'right' },
	{ label: '居中', value: 'center' },
];

export const BACKGROUND_SIZE = [
	{ label: '自动', value: 'auto' },
	{ label: '包含', value: 'contain' },
	{ label: '覆盖', value: 'cover' },
];

export const LABEL_POSITION  = ['outside', 'inside', 'center'];

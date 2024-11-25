interface ComponentStyle {
	top: number;
	left: number;
	width: number;
	height: number;
	rotate: number;
}

interface BaseStyle {
	[key: string]: any;
	width?: number | string;
	height?: number | string;
	left?: number | string;
	top?: number | string;
	rotate?: number | string;
	rotateX?: number | string;
	rotateY?: number | string;
	opacity?: number | string;
}

interface Component {
	component: any;
	index?: number;
}

type SeiresType = 'all' | 'bar' | 'strip' | 'line' | 'area' | 'pie' | 'point' | 'radar' | 'relation' | 'other';

interface ComponentTypeItem {
	name: string;
	icon: any;
	clas: 'tab' | 'component';
	tabs?: {
		title: string;
		type: SeiresType;
		components: any[];
	}[];
	components: AsideComponentItem[];
}

interface AsideComponentTypeItem {
	[key: string]: ComponentTypeItem;
	echarts: ComponentTypeItem;
	info: ComponentTypeItem;
	table: ComponentTypeItem;
	control: ComponentTypeItem;
	like: ComponentTypeItem;
}

interface ComponentItem {
	title: string;
	image: string;
	type?: string;
	component: string;
	events?: any[];
	bases: any;
	id: string;
	offsetX: number;
	offsetY: number;
}

interface ColumnItem {
	title: string;
	dataIndex: string;
	type: string;
	id: number;
	desc: string;
	disDel: boolean;
	fixed?: booleam;
	placeholder?: string;
}

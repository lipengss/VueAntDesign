import { IconComponentProps } from '@ant-design/icons-vue/lib/components/Icon';

interface ComponentStyle {
	top: number;
	left: number;
	width: number;
	height: number;
	rotate: number;
}

export interface BaseStyle {
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
	index: number;
}

type TabType = 'all' | 'bar' | 'strip' | 'line' | 'area' | 'pie' | 'point' | 'radar' | 'relation' | 'other';

interface ComponentTypeItem {
	name: string;
	icon: any;
	clas: 'tab' | 'component';
	tabs?: {
		title: string;
		type: TabType;
		components: any[];
	}[];
	components: AsideComponentItem[];
}

export interface AsideComponentTypeItem {
	echarts: ComponentTypeItem;
	info: ComponentTypeItem;
	table: ComponentTypeItem;
	control: ComponentTypeItem;
	like: ComponentTypeItem;
}

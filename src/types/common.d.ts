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

import { defineStore } from 'pinia';

interface State {
	canvasOption: any;
}

export const useCanvasStore = defineStore('canvasStore', {
	state: (): State => ({
		// 画布组件数据
		canvasOption: {
			thick: 20,
			width: 1470, // 尺子的宽度
			height: 800, // 尺子的高度
			showShadowText: false,
			canvasWidth: 1920, // 画布宽度
			canvasHeight: 1080, // 画布高度
			showRuler: true, // 显示尺子
			snapsObj: { h: [0, 100, 200], v: [130] },
			backgroundColor: '#0d2a42',
			scale: 1,
			shadow: {
				x: 0,
				y: 0,
				width: 300,
				height: 300,
			},
			panzoomOption: {
				canvas: true,
				maxScale: 3,
				minScale: 0.3,
				disablePan: false,
				disableZoom: false,
				contain: 'none',
				handleStartEvent: (event: any) => {
					event.preventDefault();
					console.log('handleStartEvent', event);
				},
			},
			isShowReferLine: true,
			lines: {
				h: [0, 250],
				v: [0, 500],
			},
		},
	}),
	actions: {},
});
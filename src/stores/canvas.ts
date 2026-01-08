import { defineStore, storeToRefs } from 'pinia';
import type { PaletteType } from 'vue3-sketch-ruler';
import { useThemeStore } from './theme';
import { useComponentStore } from './component';

interface State {
	canvasOption: any;
	ruleOption: any;
}

export const useCanvasStore = defineStore('canvasStore', {
	state: (): State => ({
		// 画布组件数据
		canvasOption: {
			thick: 20, // 尺子的厚度
			width: 1470, // 尺子的宽度
			height: 800, // 尺子的高度
			canvasWidth: 1920, // 画布宽度
			canvasHeight: 1080, // 画布高度
			snapsObj: { h: [], v: [] }, // 吸附刻度集合
			backgroundColor: '#dedede',
			isShowBackgroundImage: false,
			backgroundImage: '',
			backgroundSize: 'cover',
			backgroundPosition: 'center',
			backgroundRepeat: 'no-repeat',
			scale: 1,
			showShadowText: false,
			shadow: {
				x: 0,
				y: 0,
				width: 0,
				height: 0,
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
			}, // panzoom相关的扩展参数
			isShowReferLine: true, // 是否显示标线
			showRuler: true, // 是否显示尺规
			lines: {
				h: [],
				v: [],
			}, // 初始化水平标尺上的参考线
		},
		ruleOption: {
			bgColor: 'transparent',
			lineColor: '#ff4d4f',
			lineType: 'solid',
			shadowColor: '#bae0ff'
		},
	}),
	getters: {
		palette(state): PaletteType {
			const { modeIcon } = storeToRefs(useThemeStore());
			return modeIcon.value === 'dark'
				? state.ruleOption
				: {
						hoverBg: '#fff',
						bb: '#fff',
						hoverColor: '#000',
						longfgColor: '#BABBBC', // ruler longer mark color
						fontColor: '#DEDEDE', // ruler font color
						shadowColor: '#525252', // ruler shadow color
						borderColor: '#303030',
						...state.ruleOption,
				  };
		},
		canvasStyle(state) {
			const {
				canvasWidth,
				canvasHeight,
				backgroundColor,
				isShowBackgroundImage,
				backgroundImage,
				backgroundSize,
				backgroundPosition,
				backgroundRepeat,
			} = state.canvasOption;
			const backgroundImageOption = isShowBackgroundImage
				? { backgroundImage: `url(${backgroundImage})`, backgroundSize, backgroundPosition, backgroundRepeat }
				: {
					backgroundImage: 'none',
				};
			return {
				width: `${canvasWidth}px`,
				height: `${canvasHeight}px`,
				backgroundColor,
				...backgroundImageOption,
			};
		},
		ruleWrapperStyle(state) {
			const { width, height } = state.canvasOption;
			return {
				width: `${width}px`,
				height: `${height}px`,
			};
		},
	},
	actions: {
		setRuleShadow() {
			const { curComponent } = storeToRefs(useComponentStore());
			if (curComponent.value) {
				const { bases } = curComponent.value;
				this.canvasOption.shadow = {
					x: bases.translateX,
					y: bases.translateY,
					width: bases.width,
					height: bases.height,
				};
			}
		}
	},
});

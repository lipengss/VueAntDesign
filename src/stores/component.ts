import { defineStore } from 'pinia';

interface State {
	componentData: Component[];
	editMode: boolean;
	curComponent: any;
	isTarget: any[];
	curComponentIndex: any;
	canvasStyleData: any;
}

export const useComponentStore = defineStore('componentStore', {
	state: (): State => ({
		// 画布组件数据
		componentData: [],
		editMode: false,
		// 如果没点中组件，并且在画布空白处弹起鼠标，则取消当前组件的选中状态
		curComponent: null,
		isTarget: [],
		curComponentIndex: null,
		canvasStyleData: {
			width: 1920,
			height: 1080,
			scale: 1,
			backgroundColor: '#0d2a42',
		},
	}),
	actions: {
		// 添加组件数据
		addComponentData(data: Component) {
			if (data.index !== undefined) {
				this.componentData.splice(data.index, 0, data.component);
			} else {
				this.componentData.push(data.component);
			}
		},
		clearComponent() {
			this.componentData = [];
			this.curComponent = null;
		},
		setTargets(arr: any) {
			this.isTarget = arr;
		},
		// 页面设置
		setCanvasStyleData(data: { key: string; value: string }): void {
			this.canvasStyleData[data.key] = data.value;
		},
		// 设置当前选中的组件
		setCurComponent(data: Component) {
			this.curComponent = data.component;
			this.curComponentIndex = data.index;
		},
		// 设置当前组件的样式
		setShapeStyle(style: ComponentStyle) {
			if (!this.curComponent) return;
			if (style.top) this.curComponent.bases.top = style.top;
			if (style.left) this.curComponent.bases.left = style.left;
			if (style.width) this.curComponent.bases.width = style.width;
			if (style.height) this.curComponent.bases.height = style.height;
			if (style.rotate) this.curComponent.bases.rotate = style.rotate;
		},
		setComponentData(componentData = []) {
			this.componentData = componentData;
		},
		addComponent(data: Component) {
			if (data.index !== undefined) {
				this.componentData.splice(data.index, 0, data.component);
			} else {
				console.log(data.component);
				this.componentData.push(data.component);
			}
		},
		deleteComponent(index: number) {
			if (index === undefined) {
				index = this.curComponentIndex;
			}
			if (index === this.curComponentIndex) {
				this.curComponentIndex = null;
				this.curComponent = null;
			}
			this.componentData.splice(index, 1);
		},
	},
});

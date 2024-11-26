import { defineStore } from 'pinia';

interface State {
	componentData: ComponentItem[];
	editMode: boolean;
	curComponent: any;
	isTarget: any[];
}

export const useComponentStore = defineStore('componentStore', {
	state: (): State => ({
		// 画布组件数据
		componentData: [],
		editMode: false,
		// 如果没点中组件，并且在画布空白处弹起鼠标，则取消当前组件的选中状态
		curComponent: null,
		isTarget: [],
	}),
	actions: {
		// 添加组件数据
		addComponentData(data: { index?: number; component: ComponentItem }) {
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
		// 设置当前选中的组件
		setCurComponent(component: ComponentItem) {
			this.curComponent = component;
		},
		// 设置当前组件的样式
		setShapeStyle(style: ComponentStyle) {
			if (!this.curComponent) return;
			if (style.top) this.curComponent.boxStyle.top = style.top;
			if (style.left) this.curComponent.boxStyle.left = style.left;
			if (style.width) this.curComponent.boxStyle.width = style.width;
			if (style.height) this.curComponent.boxStyle.height = style.height;
			if (style.rotate) this.curComponent.boxStyle.rotate = style.rotate;
		},
		setComponentData(componentData = []) {
			this.componentData = componentData;
		},
		addComponent(data: { index?: number; component: ComponentItem }) {
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

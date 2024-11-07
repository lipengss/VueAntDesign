import { defineStore } from 'pinia';

interface State {
	layer: boolean;
	component: boolean;
	setting: boolean;
	sourceCode: boolean;
}

export const useSettingStore = defineStore('settingStore', {
	state: (): State => ({
		// 画布组件数据
		layer: false,
		component: true,
		setting: true,
		sourceCode: false,
	}),
	actions: {
		toggleCollapsed(key: 'layer' | 'component' | 'setting' | 'sourceCode') {
			this[key] = !this[key];
			console.log(this[key]);
		},
		setDate(state: any, data: { key: string; value: string }) {
			state[data.key] = data.value;
		},
	},
});

import { defineStore } from 'pinia';
import { theme } from 'ant-design-vue';

interface State {
	theme: {
		algorithm: any;
		token: {
			colorPrimary: string;
		};
	};
}

const { defaultAlgorithm, darkAlgorithm } = theme;

export const useThemeStore = defineStore('themeStore', {
	state: (): State => ({
		theme: {
			// 画布组件数据
			algorithm: defaultAlgorithm,
			token: {
				colorPrimary: '#00b96b',
			},
		},
	}),
	getters: {
		modeIcon(state) {
			return state.theme.algorithm === defaultAlgorithm ? 'dark' : 'light';
		},
	},
	actions: {
		toggleMode() {
			this.theme.algorithm = this.theme.algorithm === defaultAlgorithm ? darkAlgorithm : defaultAlgorithm;
		},
	},
});

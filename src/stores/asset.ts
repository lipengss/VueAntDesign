import { defineStore } from 'pinia';

interface State {
	seriesType: SeiresType;
}

export const useAssetStore = defineStore('assetStore', {
	state: (): State => ({
		seriesType: 'bar',
	}),
	actions: {},
});

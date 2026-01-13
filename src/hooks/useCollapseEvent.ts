import { Ref } from 'vue';
export function useCollapseEvent(activeKeys: Ref<string[]>) {
	// 展开收起
	const collapseChange = (keys: any) => {
		activeKeys.value = keys;
	};
	const switchChange = (axis: string) => {
		console.log('activeKeys.value', activeKeys.value)
		const index = activeKeys.value.findIndex((item: string) => item === axis);
		index !== -1 && activeKeys.value.splice(index, 1);
	};
	return [collapseChange, switchChange];
}

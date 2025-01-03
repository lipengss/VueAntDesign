import { defineStore } from 'pinia';
import { nanoid } from 'nanoid';

const empty = new URL('@/assets/img_empty.png', import.meta.url).href;

interface GroupItem {
	title: string;
	enable: boolean;
	type: string;
	id: string;
	count: number;
}

interface ProductItem {
	title: string;
	status: 'push' | 'pending';
	product: string;
	id: string;
	cover: string;
}

interface State {
	allAppId: string;
	group: {
		activeId: string;
		list: GroupItem[];
	};
	product: {
		productId: string;
		list: ProductItem[];
	};
}

const allAppId = nanoid();
const lineAppId = nanoid();
export const useProductStore = defineStore('productStore', {
	state: (): State => ({
		allAppId: allAppId,
		group: {
			activeId: allAppId,
			list: [
				{ title: '全部应用', enable: false, type: 'text', id: allAppId, count: 3 },
				{ title: '输电线路可视化', enable: true, type: 'text', id: lineAppId, count: 2 },
			],
		},
		product: {
			productId: '',
			list: [
				{
					title: '大屏监测',
					status: 'push',
					product: 'HPihuEKfBssq-4jGFz2MM',
					id: allAppId,
					cover: empty,
				},
				{
					title: '用电监测',
					status: 'pending',
					product: 'S5htdhYAxNmj8rJEFeDN3',
					id: lineAppId,
					cover: empty,
				},
				{
					title: '安全监测',
					status: 'push',
					product: '2gkgLi0VPXXj8v2Ejhw59',
					id: lineAppId,
					cover: empty,
				},
			],
		},
	}),
	getters: {
		currentGroup(state) {
			return state.group.list.find((item) => item.id === state.group.activeId);
		},
		// 过滤应用
		productList(state) {
			if (state.group.activeId === allAppId) {
				// 全部应用
				return state.product.list;
			} else {
				return state.product.list.filter((item) => item.id === state.group.activeId);
			}
		},
		curProduct(state): ProductItem {
			return (
				state.product.list.find((item) => item.product === state.product.productId) || {
					title: '空项目',
					status: 'push',
					product: nanoid(),
					id: allAppId,
					cover: empty,
				}
			);
		},
	},
	actions: {},
});

type SideComponentType = 'echarts' | 'info' | 'control' | 'table' | 'like';

interface SideData {
	scroll: null;
	sideActive: SideComponentType;
	tabActive: TabType;
	componentData: any;
	tabs: { title: string; key: TabType }[];
}

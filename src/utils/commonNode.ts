import { h } from 'vue';

const InputNumberTip = h('div', null, [
	'值可以是像',
	h('b', { style: { color: '#ff4d4f' } }, ' 20 '),
	'这样的具体像素值，可以是像',
	h('b', { style: { color: '#ff4d4f' } }, " '20%' "),
	'这样相对于容器高宽的百分比。',
]);

export { InputNumberTip };

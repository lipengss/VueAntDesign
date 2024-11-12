<template>
	<Codemirror ref="cmRefDom" v-model:value="textarea" :style="{ height: 'calc(100% - 60px)' }" :options="options" border> </Codemirror>
</template>
<script setup lang="ts">
import { watch, ref } from 'vue';
import 'codemirror/mode/javascript/javascript.js';
import Codemirror from 'codemirror-editor-vue3';

const props = defineProps({
	dataValue: {
		type: Object,
		default: () => {},
	},
	height: {
		type: String,
		default: '300px',
	},
});
let textarea: any = ref({});
const options: EditorConfiguration = {
	mode: 'javascript',
	theme: 'default', // 主题
	lineNumbers: true, // 显示行号
	smartIndent: true, // 智能缩进
	indentUnit: 2, // 智能缩进单位为4个空格长度
	tabSize: 2,
	foldGutter: true,
	lineWrapping: true,
	gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter', 'CodeMirror-lint-markers'], // 启用行槽中的代码折叠
	// styleActiveLine: true, // 显示选中行的样式
};
// const options = {
// 	mode: { name: 'javascript', json: true },
// 	tabSize: 2,
// 	smartIndent: true,
// 	lineNumbers: true,
// 	matchBrackets: true,
// 	autoRefresh: true,
// 	readOnly: true,
// 	value: [{ key: 'name' }],
// 	lineWrapping: true,
// 	scrollbarStyle: null,
// 	theme: '3024-night',
// 	extraKeys: { Ctrl: 'autocomplete' }, // 自定义快捷键
// 	hintOptions: {
// 		tables: {
// 			// 自定义提示选项
// 			users: ['name', 'score', 'birthDate'],
// 			countries: ['name', 'population', 'size'],
// 		},
// 	},
// };

watch(
	() => props.dataValue,
	() => {
		setDataValue();
	},
	{ deep: true, immediate: true }
);
function setDataValue() {
	const jsonData = JSON.stringify(props.dataValue, null, 2);
	textarea.value = jsonData;
}
</script>

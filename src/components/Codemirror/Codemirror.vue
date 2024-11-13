<template>
	<Codemirror v-model:value="formatCode" :options="options" border> </Codemirror>
</template>
<script setup lang="ts">
import { withDefaults, defineProps, computed } from 'vue';
import { EditorConfiguration } from 'codemirror';
import Codemirror from 'codemirror-editor-vue3';
// language
import 'codemirror/mode/javascript/javascript.js';
// 折叠
import 'codemirror/addon/fold/foldgutter.css';
import 'codemirror/addon/fold/foldcode';
import 'codemirror/addon/fold/foldgutter';
import 'codemirror/addon/fold/brace-fold';
import 'codemirror/addon/fold/comment-fold';

// 搜索
import 'codemirror/addon/dialog/dialog.js';
import 'codemirror/addon/dialog/dialog.css';
import 'codemirror/addon/search/searchcursor.js';
import 'codemirror/addon/search/search.js';

interface Props {
	code: any;
}
const props = withDefaults(defineProps<Props>(), {});

const emits = defineEmits(['submit']);

const options: EditorConfiguration = {
	mode: 'text/javascript',
	theme: 'zenburn', // 主题
	lineNumbers: true, // 显示行号
	smartIndent: true, // 智能缩进
	indentUnit: 2, // 智能缩进单位为4个空格长度
	tabSize: 2,
	foldGutter: true,
	lineWrapping: true,
	gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter', 'CodeMirror-lint-markers'], // 启用行槽中的代码折叠
	// styleActiveLine: true, // 显示选中行的样式
};

const formatCode = computed(() => JSON.stringify(props.code, undefined, 4));
</script>
<style lang="scss" scoped>
.content {
	height: inherit;
	.footer {
		width: 100%;
		height: 60px;
		padding-left: 20px;
		position: absolute;
		left: 0;
		bottom: 0;
		display: flex;
		align-items: center;
		justify-content: flex-start;
	}
}
</style>

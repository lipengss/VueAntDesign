<template>
	<div class="cm-container">
		<a-space v-if="showSearch" direction="vertical" class="cm-search-box">
			<a-space>
				<a-input
				ref="searchInputRef"
				class="cm-input"
				type="text"
				v-model:value="query"
				placeholder="搜索... (Ctrl+F)"
				@input="handleInput"
			>
				<template #suffix>
					<a-space>
						<span
							:class="['check-btn', { active: isCaseSensitive }]"
							title="区分大小写"
							@click="toggleCaseSensitive"
						>
							<svg-icon name="caseSensitive" />
						</span>
						<span
							:class="['check-btn', { active: isWholeWord }]"
							title="全词匹配"
							@click="toggleWholeWord"
						>
							<svg-icon name="matching-line" />
						</span>
					</a-space>
					
				</template>
			</a-input>
			<span class="cm-count">{{ currentDisplay }}/{{ matches.length }}</span>
			<a-button title="上一个" :icon="h(UpOutlined)" @click="prev" />
			<a-button title="下一个" :icon="h(DownOutlined)" @click="next" />
			<a-button danger title="关闭" :icon="h(CloseOutlined)" @click="close" />
			</a-space>
			<a-space>
				<a-input type="text" v-model:value="replaceText" placeholder="替换为..." />
				<a-button @click="replaceCurrent">替换</a-button>
				<a-button @click="replaceAll">全部替换</a-button>
			</a-space>
		</a-space>
		<Codemirror
			height="100%"
			v-bind="$attrs"
			v-model:value="codeStr"
			:options="options"
			border
			@ready="handleReady"
		/>
	</div>
</template>
<script setup lang="ts">
import { ref, watch, nextTick, computed, h } from 'vue';
import { UpOutlined, DownOutlined, CloseOutlined } from '@ant-design/icons-vue';
import { theme } from 'ant-design-vue';
import { EditorConfiguration } from 'codemirror';
import CodeMirror from 'codemirror';
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

const { token } = theme.useToken();

const options: EditorConfiguration = {
	mode: 'application/json',
	theme: 'zenburn', // 主题
	lineNumbers: true, // 显示行号
	smartIndent: true, // 智能缩进
	indentUnit: 2, // 智能缩进单位为4个空格长度
	tabSize: 2,
	foldGutter: true,
	lineWrapping: true,
	gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter', 'CodeMirror-lint-markers', 'CodeMirror-searching'], // 启用行槽中的代码折叠
	// styleActiveLine: true, // 显示选中行的样式
	foldOptions: {
		rangeFinder: (CodeMirror as any).fold.brace,
	},
	extraKeys: {
		'Ctrl-F': () => openSearch(),
		'Cmd-F': () => openSearch(),
		'Ctrl-Q': (cm: any) => cm.foldCode(cm.getCursor()),
		Esc: () => close(),
	},
};

const codeStr = ref<string>(JSON.stringify(props.code, undefined, 2));
watch(
	() => props.code,
	(newVal) => {
		codeStr.value = JSON.stringify(newVal, undefined, 2);
	}
);

let cm: any = null;
const showSearch = ref(false);
const query = ref('');
const replaceText = ref('');
const matches = ref<Array<{ from: any; to: any }>>([]);
const currentIndex = ref(0);
const searchInputRef = ref<HTMLInputElement | null>(null);
const isCaseSensitive = ref(false);
const isWholeWord = ref(false);
let marks: any[] = [];

const currentDisplay = computed(() => {
	if (!matches.value.length) return 0;
	return currentIndex.value + 1;
});

function handleReady(editor: any) {
	cm = editor;
	// 备用键位映射
	cm.addKeyMap({
		'Ctrl-F': () => openSearch(),
		'Cmd-F': () => openSearch(),
		Esc: () => close(),
	});
}

function openSearch() {
	showSearch.value = true;
	nextTick(() => {
		searchInputRef.value?.focus();
	});
	if (query.value) computeMatches();
}

function close() {
	showSearch.value = false;
	clearMarks();
	cm && cm.focus();
}

function toggleCaseSensitive() {
	isCaseSensitive.value = !isCaseSensitive.value;
	computeMatches();
}

function toggleWholeWord() {
	isWholeWord.value = !isWholeWord.value;
	computeMatches();
}

function clearMarks() {
	marks.forEach((m) => m.clear && m.clear());
	marks = [];
}

function escapeRegExp(string: string) {
	return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function computeMatches(targetIndex?: number) {
	if (!cm) return;
	clearMarks();
	
	if (!query.value) {
		matches.value = [];
		currentIndex.value = 0;
		return;
	}
	const text: string = cm.getValue();
	const newMatches: Array<{ from: any; to: any }> = [];
	const newMarks: any[] = [];
	let foundTarget = false;
	let targetMatchIndex = 0;

	const flags = isCaseSensitive.value ? 'g' : 'gi';
	let pattern = escapeRegExp(query.value);
	if (isWholeWord.value) {
		pattern = `\\b${pattern}\\b`;
	}
	
	let regex;
	try {
		regex = new RegExp(pattern, flags);
	} catch (e) {
		return;
	}

	let match;
	while ((match = regex.exec(text)) !== null) {
		const idx = match.index;
		const matchLength = match[0].length;
		const from = cm.posFromIndex(idx);
		const to = cm.posFromIndex(idx + matchLength);
		
		newMatches.push({ from, to });
		newMarks.push(cm.markText(from, to, { className: 'cm-search-match' }));

		if (typeof targetIndex === 'number' && !foundTarget) {
			if (idx >= targetIndex) {
				targetMatchIndex = newMatches.length - 1;
				foundTarget = true;
			}
		}

		// 防止零长度匹配导致的无限循环
		if (matchLength === 0) {
			regex.lastIndex++;
		}
	}

	matches.value = newMatches;
	marks = newMarks;

	if (typeof targetIndex === 'number') {
		currentIndex.value = foundTarget ? targetMatchIndex : 0;
	} else {
		currentIndex.value = matches.value.length ? 0 : 0;
	}
	updateSelectionToCurrent();
}

function updateSelectionToCurrent() {
	if (!matches.value.length || !cm) return;
	const { from, to } = matches.value[currentIndex.value];
	cm.setSelection(from, to);
	cm.scrollIntoView({ from, to }, 100);
}

function next() {
	if (!matches.value.length) return;
	currentIndex.value = (currentIndex.value + 1) % matches.value.length;
	updateSelectionToCurrent();
}

function prev() {
	if (!matches.value.length) return;
	currentIndex.value = (currentIndex.value - 1 + matches.value.length) % matches.value.length;
	updateSelectionToCurrent();
}

function replaceCurrent() {
	if (!matches.value.length || !cm) return;
	const { from, to } = matches.value[currentIndex.value];
	const startIndex = cm.indexFromPos(from);
	cm.replaceRange(replaceText.value, from, to);
	// 重新计算匹配，尝试跳到替换后的下一个位置
	const nextSearchIndex = startIndex + replaceText.value.length;
	computeMatches(nextSearchIndex);
}

function replaceAll() {
	if (!cm || !query.value) return;
	const text: string = cm.getValue();
	
	const flags = isCaseSensitive.value ? 'g' : 'gi';
	let pattern = escapeRegExp(query.value);
	if (isWholeWord.value) {
		pattern = `\\b${pattern}\\b`;
	}
	
	let regex;
	try {
		regex = new RegExp(pattern, flags);
	} catch (e) {
		return;
	}

	const replaced = text.replace(regex, replaceText.value);
	if (replaced !== text) {
		cm.operation(() => {
			cm.setValue(replaced);
		});
	}
	query.value = '';
	computeMatches();
}

function handleInput() {
	computeMatches();
}

</script>
<style lang="scss" scoped>
.cm-container {
	position: relative;
	width: 100%;
	height: 100%;
}
		
.cm-search-box {
	position: absolute;
	right: 20px;
	top: 4px;
	z-index: 100;
	padding: 10px;
	border-radius: 6px;
	background-color: v-bind('token.colorBgContainer');
	box-shadow: v-bind('token.boxShadow');
}

.check-btn{
	height: 20px;
	width: 20px;
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 2px;
	text-align: center;
	border-radius: 4px;
	cursor: pointer;
	&:hover{
		background-color: v-bind('token.colorFillContent');
	}
	&.active {
		background-color: v-bind('token.colorFillContent');
		color: v-bind('token.colorPrimary');
	}
}

:deep(.CodeMirror) .cm-search-match {
	background-color: rgba(255, 215, 0, 0.35);
}
</style>

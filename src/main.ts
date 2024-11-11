import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import router from './router';

import { createPinia } from 'pinia';

const app = createApp(App);

// UI 库
import antd from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';

// 拾色器
import colorPicker from 'vue3-colorpicker';
import 'vue3-colorpicker/style.css';

// 全局样式
import './style/index.less';

// SvgIcon
import 'virtual:svg-icons-register';
import SvgIcon from './components/SvgIcon/index.vue';
app.component('svg-icon', SvgIcon);

// 全局组件
import { registerGlobalComponents } from './custom-components/components';

registerGlobalComponents(app);

app.use(createPinia());
app.use(router);
app.use(antd);
app.use(colorPicker);

app.mount('#app');

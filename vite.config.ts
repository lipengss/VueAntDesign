import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';

const pathResolve = (dir: string): any => {
	return resolve(__dirname, './', dir);
};

// https://vite.dev/config/
export default defineConfig({
	plugins: [
		vue(),
		createSvgIconsPlugin({
			// 指定需要缓存的图标文件夹
			iconDirs: [resolve(process.cwd(), 'src/assets/icons')],
			// 指定symbolId格式
			symbolId: 'icon-[dir]-[name]',
			inject: 'body-last' || 'body-first',
			customDomId: '__svg__icons__dom__',
		}),
	],
	resolve: {
		alias: {
			'@': pathResolve('src'),
			components: pathResolve('src/components'),
		},
	},
});

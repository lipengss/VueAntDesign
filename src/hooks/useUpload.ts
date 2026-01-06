import { ref, Ref } from 'vue';
import { message } from 'ant-design-vue';

function useUpload(imageUrl: Ref<string>, options?: any) {
	const defaultOptions = {
		accept: 'image/jpeg,image/png',
		maxSize: 2 * 1024 * 1024,
		...options,	
	}
	const { accept, maxSize } = defaultOptions;

	const fileList = ref([]);
	const loading = ref(false);

	function beforeUpload(file: File) {
		const isJpgOrPng = accept.split(',').includes(file.type);
		if (!isJpgOrPng) {
			message.error(`上传图片只能是 ${accept.split(',').join('/')} 格式!`);
		}
		const isLt2M = file.size / 1024 / 1024 < maxSize / 1024 / 1024;
		if (!isLt2M) {
			message.error(`上传图片大小不能超过 ${maxSize / 1024 / 1024}MB!`);
		}
		return isJpgOrPng && isLt2M;
	}
	function customRequest(info: any) {
		const file = info.file;
		// 将上传的文件转成base64
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => {
			imageUrl.value = reader.result as string;
		}
		
		
		
		
	}
	function reset() {
		fileList.value = [];
		loading.value = false;
	}
	return {
		fileList,
		loading,
		beforeUpload,
		customRequest,
		reset,
	}
}
export default useUpload;

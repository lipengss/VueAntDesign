export function formatStyle(style: BaseStyle, filter: Array<string>) {
	const needUnit = ['fontSize', 'width', 'height', 'top', 'left', 'borderWidth', 'letterSpacing', 'borderRadius', 'position'];
	const result: any = {};
	Object.keys(style).forEach((key: string) => {
		if (!filter.includes(key)) {
			if (key !== 'rotate') {
				result[key] = style[key];
				needUnit.includes(key) && (result[key] += 'px');
				result.position = 'absolute';
			} else {
				result.transform = `${key}(${style[key]}deg)`;
			}
		}
	});
	return result;
}

export function isObject(obj: any) {
	return Object.prototype.toString.call(obj) === '[object Object]';
}
export function hasOwn(obj: any, key: string) {
	return Object.prototype.hasOwnProperty.call(obj, key);
}

export function collapsible(show: boolean) {
	return show ? 'header' : 'disabled';
}

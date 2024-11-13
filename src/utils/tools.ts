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

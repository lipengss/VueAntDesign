import { nanoid } from 'nanoid';

export class DefaultOption {
	get getSeries() {
		return {
			pie: (index: number) => {
				return {
					name: `系列${index}`,
					id: nanoid(),
					type: 'pie',
					radius: ['55%', '70%'],
					center: ['50%', '50%'],
					label: {
						show: true,
						color: '#fff',
						fontSize: 12,
						fontWeight: 400,
					},
					data: [
						{ value: 335, name: 'Direct' },
						{ value: 310, name: 'Email' },
						{ value: 234, name: 'Ad Networks' },
						{ value: 135, name: 'Video Ads' },
						{ value: 1548, name: 'Search Engines' },
					],
					emphasis: {
						itemStyle: {
							shadowBlur: 10,
							shadowOffsetX: 0,
							shadowColor: 'rgba(0, 0, 0, 0.5)',
						},
					},
				};
			},
		};
	}
}

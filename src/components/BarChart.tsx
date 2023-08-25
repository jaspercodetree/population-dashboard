import { useRef, useEffect, useState } from 'react';
import * as Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import './BarChart.scss';

// The wrapper exports only a default component that at the same time is a
// namespace for the related Props interface (HighchartsReact.Props) and
// RefObject interface (HighchartsReact.RefObject). All other interfaces
// like Options come from the Highcharts module itself.
// const options: Highcharts.Options = {
// 	chart: {
// 		type: 'column',
// 		width: 1004, // 設定圖表寬度
// 		height: 600, // 設定圖表高度
// 		marginTop: 90, // 調整圖表上方的間距
// 	},
// 	title: {
// 		text: '人口數',
// 		align: 'center',
// 		x: 40,
// 	},
// 	// subtitle: {
// 	// 	text:
// 	// 		'Source: <a ' +
// 	// 		'href="https://en.wikipedia.org/wiki/List_of_continents_and_continental_subregions_by_population"' +
// 	// 		'target="_blank">Wikipedia.org</a>',
// 	// 	align: 'center',
// 	// },
// 	xAxis: {
// 		categories: ['共同生活', '獨立生活'],
// 		title: {
// 			text: '型態',
// 			align: 'middle',
// 			style: {
// 				color: 'var(--dark)',
// 				fontWeight: '900',
// 				fontSize: '15px',
// 			},
// 		},
// 		gridLineWidth: 0,
// 		lineWidth: 0,
// 		labels: {
// 			align: 'center',
// 			style: {
// 				color: 'var(--grey1)',
// 				fontWeight: '900',
// 				fontSize: '12px',
// 			},
// 			y: 20,
// 		},
// 	},
// 	yAxis: {
// 		min: 0,
// 		title: {
// 			text: '數量',
// 			align: 'high',
// 			rotation: 0,
// 			y: -30,
// 			x: 42,
// 			style: {
// 				color: 'var(--dark)',
// 				fontWeight: '900',
// 				fontSize: '15px',
// 			},
// 		},
// 		labels: {
// 			overflow: 'justify',
// 		},
// 		gridLineWidth: 1,
// 	},
// 	tooltip: {
// 		valueSuffix: '人',
// 	},
// 	plotOptions: {
// 		column: {
// 			// borderRadius: '50%',
// 			dataLabels: {
// 				enabled: true,
// 				color: 'black',
// 				inside: false,
// 				align: 'center',
// 				style: {
// 					fontSize: '12px',
// 				},
// 			},

// 			// groupPadding: 0.1,
// 		},
// 	},
// 	// legend: {
// 	// 	layout: 'vertical',
// 	// 	align: 'right',
// 	// 	verticalAlign: 'top',
// 	// 	x: -40,
// 	// 	y: 80,
// 	// 	floating: true,
// 	// 	borderWidth: 1,
// 	// 	backgroundColor:
// 	// 		Highcharts.defaultOptions.legend.backgroundColor || '#FFFFFF',
// 	// 	shadow: true,
// 	// },
// 	// credits: {
// 	// 	enabled: false,
// 	// },
// 	series: [
// 		{
// 			name: '男性',
// 			type: 'column',
// 			color: '#7D5FB2',
// 			data: [],
// 			dataLabels: {
// 				// 千位符號
// 				formatter: function () {
// 					const value =
// 						this.y !== null && this.y !== undefined ? this.y : 0;
// 					return Highcharts.numberFormat(value, 0, '.', ',');
// 				},
// 			},
// 		},
// 		{
// 			name: '女性',
// 			type: 'column',
// 			color: '#C29FFF',
// 			data: [],
// 			dataLabels: {
// 				// 千位符號
// 				formatter: function () {
// 					const value =
// 						this.y !== null && this.y !== undefined ? this.y : 0;
// 					return Highcharts.numberFormat(value, 0, '.', ',');
// 				},
// 			},
// 		},
// 	],
// };

// React supports function components as a simple way to write components that
// only contain a render method without any state (the App component in this
// example).
// props: HighchartsReact.Props;
const BarChart = ({ chartData }) => {
	const chartComponentRef = useRef<HighchartsReact.RefObject>(null);

	const [options, setOptions] = useState<Highcharts.Options>({
		// 初始的 options 設定
		chart: {
			type: 'column',
			width: 1004, // 設定圖表寬度
			height: 600, // 設定圖表高度
			marginTop: 90, // 調整圖表上方的間距
		},
		title: {
			text: '人口數',
			align: 'center',
			// x: 40,
		},
		// subtitle: {
		// 	text:
		// 		'Source: <a ' +
		// 		'href="https://en.wikipedia.org/wiki/List_of_continents_and_continental_subregions_by_population"' +
		// 		'target="_blank">Wikipedia.org</a>',
		// 	align: 'center',
		// },
		xAxis: {
			categories: ['共同生活', '獨立生活'],
			title: {
				text: '型態',
				align: 'middle',
				style: {
					color: 'var(--dark)',
					fontWeight: '900',
					fontSize: '15px',
				},
			},
			gridLineWidth: 0,
			lineWidth: 0,
			labels: {
				align: 'center',
				style: {
					color: 'var(--grey1)',
					fontWeight: '900',
					fontSize: '12px',
				},
				y: 20,
			},
		},
		yAxis: {
			min: 0,
			title: {
				text: '數量',
				align: 'high',
				rotation: 0,
				y: -30,
				x: 42,
				style: {
					color: 'var(--dark)',
					fontWeight: '900',
					fontSize: '15px',
				},
			},
			labels: {
				overflow: 'justify',
			},
			gridLineWidth: 1,
		},
		tooltip: {
			valueSuffix: '人',
		},
		plotOptions: {
			column: {
				// borderRadius: '50%',
				dataLabels: {
					enabled: true,
					color: 'black',
					inside: false,
					align: 'center',
					style: {
						fontSize: '12px',
					},
				},

				// groupPadding: 0.1,
			},
		},
		// legend: {
		// 	layout: 'vertical',
		// 	align: 'right',
		// 	verticalAlign: 'top',
		// 	x: -40,
		// 	y: 80,
		// 	floating: true,
		// 	borderWidth: 1,
		// 	backgroundColor:
		// 		Highcharts.defaultOptions.legend.backgroundColor || '#FFFFFF',
		// 	shadow: true,
		// },
		// credits: {
		// 	enabled: false,
		// },
		series: [
			{
				name: '男性',
				type: 'column',
				color: '#7D5FB2',
				data: [],
				dataLabels: {
					// 千位符號
					formatter: function () {
						const value =
							this.y !== null && this.y !== undefined
								? this.y
								: 0;
						return Highcharts.numberFormat(value, 0, '.', ',');
					},
				},
			},
			{
				name: '女性',
				type: 'column',
				color: '#C29FFF',
				data: [],
				dataLabels: {
					// 千位符號
					formatter: function () {
						const value =
							this.y !== null && this.y !== undefined
								? this.y
								: 0;
						return Highcharts.numberFormat(value, 0, '.', ',');
					},
				},
			},
		],
	});

	useEffect(() => {
		const newOptions: Highcharts.Options = {
			...options, // 複製原本的 options
			series: [
				{
					name: '男性',
					type: 'column',
					color: '#7D5FB2',
					data: [
						chartData.aggregatedData.household_ordinary_m,
						chartData.aggregatedData.household_single_m,
					],
					dataLabels: {
						formatter: function () {
							const value =
								this.y !== null && this.y !== undefined
									? this.y
									: 0;
							return Highcharts.numberFormat(value, 0, '.', ',');
						},
					},
				},
				{
					name: '女性',
					type: 'column',
					color: '#C29FFF',
					data: [
						chartData.aggregatedData.household_ordinary_f,
						chartData.aggregatedData.household_single_f,
					],
					dataLabels: {
						formatter: function () {
							const value =
								this.y !== null && this.y !== undefined
									? this.y
									: 0;
							return Highcharts.numberFormat(value, 0, '.', ',');
						},
					},
				},
			],
		};

		setOptions(newOptions); // 更新 options
	}, [chartData]);

	return (
		<>
			<h1 className="chartTitle">{`${chartData.formData.year}年 ${chartData.formData.city}${chartData.formData.district}`}</h1>
			<HighchartsReact
				highcharts={Highcharts}
				options={options}
				ref={chartComponentRef}
			/>
		</>
	);
};

export default BarChart;

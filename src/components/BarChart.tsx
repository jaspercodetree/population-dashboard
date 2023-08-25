import './BarChart.scss';
import { useRef, useEffect, useState } from 'react';
import * as Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const BarChart = ({ chartData }) => {
	const chartComponentRef = useRef<HighchartsReact.RefObject>(null);

	const [options, setOptions] = useState<Highcharts.Options>({
		// 初始的 options 設定
		chart: {
			type: 'column',
			width: 1004,
			height: 600,
			marginTop: 90,
		},
		title: {
			text: '人口數',
			align: 'center',
			// x: 40,
		},

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
				dataLabels: {
					enabled: true,
					color: 'black',
					inside: false,
					align: 'center',
					style: {
						fontSize: '12px',
					},
				},
			},
		},

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
			...options,
			series: [
				{
					name: '男性',
					type: 'column',
					color: '#7D5FB2',
					data: [
						chartData.household_ordinary_m,
						chartData.household_single_m,
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
						chartData.household_ordinary_f,
						chartData.household_single_f,
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
			<HighchartsReact
				highcharts={Highcharts}
				options={options}
				ref={chartComponentRef}
			/>
		</>
	);
};

export default BarChart;

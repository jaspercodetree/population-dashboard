import { useRef, useEffect, useState } from 'react';
import * as Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

// 定義柱狀圖所需的資料格式
interface BarChartDataItem {
	household_ordinary_f?: string;
	household_ordinary_m?: string;
	household_single_f?: string;
	household_single_m?: string;
}

const BarChart = ({ chartData }: { chartData: BarChartDataItem }) => {
	const chartComponentRef = useRef<HighchartsReact.RefObject>(null);

	const [options, setOptions] = useState<Highcharts.Options>({
		// 初始的 options 設定
		chart: {
			type: 'column',
			marginTop: 90,
			height: 600,
		},

		// 標題和軸的設定
		title: {
			text: '人口數',
			align: 'center',
		},

		xAxis: {
			// x 軸的類別名稱
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

		// 柱狀圖的資料和顯示設定
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

		// 資料
		series: [
			{
				name: '男性',
				type: 'column',
				color: '#7D5FB2',
				data: [], // 設定資料，初始值
				dataLabels: {
					// 加上千位符號
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
				data: [], // 設定資料，初始值
				dataLabels: {
					// 加上千位符號
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

		// RWD
		responsive: {
			rules: [
				{
					condition: { maxWidth: 767 },
					chartOptions: {
						chart: { width: 320, height: 450 },
					},
				},
			],
		},
	});

	useEffect(() => {
		const newOptions: Highcharts.Options = {
			...options,
			series: [
				// 更新資料
				{
					type: 'column',
					data: [
						chartData.household_ordinary_m,
						chartData.household_single_m,
					],
				},
				{
					type: 'column',
					data: [
						chartData.household_ordinary_f,
						chartData.household_single_f,
					],
				},
			],
		};

		setOptions(newOptions); // 更新options
	}, [chartData]);

	return (
		<>
			<HighchartsReact
				containerProps={{ style: { height: '100%' } }} // RWD
				highcharts={Highcharts}
				options={options}
				ref={chartComponentRef}
			/>
		</>
	);
};

export default BarChart;

import { useRef, useEffect, useState } from 'react';
import * as Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

// 定義圓餅圖所需的資料格式
interface PieChartProps {
	household_ordinary_total?: string;
	household_single_total?: string;
}
const PieChart = ({ chartData }: { chartData: PieChartProps }) => {
	const chartComponentRef = useRef<HighchartsReact.RefObject>(null);

	const [options, setOptions] = useState<Highcharts.Options>({
		// 初始的 options 設定
		chart: {
			type: 'pie',
			marginTop: 60,
			height: 600,
		},
		title: {
			text: '戶數統計',
			align: 'center',
			margin: 100,
		},
		tooltip: {
			pointFormat: '<b>{point.percentage:.1f}%</b>',
		},
		accessibility: {
			point: {
				valueSuffix: '%',
			},
		},
		plotOptions: {
			pie: {
				allowPointSelect: true,
				cursor: 'pointer',
				dataLabels: {
					enabled: true,
					format: '{point.percentage:.1f} %',
					style: {
						fontSize: '16px',
					},
				},
				showInLegend: true,
			},
		},
		series: [
			{
				type: 'pie',
				data: [], // 初始資料
			},
		],

		// RWD
		responsive: {
			rules: [
				{
					condition: { maxWidth: 767 },
					chartOptions: {
						chart: {
							width: 320,
							height: 300,
						},
					},
				},
			],
		},
	});

	useEffect(() => {
		const newOptions: Highcharts.Options = {
			...options,
			series: [
				{
					type: 'pie',
					// 更新資料
					data: [
						{
							name: '共同生活',
							y: parseInt(chartData.household_ordinary_total),
							color: '#626EB2',
							selected: true,
						},
						{
							name: '獨立生活',
							color: '#A3B1FF',
							y: parseInt(chartData.household_single_total),
						},
					],
				},
			],
		};

		setOptions(newOptions); // 更新 options
	}, [chartData]);

	return (
		<>
			<HighchartsReact
				containerProps={{ style: { height: '100%' } }}
				highcharts={Highcharts}
				options={options}
				ref={chartComponentRef}
			/>
		</>
	);
};

export default PieChart;

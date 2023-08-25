import './PieChart.scss';
import { useRef, useEffect, useState } from 'react';
import * as Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const PieChart = ({ chartData }) => {
	const chartComponentRef = useRef<HighchartsReact.RefObject>(null);

	const [options, setOptions] = useState<Highcharts.Options>({
		chart: {
			type: 'pie',
			width: 1004,
			height: 600,
			marginTop: 60,
		},
		title: {
			text: '戶數統計',
			align: 'center',
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
				data: [],
			},
		],
	});

	useEffect(() => {
		const newOptions: Highcharts.Options = {
			...options,
			series: [
				{
					type: 'pie',
					data: [
						{
							name: '共同生活',
							y: chartData.household_ordinary_total,
							color: '#626EB2',
							selected: true,
						},
						{
							name: '獨立生活',
							color: '#A3B1FF',
							y: chartData.household_single_total,
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
				highcharts={Highcharts}
				options={options}
				ref={chartComponentRef}
			/>
		</>
	);
};

export default PieChart;

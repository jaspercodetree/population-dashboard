import './Dashboard.scss';
import { useState, useEffect } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import BarChart from '../components/BarChart';
import PieChart from '../components/PieChart';

const Dashboard = () => {
	const [formData, setFormData] = useState({
		year: '111',
		city: '',
		district: '',
	});
	const [formDataView, setFormDataView] = useState({});
	const [cityList, setCityList] = useState([]);

	const [districtList, setDistrictList] = useState([]);

	const [populationData, setPopulationData] = useState([]);
	console.log(populationData);

	const [chartData, setChartData] = useState({});

	const navigate = useNavigate();
	const params = useParams();

	const yearList = [];
	for (let year = 106; year <= 111; year++) {
		yearList.push(year.toString());
	}
	yearList.sort((a, b) => b - a);

	async function getData(year: string) {
		try {
			const response = await fetch(
				`https://www.ris.gov.tw/rs-opendata/api/v1/datastore/ODRP019/${year}`
			);

			if (!response.ok) {
				throw new Error(response.statusText);
			}

			const data = await response.json();
			setPopulationData(data);

			const cityData = data.responseData.map((item: string) => {
				return item.site_id.slice(0, 3);
			});
			const uniqueCity = [...new Set(cityData)];
			// console.log(uniqueCity);

			setCityList(uniqueCity);

			return data;
		} catch (error) {
			console.log(error);
		}
	}

	const handleSubmit = (response, userData) => {
		const apiData = response || populationData;
		const city = userData ? userData.city : formData.city;
		const district = userData ? userData.district : formData.district;

		console.log(apiData);

		const statisticsData = apiData.responseData.filter((item) => {
			return item.site_id.includes(city + district);
		});

		const aggregatedData = {
			household_ordinary_f: 0,
			household_ordinary_m: 0,
			household_ordinary_total: 0,
			household_single_f: 0,
			household_single_m: 0,
			household_single_total: 0,
		};
		statisticsData.forEach(
			(item: {
				household_ordinary_f: string;
				household_ordinary_m: string;
				household_ordinary_total: string;
				household_single_f: string;
				household_single_m: string;
				household_single_total: string;
			}) => {
				aggregatedData.household_ordinary_f += parseInt(
					item.household_ordinary_f
				);
				aggregatedData.household_ordinary_m += parseInt(
					item.household_ordinary_m
				);
				aggregatedData.household_ordinary_total += parseInt(
					item.household_ordinary_total
				);
				aggregatedData.household_single_f += parseInt(
					item.household_single_f
				);
				aggregatedData.household_single_m += parseInt(
					item.household_single_m
				);
				aggregatedData.household_single_total += parseInt(
					item.household_single_total
				);
			}
		);

		console.log(statisticsData);
		console.log(aggregatedData);

		setChartData(aggregatedData);

		if (formData.year && formData.city && formData.district) {
			navigate(
				'/' +
					formData.year +
					'/' +
					formData.city +
					'/' +
					formData.district
			);

			setFormDataView({ ...formData });
		}
	};

	const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setFormData({ ...formData, year: e.target.value });
		getData(e.target.value);
	};

	const composeDistrictList = (city: string, response) => {
		const apiData = response || populationData;

		const districtData = apiData.responseData
			.filter((item) => item.site_id.includes(city))
			.map((item: string) => {
				return item.site_id.slice(3);
			});
		const uniqueDistrict = [...new Set(districtData)];
		setDistrictList(uniqueDistrict);
	};

	const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setFormData({ ...formData, city: e.target.value, district: '' });

		composeDistrictList(e.target.value);
	};
	console.log(formData);
	console.log(formDataView);

	const handleDistrictChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setFormData({ ...formData, district: e.target.value });
	};

	useEffect(() => {
		const fetchData = async (year: string) => {
			const response = await getData(year);

			if (params.city && params.district) {
				setFormData({
					year: year,
					city: params.city,
					district: params.district,
				});
				setFormDataView({
					year: year,
					city: params.city,
					district: params.district,
				});

				composeDistrictList(params.city, response);

				handleSubmit(response, {
					year: year,
					city: params.city,
					district: params.district,
				});
			}
		};

		fetchData(params.year || formData.year);
	}, []);

	const location = useLocation();
	console.log(params.city);

	const [pathname, setPathname] = useState(location.pathname);
	// 在這裡您可以使用 location.pathname、location.search 等獲取網址資訊
	useEffect(() => {
		console.log(decodeURIComponent(pathname));
	}, [pathname]);

	return (
		<div className="dashboardContainer">
			<div className="brandWrap">
				<span className="brand">TAIWAN</span>
			</div>
			<div className="mainContentWrap">
				<h1 className="title">人口數、戶數按戶別及性別統計</h1>
				<div className="formGroupWrap">
					<select
						name=""
						id="yearSelect"
						className="selectGroup"
						value={formData.year}
						onChange={handleYearChange}
					>
						{yearList.map((year) => (
							<option key={year} value={year}>
								{year}
							</option>
						))}
					</select>
					<select
						name=""
						id="citySelect"
						className="selectGroup"
						value={formData.city}
						onChange={handleCityChange}
					>
						<option value="" disabled>
							請選擇 縣/市
						</option>
						{cityList.map((item) => (
							<option key={item} value={item}>
								{item}
							</option>
						))}
					</select>
					<select
						name=""
						id="districtSelect"
						className="selectGroup"
						value={formData.district}
						onChange={handleDistrictChange}
						// disabled={formData.city === ''}
					>
						<option value="" disabled>
							請先選擇 縣/市
						</option>
						{districtList.map((item) => (
							<option key={item} value={item}>
								{item}
							</option>
						))}
					</select>
					<button
						id="submitBtn"
						onClick={() => handleSubmit('')}
						disabled={
							!formData.year ||
							!formData.city ||
							!formData.district
						}
					>
						SUBMIT
					</button>
				</div>
				<div className="dividerWrap">
					<div className="divider"></div>
					<div className="resultItemWrap">
						<div className="resultItem">搜尋結果</div>
					</div>
					<div className="divider"></div>
				</div>

				{Object.keys(chartData).length !== 0 && (
					<div className="chartContainer">
						<h1 className="chartTitle">{`${formDataView.year}年 ${formDataView.city}${formDataView.district}`}</h1>
						<BarChart chartData={chartData} />
						<PieChart chartData={chartData} />
					</div>
				)}
			</div>
		</div>
	);
};

export default Dashboard;

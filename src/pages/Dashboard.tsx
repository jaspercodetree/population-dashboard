import './Dashboard.scss';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import BarChart from '../components/BarChart';
import PieChart from '../components/PieChart';
import SelectGroup from '../components/SelectGroup';

// 定義人口數據項目的介面
interface PopulationDataItem {
	site_id: string;
	household_ordinary_f: string;
	household_ordinary_m: string;
	household_ordinary_total: string;
	household_single_f: string;
	household_single_m: string;
	household_single_total: string;
}

const Dashboard = () => {
	const [formData, setFormData] = useState<{
		year: string;
		city: string;
		district: string;
	}>({
		year: '111', // 給予初始年分，用以獲取初始縣市清單
		city: '',
		district: '',
	}); // 使用者表單數據

	const [formDataView, setFormDataView] = useState<{
		year: string;
		city: string;
		district: string;
	}>({ year: '', city: '', district: '' }); // 圖表title暫存顯示

	const [cityList, setCityList] = useState<string[]>([]); // 縣市清單
	const [districtList, setDistrictList] = useState<string[]>([]); // 鄉鎮清單
	const [populationData, setPopulationData] = useState<PopulationDataItem[]>(
		[]
	); // api資料
	const [chartData, setChartData] = useState({}); // 圖表需要資料
	const [isLoading, setIsLoading] = useState<boolean>(false);

	// console.log('populationData', populationData);

	const navigate = useNavigate();
	const params = useParams();

	// 年份清單
	const yearList = [];
	for (let year = 106; year <= 111; year++) {
		yearList.push(year.toString());
	}
	yearList.sort((a, b) => parseInt(b) - parseInt(a));

	// call api獲取資料
	async function getData(year: string) {
		try {
			setIsLoading(true); // 開始載入

			const response = await fetch(
				`https://www.ris.gov.tw/rs-opendata/api/v1/datastore/ODRP019/${year}`
			);

			const data: { responseData: PopulationDataItem[] } =
				await response.json();
			setPopulationData(data.responseData);

			// 更新縣市清單
			const cityData = data.responseData.map(
				(item: PopulationDataItem) => {
					return item.site_id.slice(0, 3);
				}
			);
			const uniqueCity = [...new Set(cityData)]; // 去除重複值
			// console.log(uniqueCity);
			setCityList(uniqueCity);

			// reset
			setChartData({}); // 清空圖表
			setIsLoading(false); // 結束載入

			return data;
		} catch (error) {
			console.log(error);
			navigate('/error'); // 跳轉到錯誤頁面
		}
	}

	// 處理年份變更
	const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setFormData({ ...formData, year: e.target.value });
		getData(e.target.value);
	};

	// 處理城市變更
	const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setFormData({ ...formData, city: e.target.value, district: '' });

		composeDistrictList(e.target.value, populationData);
	};

	// 處理鄉鎮變更
	const handleDistrictChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setFormData({ ...formData, district: e.target.value });
	};
	// console.log(formData);
	// console.log(formDataView);

	// 根據城市獲取地區列表
	const composeDistrictList = (
		city: string,
		response: PopulationDataItem[]
	) => {
		const districtData = response
			.filter((item: PopulationDataItem) => item.site_id.includes(city))
			.map((item: PopulationDataItem) => {
				return item.site_id.slice(3);
			});
		const uniqueDistrict = [...new Set(districtData)]; // 去除重複值
		setDistrictList(uniqueDistrict);
	};

	// 送出formData，產出圖表
	const handleSubmit = (
		// 有傳入值，代表使用網址跳轉
		response?: PopulationDataItem[],
		userData?: { year: string; city: string; district: string }
	) => {
		// 網址跳轉 || 手動click
		const apiData = response || populationData;
		const city = userData ? userData.city : formData.city;
		const district = userData ? userData.district : formData.district;
		// console.log(apiData);

		// 篩選對應上 縣市+鄉鎮 的資料，未加總
		const statisticsData = apiData.filter((item) => {
			return item.site_id.includes(city + district);
		});

		// 篩選資料，加總(初始值)
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
		// console.log(statisticsData);
		// console.log(aggregatedData);

		setChartData(aggregatedData); // 將加總完成資料，作為圖表資料

		// 轉址，讓網址列符合資料
		if (formData.year && formData.city && formData.district) {
			navigate(
				'/' +
					formData.year +
					'/' +
					formData.city +
					'/' +
					formData.district
			);

			setFormDataView({ ...formData }); // 更新chart title
		}
	};

	// 第一次進入網頁，用以實現網址列輸入跳轉
	useEffect(() => {
		const fetchData = async (year: string) => {
			const response = await getData(year);
			// console.log(response);

			// 排除網址列錯誤輸入
			// 1.城市是否存在
			const isCityExist = response?.responseData.some(
				(item: PopulationDataItem) =>
					item.site_id.slice(0, 3) === params.city
			);
			// 2.鄉鎮是否存在
			const isDistrictExist =
				params.city &&
				response?.responseData.some(
					(item: PopulationDataItem) =>
						item.site_id.slice(3) === params.district
				);

			if (!response) {
				navigate('/notFound');
			} else if (
				response &&
				params.city &&
				params.district &&
				(!isCityExist || !isDistrictExist)
			) {
				navigate('/notFound');
			}

			// call api成功，並且網址列正確
			if (response && params.city && params.district) {
				// 更新表單
				setFormData({
					year: year,
					city: params.city,
					district: params.district,
				});

				// 更新form title
				setFormDataView({
					year: year,
					city: params.city,
					district: params.district,
				});

				// 更新鄉鎮列表
				composeDistrictList(params.city, response.responseData);

				// 產出圖表
				handleSubmit(response?.responseData, {
					year: year,
					city: params.city,
					district: params.district,
				});
			}
		};

		fetchData(params.year || formData.year); // 網址列 || 表單資料
	}, []);

	return (
		<div className="dashboardContainer">
			<div className="brandWrap">
				<span className="brand">TAIWAN</span>
			</div>
			{isLoading ? (
				<div className="loadingWrap">
					<h1>獲取政府年度資料中，請稍後...</h1>
				</div>
			) : (
				<div className="mainContentWrap">
					<h1 className="title">人口數、戶數按戶別及性別統計</h1>
					<div className="formGroupWrap">
						<SelectGroup
							id="yearSelect"
							value={formData.year}
							onChange={handleYearChange}
							label="年份"
							options={yearList.map((year) => ({
								value: year,
								label: year,
							}))}
						/>
						<SelectGroup
							id="citySelect"
							value={formData.city}
							onChange={handleCityChange}
							label="縣/市"
							options={cityList.map((item) => ({
								value: item,
								label: item,
							}))}
							isOptionDisabled={true}
							optionDisableText="請選擇 縣/市"
						/>
						<SelectGroup
							id="districtSelect"
							value={formData.district}
							onChange={handleDistrictChange}
							label="鄉鎮區"
							options={districtList.map((item) => ({
								value: item,
								label: item,
							}))}
							isOptionDisabled={true}
							optionDisableText="請先選擇 縣/市"
						/>

						<button
							id="submitBtn"
							onClick={() => handleSubmit()}
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
							<div className="barChartContainer">
								<BarChart chartData={chartData} />
							</div>
							<div className="pieChartContainer">
								<PieChart chartData={chartData} />
							</div>
						</div>
					)}
				</div>
			)}
		</div>
	);
};

export default Dashboard;

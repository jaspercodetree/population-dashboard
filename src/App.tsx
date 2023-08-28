import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Layout from './Layout/Layout';
import NotFound from './pages/NotFound';
import ErrorPage from './pages/ErrorPage';

function App() {
	return (
		<>
			<Routes>
				<Route
					path="/"
					element={
						<Layout>
							<Dashboard />
						</Layout>
					}
				/>
				<Route
					path="/:year/:city/:district"
					element={
						<Layout>
							<Dashboard />
						</Layout>
					}
				/>

				{/* 找不到網頁 */}
				<Route
					path="*"
					element={
						<Layout>
							<NotFound />
						</Layout>
					}
				/>
				{/* 錯誤提示網頁  */}
				<Route
					path="/error"
					element={
						<Layout>
							<ErrorPage />
						</Layout>
					}
				/>
			</Routes>
		</>
	);
}

export default App;

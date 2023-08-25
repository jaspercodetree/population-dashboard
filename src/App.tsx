import { Routes, Route } from 'react-router-dom';
import './App.scss';
import Dashboard from './pages/Dashboard';
import Layout from './Layout/Layout';

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
			</Routes>
		</>
	);
}

export default App;

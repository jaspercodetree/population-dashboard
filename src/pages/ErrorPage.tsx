import './ErrorPage.scss';
import { useNavigate } from 'react-router-dom';

const ErrorPage = () => {
	const navigate = useNavigate();

	return (
		<div className="errorPageContainer">
			<h1>出現錯誤，請您稍後再試。</h1>
			<button onClick={() => navigate('/')}>回到首頁</button>
		</div>
	);
};

export default ErrorPage;

import './NotFound.scss';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
	const navigate = useNavigate();

	return (
		<div className="notFoundContainer">
			<h1>很抱歉，您訪問的頁面不存在</h1>
			<button onClick={() => navigate('/')}>回到首頁</button>
		</div>
	);
};

export default NotFound;

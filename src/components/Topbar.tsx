import './Topbar.scss';
import gearIcon from '../assets/gear.svg';
// import reactLogo from './assets/react.svg';

const Topbar = () => {
	return (
		<div className="topbarContainer">
			<div className="logoWrap">
				<h1 className="logo">LOGO</h1>
			</div>
			<div className="toolWrap">
				<img src={gearIcon} alt="gear" />
			</div>
		</div>
	);
};

export default Topbar;

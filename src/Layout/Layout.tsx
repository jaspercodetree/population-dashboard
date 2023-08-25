import Topbar from '../components/Topbar';

const Layout = ({ children }) => {
	return (
		<>
			<Topbar />
			<main id="mainApp">{children}</main>
		</>
	);
};

export default Layout;

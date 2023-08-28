import { ReactNode } from 'react';
import Topbar from '../components/Topbar';

interface LayoutProps {
	children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
	return (
		<>
			<Topbar />
			<main id="mainApp">{children}</main>
		</>
	);
};

export default Layout;

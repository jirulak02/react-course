import { Outlet } from "react-router-dom";

import MainHeader from "../components/UI/MainHeader";

function RootLayout() {
	return (
		<>
			<MainHeader />
			<Outlet />
		</>
	);
}

export default RootLayout;

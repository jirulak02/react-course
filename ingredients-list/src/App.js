import React, { useContext } from "react";
import Auth from "./components/Auth";

import Ingredients from "./components/Ingredients/Ingredients";
import { AuthContext } from "./context/auth-context";

const App = (props) => {
	const authCtx = useContext(AuthContext);
	let content = <Auth />;

	if (authCtx.isAuth) {
		content = <Ingredients />;
	}

	return content;
};

export default App;

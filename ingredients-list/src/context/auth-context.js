import React from "react";
import { useState } from "react";

export const AuthContext = React.createContext({
	isAuth: false,
	login: () => {},
});

const AuthContextProvider = (props) => {
	const [isAuth, setIsAuth] = useState(false);

	const loginHandler = () => {
		setIsAuth(true);
	};

	return (
		<AuthContext.Provider value={{ login: loginHandler, isAuth }}>
			{props.children}
		</AuthContext.Provider>
	);
};

export default AuthContextProvider;

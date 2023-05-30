import React, { useState, useEffect } from "react";

const AuthContext = React.createContext({
	isLoggedIn: false,
	onLogout: () => {},
	onLogin: (email, password) => {},
});

export function AuthContextProvider(props) {
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	useEffect(() => {
		const storedLoginInfo = localStorage.getItem("isLoggedIn");

		if (storedLoginInfo === "1") {
			setIsLoggedIn(true);
		}
	}, []);

	function logoutHandler() {
		localStorage.removeItem("isLoggedIn");
		setIsLoggedIn(false);
	}

	function loginHandler() {
		localStorage.setItem("isLoggedIn", "1");
		setIsLoggedIn(true);
	}

	return (
		<AuthContext.Provider
			value={{
				isLoggedIn: isLoggedIn,
				onLogout: logoutHandler,
				onLogin: loginHandler,
			}}
		>
			{props.children}
		</AuthContext.Provider>
	);
}

export default AuthContext;

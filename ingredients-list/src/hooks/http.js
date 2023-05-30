import { useCallback, useReducer } from "react";

const initialState = {
	loading: false,
	error: null,
	data: null,
	extra: null,
	identifier: null,
};

const httpReducer = (currentHttp, action) => {
	switch (action.type) {
		case "SEND":
			return {
				loading: true,
				error: null,
				data: null,
				extra: null,
				identifier: action.identifier,
			};
		case "RESPONSE":
			return {
				...currentHttp,
				loading: false,
				data: action.responseData,
				extra: action.extra,
			};
		case "ERROR":
			return { loading: false, error: action.errorMsg };
		case "CLEAR":
			return initialState;
		default:
			throw new Error("Should not get there!");
	}
};

const useHttp = () => {
	const [httpState, dispatchHttp] = useReducer(httpReducer, initialState);

	const clear = useCallback(() => dispatchHttp({ type: "CLEAR" }), []);

	const sendRequest = useCallback((url, method, body, extra, identifier) => {
		dispatchHttp({ type: "SEND", identifier });
		fetch(url, {
			method,
			body,
			headers: { "Content-Type": "application/json" },
		})
			.then((response) => {
				return response.json();
			})
			.then((responseData) => {
				dispatchHttp({ type: "RESPONSE", responseData, extra });
			})
			.catch((error) => {
				dispatchHttp({ type: "ERROR", errorMsg: error.message });
			});
	}, []);

	return {
		isLoading: httpState.loading,
		data: httpState.data,
		error: httpState.error,
		sendRequest,
		extra: httpState.extra,
		identifier: httpState.identifier,
		clear,
	};
};

export default useHttp;

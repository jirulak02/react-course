import { useEffect, useState } from "react";
import { useFetcher } from "react-router-dom";

import classes from "./NewsletterSignup.module.css";

function NewsletterSignup() {
	const [email, setEmail] = useState("");

	const fetcher = useFetcher();
	const { data, state } = fetcher;

	useEffect(() => {
		if (state === "idle" && data && data.message) {
			window.alert(data.message);
		}
	}, [data, state]);

	function onChangeHandler(event) {
		setEmail(event.target.value);
	}

	function resetEmailHandler() {
		setEmail("");
	}

	return (
		<fetcher.Form
			method="post"
			action="/newsletter"
			className={classes.newsletter}
			onSubmit={resetEmailHandler}
		>
			<input
				type="email"
				name="email"
				placeholder="Sign up for newsletter..."
				aria-label="Sign up for newsletter"
				value={email}
				onChange={onChangeHandler}
			/>
			<button>Sign up</button>
		</fetcher.Form>
	);
}

export default NewsletterSignup;

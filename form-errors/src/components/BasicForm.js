import useInput from "../hooks/use-input";

const BasicForm = (props) => {
	const {
		value: firstName,
		isValid: firstNameIsValid,
		hasError: firstNameHasError,
		valueChangeHandler: firstNameChangeHandler,
		inputBlurHandler: firstNameBlurHandler,
		reset: firstNameReset,
	} = useInput((value) => value.trim() !== "");

	const {
		value: lastName,
		isValid: lastNameIsValid,
		hasError: lastNameHasError,
		valueChangeHandler: lastNameChangeHandler,
		inputBlurHandler: lastNameBlurHandler,
		reset: lastNameReset,
	} = useInput((value) => value.trim() !== "");

	const {
		value: email,
		isValid: emailIsValid,
		hasError: emailHasError,
		valueChangeHandler: emailChangeHandler,
		inputBlurHandler: emailBlurHandler,
		reset: emailReset,
	} = useInput((value) => value.includes("@"));

	let formIsValid = false;

	if (firstNameIsValid && lastNameIsValid && emailIsValid) {
		formIsValid = true;
	}

	const onFormSubmitHandler = (event) => {
		event.preventDefault();

		if (!formIsValid) {
			return;
		}

		console.log(firstName, lastName, email);

		firstNameReset();
		lastNameReset();
		emailReset();
	};

	return (
		<form onSubmit={onFormSubmitHandler}>
			<div className="control-group">
				<div
					className={
						firstNameHasError
							? "form-control invalid"
							: "form-control"
					}
				>
					<label htmlFor="firstName">First Name</label>
					<input
						type="text"
						id="firstName"
						onChange={firstNameChangeHandler}
						onBlur={firstNameBlurHandler}
						value={firstName}
					/>
					{firstNameHasError && (
						<p className="error-text">
							First name must not be empty.
						</p>
					)}
				</div>
				<div
					className={
						lastNameHasError
							? "form-control invalid"
							: "form-control"
					}
				>
					<label htmlFor="lastName">Last Name</label>
					<input
						type="text"
						id="lastName"
						onChange={lastNameChangeHandler}
						onBlur={lastNameBlurHandler}
						value={lastName}
					/>
					{lastNameHasError && (
						<p className="error-text">
							Last name must not be empty.
						</p>
					)}
				</div>
			</div>
			<div
				className={
					emailHasError ? "form-control invalid" : "form-control"
				}
			>
				<label htmlFor="email">Email</label>
				<input
					type="text"
					id="email"
					onChange={emailChangeHandler}
					onBlur={emailBlurHandler}
					value={email}
				/>
				{emailHasError && (
					<p className="error-text">
						Email must include @ and not be empty.
					</p>
				)}
			</div>
			<div className="form-actions">
				<button disabled={!formIsValid}>Submit</button>
			</div>
		</form>
	);
};

export default BasicForm;

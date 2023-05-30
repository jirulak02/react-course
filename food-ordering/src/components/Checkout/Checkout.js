import classes from "./Checkout.module.css";
import { useRef, useState } from "react";

const isEmpty = (value) => value.trim() === "";
const isFiveChars = (value) => value.trim().length === 5;

const Checkout = (props) => {
	const [formInputsValidity, setFormInputsValidity] = useState({
		name: true,
		street: true,
		postal: true,
		city: true,
	});

	const nameInputRef = useRef();
	const streetInputRef = useRef();
	const postalInputRef = useRef();
	const cityInputRef = useRef();

	const confirmHandler = (event) => {
		event.preventDefault();

		const enterName = nameInputRef.current.value;
		const enterStreet = streetInputRef.current.value;
		const enterPostal = postalInputRef.current.value;
		const enterCity = cityInputRef.current.value;

		const enterNameIsValid = !isEmpty(enterName);
		const enterStreetIsValid = !isEmpty(enterStreet);
		const enterPostalIsValid = isFiveChars(enterPostal);
		const enterCityIsValid = !isEmpty(enterCity);

		setFormInputsValidity({
			name: enterNameIsValid,
			street: enterStreetIsValid,
			postal: enterPostalIsValid,
			city: enterCityIsValid,
		});

		const formIsValid =
			enterNameIsValid &&
			enterStreetIsValid &&
			enterPostalIsValid &&
			enterCityIsValid;

		if (!formIsValid) {
			return;
		}

		props.onConfirm({
			name: enterName,
			street: enterStreet,
			postal: enterPostal,
			city: enterCity,
		});
	};

	return (
		<form className={classes.form} onSubmit={confirmHandler}>
			<div
				className={`${classes.control} ${
					!formInputsValidity.name && classes.invalid
				}`}
			>
				<label htmlFor="name">Your Name</label>
				<input type="text" id="name" ref={nameInputRef} />
				{!formInputsValidity.name && <p>Please enter valid name.</p>}
			</div>
			<div
				className={`${classes.control} ${
					!formInputsValidity.street && classes.invalid
				}`}
			>
				<label htmlFor="street">Street</label>
				<input type="text" id="street" ref={streetInputRef} />
				{!formInputsValidity.street && (
					<p>Please enter valid street.</p>
				)}
			</div>
			<div
				className={`${classes.control} ${
					!formInputsValidity.postal && classes.invalid
				}`}
			>
				<label htmlFor="postal">Postal Code</label>
				<input type="text" id="postal" ref={postalInputRef} />
				{!formInputsValidity.postal && (
					<p>Please enter valid postal.</p>
				)}
			</div>
			<div
				className={`${classes.control} ${
					!formInputsValidity.city && classes.invalid
				}`}
			>
				<label htmlFor="city">City</label>
				<input type="text" id="city" ref={cityInputRef} />
				{!formInputsValidity.city && <p>Please enter valid city.</p>}
			</div>
			<div className={classes.actions}>
				<button type="button" onClick={props.onCancel}>
					Cancel
				</button>
				<button className={classes.submit}>Confirm</button>
			</div>
		</form>
	);
};

export default Checkout;

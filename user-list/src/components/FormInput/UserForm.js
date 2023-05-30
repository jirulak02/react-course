import { useRef } from "react";
import styles from "./UserForm.module.css";

function UserForm(props) {
	const nameInputRef = useRef();
	const ageInputRef = useRef();

	function submitHandler(event) {
		event.preventDefault();

		const newValue = {
			id: Math.random().toString(),
			name: nameInputRef.current.value,
			age: +ageInputRef.current.value,
		};

		if (newValue.name.trim() === "") {
			props.nameError(true);
		} else if (newValue.age <= 0) {
			props.ageError(true);
		} else {
			props.action(newValue);
			nameInputRef.current.value = "";
			ageInputRef.current.value = "";
		}
	}

	return (
		<div className={styles.form}>
			<form onSubmit={submitHandler}>
				<label htmlFor="username">Username</label>
				<input id="username" type="text" ref={nameInputRef} />
				<label htmlFor="age">Age (Years)</label>
				<input id="age" type="number" ref={ageInputRef} />
				<button type="submit" className={styles.button}>
					Add User
				</button>
			</form>
		</div>
	);
}

export default UserForm;

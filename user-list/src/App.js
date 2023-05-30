import Card from "./components/UI/Card";
import UserForm from "./components/FormInput/UserForm";
import { useState } from "react";
import ListItem from "./components/FormInput/ListItem";
import ErrorWindow from "./components/Errors/ErrorWindow";

function App() {
	const startList = [
		{ id: "1st", name: "Jirka", age: 20 },
		{ id: "2nd", name: "Matej", age: 22 },
	];
	const [list, setList] = useState(startList);
	const [nameError, setNameError] = useState(false);
	const [ageError, setAgeError] = useState(false);

	function onListAdd(newValue) {
		setList((prevList) => [...prevList, newValue]);
	}

	function onNameError(value) {
		setNameError(value);
	}

	function onAgeError(value) {
		setAgeError(value);
	}

	return (
		<>
			<Card>
				<UserForm
					action={onListAdd}
					nameError={onNameError}
					ageError={onAgeError}
				/>
			</Card>
			{list.length > 0 && (
				<Card>
					{list.map((item) => (
						<ListItem key={item.id} data={item} />
					))}
				</Card>
			)}
			{nameError && (
				<ErrorWindow
					message="Please enter a valid name and age (non-empty values)."
					action={onNameError}
				/>
			)}
			{ageError && (
				<ErrorWindow
					message="Please entera valid age (> 0)."
					action={onAgeError}
				/>
			)}
		</>
	);
}

export default App;

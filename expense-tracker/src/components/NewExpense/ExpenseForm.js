import { useState } from "react";
import "./ExpenseForm.css";

function ExpenseForm(props) {
	const [enteredTitle, setEnteredTitle] = useState("");
	const [enteredAmount, setEnteredAmount] = useState("");
	const [enteredDate, setEnteredDate] = useState("");

	function titleChangeHandler(event) {
		setEnteredTitle(event.target.value);
	}

	function amountChangeHandler(event) {
		setEnteredAmount(event.target.value);
	}

	function dateChangeHandler(event) {
		setEnteredDate(event.target.value);
	}

	function submitHandler(event) {
		event.preventDefault();

		const expenseData = {
			title: enteredTitle,
			amount: +enteredAmount,
			date: new Date(enteredDate),
		};

		props.onSaveExpenseData(expenseData);
		props.onClose();

		setEnteredTitle("");
		setEnteredAmount("");
		setEnteredDate("");
	}

	return (
		<form onSubmit={submitHandler}>
			<div className="new-expense__controls">
				<div className="new-expense__control">
					<label>Title</label>
					<input
						type="text"
						required
						value={enteredTitle}
						onChange={titleChangeHandler}
					/>
				</div>
				<div className="new-expense__control">
					<label>Amount</label>
					<input
						type="number"
						min="0.01"
						step="0.01"
						required
						value={enteredAmount}
						onChange={amountChangeHandler}
					/>
				</div>
				<div className="new-expense__control">
					<label>Date</label>
					<input
						type="date"
						min="2019-01-01"
						max="2022-12-31"
						required
						value={enteredDate}
						onChange={dateChangeHandler}
					/>
				</div>
			</div>
			<div className="new-expense__actions">
				<button
					type="button"
					onClick={() => {
						props.onClose();
					}}
				>
					Cancel
				</button>
				<button type="submit">Add Expense</button>
			</div>
		</form>
	);
}

export default ExpenseForm;

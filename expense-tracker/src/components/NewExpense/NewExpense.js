import { useState } from "react";
import ExpenseForm from "./ExpenseForm";
import "./NewExpense.css";
import ExpenseFormClosed from "./ExpenseFormClosed";

function NewExpense(props) {
	const [formIsOpen, setFormIsOpen] = useState(false);

	function onSaveExpenseDataHandler(enteredExpenseData) {
		const expenseData = {
			...enteredExpenseData,
			id: Math.random().toString(),
		};

		props.onAddExpense(expenseData);
	}

	function onOpenExpenseForm() {
		setFormIsOpen(true);
	}

	function onCloseExpenseForm() {
		setFormIsOpen(false);
	}

	return (
		<div className="new-expense">
			{formIsOpen ? (
				<ExpenseForm
					onSaveExpenseData={onSaveExpenseDataHandler}
					onClose={onCloseExpenseForm}
				/>
			) : (
				<ExpenseFormClosed onOpen={onOpenExpenseForm} />
			)}
		</div>
	);
}

export default NewExpense;

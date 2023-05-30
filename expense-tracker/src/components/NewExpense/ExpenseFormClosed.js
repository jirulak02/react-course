import "./ExpenseFormClose.css";

function ExpenseFormClosed(props) {
	return (
		<div className="new-expense__closed">
			<button
				type="button"
				onClick={() => {
					props.onOpen();
				}}
			>
				Add New Expense
			</button>
		</div>
	);
}

export default ExpenseFormClosed;

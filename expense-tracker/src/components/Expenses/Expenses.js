import "./Expenses.css";
import Card from "../UI/Card";
import ExpensesFilter from "./ExpensesFilter";
import { useState } from "react";
import ExpensesList from "./ExpensesList";
import ExpensesChart from "./ExpensesChart";

function Expenses(props) {
	const [filteredYear, setFilteredYear] = useState("all");

	function filterByYear(year) {
		setFilteredYear(year);
	}

	const filteredExpenses = props.items.filter((expense) => {
		if (filteredYear === "all") {
			return true;
		} else {
			return expense.date.getFullYear().toString() === filteredYear;
		}
	});

	return (
		<div>
			<Card className="expenses">
				<ExpensesFilter
					selected={filteredYear}
					onFilter={filterByYear}
				/>
				<ExpensesChart expenses={filteredExpenses} />
				<ExpensesList items={filteredExpenses} />
			</Card>
		</div>
	);
}

export default Expenses;

import { useState, useEffect } from "react";

import Card from "../UI/Card";
import classes from "./AvailableMeals.module.css";
import MealItem from "./MealItem/MealItem";

function AvailableMeals() {
	const [meals, setMeals] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchMeals = async () => {
			setError(null);

			const response = await fetch(process.env.REACT_APP_DB_MEALS);

			if (!response.ok) {
				throw new Error("Something went wrong!");
			}

			const data = await response.json();

			const loadedMeals = [];

			for (const key in data) {
				loadedMeals.push({
					id: key,
					name: data[key].name,
					description: data[key].description,
					price: data[key].price,
				});
			}

			setMeals(loadedMeals);
		};

		fetchMeals().catch((error) => {
			setError(error.message);
		});

		setIsLoading(false);
	}, []);

	const mealsList = meals.map((meal) => (
		<MealItem
			key={meal.id}
			id={meal.id}
			name={meal.name}
			description={meal.description}
			price={meal.price}
		>
			{meal.name}
		</MealItem>
	));

	let content = <p>Found no movies.</p>;

	if (meals.length > 0) {
		content = mealsList;
	} else if (error) {
		content = <p>{error}</p>;
	} else if (isLoading) {
		content = <p>Loading...</p>;
	}

	return (
		<section className={classes.meals}>
			<Card>
				<ul>{content}</ul>
			</Card>
		</section>
	);
}

export default AvailableMeals;

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Greeting from "./Greeting";

describe("Greeting component", () => {
	test("renders 'Hello World' as a text", () => {
		render(<Greeting />);

		const helloWorldElement = screen.getByText("Hello World", {
			exact: false,
		});
		expect(helloWorldElement).toBeInTheDocument();
	});

	test("renders unchanged text", () => {
		render(<Greeting />);

		const text = screen.getByText(/it's good to see you/i);
		expect(text).toBeInTheDocument();
	});

	test("renders 'Changed!' if the button was clicked", async () => {
		// Arrange
		render(<Greeting />);

		// Act
		const buttonElement = screen.getByRole("button");
		const user = userEvent.setup();
		await user.click(buttonElement);

		// Assert
		const outputElement = screen.getByText("Changed!");
		expect(outputElement).toBeInTheDocument();
	});

	test("doesn't render unchanged text if the button was clicked", async () => {
		render(<Greeting />);

		const buttonElement = screen.getByRole("button");
		const user = userEvent.setup();
		await user.click(buttonElement);

		const outputElement = screen.queryByText("good to see you", {
			exact: false,
		});
		expect(outputElement).toBeNull();
	});
});

import Section from "../UI/Section";
import TaskForm from "./TaskForm";
import useHttp from "../../hooks/use-http";

const NewTask = (props) => {
	const { isLoading, error, sendRequest: sendTaskRequest } = useHttp();

	const createdTask = (taskText, taskData) => {
		const generatedId = taskData.name;
		const createdTask = { id: generatedId, text: taskText };

		props.onAddTask(createdTask);
	};

	const enterTaskHandler = async (taskText) => {
		sendTaskRequest(
			{
				url: process.env.REACT_APP_DB_URL,
				method: "POST",
				body: { text: taskText },
				headers: {
					"Content-Type": "application/json",
				},
			},
			createdTask.bind(null, taskText)
		);
	};

	return (
		<Section>
			<TaskForm onEnterTask={enterTaskHandler} loading={isLoading} />
			{error && <p>{error}</p>}
		</Section>
	);
};

export default NewTask;

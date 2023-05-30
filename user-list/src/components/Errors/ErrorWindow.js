import styles from "./ErrorWindow.module.css";
import ReactDOM from "react-dom";

function Overlay(props) {
	return (
		<div className={styles.container}>
			<div className={styles.wrapper}>
				<div className={styles.title}>Invalid input</div>
				<div className={styles.message}>
					{props.message}
					<button
						type="button"
						className={styles.button}
						onClick={() => {
							props.action(false);
						}}
					>
						Okay
					</button>
				</div>
			</div>
		</div>
	);
}

function ErrorWindow(props) {
	return (
		<>
			{ReactDOM.createPortal(
				<Overlay action={props.action} message={props.message} />,
				document.getElementById("overlay-root")
			)}
		</>
	);
}

export default ErrorWindow;

import styles from "./Card.module.css";

function Card(props) {
	return <div className={styles.wrapper}>{props.children}</div>;
}

export default Card;

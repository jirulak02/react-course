import styles from "./ListItem.module.css";

function ListItem(props) {
	const { name, age } = props.data;

	return <div className={styles.item}>{`${name} (${age} years old)`}</div>;
}

export default ListItem;

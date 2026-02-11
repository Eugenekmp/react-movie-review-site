import ReviewListItem from "./ReviewListItem";
import styles from "./ReviewList.module.css";

function ReviewList({ items, onDelete, onUpdate }) {
  return (
    <ul className={styles.reviewList}>
      {items.map((item) => (
        <li key={item.id}>
          <ReviewListItem item={item} onDelete={onDelete} onUpdate={onUpdate} />
        </li>
      ))}
    </ul>
  );
}

export default ReviewList;

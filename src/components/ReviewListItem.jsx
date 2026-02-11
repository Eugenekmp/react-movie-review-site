import { useState } from "react";
import Modal from "./Modal";
import styles from "./ReviewListItem.module.css";
import ReviewForm from "./ReviewForm.jsx";
import Button from "./Button.jsx";
import placeholderImage from "../assets/placeholder.png";

function ReviewListItem({ item, onDelete, onUpdate }) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const dateString = new Date(item.createdAt).toLocaleDateString();

  const handleEditFormSubmit = (data) => {
    onUpdate(item.id, data);
    setIsEditModalOpen(false);
  };
  return (
    <div className={styles.reviewListItem}>
      <img
        className={styles.image}
        src={item.imgUrl ?? placeholderImage}
        alt={item.title}
      />
      <div className={styles.rows}>
        <h1 className={styles.title}>{item.title}</h1>
        <p className={styles.rating}>{item.rating}</p>
        <p className={styles.date}>{dateString}</p>
        <p className={styles.content}>{item.content}</p>
        <div>
          <Button
            classsName={styles.button}
            variant="ghost"
            onClick={() => setIsEditModalOpen(true)}
          >
            수정
          </Button>
          <Modal
            isOpen={isEditModalOpen}
            onClose={() => setIsEditModalOpen(false)}
          >
            <h2 className={styles.modalTitle}>리뷰 수정</h2>
            <ReviewForm review={item} onSubmit={handleEditFormSubmit} />
          </Modal>
          <Button
            className={styles.button}
            variant="danger"
            onClick={() => onDelete(item.id)}
          >
            삭제
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ReviewListItem;

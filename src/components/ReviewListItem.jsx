import { useState } from "react";
import Modal from "./Modal";
import styles from "./ReviewListItem.module.css";
import ReviewForm from "./ReviewForm.jsx";
import Button from "./Button.jsx";
import placeholderImage from "../assets/placeholder.png";
import useTranslate from "../hooks/useTranslate.js";

const STARS = "★★★★★";

function ReviewListItem({ item, onDelete, onUpdate }) {
  const t = useTranslate();

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
        <p className={styles.rating}>{STARS.slice(0, item.rating)}</p>
        <p className={styles.date}>{dateString}</p>
        <p className={styles.content}>{item.content}</p>
        <div>
          <Button
            className={styles.button}
            variant="ghost"
            onClick={() => setIsEditModalOpen(true)}
          >
            {t("edit button")}
          </Button>
          <Modal
            isOpen={isEditModalOpen}
            onClose={() => setIsEditModalOpen(false)}
          >
            <h2 className={styles.modalTitle}>{t("edit review title")}</h2>
            <ReviewForm review={item} onSubmit={handleEditFormSubmit} />
          </Modal>
          <Button
            className={styles.button}
            variant="danger"
            onClick={() => onDelete(item.id)}
          >
            {t("delete button")}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ReviewListItem;

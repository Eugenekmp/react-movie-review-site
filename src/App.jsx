import ReviewList from "./components/ReviewList";
import mockItems from "./mock.json";
import { useState } from "react";
import Modal from "./components/Modal";
import ReviewForm from "./components/ReviewForm.jsx";
import Button from "./components/Button.jsx";
import Layout from "./components/Layout.jsx";
import styles from "./App.module.css";

function App() {
  const [items, setItems] = useState(mockItems);
  const [order, setOrder] = useState("createdAt");
  const [isCreatedReviewOpen, setIsCreatedReviewOpen] = useState(false);

  const handleUpdate = (id, data) => {
    const index = items.findIndex((item) => item.id === id);
    const now = new Date();
    const newItem = {
      ...items[index],
      ...data,
      updatedAt: now.valueOf(),
    };

    const newItems = [
      ...items.slice(0, index),
      newItem,
      ...items.slice(index + 1),
    ];
    setItems(newItems);
  };

  const handleCreate = (data) => {
    const now = new Date();
    const newItem = {
      id: items.length + 1,
      ...data,
      createdAt: now.valueOf(),
      updatedAt: now.valueOf(),
    };
    setItems([newItem, ...items]);
    setIsCreatedReviewOpen(false);
  };

  const sortedItems = items.sort((a, b) => b[order] - a[order]);

  const handleDelete = (id) => {
    const nextItems = items.filter((items) => items.id !== id);
    setItems(nextItems);
  };

  return (
    <Layout>
      <div className={styles.buttons}>
        <div>
          <Button
            className={styles.orderButton}
            variant={order === "createdAt" ? "primary" : "ghost"}
            onClick={() => setOrder("createdAt")}
          >
            최신순
          </Button>
          <Button
            className={styles.orderButton}
            variant={order === "rating" ? "primary" : "ghost"}
            onClick={() => setOrder("rating")}
          >
            베스트순
          </Button>
        </div>
        <Button
          className={styles.createButton}
          onClick={() => setIsCreatedReviewOpen(true)}
        >
          추가하기
        </Button>
        <Modal
          isOpen={isCreatedReviewOpen}
          onClose={() => setIsCreatedReviewOpen(false)}
        >
          <h2 className={styles.modalTitle}>리뷰 생성</h2>
          <ReviewForm onSubmit={handleCreate} />
        </Modal>
      </div>
      <ReviewList
        items={sortedItems}
        onDelete={handleDelete}
        onUpdate={handleUpdate}
      />
    </Layout>
  );
}

export default App;

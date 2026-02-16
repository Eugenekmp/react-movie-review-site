import ReviewList from "./components/ReviewList";

import { useCallback, useEffect, useState } from "react";
import Modal from "./components/Modal";
import ReviewForm from "./components/ReviewForm.jsx";
import Button from "./components/Button.jsx";
import Layout from "./components/Layout.jsx";
import styles from "./App.module.css";
import useTranslate from "./hooks/useTranslate.js";
import axios from "./utils/axios";

const LIMIT = 10;

function App() {
  const t = useTranslate();
  const [items, setItems] = useState([]);
  const [order, setOrder] = useState("createdAt");
  const [isCreatedReviewOpen, setIsCreatedReviewOpen] = useState(false);
  const [hasNext, setHasNext] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLoad = useCallback(async (orderParam) => {
    const response = await axios.get("/film-reviews", {
      params: {
        order: orderParam,
        limit: LIMIT,
      },
    });
    const { reviews, paging } = response.data;
    setItems(reviews);
    setHasNext(paging.hasNext);
  }, []);

  const handleLoadMore = async () => {
    let data = null;
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get("/film-reviews", {
        params: {
          order,
          offset: items.length,
          limit: LIMIT,
        },
      });
      data = response.data;
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
    if (!data) return;

    const { reviews, paging } = data;
    setItems((prevItems) => [...prevItems, ...reviews]);
    setHasNext(paging.hasNext);
  };

  const handleUpdate = async (id, data) => {
    const response = await axios.patch(`/film-reviews/${id}`, data);
    const { review } = response.data;

    setItems((prevItems) => {
      const index = prevItems.findIndex((item) => item.id === id);
      return [
        ...prevItems.slice(0, index),
        review,
        ...prevItems.slice(index + 1),
      ];
    });
  };

  const handleCreate = async (data) => {
    const response = await axios.post("/film-reviews ", data);
    const { review } = response.data;

    setItems((prevItems) => [review, ...prevItems]);
    setIsCreatedReviewOpen(false);
  };

  const handleDelete = async (id) => {
    await axios.delete(`/film-reviews/${id}`);
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };
  useEffect(() => {
    handleLoad(order);
  }, [order, handleLoad]);

  return (
    <Layout>
      <div className={styles.buttons}>
        <div>
          <Button
            className={styles.orderButton}
            variant={order === "createdAt" ? "primary" : "ghost"}
            onClick={() => setOrder("createdAt")}
          >
            {t("sort by latest")}
          </Button>
          <Button
            className={styles.orderButton}
            variant={order === "rating" ? "primary" : "ghost"}
            onClick={() => setOrder("rating")}
          >
            {t("sort by best")}
          </Button>
        </div>
        <Button
          className={styles.createButton}
          onClick={() => setIsCreatedReviewOpen(true)}
        >
          {t("create button")}
        </Button>
        <Modal
          isOpen={isCreatedReviewOpen}
          onClose={() => setIsCreatedReviewOpen(false)}
        >
          <h2 className={styles.modalTitle}>{t("create review title")}</h2>
          <ReviewForm onSubmit={handleCreate} />
        </Modal>
      </div>
      <ReviewList
        items={items}
        onDelete={handleDelete}
        onUpdate={handleUpdate}
      />
      {hasNext && (
        <Button disabled={isLoading} onClick={handleLoadMore}>
          더 불러오기
        </Button>
      )}
      {error && <div>오류가 발생했습니다.</div>}
    </Layout>
  );
}

export default App;

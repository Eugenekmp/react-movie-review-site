import { useEffect, useRef, useActionState } from "react";
import Button from "./Button.jsx";
import Input from "./Input.jsx";
import Select from "./Select.jsx";
import Textarea from "./Textarea.jsx";
import styles from "./ReviewForm.module.css";
import useTranslate from "../hooks/useTranslate.js";
import FileInput from "./FileInput.jsx";

function ReviewForm({
  review = {
    title: "",
    imgUrl: "",
    rating: 1,
    content: "",
  },
  onSubmit,
}) {
  const t = useTranslate();

  const inputRef = useRef(null);

  const [state, formAction, isPending] = useActionState(
    async (prevState, data) => {
      try {
        await onSubmit(data);
        return { error: null };
      } catch (error) {
        return { error };
      }
    },
    { error: null },
  );

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <form className={styles.form} action={formAction}>
      <FileInput name="imgFile" initialPreview={review.imgUrl} />
      <div className={styles.content}>
        <div className={styles.titleRating}>
          <Input
            className={styles.title}
            name="title"
            placeholder={t("review title placeholder")}
            ref={inputRef}
            defaultValue={review.title}
          />
          <Select name="rating" defaultValue={review.rating}>
            <option value={1}>★</option>
            <option value={2}>★★</option>
            <option value={3}>★★★</option>
            <option value={4}>★★★★</option>
            <option value={5}>★★★★★</option>
          </Select>
        </div>
        <Textarea
          className={styles.textarea}
          name="content"
          placeholder={t("review content placeholder")}
          defaultValue={review.content}
        />
        <Button disabled={isPending} className={styles.button}>
          {t("submit button")}
        </Button>
        {state.error && <div>오류가 발생했습니다.</div>}
      </div>
    </form>
  );
}

export default ReviewForm;

import { useEffect, useRef, useState } from "react";
import placeholderImage from "../assets/placeholder.png";
import styles from "./FileInput.module.css";
import closeIcon from "../assets/close.svg";

function FileInput({ className, name, initialPreview }) {
  const [file, setFile] = useState();
  const [preview, setPreview] = useState(initialPreview);
  const inputRef = useRef();

  const handleChange = (e) => {
    const nextFile = e.target.files[0];
    setFile(nextFile);
  };

  const handleClear = () => {
    setFile(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  useEffect(() => {
    if (!file) {
      setPreview(initialPreview);
      return;
    }
    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);

    return () => {
      URL.revokeObjectURL(objectUrl);
    };
  }, [file]);

  return (
    <div className={`${styles.container} ${className}`}>
      <input
        hidden
        name={name}
        type="file"
        onChange={handleChange}
        ref={inputRef}
      />
      <img
        className={styles.preview}
        src={preview || placeholderImage}
        onClick={handleClick}
      />
      {file && (
        <div className={styles.clear} onClick={handleClear}>
          <img className={styles.icon} src={closeIcon} alt="clear" />
        </div>
      )}
    </div>
  );
}

export default FileInput;

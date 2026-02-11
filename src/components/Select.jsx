import styles from "./Select.module.css";

function Select({ className = "", ...props }) {
  const classNames = `${styles.select} ${className}`;
  return <select className={classNames} {...props} />;
}

export default Select;

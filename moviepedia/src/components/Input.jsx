import styles from './Input.module.css';

function Input({ className = '', ...props }) {
  const classNames = `${styles.input} ${className}`;
  return <input className={classNames} {...props} />;
}

export default Input;
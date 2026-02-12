import logoImage from "../assets/logo.png";
import styles from "./Layout.module.css";
import LocaleSelect from "./LocaleSelect";

function Layout({ children }) {
  return (
    <div className={styles.layout}>
      <div className={styles.gnbContainer}>
        <div className={styles.gnb}>
          <img src={logoImage} alt="moviepedia" />
          <LocaleSelect />
        </div>
      </div>
      <div className={styles.main}>{children}</div>
      <div className={styles.footerContainer}>
        <div className={styles.footer}>서비스 이용약관 | 개인정보 처리방침</div>
      </div>
    </div>
  );
}

export default Layout;

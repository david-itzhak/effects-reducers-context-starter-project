import {useContext} from "react";
import styles from "./Navigation.module.css";
import AuthContext from "../../store/AuthContext";

const Navigation = () => {
    const context = useContext(AuthContext);
  return (
    <nav className={styles.nav}>
      <ul>
        {context.isLoggedIn && (
          <li>
            <a href="/">Пользователи</a>
          </li>
        )}
        {context.isLoggedIn && (
          <li>
            <a href="/">Админ</a>
          </li>
        )}
        {context.isLoggedIn && (
          <li>
            <button onClick={context.onLogout}>Выйти</button>
          </li>
        )}
      </ul>
    </nav>
  );
};
export default Navigation;

import React, { useState, useEffect } from "react";
import styles from "./TodoListItem.module.css";

function Header() {
  const [date, setDate] = useState(new Date().toLocaleString());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setDate(new Date().toLocaleString());
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <header className={styles.header}>
      <button className={styles.button}>
        <span className={styles.actualText}>&nbsp;MyToDo {date}&nbsp;</span>
      </button>
    </header>
  );
}

export default Header;

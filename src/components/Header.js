import React, { useState, useEffect } from "react";
import styles from "./TodoListItem.module.css";
//import { Link } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.css';

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

      <span className={styles.actualText}>&nbsp;My <span style={{ fontFamily: 'Brush Script MT', fontSize: '25px' }}>MODERN</span> ToDo {date}&nbsp;</span>

      </button>
    </header>
  );
}

export default Header;

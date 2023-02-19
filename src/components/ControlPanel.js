import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './TodoListItem.module.css';

const ControlPanel = () => {
  const [activeButton, setActiveButton] = useState(0);

  return (
    <div>
      <NavLink
        key="0"
        to=""
        className={`${styles.ControlPanel} ${activeButton === 0 ? styles.active : ''}`}
        onClick={() => setActiveButton(0)}
      >
        <span className={styles.airButton}>General List</span>
      </NavLink>
      <NavLink
        key="1"
        to="/My Home"
        className={`${styles.ControlPanel} ${activeButton === 1 ? styles.active : ''}`}
        onClick={() => setActiveButton(1)}
      >
        <span className={styles.airButton}>My Home</span>
      </NavLink>
      <NavLink
        key="2"
        to="/My Classes"
        className={`${styles.ControlPanel} ${activeButton === 2 ? styles.active : ''}`}
        onClick={() => setActiveButton(2)}
      >
        <span className={styles.airButton}>My Classes</span>
      </NavLink>
      <NavLink
        key="3"
        to="/My Work"
        className={`${styles.ControlPanel} ${activeButton === 3 ? styles.active : ''}`}
        onClick={() => setActiveButton(3)}
      >
        <span className={styles.airButton}>My Job</span>
      </NavLink>
    </div>
  );
};

export default ControlPanel;

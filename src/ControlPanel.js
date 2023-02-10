import React from 'react';
import { NavLink } from 'react-router-dom';
//import InputWithLabel from './InputWithLabel';
//import style from './TodoListItem.module.css';
import styles from "./TodoListItem.module.css";


const ControlPanel = () => {
return (
  <div>
    <NavLink key="0" to="" className={styles.ControlPanel}>
      <span className={styles.airButton}>
        General List
      </span>
    </NavLink>
    <NavLink key="1" to="/My Home" className={styles.ControlPanel}>
      <span className={styles.airButton}>
        My Home
      </span>
    </NavLink>
    <NavLink key="2" to="/My Classes" className={styles.ControlPanel}>
      <span className={styles.airButton}>
        My Classes
      </span>
    </NavLink>
    <NavLink key="3" to="/My Work" className={styles.ControlPanel}>
      <span className={styles.airButton}>
        My Job
      </span>
    </NavLink>
  </div>
);
}

export default ControlPanel;
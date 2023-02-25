import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './TodoListItem.module.css';
import '@fortawesome/fontawesome-free/css/all.css';



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
        <span className={styles.airButton}>
        General List <i className="fas fa-list-alt"></i> 
        </span>

      </NavLink>
      <NavLink
        key="1"
        to="/My Home"
        className={`${styles.ControlPanel} ${activeButton === 1 ? styles.active : ''}`}
        onClick={() => setActiveButton(1)}
      >
        <span className={styles.airButton}>
          My Home <i className="fas fa-dungeon"></i> 
        </span>
      </NavLink>
      <NavLink
        key="2"
        to="/My Classes"
        className={`${styles.ControlPanel} ${activeButton === 2 ? styles.active : ''}`}
        onClick={() => setActiveButton(2)}
      >
        <span className={styles.airButton}>
        My Classes <i className="fas fa-graduation-cap"></i> 
        </span>
      </NavLink>
      <NavLink
        key="3"
        to="/My Work"
        className={`${styles.ControlPanel} ${activeButton === 3 ? styles.active : ''}`}
        onClick={() => setActiveButton(3)}
      >
        <span className={styles.airButton}>
          My Job <i className="fas fa-paperclip"></i> 
        </span>
      </NavLink>
    </div>
  );
};

export default ControlPanel;

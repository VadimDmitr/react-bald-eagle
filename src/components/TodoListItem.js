import React from 'react';
import PropTypes from "prop-types";
import styles from "./TodoListItem.module.css";


function TodoListItem({ todo, onRemoveTodo }) {
  return (
    <li className={styles.ListItem}>
      <div className={styles.title}>
        <strong>Title:</strong> {todo.fields.Title}
      </div>
      
      <div className={styles.notes}>
        <strong>Notes:</strong> {todo.fields.Description}
      </div>
      <button
        className={styles.removeButton}
        type="button"
        onClick={() => onRemoveTodo(todo.id)}
      >
        Remove
      </button>
    </li>
  );
}

TodoListItem.propTypes = {
  todo: PropTypes.object,
  onRemoveTodo: PropTypes.func,
};

export default TodoListItem;
import React from 'react';
import style from './TodoListItem.module.css';
import PropTypes from "prop-types";


function TodoListItem({ todo, onRemoveTodo }) {
  return (
    <li className={style.ListItem}>
      {todo.fields.Title}
      <button className={style.removeButton} type="button" onClick={() => onRemoveTodo(todo.id)}>
        Remove
      </button>
    </li>
  );
}

TodoListItem.propTypes = {
  todo: PropTypes.object,
  onRemoveTodo: PropTypes.func
};

export default TodoListItem;  
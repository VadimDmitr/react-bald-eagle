import React from 'react';
import TodoListItem from './TodoListItem';
import PropTypes from "prop-types";

const TodoList = ({todoList, onRemoveTodo }) => {
  return ( 
    <ul>
        {todoList.map((todo) => (
          <TodoListItem 
          key={todo.id} 
          todo={todo}
          onRemoveTodo={onRemoveTodo}
          />
          ))}
    </ul>
  );
}
TodoListItem.propTypes = {
  onAddTodo: PropTypes.func,
};

export default TodoList;
import React from 'react';
import TodoListItem from './TodoListItem';

const TodoList = ({todoList, onRemoveTodo }) => {
  return ( 
    <ul>
        {todoList.map((todo) => (
          <TodoListItem 
          key={todo.todoItemID} 
          todo={todo}
          onRemoveTodo={onRemoveTodo}
          />
          ))}
    </ul>
  );
}

export default TodoList;
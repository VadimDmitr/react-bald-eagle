import React from 'react';
import TodoListItem from './TodoListItem';

const todoList = [
  { id: 1, title: "Read lesson" },
  { id: 2, title: "Exercises" },
  { id: 3, title: "Complete assigment" },
];

const TodoList = () => {
  return ( 
    <ul>
        {todoList.map((todo) => (
          <TodoListItem key={todo.id} todo={todo}/>
          ))}
    </ul>
  );
}

export default TodoList;
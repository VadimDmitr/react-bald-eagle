import React from 'react';

const todoList = [
  { id: 1, title: "Read lesson" },
  { id: 2, title: "Exercises" },
  { id: 3, title: "Complete assigment" },
];

const TodoList = () => {
  return ( 
    <ul>
         {todoList.map(function (item) {
           return <li key={item.id}>{item.title}</li>;
            })}
    </ul>
  );
}

export default TodoList;
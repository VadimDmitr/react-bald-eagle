import React from 'react';
import TodoList from './TodoList';

const AddTodoForm = (props) => {

  const handleAddTodo = (event) => {
    event.preventDefault();
    var todoTitle = event.target.title.value;
    props.onAddTodo(todoTitle);
    console.log(todoTitle);
    event.target.reset();
  }

  return (
    <form onSubmit={handleAddTodo}>
       <label htmlFor="todoTitle">Title: </label>
       <input id = "todoTitle" type = "text" name = "title" />
       <input type="submit" value="Add" />
    </form>
  );
}

export default AddTodoForm;
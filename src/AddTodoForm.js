import React from 'react';
import InputWithLabel from './InputWithLabel';
import style from './TodoListItem.module.css';

const AddTodoForm = ({ onAddTodo }) => {

  const [todoTitle, setTodoTitle] = React.useState('');

  const handleTitleChange = (event) => {
    const newTodoTitle = event.target.value;
    setTodoTitle(newTodoTitle);
  }

  const handleAddTodo = (event) => {
    event.preventDefault();
    console.log(todoTitle);
    onAddTodo({title: todoTitle, id: Date.now()});
    setTodoTitle('');
  }
  
  return (
    <div>
      <form onSubmit={handleAddTodo}>
      <InputWithLabel
        id="todoTitle"
        value={todoTitle}
        onInputChange={handleTitleChange}
      >
      Title:
      </InputWithLabel>
         <input className={style.addButton} type="submit" value="Add" onChange={() => 
          setTodoTitle('')}/>
      </form>
    </div>
  );
}

export default AddTodoForm;
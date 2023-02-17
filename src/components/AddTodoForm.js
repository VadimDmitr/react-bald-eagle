import React, { useState } from "react";
import InputWithLabel from "./InputWithLabel";
import PropTypes from "prop-types";
import styles from "./TodoListItem.module.css";


const AddTodoForm = ({ onAddTodo }) => {
  const [todoTitle, setTodoTitle] = useState("");
  const handleTitleChange = (event) => {
    const newTodo = event.target.value;
    setTodoTitle(newTodo);
  };

  const handleAddTodo = (event) => {
    event.preventDefault();
    //Prevent from spaces
    const inputSpaces = todoTitle.trim();
    if (inputSpaces === "") {
      console.log("spaces from User");
    } else {
      onAddTodo({ fields: { Title: todoTitle } });
      setTodoTitle("");
    }
  };

  return (
    <form onSubmit={handleAddTodo}>
      <InputWithLabel
        id="todoTitle"
        value={todoTitle}
        onChange={handleTitleChange}
        name="title"
        placeholder="What to do?"
      >
        {<strong>Title:</strong>}
      </InputWithLabel>
      <button type="submit" className={styles.addButton}>
        Add
      </button>
    </form>
  );
};

AddTodoForm.propTypes = {
  onAddTodo: PropTypes.func,
};

export default AddTodoForm;
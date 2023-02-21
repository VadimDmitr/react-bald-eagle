import React, { useState } from "react";
import InputWithLabel from "./InputWithLabel";
import PropTypes from "prop-types";
import styles from "./TodoListItem.module.css";
import '@fortawesome/fontawesome-free/css/all.css';


const AddTodoForm = ({ onAddTodo }) => {
  const [todoTitle, setTodoTitle] = useState("");
  const [todoDescription, setTodoDescription] = useState("");

  const handleTitleChange = (event) => {
    const newTodoTitle = event.target.value;
    setTodoTitle(newTodoTitle);
  };

  const handleDescriptionChange = (event) => {
    const newTodoDescription = event.target.value;
    setTodoDescription(newTodoDescription);
  };

  const handleAddTodo = (event) => {
    event.preventDefault();
    // Prevent from spaces
    const inputSpacesTitle = todoTitle.trim();
    if (inputSpacesTitle === "") {
      console.log("Title is empty");
    } else {
      onAddTodo({
        fields: {
          Title: todoTitle,
          Description: todoDescription,
        },
      });
      setTodoTitle("");
      setTodoDescription("");
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
        {<strong>&#9733;  Title:</strong>}
      </InputWithLabel>
      <InputWithLabel
        id="todoDescription"
        value={todoDescription}
        onChange={handleDescriptionChange}
        name="description"
        placeholder="Notes"
      >
      </InputWithLabel>
      <button type="submit" className={styles.addButton}>
      Add <i className="fas fa-plus-circle"></i>
      </button>
    </form>
  );
};

AddTodoForm.propTypes = {
  onAddTodo: PropTypes.func,
};

export default AddTodoForm;

import React, { useState, useEffect } from 'react';
import PropTypes from "prop-types";
import AddTodoForm from './AddTodoForm';
import TodoList from './TodoList';
import { v4 as uuidv4 } from 'uuid';


const MyListContainer = ({ listTableName }) => {
  const [todoList, setTodoList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch(`https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/${encodeURIComponent(listTableName)}`, {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`,
        },
      }).then((response) => response.json());

      setTodoList(result.records);
    };

    fetchData();
  }, [listTableName]);

  useEffect(() => {
    if (listTableName === "General") {
      localStorage.setItem('savedGeneralList', JSON.stringify(todoList));
    }
  }, [todoList, listTableName]);

  useEffect(() => {
    if (listTableName === "General") {
      const savedGeneralList = JSON.parse(localStorage.getItem('savedGeneralList'));
      if (savedGeneralList) {
        setTodoList(savedGeneralList);
      }
    }
  }, [listTableName]);

  const addTodo = (newTodo) => {
    const data = {
      fields: {
        id: uuidv4(),
        Title: newTodo.title,
        Description: newTodo.description,
      },
    };
    
    // Add the newTodo to the current section
    addListItem(newTodo, listTableName);
    
    // If the current section is not General, add the newTodo to General
    if (listTableName !== "General") {
      addListItem(newTodo, "General");
    }
  }

  const addListItem = (newTodo, section) => {
    fetch(`https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/${encodeURIComponent(section)}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTodo),
    })
      .then((response) => response.json())
      .then((result) => {
        // If the section is General or the todoList state is empty, add the newTodo to todoList state
        if (section === "General" || todoList.length === 0) {
          setTodoList([...todoList, result]);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const removeTodo = (id) => {
    // Make a DELETE request to Airtable API
    fetch(`https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/${encodeURIComponent(listTableName)}/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          // Filter the todoList array to remove the deleted todo
          const newTodoList = todoList.filter(
            (todo) => todo.id !== id
          );
          setTodoList(newTodoList);
        } else {
          throw new Error('Failed to delete ToDo from Airtable');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }
  
  return (
    <div>
      <h1>{listTableName} List </h1>

      <AddTodoForm onAddTodo={addTodo} />

<TodoList
  todoList={todoList}
  onRemoveTodo={removeTodo}
/>
</div>
);
}

MyListContainer.propTypes = {
listTableName: PropTypes.string,
};

export default MyListContainer;

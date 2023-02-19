import React, { useState, useEffect } from 'react';
import PropTypes from "prop-types";
import AddTodoForm from './AddTodoForm';
import TodoList from './TodoList';
import { v4 as uuidv4 } from 'uuid';


const MyListContainer = ({ listTableName }) => {
  const [todoList, setTodoList] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");
  const [sortField, setSortField] = useState("Title");

  useEffect(() => {
    const fetchData = async () => {
      const sortDirection = sortOrder === "asc" ? "asc" : "desc";
      const result = await fetch(`https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/${encodeURIComponent(listTableName)}?view=Grid%20view&sort[0][field]=${sortField}&sort[0][direction]=${sortDirection}`, {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`,
        },
      }).then((response) => response.json())
        .then((data) => {
          console.log("data:", data);
          // Sort the records by the selected field with a custom callback function
          data.records.sort((objectA, objectB) => {
            if (sortOrder === "asc") {
              if (objectA.fields[sortField] < objectB.fields[sortField]) {
                return -1;
              }
              if (objectA.fields[sortField] > objectB.fields[sortField]) {
                return 1;
              }
            } else {
              if (objectA.fields[sortField] < objectB.fields[sortField]) {
                return 1;
              }
              if (objectA.fields[sortField] > objectB.fields[sortField]) {
                return -1;
              }
            }
            return 0;
          });
    
          // Set the sorted records to the todoList state
          setTodoList(data.records);
        });
    };
    

  fetchData();
}, [listTableName, sortOrder, sortField]);

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
  <button onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}>
    {sortOrder === "asc" ? "Sort Z-A" : "Sort A-Z"}
  </button>
  <button onClick={() => setSortField("createdTime")}>
    Sort by createdTime
  </button>

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

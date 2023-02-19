import React, { useState, useEffect } from 'react';
import PropTypes from "prop-types";
import AddTodoForm from './AddTodoForm';
import TodoList from './TodoList';


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
        // If the section is General, add the newTodo to todoList state
        if (section === "General") {
          setTodoList([...todoList, result]);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

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
    
          // Remove the deleted todo from General list
          removeListItem(id, "General");
    
          // Remove the deleted todo from other lists
          const sections = ["My Work", "My Home", "My Classes"];
          sections.forEach((section) => {
            if (section !== listTableName) {
              removeListItem(id, section);
            }
          });
        } else {
          throw new Error('Failed to delete ToDo from Airtable');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };
  
  const removeListItem = (id, section) => {
    console.log(`Removing todo with id ${id} from ${section} section`);
  
    const generalSection = "General";

    // Make a GET request to Airtable API to get the record id in the General section
    fetch(`https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/${generalSection}?filterByFormula={Record ID}="${id}"`, {
      headers: {
        'Authorization': `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`,
      },
    })
      .then((response) => response.json())
      .then((result) => {
        if (result && result.records && result.records.length > 0) {
          // If the record exists, make a DELETE request to Airtable API to remove it
          // from both the current section and the General section
          const recordId = result.records[0].id;
          const requests = [
            fetch(`https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/${encodeURIComponent(section)}/${recordId}`, {
              method: 'DELETE',
              headers: {
                'Authorization': `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`,
              },
            }),
            fetch(`https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/${generalSection}/${recordId}`, {
              method: 'DELETE',
              headers: {
                'Authorization': `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`,
              },
            }),
          ];

          Promise.all(requests)
            .then((responses) => {
              const deleteSuccess = responses.every((response) => response.ok);
              if (deleteSuccess) {
                console.log(`Removed todo ${id} from ${section} and ${generalSection} section`);
              } else {
                throw new Error(`Failed to delete todo ${id} from ${section} or ${generalSection} section`);
              }
            })
            .then(() => {
              // If the section is General, update the todoList state
              if (section === "General") {
                const newTodoList = todoList.filter((todo) => todo.id !== id);
                setTodoList(newTodoList);
              }
            })
            .catch((error) => {
              console.error('Error:', error);
            });
        } else {
          // If the record doesn't exist in the General section, only delete the record from the current section
          fetch(`https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/${encodeURIComponent(section)}/${id}`, {
            method: 'DELETE',
            headers: {
              'Authorization': `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`,
            },
          })
            .then((response) => {
              if (response.ok) {
                console.log(`Removed todo ${id} from ${section} section`);
              } else {
                throw new Error(`Failed to delete todo ${id} from ${section} section`);
              }
            })
            .then(() => {
              // If the section is General, update the todoList state
              if (section === "General") {
                const newTodoList = todoList.filter((todo) => todo.id !== id);
                setTodoList(newTodoList);
              }
            })
            .catch((error) => {
              console.error('Error:', error);
            });
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };
  
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

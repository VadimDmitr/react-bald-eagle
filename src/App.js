import React from 'react';
import TodoList from "./TodoList";
import AddTodoForm from "./AddTodoForm";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const App = () => {

  const [todoList, setTodoList] = React.useState([null]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    fetch(`https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/Default`, {
      headers: { Authorization : `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`,
      }
    })
    /*new Promise((resolve, reject) =>
    setTimeout(
      () => resolve({ data: { todoList: JSON.parse(localStorage.getItem('savedTodoList')) } }),
      2000
    ))*/
    .then((response) => response.json())
    .then((result) => {
      setTodoList(result.records || []);
      setIsLoading(false);
    });
      //reject({ data: { todoList: initialStories } })
  }, []);

  React.useEffect(() => {
    if (isLoading === false) {

      localStorage.setItem('savedTodoList', JSON.stringify(todoList));
    }
    }, [todoList, isLoading]);
  


    const removeTodo = (id) => {
      // Make a DELETE request to Airtable API
      fetch(`https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/Default/${id}`, {
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

  function addTodo(newTodo) {
    const data = {
      "fields": {
        "Title": newTodo.title,
        "Description": newTodo.description,
        "Due Date": newTodo.dueDate,
        "Status": newTodo.status
      }
    }

    // Make a POST request to Airtable API
    fetch(`https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/Default`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((result) => {
        setTodoList([...todoList, result]);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }
  
     return (
      <BrowserRouter>
              <Routes>
                <Route exact path="/" element={
                  <div>
                    <h1>Todo List: </h1>
                    <AddTodoForm onAddTodo={addTodo} />
                      {isLoading ? (
                        <p>Loading ...</p>
                        ) : (
                          <TodoList todoList={todoList} onRemoveTodo={removeTodo} />
                          )}
                  </div>
                } />
                <Route path="/new" element={
                  <div>
                    <h1>New Todo List: </h1>
                  </div>
                } />
              </Routes>
          </BrowserRouter>
    );
}

export default App;
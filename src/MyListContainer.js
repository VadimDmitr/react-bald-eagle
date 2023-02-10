import React from 'react';
import InputWithLabel from './InputWithLabel';
import style from './TodoListItem.module.css';
import AddTodoForm from './AddTodoForm';
import TodoList from './TodoList';

const MyListContainer = ({ listTableName }) => {

  const [todoTitle, setTodoTitle] = React.useState('');
  const [todoList, setTodoList] = React.useState([null]);

  const handleTitleChange = (event) => {
    const newTodoTitle = event.target.value;
    setTodoTitle(newTodoTitle);
  }

  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {

    fetch(`https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/${encodeURIComponent(listTableName)}`, {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`,
      }
    })
      .then((response) => response.json())
      .then((result) => {
        setTodoList(result.records || []);
        setIsLoading(false);
      });
  }, [listTableName]);

  React.useEffect(() => {
    if (isLoading === false) {
      localStorage.setItem('savedTodoList', JSON.stringify(todoList));
    }
  }, [todoList, isLoading]);

  const handleAddTodo = (event) => {
    event.preventDefault();
    console.log(todoTitle);
    addTodo({ title: todoTitle, id: Date.now() });
    setTodoTitle('');
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
    addListItem(newTodo);
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
        } else {
          throw new Error('Failed to delete ToDo from Airtable');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  // Make a POST request to Airtable API
  const addListItem = (listItemData) => {
    fetch(`https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/${encodeURIComponent(listTableName)}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(listItemData),
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
    // <div className={styles.todoContainer}>
    <div>
    <h1>{listTableName} List </h1>

    <AddTodoForm onAddTodo={addTodo} />

    {isLoading ? (
      <p>Loading...</p>
    ) : (
      <TodoList
        todoList={todoList}
        //onChange={updateTodo}
        onRemoveTodo={removeTodo}
        //onComplete={handleToggleComplete}
       // sortByTitle={sortByTitle}
      />
    )}
    </div>
  );
}

export default MyListContainer;
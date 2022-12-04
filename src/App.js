import React from 'react';
import TodoList from "./TodoList";
import AddTodoForm from "./AddTodoForm";

const useSemiPersistentState = (initialState) => {
  const [todoList, setTodoList] = React.useState(
    JSON.parse(localStorage.getItem('savedTodoList')) || initialState
  );

  React.useEffect(() => {
    localStorage.setItem('savedTodoList', JSON.stringify(todoList));
  }, [todoList]);

  return [todoList, setTodoList];
};

const App = () => {
  
  const [todoList, setTodoList] = useSemiPersistentState ();

  const removeTodo = (task) => {
    const newTodoList = todoList.filter(
      (todoTask) => task.todoItemID !== todoTask.todoItemID
    );
    setTodoList(newTodoList);
  };

  function addTodo(newTodo) {

    setTodoList([...todoList, newTodo]);

  }
    
    return (
    <>
      <h1>Todo List: </h1>
      <AddTodoForm onAddTodo={addTodo} />
      <TodoList todoList={todoList} onRemoveTodo={removeTodo} />
    </>
    );
}
 
export default App;
import React from 'react';
function App() {
  const todoList = [
    { id: 1, title: "Read lesson" },
    { id: 2, title: "Exercises" },
    { id: 3, title: "Complete assigment" },
  ];

  return (
   <div className="App">
     <h1>Todo List</h1>
     <ul>
     {todoList.map(function (item) {
        return <li key={item.id}>{item.title}</li>;
         })}
     </ul>
  </div>
    );
  }
export default App;
  
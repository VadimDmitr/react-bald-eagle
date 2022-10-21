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
  //      return <li key={item.id}>{item.title}</li>;

//Inside the JavaScript expression, map over your todoList array
//For each Object in the Array, return a list item (<li>) with the following:
//key attribute with value of id property
//inner text content with value of title property
//<ul>
 //         {todoList.map(function (item) {
 //           return <li>{item.title}</li>;
 //       })}
//
 //      </ul>

   //    return (
   // <div style={{ textAlign: "center" }}>
   //   <h1>Todo List</h1>
   //   <ul>
   //     {todoList.map(function (item) {
    //      return <li key={item.id}>{item.title}</li>;
     //   })}
     // </ul>
    //</div> 
import React from 'react';
import ControlPanel from './ControlPanel';
import TodoList from "./TodoList";
import Header from './Header';
import Footer from "./Footer";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MyListContainer from './MyListContainer';
import styles from "./TodoListItem.module.css";


const App = () => {

  return (
    <div>
      <BrowserRouter>
        <Header />
        <div className={styles.container}>
        <Routes>
          <Route exact path="/" element={
            <>
              <MyListContainer listTableName = "General"/>
            </>
          } />
          <Route path="/My Home" element={
            <>
              <MyListContainer listTableName= "My Home"/>
            </>
          } />
          <Route path="/My Classes" element={
            <>
              <MyListContainer listTableName= "My Classes"/>
            </>
          } />
          <Route path="/My Work" element={
            <>
              <MyListContainer listTableName= "My Work"/>
            </>
          } />
        </Routes>
        <div>
          <ControlPanel className={styles.panel}/>
        </div>
          <Footer />
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
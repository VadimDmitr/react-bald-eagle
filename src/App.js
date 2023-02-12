import React from 'react';
import ControlPanel from './components/ControlPanel';
import TodoList from "./components/TodoList";
import Header from './components/Header';
import Footer from "./components/Footer";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MyListContainer from './components/MyListContainer';
import styles from "./components/TodoListItem.module.css";



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
        <section className={styles.Panel}>
          <ControlPanel />
        </section>
          <Footer />
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
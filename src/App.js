import React from 'react';
import ControlPanel from './components/ControlPanel';
//import TodoList from "./components/TodoList";
import Header from './components/Header';
import Footer from "./components/Footer";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TodoContainer from './components/TodoContainer';
import styles from "./components/TodoListItem.module.css";
import '@fortawesome/fontawesome-free/css/all.css';


const App = () => {

  return (
    <div>
      <BrowserRouter>
        <Header />
        <div className={styles.container}>
        <Routes>
          <Route exact path="/" element={
            <>
              <TodoContainer listTableName = "General"/>
            </>
          } />
          <Route path="/My Home" element={
            <>
              <TodoContainer listTableName= "My Home"/>
            </>
          } />
          <Route path="/My Classes" element={
            <>
              <TodoContainer listTableName= "My Classes"/>
            </>
          } />
          <Route path="/My Work" element={
            <>
              <TodoContainer listTableName= "My Work"/>
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
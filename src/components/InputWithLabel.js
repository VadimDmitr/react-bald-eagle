import React from 'react';
import TodoListItem from './TodoListItem';
import style from './TodoListItem.module.css';
import PropTypes from "prop-types";


const InputWithLabel = ({
  id,
  value,
  type = 'type',
  name = 'title',
  onChange,
  children,
}) => {
  const inputRef = React.useRef();

  React.useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <>
      <label htmlFor={id} className={style.label}>{children}</label>
      &nbsp;
      <input 
        id={id} 
        type = {type} 
        name = {name} 
        value={value}
        onChange={onChange} 
        ref ={inputRef}
        className={style.input}
        placeholder="Add New ToDo"
      />
    </>
);
  };

  InputWithLabel.propTypes = {
    children: PropTypes.string,
    todoTitle: PropTypes.string,
    handleTitleChange: PropTypes.func,
};

export default InputWithLabel;
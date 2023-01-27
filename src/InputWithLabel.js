import React from 'react';
import TodoListItem from './TodoListItem';
import style from './TodoListItem.module.css';

const InputWithLabel = ({
  id,
  value,
  type = 'type',
  name = 'title',
  onInputChange,
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
        onChange={onInputChange} 
        ref ={inputRef}
        className={style.input}
        placeholder="Enter ToDo item"
      />
    </>
);
  };

export default InputWithLabel;
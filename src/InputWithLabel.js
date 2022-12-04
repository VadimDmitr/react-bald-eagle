import React from 'react';
import TodoListItem from './TodoListItem';

const InputWithLabel = ({
  todoItemID,
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
      <label htmlFor={todoItemID}>{children}</label>
      &nbsp;
      <input 
        todoItemID={todoItemID} 
        type = {type} 
        name = {name} 
        onChange={onInputChange} 
        ref ={inputRef}
      />
    </>
);
  };

export default InputWithLabel;
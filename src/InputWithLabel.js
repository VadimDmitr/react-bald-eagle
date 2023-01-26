import React from 'react';
import TodoListItem from './TodoListItem';

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
      <label htmlFor={id}>{children}</label>
      &nbsp;
      <input 
        id={id} 
        type = {type} 
        name = {name} 
        value={value}
        onChange={onInputChange} 
        ref ={inputRef}
      />
    </>
);
  };

export default InputWithLabel;
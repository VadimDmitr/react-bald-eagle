import React from 'react';
//import TodoListItem from './TodoListItem';
import styles from './TodoListItem.module.css';
import PropTypes from "prop-types";

const InputWithLabel = ({
  id,
  value,
  type = 'type',
  name = 'title',
  onChange,
  children,
  placeholder
}) => {
  const inputRef = React.useRef();

  React.useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <>
      <label htmlFor={id} className={styles.label}>{children}</label>
      &nbsp;
      <input 
        id={id} 
        type = {type} 
        name = {name} 
        value={value}
        onChange={onChange} 
        ref ={inputRef}
        className={styles.input}
        placeholder={placeholder}
      />
    </>
);
  };

  InputWithLabel.propTypes = {
    children: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.object]),
    todoTitle: PropTypes.string,
    handleTitleChange: PropTypes.func,
};

export default InputWithLabel;
import React from 'react';
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
    id: PropTypes.string,
    value: PropTypes.node,
    type: PropTypes.string,
    onChange: PropTypes.func,
    name: PropTypes.string,
    placeholder: PropTypes.string,
};

export default InputWithLabel;
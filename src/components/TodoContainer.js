import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import AddTodoForm from "./AddTodoForm";
import TodoList from "./TodoList";
import { v4 as uuidv4 } from "uuid";
import styles from "./TodoListItem.module.css";
import '@fortawesome/fontawesome-free/css/all.css';


const TodoContainer = ({ listTableName }) => {
  const [todoList, setTodoList] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");
  const [sortField, setSortField] = useState("Title");
  const [isLoading, setIsLoading] = useState(true);

  const handleSortClick = () => {
    if (sortField !== "Title") {
      setSortField("Title");
      setSortOrder("asc");
      sortTodoListByTitle(todoList, "asc");
    } else {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
      sortTodoListByTitle(todoList, sortOrder);
    }
  };
  
  const sortTodoListByTitle = (list, order) => {
    return list.sort((a, b) => {
      const titleA = a.fields.Title.toUpperCase();
      const titleB = b.fields.Title.toUpperCase();
      if (titleA < titleB) {
        return order === "asc" ? -1 : 1;
      }
      if (titleA > titleB) {
        return order === "asc" ? 1 : -1;
      }
      return 0;
    });
  };
  
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const result = await fetch(
        `https://api.airtable.com/v0/${
          process.env.REACT_APP_AIRTABLE_BASE_ID
        }/${encodeURIComponent(
          listTableName
        )}?view=Grid%20view&sort%5B0%5D%5Bfield%5D=${sortField}&sort%5B0%5D%5Bdirection%5D=${sortOrder}`,
        {
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`,
          },
        }
      )
        .then((response) => response.json())
        .then((data) => {
          sortTodoListByTitle(data.records, sortOrder);
          data.records.sort((a, b) => {
            let fieldA = a.fields[sortField];
            let fieldB = b.fields[sortField];
            if (sortField === "Title") {
              fieldA = fieldA.toUpperCase();
              fieldB = fieldB.toUpperCase();
            }
            if (fieldA < fieldB) {
              return sortOrder === "asc" ? -1 : 1;
            }
            if (fieldA > fieldB) {
              return sortOrder === "asc" ? 1 : -1;
            }
            if (a.fields.createdTime < b.fields.createdTime) {
              return sortOrder === "asc" ? -1 : 1;
            }
            if (a.fields.createdTime > b.fields.createdTime) {
              return sortOrder === "asc" ? 1 : -1;
            }
            return 0;
          });
          
          setTimeout(() => {
            setTodoList(data.records);
            setIsLoading(false);
          }, 300); // 
        });
    };
    fetchData();
  }, [listTableName, sortOrder, sortField]);
  

  useEffect(() => {
    if (listTableName === "General") {
      localStorage.setItem("savedGeneralList", JSON.stringify(todoList));
    }
  }, [todoList, listTableName]);

  useEffect(() => {
    if (listTableName === "General") {
      const savedGeneralList = JSON.parse(
        localStorage.getItem("savedGeneralList")
      );
      if (savedGeneralList) {
        setTodoList(savedGeneralList);
      }
    }
  }, [listTableName]);

  const addTodo = (newTodo) => {
    const data = {
      fields: {
        id: uuidv4(),
        Title: newTodo.title,
        Description: newTodo.description,
        createdTime: newTodo.createdTime,
      },
    };

    // Add the newTodo to the current section
    addListItem(newTodo, listTableName);

    // If the current section is not General, add the newTodo to General
    if (listTableName !== "General") {
      addListItem(newTodo, "General");
    }
  };

  const addListItem = (newTodo, section) => {
    fetch(
      `https://api.airtable.com/v0/${
        process.env.REACT_APP_AIRTABLE_BASE_ID
      }/${encodeURIComponent(section)}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTodo),
      }
    )
      .then((response) => response.json())
      .then((result) => {
        // If the section is General or the todoList state is empty, add the newTodo to todoList state
        if (section === "General" || todoList.length === 0) {
          setTodoList([...todoList, result]);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const removeTodo = (id) => {
    // Make a DELETE request to Airtable API
    fetch(
      `https://api.airtable.com/v0/${
        process.env.REACT_APP_AIRTABLE_BASE_ID
      }/${encodeURIComponent(listTableName)}/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`,
        },
      }
    )
      .then((response) => {
        if (response.ok) {
          // Filter the todoList array to remove the deleted todo
          const newTodoList = todoList.filter((todo) => todo.id !== id);
          setTodoList(newTodoList);
          // Check if the table name is not General and delete the record from the corresponding table
          if (listTableName !== "General") {
            const tableName =
              listTableName === "My Work" ? "Work" : listTableName;
            fetch(
              `https://api.airtable.com/v0/${
                process.env.REACT_APP_AIRTABLE_BASE_ID
              }/${encodeURIComponent(tableName)}/${id}`,
              {
                method: "DELETE",
                headers: {
                  Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`,
                },
              }
            )
              .then((response) => {
                if (!response.ok) {
                  throw new Error(
                    `Failed to delete ToDo from ${tableName} table`
                  );
                }
              })
              .catch((error) => {
                console.error("Error:", error);
              });
          }
          // Call the function to delete records from all tables by createdTime
          const deletedRecord = todoList.find((todo) => todo.id === id);
          deleteRecordsByCreatedTime(deletedRecord.fields.createdTime);
        } else {
          throw new Error("Failed to delete ToDo from Airtable");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const deleteRecordsByCreatedTime = (createdTime) => {
    // Define the table names
    const tableNames = ["General", "My Work", "My Classes", "My Home"];

    // Loop through the table names and make a GET request to fetch the records with the specified createdTime
    tableNames.forEach((tableName) => {
      fetch(
        `https://api.airtable.com/v0/${
          process.env.REACT_APP_AIRTABLE_BASE_ID
        }/${encodeURIComponent(
          tableName
        )}?filterByFormula={createdTime}='${createdTime}'&fields%5B%5D=createdTime`,
        {
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`,
          },
        }
      )
        .then((response) => response.json())
        .then((data) => {
          // Loop through the records and make a DELETE request to delete them
          data.records.forEach((record) => {
            fetch(
              `https://api.airtable.com/v0/${
                process.env.REACT_APP_AIRTABLE_BASE_ID
              }/${encodeURIComponent(tableName)}/${record.id}`,
              {
                method: "DELETE",
                headers: {
                  Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`,
                },
              }
            )
              .then((response) => {
                if (!response.ok) {
                  throw new Error(
                    `Failed to delete record from ${tableName} table`
                  );
                }
              })
              .catch((error) => {
                console.error("Error:", error);
              });
          });
        });
    });
  };

  return (
    <div>
      <h1><i className="fas fa-tasks" aria-label="Tasks"></i> {` ${listTableName}`} List</h1>
      <AddTodoForm onAddTodo={addTodo} />   
      <div>
      <button className={styles.sortByAlph} onClick={handleSortClick}>
        {sortField === "Title"
        ? sortOrder === "asc"
        ? "Sort Z-A \u2193"
        : "Sort A-Z \u2191"
        : <>Sort by Title <i className="fas fa-sort-alpha-up" aria-label="Sort by Title"></i></>}
      </button>

      <button
      className={styles.sortByTime}
      onClick={() => {
      setSortField("createdTime");
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    }}
      >
      {sortField === "createdTime"
      ? sortOrder === "asc"
        ? "Sort by Time \u2193"
        : "Sort by Time \u2191"
      : "Sort by Time"}{" "}
      <i className="fas fa-clock" aria-label="Sort by Time"></i>
      </button>
      </div>
      {isLoading ? <div>Wait, Wait, please, it's Loading </div> : <TodoList todoList={todoList} onRemoveTodo={removeTodo} />}
      </div>
  );
};

TodoContainer.propTypes = {
  listTableName: PropTypes.string,
};

export default TodoContainer;
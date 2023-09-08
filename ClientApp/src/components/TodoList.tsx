import { useState } from 'react';

import fetchData from '../api/fetchData';
import TodoItem from './TodoItem';
import TodoForm from './TodoForm';
import type { Todo } from '../types/Todo';
import styles from './TodoList.module.css';

const data = fetchData('/api/TodoItems');

export default function TodoList() {
  const todos = data.read() || [];
  const [showForm, setShowForm] = useState(false);

  const handleNewTodoClick = () => {
    setShowForm(true);
  };

  const handleFormClose = (todo?: Todo) => {
    todo && todos.unshift(todo);
    setShowForm(false);
  };

  return (
    <div className={styles.todoList}>
      <h1>Todo List</h1>
      {showForm ? 
        <TodoForm onClose={handleFormClose} /> : 
        <>
          <label className={styles.addLabel}>Add a new todo:</label>
          <button className={styles.addButton} onClick={handleNewTodoClick}>+</button>
        </>
        }  
      {todos.map((todo: Todo) => (
        <TodoItem key={todo.id} todoData={todo} />
      ))}
    </div>
  );
}

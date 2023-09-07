import { useState } from 'react';

import fetchData from '../api/fetchData';
import TodoItem from './TodoItem';
import TodoForm from './TodoForm';
import type { Todo } from '../types/Todo';

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
    <div>
      {showForm ? 
        <TodoForm onClose={handleFormClose} /> : 
        <button onClick={handleNewTodoClick}>+</button>
        }  
      {todos.map((todo: Todo) => (
        <TodoItem key={todo.id} todoData={todo} />
      ))}
    </div>
  );
}

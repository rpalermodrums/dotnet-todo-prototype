import { useState } from 'react';
import { format } from 'date-fns';

import { Todo } from '../types/Todo';
import TodoForm from './TodoForm';
import styles from './TodoItem.module.css';

interface IProps {
  todoData: Todo;
}

export default function TodoItem ({todoData}: IProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [todo, setTodo] = useState(todoData);

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  function onClose (todo?: Todo): void  {
    if (todo) setTodo(todo);
    setIsEditing(false);
  };

  return (
    <div className={styles.todoItem}>
      {isEditing ? (
        <TodoForm initialTodo={todo} onClose={onClose} />
      ) : (
        <>
          {todo.name} - {todo.isComplete ? 'Completed' : 'Pending'}{todo.dueDate && ` - Due: ${format(todo.dueDate, 'MMM d, yyyy')}`}
          <button onClick={handleEditClick}>🖉</button>
        </>
      )}
    </div>
  );
}

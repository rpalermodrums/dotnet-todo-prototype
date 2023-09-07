import { Todo } from '../types/Todo';
import { useState } from 'react';
import TodoForm from './TodoForm';

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
    <div key={todo.id}>
      {isEditing ? (
        <TodoForm initialTodo={todo} onClose={onClose} />
      ) : (
        <>
          {todo.name} - {todo.isComplete ? 'Completed' : 'Pending'}
          <button onClick={handleEditClick}>🖉</button>
        </>
      )}
    </div>
  );
}

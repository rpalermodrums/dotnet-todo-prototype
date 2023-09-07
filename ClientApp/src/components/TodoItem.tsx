import { Todo } from '../types/Todo';
import { useState } from 'react';
import TodoForm from './TodoForm';

interface IProps {
  todo: Todo;
}

export default function TodoItem ({todo}: IProps) {
  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  return (
    <div key={todo.id}>
      {isEditing ? (
        <TodoForm initialTodo={todo} />
      ) : (
        <>
          {todo.name} - {todo.completed ? 'Completed' : 'Pending'}
          <button onClick={handleEditClick}>🖉</button>
        </>
      )}
    </div>
  );
}

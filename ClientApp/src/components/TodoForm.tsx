import { useState } from 'react';

import { Todo } from '../types/Todo';

interface IProps {
  initialTodo?: Todo;
  onClose?: (todo?: Todo) => void;
}

export default function TodoForm({ initialTodo, onClose }: IProps) {
  const [name, setName] = useState(initialTodo?.name ?? '');
  const [isComplete, setCompleted] = useState(initialTodo?.isComplete ?? false);
  const [id, setId] = useState(initialTodo?.id ?? null);
  const todo = { name, isComplete };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const requestValues = {
      url: id ? `/api/TodoItems/${id}` : '/api/TodoItems',
      options: {
        method: id ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(id ? { ...todo, id } : todo),
      },
    };

    fetch(requestValues.url, requestValues.options).then(async (response) => {
      if (response.ok) {
        const responseData: Todo = await response.json();
        if (onClose) {
          onClose({...todo, ...responseData});
        }
        else {
          setName('');
          setCompleted(false);
          setId(null);
        }
      }
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </label>
      <label>
        Completed:
        <input type="checkbox" checked={isComplete} onChange={(e) => setCompleted(e.target.checked)} />
      </label>
      <input type="submit" value={id ? 'Update' : 'Submit'} />
      {onClose && <button onClick={() => onClose()}>Close</button>}
    </form>
  );
}

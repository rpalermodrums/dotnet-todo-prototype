import { useState } from 'react';

import fetchData from '../api/fetchData';
import { Todo } from '../types/Todo';

export default function TodoForm({ initialTodo }: { initialTodo?: Todo }) {
  const [name, setName] = useState(initialTodo?.name ?? '');
  const [completed, setCompleted] = useState(initialTodo?.completed ?? false);
  const [id, setId] = useState(initialTodo?.id ?? null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const todo = {
      name,
      completed,
    };

    if (id) {
      const data = fetchData(`/api/TodoItems/${id}`, {
        method: 'PUT',
        body: JSON.stringify(todo),
      });

      const response = await data.read();

      if (response) {
        setName('');
        setCompleted(false);
        setId(null);
      }
    } else {
      const data = fetchData('/api/TodoItems', {
        method: 'POST',
        body: JSON.stringify(todo),
      });

      const response = await data.read();

      if (response) {
        setName('');
        setCompleted(false);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </label>
      <label>
        Completed:
        <input type="checkbox" checked={completed} onChange={(e) => setCompleted(e.target.checked)} />
      </label>
      <input type="submit" value={id ? 'Update' : 'Submit'} />
    </form>
  );
}

import { useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { Todo } from '../types/Todo';
import styles from './TodoForm.module.css';

interface IProps {
  initialTodo?: Todo;
  onClose?: (todo?: Todo) => void;
}

export default function TodoForm({ initialTodo, onClose }: IProps) {
  const [name, setName] = useState(initialTodo?.name ?? '');
  const [isComplete, setCompleted] = useState(initialTodo?.isComplete ?? false);
  const [id, setId] = useState(initialTodo?.id ?? null);
  const [dueDate, setDueDate] = useState(initialTodo?.dueDate);
  const todo = { name, isComplete, dueDate };

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
          setDueDate(new Date());
        }
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className={styles.todoForm}>
      <label>
        Name:
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </label>
      <label>
        Due Date:
        <DatePicker selected={dueDate} onChange={(date: Date) => setDueDate(date)} />
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

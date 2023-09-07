import fetchData from '../api/fetchData';
import TodoItem from './TodoItem';
import type { Todo } from '../types/Todo';

const data = fetchData('/api/TodoItems');

export default function TodoList() {
  const todos = data.read() || [];


  return (
    <div>
      {todos.map((todo: Todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </div>
  );
}

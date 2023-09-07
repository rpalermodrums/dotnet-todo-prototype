import { useState, useEffect } from 'react';

interface ITodo {
    id: number;
    title: string;
    completed: boolean;
}

export default function TodoList() {
    const [todos, setTodos] = useState<ITodo[]>([]);

    useEffect(() => {
        fetch('/api/Todos')
            .then(response => response.json())
            .then(data => setTodos(data));
    }, []);

    return (
        <div>
            {todos.map((todo) => (
                <div key={todo.id}>
                    {todo.title} - {todo.completed ? 'Completed' : 'Pending'}
                </div>
            ))}
        </div>
    );
}

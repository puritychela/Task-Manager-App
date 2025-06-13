import React, { useState } from 'react';
import './App.css';

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
  const [input, setInput] = useState('');

  const addTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    setTodos([...todos, { id: Date.now(), title: input.trim(), completed: false }]);
    setInput('');
  };

  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const clearCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed));
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  const itemsLeft = todos.filter(todo => !todo.completed).length;

  return (
    <div className="app">
      <h1 className="title">TODO</h1>
      <form onSubmit={addTodo} className="form">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Create a new todo..."
          className="input"
        />
      </form>

      <div className="todo-box">
        {filteredTodos.map(todo => (
          <div key={todo.id} className={`todo-item ${todo.completed ? 'done' : ''}`}>
            <label className='checkbox'>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
              />
              {todo.title}
            </label>
          </div>
        ))}

        {todos.length > 0 && (
          <div className="footer">
            <span>{itemsLeft} items left</span>
            <div className="filters">
              <button onClick={() => setFilter('all')} className={filter === 'all' ? 'active' : ''}>All</button>
              <button onClick={() => setFilter('active')} className={filter === 'active' ? 'active' : ''}>Active</button>
              <button onClick={() => setFilter('completed')} className={filter === 'completed' ? 'active' : ''}>Completed</button>
            </div>
            <button onClick={clearCompleted} className="clear">Clear Completed</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;


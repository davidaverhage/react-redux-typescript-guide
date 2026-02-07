import React, { useState, useCallback, useMemo } from 'react';

// Component props interface
interface TodoProps {
  title: string;
}

// Modern React Hooks equivalent of composed recompose HOCs
export const TodoListWithHooks: React.FC<TodoProps> = ({ title }) => {
  // State management (replaces withState)
  const [todos, setTodos] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');

  // Event handlers (replaces withHandlers)
  const onInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  }, []);

  const onAddTodo = useCallback(() => {
    if (inputValue.trim()) {
      setTodos((prevTodos) => [...prevTodos, inputValue]);
      setInputValue('');
    }
  }, [inputValue]);

  const onRemoveTodo = useCallback((index: number) => {
    setTodos((prevTodos) => prevTodos.filter((_, i) => i !== index));
  }, []);

  // Computed props (replaces withProps)
  const todoCount = useMemo(() => todos.length, [todos.length]);

  return (
    <div>
      <h2>{title}</h2>
      <p>Total todos: {todoCount}</p>
      <div>
        <input 
          type="text" 
          value={inputValue} 
          onChange={onInputChange}
          placeholder="Enter todo"
        />
        <button onClick={onAddTodo}>Add</button>
      </div>
      <ul>
        {todos.map((todo, index) => (
          <li key={index}>
            {todo}
            <button onClick={() => onRemoveTodo(index)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

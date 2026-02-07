import React from 'react';
import { withState, withHandlers, withProps, compose } from 'recompose';

// Component props interface
interface TodoProps {
  title: string;
  todos: string[];
  inputValue: string;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onAddTodo: () => void;
  onRemoveTodo: (index: number) => void;
  todoCount: number;
}

// Base component
const TodoList: React.FC<TodoProps> = ({
  title,
  todos,
  inputValue,
  onInputChange,
  onAddTodo,
  onRemoveTodo,
  todoCount,
}) => (
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

// Intermediate props with state
interface WithTodoState {
  todos: string[];
  setTodos: (todos: string[]) => void;
  inputValue: string;
  setInputValue: (value: string) => void;
}

// Enhanced component combining multiple HOCs
export const EnhancedTodoList = compose<
  TodoProps,
  { title: string }
>(
  // Add state for todos list
  withState('todos', 'setTodos', [] as string[]),
  // Add state for input value
  withState('inputValue', 'setInputValue', ''),
  // Add event handlers
  withHandlers<WithTodoState, Partial<TodoProps>>({
    onInputChange: ({ setInputValue }) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(e.target.value);
    },
    onAddTodo: ({ todos, setTodos, inputValue, setInputValue }) => () => {
      if (inputValue.trim()) {
        setTodos([...todos, inputValue]);
        setInputValue('');
      }
    },
    onRemoveTodo: ({ todos, setTodos }) => (index: number) => {
      setTodos(todos.filter((_, i) => i !== index));
    },
  }),
  // Add computed props
  withProps<{ todoCount: number }, WithTodoState>(({ todos }) => ({
    todoCount: todos.length,
  }))
)(TodoList);

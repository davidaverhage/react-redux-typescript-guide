import React, { useState, useCallback } from 'react';

// Component props interface
interface CounterProps {
  label: string;
  initialCount?: number;
}

// Modern React Hooks equivalent of recompose withState + withHandlers
export const CounterWithHooks: React.FC<CounterProps> = ({ 
  label, 
  initialCount = 0 
}) => {
  const [count, setCount] = useState(initialCount);

  // useCallback memoizes handlers (similar to withHandlers)
  const onIncrement = useCallback(() => {
    setCount((n) => n + 1);
  }, []);

  const onDecrement = useCallback(() => {
    setCount((n) => n - 1);
  }, []);

  const onReset = useCallback(() => {
    setCount(initialCount);
  }, [initialCount]);

  return (
    <div>
      <span>
        {label}: {count}
      </span>
      <button onClick={onIncrement}>+</button>
      <button onClick={onDecrement}>-</button>
      <button onClick={onReset}>Reset</button>
    </div>
  );
};

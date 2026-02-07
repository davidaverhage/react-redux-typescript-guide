import React, { useState } from 'react';

// Component props interface
interface CounterProps {
  label: string;
  initialCount?: number;
}

// Modern React Hooks equivalent of recompose withState
export const CounterWithHooks: React.FC<CounterProps> = ({ 
  label, 
  initialCount = 0 
}) => {
  const [count, setCount] = useState(initialCount);

  return (
    <div>
      <span>
        {label}: {count}
      </span>
      <button onClick={() => setCount((prev) => prev + 1)}>Increment</button>
    </div>
  );
};

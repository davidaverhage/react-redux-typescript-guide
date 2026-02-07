import React from 'react';
import { withState, compose } from 'recompose';

// Outer props (what the user passes)
interface OuterProps {
  label: string;
}

// Props with injected state
interface CounterProps extends OuterProps {
  count: number;
  setCount: (count: number | ((prev: number) => number)) => void;
}

// Base component
const Counter: React.FC<CounterProps> = ({ label, count, setCount }) => (
  <div>
    <span>
      {label}: {count}
    </span>
    <button onClick={() => setCount((n: number) => n + 1)}>Increment</button>
  </div>
);

// Enhanced component with state using recompose
export const CounterWithState = compose<CounterProps, OuterProps>(
  withState('count', 'setCount', 0)
)(Counter);

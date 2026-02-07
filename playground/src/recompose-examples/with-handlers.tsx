import React from 'react';
import { withState, withHandlers, compose } from 'recompose';

// Outer props (what the user passes)
interface OuterProps {
  label: string;
  initialCount?: number;
}

// Component props interface with all injected props
interface CounterProps extends OuterProps {
  count: number;
  onIncrement: () => void;
  onDecrement: () => void;
  onReset: () => void;
}

// Base component
const Counter: React.FC<CounterProps> = ({ 
  label, 
  count, 
  onIncrement, 
  onDecrement, 
  onReset 
}) => (
  <div>
    <span>
      {label}: {count}
    </span>
    <button onClick={onIncrement}>+</button>
    <button onClick={onDecrement}>-</button>
    <button onClick={onReset}>Reset</button>
  </div>
);

// Props that include state
interface WithCounterState extends OuterProps {
  count: number;
  setCount: (count: number | ((prevCount: number) => number)) => void;
}

// Enhanced component with state and handlers
export const CounterWithHandlers = compose<CounterProps, OuterProps>(
  withState('count', 'setCount', (props: OuterProps) => props.initialCount || 0),
  withHandlers<WithCounterState, Pick<CounterProps, 'onIncrement' | 'onDecrement' | 'onReset'>>({
    onIncrement: ({ setCount }: WithCounterState) => () => setCount((n: number) => n + 1),
    onDecrement: ({ setCount }: WithCounterState) => () => setCount((n: number) => n - 1),
    onReset: ({ setCount, initialCount = 0 }: WithCounterState) => () => setCount(initialCount),
  })
)(Counter);

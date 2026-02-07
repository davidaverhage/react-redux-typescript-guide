import React from 'react';
import { lifecycle, withState, compose } from 'recompose';

// Component props interface
interface DataDisplayProps {
  data: string | null;
  loading: boolean;
  error: string | null;
}

// Base component
const DataDisplay: React.FC<DataDisplayProps> = ({ data, loading, error }) => {
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  return <div>Data: {data}</div>;
};

// State interface for the enhanced component
interface WithDataState {
  data: string | null;
  loading: boolean;
  error: string | null;
  setData: (data: string | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

// Enhanced component with lifecycle hooks
export const DataDisplayWithLifecycle = compose<
  DataDisplayProps,
  { dataSource: string }
>(
  withState('data', 'setData', null),
  withState('loading', 'setLoading', true),
  withState('error', 'setError', null),
  lifecycle<WithDataState & { dataSource: string }, {}>({
    componentDidMount() {
      // Simulate async data fetch
      setTimeout(() => {
        try {
          this.props.setData(`Fetched from ${this.props.dataSource}`);
          this.props.setLoading(false);
        } catch (err) {
          this.props.setError('Failed to fetch data');
          this.props.setLoading(false);
        }
      }, 1000);
    },
    componentWillUnmount() {
      // Cleanup if needed
      console.log('Component unmounting');
    },
  })
)(DataDisplay);

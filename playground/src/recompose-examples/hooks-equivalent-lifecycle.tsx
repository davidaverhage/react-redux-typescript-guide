import React, { useState, useEffect } from 'react';

// Component props interface
interface DataDisplayProps {
  dataSource: string;
}

// Modern React Hooks equivalent of recompose lifecycle
export const DataDisplayWithHooks: React.FC<DataDisplayProps> = ({ 
  dataSource 
}) => {
  const [data, setData] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // useEffect replaces componentDidMount/componentWillUnmount
  useEffect(() => {
    // Simulate async data fetch
    const timer = setTimeout(() => {
      try {
        setData(`Fetched from ${dataSource}`);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch data');
        setLoading(false);
      }
    }, 1000);

    // Cleanup function (replaces componentWillUnmount)
    return () => {
      clearTimeout(timer);
      console.log('Component unmounting');
    };
  }, [dataSource]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  return <div>Data: {data}</div>;
};

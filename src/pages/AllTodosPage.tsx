import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import TodoList from '../components/TodoList';

const AllTodosPage: React.FC = () => {
  const { loading, error } = useSelector((state: RootState) => state.todos);
  if (loading) {
    return <p>Loading ...</p>;
  }
  if (error) {
    return <p>Error: {error}</p>;
  }

  return <TodoList />;
};

export default AllTodosPage;

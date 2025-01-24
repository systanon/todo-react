import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { fetchTodos } from '../store/todos/todosSlice';
import TodoList from '../components/TodoList';

const AllTodosPage: React.FC = () => {
  const { loading, error } = useSelector((state: RootState) => state.todos);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  if (loading) {
    return <p>Loading ...</p>;
  }
  if (error) {
    return <p>Error: {error}</p>;
  }

  return <TodoList />;
};

export default AllTodosPage;

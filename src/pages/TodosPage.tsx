import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store';
import { fetchTodos } from '../store/todos/todosSlice';
import { Outlet } from 'react-router';

const TodosPage: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);


  return <Outlet />;
};

export default TodosPage;

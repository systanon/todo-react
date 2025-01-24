import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { RootState, AppDispatch } from '../store';
import { fetchTodos } from '../store/todos/todosSlice';

import TodoItem from '../components/TodoItem';

const SingleTodoPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { todos, index, loading, error } = useSelector((state: RootState) => state.todos);

  const todo = index[Number(id)]

  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
      if (todos.length === 0) {
          dispatch(fetchTodos());
      }
  }, [dispatch, todos.length]);

  if (loading) {
      return <p>Loading...</p>;
  }

  if (error) {
      return <p>Error: {error}</p>;
  }
  
  return  todo && <TodoItem id={todo.id} title={todo.title} completed={todo.completed} isShortInfo={false}/>;

};

export default SingleTodoPage;
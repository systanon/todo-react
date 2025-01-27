import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { RootState } from '../store';

import TodoItem from '../components/TodoItem';

const SingleTodoPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { index, loading, error } = useSelector((state: RootState) => state.todos);

  const todo = index[Number(id)]


  if (loading) {
      return <p>Loading...</p>;
  }

  if (error) {
      return <p>Error: {error}</p>;
  }
  
  return  todo && <TodoItem id={todo.id} title={todo.title} completed={todo.completed} isShortInfo={false}/>;

};

export default SingleTodoPage;
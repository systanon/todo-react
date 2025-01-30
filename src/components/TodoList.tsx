import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import TodoItem from './TodoItem';

const TodoList: React.FC = () => {
    const todos = useSelector((state: RootState) => state.todos.todos);

    return (
        <ul  className='flex flex-wrap justify-center p-4 gap-4'>
            {todos.map((todo) => (
                <TodoItem
                    key={todo.id}
                    id={todo.id}
                    title={todo.title}
                    completed={todo.completed}
                    isShortInfo={true}
                />
            ))}
        </ul>
    );
};

export default TodoList;
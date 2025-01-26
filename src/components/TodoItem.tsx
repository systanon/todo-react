import React from 'react';
import { useDispatch } from 'react-redux';
import { toggleTodo } from '../store/todos/todosSlice';
import { Link } from 'react-router';

interface TodoItemProps {
    id: number;
    title: string;
    completed: boolean;
    isShortInfo: boolean
}

const TodoItem: React.FC<TodoItemProps> = ({ id, title, completed, isShortInfo }) => {
    const dispatch = useDispatch();

    const handleToggle = () => {
        dispatch(toggleTodo(id));
    };

    return (
        <li>
            <span
                style={{ textDecoration: completed ? 'line-through' : 'none' }}
                onClick={handleToggle}
            >
                {title}
            </span>
            {isShortInfo && <Link to={`/todos/${id}`}>More info</Link>}
        </li>
    );
};

export default TodoItem;
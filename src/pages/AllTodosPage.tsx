import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import TodoList from '../components/TodoList';
import FormTodo from '../components/FormTodo';
import ModalWindow from '../components/ModalWindow';

const AllTodosPage: React.FC = () => {
  const { loading, error } = useSelector((state: RootState) => state.todos);
  const modalRef = useRef();

  const handleOpenModal = async () => {
    const data = await modalRef.current.open();
    console.log('Form Data Submitted:', data);
  };

  if (loading) {
    return <p>Loading ...</p>;
  }
  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className='h-full grid grid-rows-[auto_1fr]'>
      <div>
      <button onClick={handleOpenModal} className='px-4 py-2 bg-blue-500 text-white rounded'>
        Open Modal
      </button>

      </div>
      <ModalWindow ref={modalRef} title='Form Modal' actions={false} description='Create new todo'>
        {({ close, confirm }) => <FormTodo close={close} confirm={confirm} />}
      </ModalWindow>
      <TodoList />
    </div>
  );
};

export default AllTodosPage;

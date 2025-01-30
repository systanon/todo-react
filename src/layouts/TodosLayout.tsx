import React from 'react';
import { Outlet } from 'react-router';
import Breadcrumbs from '../components/Breadcrumbs';

const TodosLayout: React.FC = () => {
  return (
    <>
      <Breadcrumbs/>
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default TodosLayout;
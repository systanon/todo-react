import React from 'react';
import { Outlet } from 'react-router';
import Breadcrumbs from '../components/Breadcrumbs';

const TodosLayout: React.FC = () => {
  return (
    <div>
      <Breadcrumbs/>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default TodosLayout;
import React from 'react';
import { Link, Outlet } from 'react-router';

const MainLayout: React.FC = () => {
  return (
    <div className='grid grid-rows-[auto_1fr_auto] h-full'>
    <header className='p-4'>
    <Link className="" to={'/todos'}>
      Go to todos page
    </Link>
    </header>
      <main>
        <Outlet />
      </main>
      <footer className='p-4 text-center'>
        <h3>This is main layout footer</h3>
      </footer>
    </div>
  );
};

export default MainLayout;
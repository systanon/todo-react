import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router';
import { Provider } from 'react-redux';
import { store } from './store';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage';
import TodosLayout from './layouts/TodosLayout';
import AllTodosPage from './pages/AllTodosPage';
import SingleTodoPage from './pages/SingleTodoPage';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          //TODO: move to config routes.ts
          //TODO: add page not found
          <Route path='/' element={<MainLayout />}>
            <Route index element={<HomePage />} />
          </Route>
          <Route path='/todo' element={<TodosLayout />}>
            <Route index element={<AllTodosPage />} />
            <Route path=':id' element={<SingleTodoPage />} />
          </Route>
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router';
import { Provider } from 'react-redux';
import { Route as _Route, routes } from './router';
import { store } from './store';
const renderRoutes = (routes: _Route[]) =>
  routes.map(({ path, layout: Layout, element, children }) => (
    <Route key={path} path={path} element={ Layout ? <Layout /> : element && React.createElement(element)}>
      {children && renderRoutes(children)}
    </Route>
  ));

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          {renderRoutes(routes)}    
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;

import React from 'react';
import { Link, useLocation } from 'react-router';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { useParams } from 'react-router';
interface BreadcrumbsItem {
  id: number;
  parentId: number | null;
  path: string;
  name: string;
  text: string;
  disabled?: boolean;
  dynamic?: boolean;
}

type Breadcrumbs = BreadcrumbsItem[];

const getAllRoutes = (id: string | undefined, text: string | undefined): Breadcrumbs => [
  { id: 0, parentId: null, path: '/', name: 'Home', text: 'Home' },
  { id: 1, parentId: 0, path: '/todos', name: 'Todos', text: 'Todos' },
  { id: 3, parentId: 1, path: `/todos/${id}`, name: 'Todo', text: text ?? '' },
];

const createBreadcrumbs = (
  currentRoute: BreadcrumbsItem | undefined,
  routes: Breadcrumbs,
): Breadcrumbs => {
  if (!currentRoute) return [];
  const parentRoute = routes.find((route) => route.id === currentRoute.parentId);
  return parentRoute ? [...createBreadcrumbs(parentRoute, routes), currentRoute] : [currentRoute];
};

const Breadcrumbs: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { index } = useSelector((state: RootState) => state.todos);
  console.log('TCL: Breadcrumbs:React.FC -> index', index);
  const location = useLocation();
  const routes = getAllRoutes(id, index[id]?.title);
  const currentRoute = routes.find((route) => route.path === location.pathname);
  const breadcrumbs = currentRoute
    ? createBreadcrumbs({ ...currentRoute, disabled: true }, routes)
    : [];

  if (breadcrumbs.length <= 1) return null;

  return (
    <ul className='app-breadcrumbs flex p-4'>
      {breadcrumbs.map(({ disabled, text, path }, index) => (
        <li key={path} className='app-breadcrumbs__item'>
          <Link
            to={path}
            className={`app-breadcrumbs__item-text ${
              disabled ? 'pointer-events-none opacity-50' : ''
            }`}
          >
            {text}
          </Link>
          {index !== breadcrumbs.length - 1 && (
            <span className='app-breadcrumbs__item-separator px-2'>/</span>
          )}
        </li>
      ))}
    </ul>
  );
};

export default Breadcrumbs;

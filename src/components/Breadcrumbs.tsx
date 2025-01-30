import React from 'react';
import { Link, useLocation } from 'react-router';

import { BreadcrumbsItem, BreadcrumbsType, useBreadcrumbs } from '../helper/breadcrumbsFactory';


const createBreadcrumbs = (
  currentRoute: BreadcrumbsItem | undefined,
  routes: BreadcrumbsType,
): BreadcrumbsType => {
  if (!currentRoute) return [];
  const parentRoute = routes.find((route) => route.id === currentRoute.parentId);
  return parentRoute ? [...createBreadcrumbs(parentRoute, routes), currentRoute] : [currentRoute];
};

const Breadcrumbs: React.FC = () => {
  const location = useLocation();
  const routes = useBreadcrumbs();
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

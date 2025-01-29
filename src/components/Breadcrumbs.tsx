import React from "react";
import { Link, useLocation } from "react-router";

interface BreadcrumbsItem {
  id: number;
  parentId: number | null;
  path: string;
  name: string;
  text: string;
  disabled?: boolean;
}

type Breadcrumbs = BreadcrumbsItem[];

const getAllRoutes = (): Breadcrumbs => [
  { id: 0, parentId: null, path: "/", name: "Home", text: "Home" },
  { id: 1, parentId: 0, path: "/todos", name: "Todos", text: "Todos" },
];

const createBreadcrumbs = (currentRoute: BreadcrumbsItem | undefined, routes: Breadcrumbs): Breadcrumbs => {
  if (!currentRoute) return [];
  const parentRoute = routes.find(route => route.id === currentRoute.parentId);
  return parentRoute ? [...createBreadcrumbs(parentRoute, routes), currentRoute] : [currentRoute];
};

const Breadcrumbs: React.FC = () => {
  const location = useLocation();
  const routes = getAllRoutes();
  const currentRoute = routes.find(route => route.path === location.pathname);
  const breadcrumbs = currentRoute ? createBreadcrumbs({ ...currentRoute, disabled: true }, routes) : [];

  if (breadcrumbs.length <= 1) return null;

  return (
    <ul className="app-breadcrumbs">
      {breadcrumbs.map(({ disabled, text, path }, index) => (
        <li key={path} className="app-breadcrumbs__item">
          <Link
            to={path}
            className={`app-breadcrumbs__item-text ${disabled ? "pointer-events-none opacity-50" : ""}`}
          >
            {text}
          </Link>
          {index !== breadcrumbs.length - 1 && <span className="app-breadcrumbs__item-separator">/</span>}
        </li>
      ))}
    </ul>
  );
};

export default Breadcrumbs;

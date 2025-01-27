import { ComponentType, LazyExoticComponent } from "react";
import MainLayout from '../layouts/MainLayout';
import TodosLayout from '../layouts/TodosLayout';
import AllTodosPage from '../pages/AllTodosPage';
import HomePage from '../pages/HomePage';
import SingleTodoPage from '../pages/SingleTodoPage';
import TodosPage from "../pages/TodosPage";


export type LayoutProps = Record<string, never>
export type ComponentProps = Record<string, never>


export interface Route {
  path: string;
  layout?: ComponentType<LayoutProps> | LazyExoticComponent<ComponentType<LayoutProps>> 
  element?: ComponentType<ComponentProps> | LazyExoticComponent<ComponentType<ComponentProps>>
  children?: Route[]; 
}

export const routes: Route[] = [
  {
    path: '/',
    layout: MainLayout,
    children: [
      {
        path: '',
        element: HomePage,
      },
    ],
  },
  {
    path: '/todos',
    layout: TodosLayout,
    children: [
      {
        path: '',
        element: TodosPage,
        children: [
          {
            path: '',
            element: AllTodosPage,
            
          },
          {
            path: ':id',
            element: SingleTodoPage,
          },
        ]
      }
    ],
  },
];

import { useParams } from 'react-router';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

export interface BreadcrumbsItem {
  id: number;
  parentId: number | null;
  path: string;
  name: string;
  text: string;
  disabled?: boolean;
}

export type BreadcrumbsType = BreadcrumbsItem[];

export const useBreadcrumbs = (): BreadcrumbsType => {
  const { id } = useParams<{ id: string }>();
  const { index } = useSelector((state: RootState) => state.todos);

  return [
    { id: 0, parentId: null, path: '/', name: 'Home', text: 'Home' },
    { id: 1, parentId: 0, path: '/todos', name: 'Todos', text: 'Todos' },
    { id: 3, parentId: 1, path: `/todos/${id}`, name: 'Todo', text: index?.[id]?.title ?? '' },
  ];
};

import { createBrowserRouter, Navigate } from 'react-router-dom';
import AppShell from './components/layout/AppShell';
import HomePage from './pages/HomePage';
import ComponentPage from './pages/ComponentPage';
import ItemPage from './pages/ItemPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppShell />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'component/:componentId', element: <ComponentPage /> },
      { path: 'item/:itemId', element: <ItemPage /> },
      { path: '*', element: <Navigate to="/" replace /> },
    ],
  },
]);

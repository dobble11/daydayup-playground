import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import VirtualScrollTest from './virtual-scroll/VirtualScrollTest';

const router = createBrowserRouter([
  {
    path: '/',
    Component: App,
  },
  {
    path: '/vs',
    Component: VirtualScrollTest,
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);

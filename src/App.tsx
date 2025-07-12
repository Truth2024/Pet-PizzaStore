import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './scss/app.scss';
//layout
import { Layout } from './Layout';
//pages
import Home from './pages/Home';

const Cart = React.lazy(() => import('./pages/Cart'));
const NotFound = React.lazy(() => import('./pages/NotFound'));

export const App = React.memo(() => {
  return (
    <React.Suspense fallback={<div>Загрузка...</div>}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </React.Suspense>
  );
});

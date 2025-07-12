import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import { store } from './app/store';
import { Provider } from 'react-redux';

const container = document.getElementById('root');

if (!container) {
  throw new Error('Контейнер с id="root" не найден');
}

const root = ReactDOM.createRoot(container);
root.render(
  <Router>
    {/* <React.StrictMode> */}
    <Provider store={store}>
      <App />
    </Provider>
    {/* </React.StrictMode> */}
  </Router>,
);

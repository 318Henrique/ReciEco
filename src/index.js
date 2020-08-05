import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import RouterPages from './RouterPages';
import { AuthProvider } from './Context/Auth';

ReactDOM.render(
  <BrowserRouter>
    <AuthProvider>
      <RouterPages/>
    </AuthProvider>
  </BrowserRouter>,
  document.getElementById('root')
);

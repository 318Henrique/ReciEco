import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import RouterPages from './RouterPages';

ReactDOM.render(
  <BrowserRouter>
    <RouterPages/>
  </BrowserRouter>,
  document.getElementById('root')
);

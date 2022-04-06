import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
import App from './App';

import './index.scss';
import 'macro-css';


ReactDOM.render(

  <React.StrictMode>
    <HashRouter basename={"react-sneakers"}>
      <App />
    </HashRouter>
  </React.StrictMode>,
  document.getElementById('root'),
);

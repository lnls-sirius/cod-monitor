import { Fragment } from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom'  
import RouterNavigator from './router';
import './style.css'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <Fragment>
    <BrowserRouter>
      <RouterNavigator />
    </BrowserRouter>
  </Fragment>
);
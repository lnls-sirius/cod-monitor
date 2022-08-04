import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux'
import {BrowserRouter} from 'react-router-dom'
import RouterNavigator from './pages';
import store from './redux/storage/store'
import './style.css'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <RouterNavigator />
    </BrowserRouter>
  </Provider>
);

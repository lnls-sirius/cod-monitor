import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import {BrowserRouter} from 'react-router-dom';
import RouterNavigator from './pages';
import { store, persistor } from './redux/storage/store';
import './style.css'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <RouterNavigator />
      </BrowserRouter>
    </PersistGate>
  </Provider>
);

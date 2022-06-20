import ReactDOM from 'react-dom';

import { createStore } from 'redux';

import { Provider } from 'react-redux';

import rootReducer from './context/reducers';

import './assets/boxicons-2.0.7/css/boxicons.min.css';
import './assets/css/grid.css';
import './assets/css/theme.css';
import './assets/css/index.css';

import Layout from './components/layout/Layout';

const store = createStore(rootReducer);

// document.title = 'Tua CRM';

ReactDOM.render(
  <Provider store={store}>
    <Layout />
  </Provider>,

  document.getElementById('root')
);

import React from 'react';
import ReactDOM from 'react-dom';
import { configureStore } from 'redux-starter-kit';
import { PRODUCTS_FEATURE_KEY, productsReducer } from '@demo/products/feature';
import App from './app/app';

/*
 * Combine reducers at the root level and pass resulting store into <App/>.
 * This way we have a chance to pass test stores into <App/> if we so desire.
 */

const store = configureStore({
  reducer: {
    [PRODUCTS_FEATURE_KEY]: productsReducer
  }
});

ReactDOM.render(
  <App store={store} />,

  document.getElementById('root')
);

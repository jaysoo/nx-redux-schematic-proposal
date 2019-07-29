import { createReducer } from 'redux-starter-kit';
import * as actions from './products.actions';
import { ProductsEntity } from './products.models';

export const PRODUCTS_FEATURE_KEY = 'products';

export interface ProductsState {
  entities: ProductsEntity[];
  loaded: boolean;
  error: any;
}

export const initialProductsState: ProductsState = {
  entities: [],
  loaded: false,
  error: null
};

export const productsReducer = createReducer(initialProductsState, {
  [actions.loadProducts.type]: state => {
    state.loaded = false;
  },
  [actions.loadProductsSuccess.type]: (
    state,
    action: actions.loadProductsSuccess
  ) => {
    state.loaded = true;
    state.entities = action.payload;
  },
  [actions.loadProductsFailure.type]: (
    state,
    action: actions.loadProductsFailure
  ) => {
    state.error = action.payload;
  }
});

import { createAction } from 'redux-starter-kit';
import { ProductsEntity } from './products.models';

export const loadProducts = createAction('products/LOAD_PRODUCTS');
export type loadProducts = ReturnType<typeof loadProducts>;

export const loadProductsSuccess = createAction<ProductsEntity[]>(
  'products/LOAD_PRODUCTS_SUCCESS'
);
export type loadProductsSuccess = ReturnType<typeof loadProductsSuccess>;

export const loadProductsFailure = createAction<any>(
  'products/LOAD_PRODUCTS_FAILURE'
);
export type loadProductsFailure = ReturnType<typeof loadProductsFailure>;

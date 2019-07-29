import { createSelector } from 'reselect';
import { PRODUCTS_FEATURE_KEY, ProductsState } from './products.reducer';

export const getProductsState = (s: any): ProductsState =>
  s[PRODUCTS_FEATURE_KEY];

export const getProductsEntities = createSelector(
  getProductsState,
  s => s.entities
);

export const getProductsLoaded = createSelector(
  getProductsState,
  s => s.loaded
);

export const getProductsError = createSelector(
  getProductsState,
  s => s.error
);

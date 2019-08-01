import { createSlice, Action, PayloadAction } from 'redux-starter-kit';
import { ThunkAction } from 'redux-thunk';
import { createSelector } from 'reselect';
import { getProducts, Product } from '@demo/products/api';

export const PRODUCTS_FEATURE_KEY = 'products';

// Change this from `any` if there is a more specific error type.
export type ProductsError = any;

export interface ProductsState {
  entities: Product[];
  loaded: boolean;
  pending: boolean;
  error: ProductsError;
}

export const initialProductsState: ProductsState = {
  entities: [],
  pending: false,
  loaded: false,
  error: null
};

export const productsSlice = createSlice({
  slice: PRODUCTS_FEATURE_KEY,
  initialState: initialProductsState as ProductsState,
  reducers: {
    getProductsStart: (state, action: PayloadAction<undefined>) => {
      state.pending = true;
      state.loaded = false;
    },
    getProductsSuccess: (state, action: PayloadAction<Product[]>) => {
      state.pending = false;
      state.loaded = true;
      state.entities = action.payload;
    },
    getProductsFailure: (state, action: PayloadAction<ProductsError>) => {
      state.pending = false;
      state.error = action.payload;
    }
  }
});

export const {
  getProductsStart,
  getProductsSuccess,
  getProductsFailure
} = productsSlice.actions;

export const getProductsState = (s: any): ProductsState =>
  s[PRODUCTS_FEATURE_KEY];

export const selectProductsLoaded = createSelector(
  getProductsState,
  s => s.loaded
);

export const selectProductsError = createSelector(
  getProductsState,
  s => s.error
);
export const selectProductsEntities = createSelector(
  getProductsState,
  selectProductsLoaded,
  (s, loaded) => (loaded ? s.entities : null)
);

export const productsReducer = productsSlice.reducer;

export const fetchProducts = (): ThunkAction<
  void,
  any,
  null,
  Action<string>
> => async dispatch => {
  try {
    dispatch(getProductsStart());
    const data = await getProducts();
    dispatch(getProductsSuccess(data));
  } catch (err) {
    dispatch(getProductsFailure(err));
  }
};

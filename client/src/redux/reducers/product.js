import { createReducer } from "@reduxjs/toolkit";

// reducer is a function which create and changes the state

export const productReducer = createReducer(
  { product: [] },
  {
    ALL_PRODUCT_REQUEST: (state, action) => {
      return {
        loading: true,
        product: [],
      };
    },
    ALL_PRODUCT_SUCCESS: (state, action) => {
      return {
        loading: false,
        product: action.payload.products,
        productCount: action.payload.productCount,
      };
    },
    ALL_PRODUCT_FAIL: (state, action) => {
      return {
        loading: false,
        error: action.payload,
      };
    },
    CLEAR_ERRORS: (state, action) => {
      return {
        ...state,
        error: null,
      };
    },
  }
);

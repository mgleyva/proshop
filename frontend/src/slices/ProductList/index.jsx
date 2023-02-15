import { createSlice } from '@reduxjs/toolkit'

const productListSlice = createSlice({
  name: 'products',
  initialState: {
    loading: false,
    products: [],
  },
  reducers: {
    productListRequest(state, action) {
      state.loading = true
      state.products = []
    },
    productListSuccess(state, action) {
      state.loading = false
      state.products = action.payload.products
      state.pages = action.payload.pages
      state.page = action.payload.page
    },
    productListFail(state, action) {
      return {
        loading: false,
        error: action.payload,
      }
    },
  },
})

export const {
  productListRequest,
  productListSuccess,
  productListFail,
} = productListSlice.actions

export default productListSlice.reducer

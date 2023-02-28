import { createSlice } from '@reduxjs/toolkit'

const productDetailsSlice = createSlice({
  name: 'product',
  initialState: {
    product: {
      reviews: [],
    },
  },
  reducers: {
    productDetailsRequest(state, action) {
      return {
        loading: true,
        ...state,
      }
    },
    productDetailsSuccess(state, action) {
      state.loading = false
      state.product = action.payload
    },
    productDetailsFail(state, action) {
      state.loading = false
      state.error = action.payload
    },
  },
})

export const {
  productDetailsRequest,
  productDetailsSuccess,
  productDetailsFail,
} = productDetailsSlice.actions

export default productDetailsSlice.reducer

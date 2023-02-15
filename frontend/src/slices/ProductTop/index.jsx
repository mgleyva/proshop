import { createSlice } from '@reduxjs/toolkit'

const productTopRatedSlice = createSlice({
  name: 'productTop',
  initialState: {
    products: [],
  },
  reducers: {
    productTopRequest(state, action) {
      state.loading = true
      state.products = []
    },
    productTopSuccess(state, action) {
      state.loading = false
      state.products = action.payload
    },
    productTopFail(state, action) {
      state.loading = false
      state.error = action.payload
    },
  },
})

export const {
  productTopRequest,
  productTopSuccess,
  productTopFail,
} = productTopRatedSlice.actions

export default productTopRatedSlice.reducer

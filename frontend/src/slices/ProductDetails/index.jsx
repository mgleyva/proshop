import { createSlice } from '@reduxjs/toolkit'

const productDetailsSlice = createSlice({
  name: 'product',
  initialState: {
    loading: false,
    product: {
      rating: 0,
      reviews: [],
    },
  },
  reducers: {
    productDetailsRequest(state, action) {
      return {
        loading: false,
        ...state,
      }
    },
    productDetailsSuccess(state, action) {
      state.loading = false
      state.product = action.payload
    },
    productDetailsFail(state, action) {
      return {
        loading: false,
        error: action.payload,
      }
    },
  },
})

export const {
  productDetailsRequest,
  productDetailsSuccess,
  productDetailsFail,
} = productDetailsSlice.actions

export default productDetailsSlice.reducer

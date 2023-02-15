import { createSlice } from '@reduxjs/toolkit'

const productReviewCreateSlice = createSlice({
  name: 'productReviewCreate',
  initialState: {},
  reducers: {
    productCreateReviewRequest(state, action) {
      state.loading = true
    },
    productCreateReviewSuccess(state, action) {
      state.loading = false
      state.success = true
    },
    productCreateReviewFail(state, action) {
      state.loading = false
      state.error = action.payload
    },
    productCreateReviewReset(state, action) {
      return {}
    },
  },
})

export const {
  productCreateReviewRequest,
  productCreateReviewSuccess,
  productCreateReviewFail,
  productCreateReviewReset,
} = productReviewCreateSlice.actions

export default productReviewCreateSlice.reducer

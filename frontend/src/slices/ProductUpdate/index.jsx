import { createSlice } from '@reduxjs/toolkit'

const productUpdateSlice = createSlice({
  name: 'productUpdate',
  initialState: {
    product: {},
  },
  reducers: {
    productUpdateRequest(state, action) {
      state.loading = true
    },
    productUpdateSuccess(state, action) {
      state.loading = false
      state.success = true
      state.product = action.payload
    },
    productUpdateFail(state, action) {
      state.loading = false
      state.error = action.payload
    },
    productUpdateReset(state, action) {
      return {
        product: {},
      }
    },
  },
})

export const {
  productUpdateRequest,
  productUpdateSuccess,
  productUpdateFail,
  productUpdateReset,
} = productUpdateSlice.actions

export default productUpdateSlice.reducer

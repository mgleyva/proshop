import { createSlice } from '@reduxjs/toolkit'

const productCreateSlice = createSlice({
  name: 'productCreate',
  initialState: {},
  reducers: {
    productCreateRequest(state, action) {
      state.loading = true
    },
    productCreateSuccess(state, action) {
      state.loading = false
      state.success = true
      state.product = action.payload
    },
    productCreateFail(state, action) {
      state.loading = false
      state.error = action.payload
    },
    productCreateReset(state, action) {
      return {}
    },
  },
})

export const {
  productCreateRequest,
  productCreateSuccess,
  productCreateFail,
  productCreateReset,
} = productCreateSlice.actions

export default productCreateSlice.reducer

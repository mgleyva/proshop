import { createSlice } from '@reduxjs/toolkit'

const productDeleteSlice = createSlice({
  name: 'productDelete',
  initialState: {},
  reducers: {
    productDeleteRequest(state, action) {
      state.loading = true
    },
    productDeleteSuccess(state, action) {
      state.loading = false
      state.success = true
    },
    productDeleteFail(state, action) {
      state.loading = false
      state.error = action.payload
    },
  },
})

export const {
  productDeleteRequest,
  productDeleteSuccess,
  productDeleteFail,
} = productDeleteSlice.actions

export default productDeleteSlice.reducer

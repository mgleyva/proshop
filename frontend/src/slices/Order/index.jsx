import { createSlice } from '@reduxjs/toolkit'

const orderCreateSlice = createSlice({
  name: 'order',
  initialState: {},
  reducers: {
    orderCreateRequest(state, action) {
      state.loading = true
    },
    orderCreateSuccess(state, action) {
      state.loading = false
      state.success = true
      state.order = action.payload
    },
    orderCreateFail(state, action) {
      return {
        loading: false,
        error: action.payload,
      }
    },
    orderCreateReset(state, action) {
      return {}
    },
  },
})

export const {
  orderCreateRequest,
  orderCreateSuccess,
  orderCreateFail,
  orderCreateReset,
} = orderCreateSlice.actions

export default orderCreateSlice.reducer

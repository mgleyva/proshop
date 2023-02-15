import { createSlice } from '@reduxjs/toolkit'

const orderPaySlice = createSlice({
  name: 'orderPay',
  initialState: {},
  reducers: {
    orderPayRequest(state, action) {
      state.loading = true
    },
    orderPaySuccess(state, action) {
      state.loading = false
      state.success = true
    },
    orderPayFail(state, action) {
      return {
        loading: false,
        error: action.payload,
      }
    },
    orderPayReset(state, action) {
      return {}
    },
  },
})

export const {
  orderPayRequest,
  orderPaySuccess,
  orderPayFail,
  orderPayReset,
} = orderPaySlice.actions

export default orderPaySlice.reducer

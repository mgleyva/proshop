import { createSlice } from '@reduxjs/toolkit'

const orderListSlice = createSlice({
  name: 'orderList',
  initialState: {
    orders: [],
  },
  reducers: {
    orderListRequest(state) {
      state.loading = true
    },
    orderListSuccess(state, action) {
      state.loading = false
      state.orders = action.payload
    },
    orderListFail(state, action) {
      return {
        loading: false,
        error: action.payload,
      }
    },
  },
})

export const {
  orderListRequest,
  orderListSuccess,
  orderListFail,
} = orderListSlice.actions

export default orderListSlice.reducer

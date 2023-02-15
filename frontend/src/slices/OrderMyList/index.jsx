import { createSlice } from '@reduxjs/toolkit'

const orderListMySlice = createSlice({
  name: 'orderListMy',
  initialState: {
    orders: [],
  },
  reducers: {
    orderListMyRequest(state) {
      state.loading = true
    },
    orderListMySuccess(state, action) {
      state.loading = false
      state.orders = action.payload
    },
    orderListMyFail(state, action) {
      return {
        loading: false,
        error: action.payload,
      }
    },
    orderListMyReset(state, action) {
      return { orders: [] }
    },
  },
})

export const {
  orderListMyRequest,
  orderListMySuccess,
  orderListMyFail,
  orderListMyReset,
} = orderListMySlice.actions

export default orderListMySlice.reducer

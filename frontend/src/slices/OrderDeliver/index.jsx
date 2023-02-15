import { createSlice } from '@reduxjs/toolkit'

const orderDeliverSlice = createSlice({
  name: 'orderDeliver',
  initialState: {},
  reducers: {
    orderDeliverRequest(state, action) {
      state.loading = true
    },
    orderDeliverSuccess(state, action) {
      state.loading = false
      state.success = true
    },
    orderDeliverFail(state, action) {
      return {
        loading: false,
        error: action.payload,
      }
    },
    orderDeliverReset(state, action) {
      return {}
    },
  },
})

export const {
  orderDeliverRequest,
  orderDeliverSuccess,
  orderDeliverFail,
  orderDeliverReset,
} = orderDeliverSlice.actions

export default orderDeliverSlice.reducer

import { createSlice } from '@reduxjs/toolkit'

const userDeleteSlice = createSlice({
  name: 'userDelete',
  initialState: {},
  reducers: {
    userDeleteRequest(state, action) {
      state.loading = true
    },
    userDeleteSuccess(state, action) {
      state.loading = false
      state.success = true
    },
    userDeleteFail(state, action) {
      state.loading = false
      state.error = action.payload
    },
  },
})

export const {
  userDeleteRequest,
  userDeleteSuccess,
  userDeleteFail,
} = userDeleteSlice.actions

export default userDeleteSlice.reducer

import { createSlice } from '@reduxjs/toolkit'

const userUpdateSlice = createSlice({
  name: 'userUpdate',
  initialState: {
    user: {},
  },
  reducers: {
    userUpdateRequest(state, action) {
      state.loading = true
    },
    userUpdateSuccess(state, action) {
      state.loading = false
      state.success = true
    },
    userUpdateFail(state, action) {
      state.loading = false
      state.error = action.payload
    },
    userUpdateReset(state, action) {
      return {
        user: {},
      }
    },
  },
})

export const {
  userUpdateRequest,
  userUpdateSuccess,
  userUpdateFail,
  userUpdateReset,
} = userUpdateSlice.actions

export default userUpdateSlice.reducer

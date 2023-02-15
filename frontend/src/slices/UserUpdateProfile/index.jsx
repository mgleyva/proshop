import { createSlice } from '@reduxjs/toolkit'

const userUpdateProfileSlice = createSlice({
  name: 'userUpdateProfile',
  initialState: {},
  reducers: {
    userUpdateProfileRequest(state, action) {
      state.loading = true
    },
    userUpdateProfileSuccess(state, action) {
      state.loading = false
      state.success = true
      state.userInfo = action.payload
    },
    userUpdateProfileFail(state, action) {
      state.loading = false
      state.error = action.payload
    },
  },
})

export const {
  userUpdateProfileRequest,
  userUpdateProfileSuccess,
  userUpdateProfileFail,
} = userUpdateProfileSlice.actions

export default userUpdateProfileSlice.reducer

import { createSlice } from '@reduxjs/toolkit'

const userLoginSlice = createSlice({
  name: 'userLogin',
  initialState: {},
  reducers: {
    userLoginRequest(state, action) {
      state.loading = true
    },
    userLoginSuccess(state, action) {
      state.loading = false
      state.userInfo = action.payload
    },
    userLoginFail(state, action) {
      return {
        loading: false,
        error: action.payload,
      }
    },
    userLogout(state, action) {
      return {}
    },
  },
})

export const {
  userLoginRequest,
  userLoginSuccess,
  userLoginFail,
  userLogout,
} = userLoginSlice.actions

export default userLoginSlice.reducer

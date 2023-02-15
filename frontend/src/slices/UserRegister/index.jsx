import { createSlice } from '@reduxjs/toolkit'

const userRegisterSlice = createSlice({
  name: 'userRegister',
  initialState: {},
  reducers: {
    userRegisterRequest(state, action) {
      state.loading = true
    },
    userRegisterSuccess(state, action) {
      state.loading = false
      state.userInfo = action.payload
    },
    userRegisterFail(state, action) {
      return {
        loading: false,
        error: action.payload,
      }
    },
  },
})

export const {
  userRegisterRequest,
  userRegisterSuccess,
  userRegisterFail,
} = userRegisterSlice.actions

export default userRegisterSlice.reducer

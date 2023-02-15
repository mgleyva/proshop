import { createSlice } from '@reduxjs/toolkit'

const userListSlice = createSlice({
  name: 'userList',
  initialState: {
    users: [],
  },
  reducers: {
    userListRequest(state, action) {
      state.loading = true
    },
    userListSuccess(state, action) {
      state.loading = false
      state.users = action.payload
    },
    userListFail(state, action) {
      state.loading = false
      state.error = action.payload
    },
    userListReset(state, action) {
      return {
        users: [],
      }
    },
  },
})

export const {
  userListRequest,
  userListSuccess,
  userListFail,
  userListReset,
} = userListSlice.actions

export default userListSlice.reducer

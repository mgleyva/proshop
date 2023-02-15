import { createSlice } from '@reduxjs/toolkit'

const userDetailsSlice = createSlice({
  name: 'userDetails',
  initialState: {
    user: {},
  },
  reducers: {
    userDetailsRequest(state, action) {
      return {
        ...state,
        loading: true,
      }
    },
    userDetailsSuccess(state, action) {
      state.loading = false
      state.user = action.payload
    },
    userDetailsFail(state, action) {
      return {
        loading: false,
        error: action.payload,
      }
    },
    userDetailsReset(state, action) {
      return { user: {} }
    },
  },
})

export const {
  userDetailsRequest,
  userDetailsSuccess,
  userDetailsFail,
  userDetailsReset,
} = userDetailsSlice.actions

export default userDetailsSlice.reducer

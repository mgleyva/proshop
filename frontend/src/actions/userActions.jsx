import axios from 'axios'

import {
  userLoginFail,
  userLoginRequest,
  userLoginSuccess,
  userLogout,
} from '../slices/UserLogin'
import {
  userRegisterFail,
  userRegisterRequest,
  userRegisterSuccess,
} from '../slices/UserRegister'
import {
  userDetailsFail,
  userDetailsRequest,
  userDetailsSuccess,
  userDetailsReset,
} from '../slices/UserDetails'
import {
  userUpdateProfileFail,
  userUpdateProfileRequest,
  userUpdateProfileSuccess,
} from '../slices/UserUpdateProfile'
import {
  userListFail,
  userListRequest,
  userListSuccess,
  userListReset,
} from '../slices/UserList'
import { orderListMyReset } from '../slices/OrderMyList'
import {
  userDeleteFail,
  userDeleteRequest,
  userDeleteSuccess,
} from '../slices/UserDelete'
import {
  userUpdateFail,
  userUpdateRequest,
  userUpdateSuccess,
} from '../slices/UserUpdate'

// login actions
export const login = (email, password) => async (dispatch) => {
  try {
    dispatch(userLoginRequest())

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const { data } = await axios.post(
      '/api/users/login',
      { email, password },
      config
    )

    dispatch(userLoginSuccess(data))

    localStorage.setItem('userInfo', JSON.stringify(data))
  } catch (error) {
    dispatch(
      userLoginFail(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    )
  }
}

// logout actions
export const logout = () => (dispatch) => {
  localStorage.removeItem('userInfo')
  localStorage.removeItem('cartItems')
  localStorage.removeItem('shippingAddress')
  localStorage.removeItem('paymentMethod')
  dispatch(userLogout())
  dispatch(userDetailsReset())
  dispatch(orderListMyReset())
  dispatch(userListReset())
  document.location.href = '/login'
}

// register actions
export const register = (name, email, password) => async (dispatch) => {
  try {
    dispatch(userRegisterRequest())

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const { data } = await axios.post(
      '/api/users',
      { name, email, password },
      config
    )

    dispatch(userRegisterSuccess(data))
    dispatch(userLoginSuccess(data))

    localStorage.setItem('userInfo', JSON.stringify(data))
  } catch (error) {
    dispatch(
      userRegisterFail(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    )
  }
}

// get user details actions
export const getUserDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch(userDetailsRequest())

    //Destructure getState.userLogin.userInfo
    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get(`/api/users/${id}`, config)

    dispatch(userDetailsSuccess(data))
  } catch (error) {
    dispatch(
      userDetailsFail(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    )
  }
}

// update user profile
export const updateUserProfile = (user) => async (dispatch, getState) => {
  try {
    dispatch(userUpdateProfileRequest())

    //Destructure getState.userLogin.userInfo
    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.put(`/api/users/profile`, user, config)

    dispatch(userUpdateProfileSuccess(data))
  } catch (error) {
    dispatch(
      userUpdateProfileFail(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    )
  }
}

// ***ADMIN OPTIONS*** //

// get users
export const listUsers = () => async (dispatch, getState) => {
  try {
    dispatch(userListRequest())

    //Destructure getState.userLogin.userInfo
    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get(`/api/users`, config)

    dispatch(userListSuccess(data))
  } catch (error) {
    dispatch(
      userListFail(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    )
  }
}

// delete user
export const deleteUser = (id) => async (dispatch, getState) => {
  try {
    dispatch(userDeleteRequest())

    //Destructure getState.userLogin.userInfo
    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    await axios.delete(`/api/users/${id}`, config)

    dispatch(userDeleteSuccess())
  } catch (error) {
    dispatch(
      userDeleteFail(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    )
  }
}

// update user
export const updateUser = (user) => async (dispatch, getState) => {
  try {
    dispatch(userUpdateRequest())

    //Destructure getState.userLogin.userInfo
    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.put(`/api/users/${user._id}`, user, config)

    dispatch(userUpdateSuccess())
    dispatch(userDetailsSuccess(data))
  } catch (error) {
    dispatch(
      userUpdateFail(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    )
  }
}

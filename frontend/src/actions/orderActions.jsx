import axios from 'axios'

import {
  orderCreateRequest,
  orderCreateSuccess,
  orderCreateFail,
} from '../slices/Order'
import {
  orderDetailsRequest,
  orderDetailsSuccess,
  orderDetailsFail,
} from '../slices/OrderDetails'
import {
  orderPayRequest,
  orderPaySuccess,
  orderPayFail,
} from '../slices/OrderPay'
import {
  orderListMyRequest,
  orderListMySuccess,
  orderListMyFail,
} from '../slices/OrderMyList'
import {
  orderListRequest,
  orderListSuccess,
  orderListFail,
} from '../slices/OrderList'
import {
  orderDeliverRequest,
  orderDeliverSuccess,
  orderDeliverFail,
} from '../slices/OrderDeliver'
import { cartClearItems } from '../slices/Cart'

// Create order
export const createOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch(orderCreateRequest())

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

    // POST request to API with token
    const { data } = await axios.post(`/api/orders`, order, config)

    dispatch(orderCreateSuccess(data))
    dispatch(cartClearItems(data))
    localStorage.removeItem('cartItems')
  } catch (error) {
    dispatch(
      orderCreateFail(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    )
  }
}

// Get order by id
export const getOrderDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch(orderDetailsRequest())

    //Destructure getState.userLogin.userInfo
    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    // GET request to API with token
    const { data } = await axios.get(`/api/orders/${id}`, config)

    dispatch(orderDetailsSuccess(data))
  } catch (error) {
    dispatch(
      orderDetailsFail(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    )
  }
}

// Pay order, paymentResult which comes from PayPal
export const payOrder = (orderId, paymentResult) => async (
  dispatch,
  getState
) => {
  try {
    dispatch(orderPayRequest())

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

    // PUT request to API with token
    const { data } = await axios.put(
      `/api/orders/${orderId}/pay`,
      paymentResult,
      config
    )

    dispatch(orderPaySuccess(data))
  } catch (error) {
    dispatch(
      orderPayFail(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    )
  }
}

// List my orders
export const listMyOrders = () => async (dispatch, getState) => {
  try {
    dispatch(orderListMyRequest())

    //Destructure getState.userLogin.userInfo
    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    // GET request to API with token
    const { data } = await axios.get(`/api/orders/myorders`, config)

    dispatch(orderListMySuccess(data))
  } catch (error) {
    dispatch(
      orderListMyFail(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    )
  }
}

// ***ADMIN OPTIONS*** //

export const listOrders = () => async (dispatch, getState) => {
  try {
    dispatch(orderListRequest())

    //Destructure getState.userLogin.userInfo
    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    // GET request to API with token
    const { data } = await axios.get(`/api/orders`, config)

    dispatch(orderListSuccess(data))
  } catch (error) {
    dispatch(
      orderListFail(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    )
  }
}

// Deliver order
export const deliverOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch(orderDeliverRequest())

    //Destructure getState.userLogin.userInfo
    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    // PUT request to API with token
    const { data } = await axios.put(
      `/api/orders/${order._id}/deliver`,
      {},
      config
    )

    dispatch(orderDeliverSuccess(data))
  } catch (error) {
    dispatch(
      orderDeliverFail(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    )
  }
}

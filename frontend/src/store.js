import { configureStore } from '@reduxjs/toolkit'

import productList from './slices/ProductList'
import productDetails from './slices/ProductDetails'
import productDelete from './slices/ProductDelete'
import productCreate from './slices/ProductCreate'
import productUpdate from './slices/ProductUpdate'
import productReviewCreate from './slices/ProductReviewCreate'
import productTopRated from './slices/ProductTop'
import cart from './slices/Cart'
import userLogin from './slices/UserLogin'
import userRegister from './slices/UserRegister'
import userDetails from './slices/UserDetails'
import userUpdateProfile from './slices/UserUpdateProfile'
import userList from './slices/UserList'
import userDelete from './slices/UserDelete'
import userUpdate from './slices/UserUpdate'
import orderCreate from './slices/Order'
import orderDetails from './slices/OrderDetails'
import orderPay from './slices/OrderPay'
import orderDeliver from './slices/OrderDeliver'
import orderMyList from './slices/OrderMyList'
import orderList from './slices/OrderList'

// load from the localstorage
const cartItemsFromStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : []

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null

const shippingAddressFromStorage = localStorage.getItem('shippingAddress')
  ? JSON.parse(localStorage.getItem('shippingAddress'))
  : {}

const paymentMethodFromStorage = localStorage.getItem('paymentMethod')
  ? JSON.parse(localStorage.getItem('paymentMethod'))
  : {}

// initialState
const initialState = {
  cart: {
    cartItems: cartItemsFromStorage,
    shippingAddress: shippingAddressFromStorage,
    paymentMethod: paymentMethodFromStorage,
  },
  userLogin: { userInfo: userInfoFromStorage },
}

const store = configureStore({
  reducer: {
    productList,
    productDetails,
    productDelete,
    productCreate,
    productUpdate,
    productReviewCreate,
    productTopRated,
    cart,
    userLogin,
    userRegister,
    userDetails,
    userUpdateProfile,
    userList,
    userDelete,
    userUpdate,
    orderCreate,
    orderDetails,
    orderPay,
    orderDeliver,
    orderMyList,
    orderList,
  },
  preloadedState: initialState,
})

export default store

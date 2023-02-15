import axios from 'axios'

import {
  cartAddItem,
  cartRemoveItem,
  cartSaveShippingAddress,
  cartSavePaymentMethod,
} from '../slices/Cart'

// Add to cart action
export const addToCart = (id, qty) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/products/${id}`)

  dispatch(
    cartAddItem({
      product: data._id,
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      qty,
    })
  )

  // Save it in localstorage in case the browser closes, stringify as localstorage only saves strings.
  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

// Remove from cart action
export const removeFromCart = (id) => (dispatch, getState) => {
  dispatch(cartRemoveItem(id))

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

// Save shipping address
export const saveShippingAddress = (data) => (dispatch) => {
  dispatch(cartSaveShippingAddress(data))

  localStorage.setItem('shippingAddress', JSON.stringify(data))
}

// Save payment method
export const savePaymentMethod = (data) => (dispatch) => {
  dispatch(cartSavePaymentMethod(data))

  localStorage.setItem('paymentMethod', JSON.stringify(data))
}

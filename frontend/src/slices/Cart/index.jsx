import { createSlice } from '@reduxjs/toolkit'

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cartItems: [],
    shippingAddress: {},
  },
  reducers: {
    cartAddItem(state, action) {
      const item = action.payload
      const existItem = state.cartItems.find((x) => x.product === item.product)

      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.product === existItem.product ? item : x
          ),
        }
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        }
      }
    },
    cartRemoveItem(state, action) {
      return {
        ...state,
        cartItems: state.cartItems.filter((x) => x.product !== action.payload),
      }
    },
    cartSaveShippingAddress(state, action) {
      return {
        ...state,
        shippingAddress: action.payload,
      }
    },
    cartSavePaymentMethod(state, action) {
      return {
        ...state,
        paymentMethod: action.payload,
      }
    },
    cartClearItems(state, action) {
      return {
        ...state,
        cartItems: [],
      }
    },
  },
})

export const {
  cartAddItem,
  cartRemoveItem,
  cartSaveShippingAddress,
  cartSavePaymentMethod,
  cartClearItems,
} = cartSlice.actions

export default cartSlice.reducer

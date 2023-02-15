import axios from 'axios'
import {
  productListRequest,
  productListSuccess,
  productListFail,
} from '../slices/ProductList'
import {
  productDetailsRequest,
  productDetailsSuccess,
  productDetailsFail,
} from '../slices/ProductDetails'
import {
  productDeleteRequest,
  productDeleteSuccess,
  productDeleteFail,
} from '../slices/ProductDelete'
import {
  productCreateRequest,
  productCreateSuccess,
  productCreateFail,
} from '../slices/ProductCreate'
import {
  productUpdateRequest,
  productUpdateSuccess,
  productUpdateFail,
} from '../slices/ProductUpdate'
import {
  productCreateReviewRequest,
  productCreateReviewSuccess,
  productCreateReviewFail,
} from '../slices/ProductReviewCreate'
import {
  productTopRequest,
  productTopSuccess,
  productTopFail,
} from '../slices/ProductTop'

// listProducts action
export const listProducts = (keyword = '', pageNumber = '') => async (
  dispatch
) => {
  try {
    dispatch(productListRequest())

    const { data } = await axios.get(
      `/api/products?keyword=${keyword}&pageNumber=${pageNumber}`
    )

    dispatch(productListSuccess(data))
  } catch (error) {
    dispatch(
      productListFail(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    )
  }
}

// listProductDetails action
export const listProductDetails = (id) => async (dispatch) => {
  try {
    dispatch(productDetailsRequest())

    const { data } = await axios.get(`/api/products/${id}`)

    dispatch(productDetailsSuccess(data))
  } catch (error) {
    dispatch(
      productDetailsFail(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    )
  }
}

// ***ADMIN OPTIONS*** //

// Delete product
export const deleteProduct = (id) => async (dispatch, getState) => {
  try {
    dispatch(productDeleteRequest())

    //Destructure getState.userLogin.userInfo
    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    // DELETE request to API with token
    await axios.delete(`/api/products/${id}`, config)

    dispatch(productDeleteSuccess())
  } catch (error) {
    dispatch(
      productDeleteFail(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    )
  }
}

// Create product
export const createProduct = () => async (dispatch, getState) => {
  try {
    dispatch(productCreateRequest())

    //Destructure getState.userLogin.userInfo
    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    // CREATE request to API with token
    const { data } = await axios.post(`/api/products`, {}, config)

    dispatch(productCreateSuccess(data))
  } catch (error) {
    dispatch(
      productCreateFail(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    )
  }
}

// Update product
export const updateProduct = (product) => async (dispatch, getState) => {
  try {
    dispatch(productUpdateRequest())

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

    // CREATE request to API with token
    const { data } = await axios.put(
      `/api/products/${product._id}`,
      product,
      config
    )

    dispatch(productUpdateSuccess(data))
  } catch (error) {
    dispatch(
      productUpdateFail(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    )
  }
}

// Create product review
export const createProductReview = (productId, review) => async (
  dispatch,
  getState
) => {
  try {
    dispatch(productCreateReviewRequest())

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

    // CREATE request to API with token
    await axios.post(`/api/products/${productId}/reviews`, review, config)

    dispatch(productCreateReviewSuccess())
  } catch (error) {
    dispatch(
      productCreateReviewFail(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    )
  }
}

// List top rated Products action
export const listTopProducts = () => async (dispatch) => {
  try {
    dispatch(productTopRequest())

    const { data } = await axios.get(`/api/products/top`)

    dispatch(productTopSuccess(data))
  } catch (error) {
    dispatch(
      productTopFail(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    )
  }
}

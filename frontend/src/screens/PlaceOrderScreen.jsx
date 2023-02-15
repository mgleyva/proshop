import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  Button,
  Row,
  Col,
  ListGroup,
  Image,
  Card,
  ListGroupItem,
} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

import Message from '../components/Message'
import CheckoutSteps from '../components/CheckoutSteps'
import { createOrder } from '../actions/orderActions'
import { orderCreateReset } from '../slices/Order'
import { userDetailsReset } from '../slices/UserDetails'

const PlaceOrderScreen = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // Get state from redux
  const cart = useSelector((state) => state.cart)

  if (!cart.shippingAddress.address) {
    navigate(`/shipping`)
  } else if (!cart.paymentMethod) {
    navigate(`/payment`)
  }

  // Shallow copy
  const cartCopy = { ...cart }

  const orderCreate = useSelector((state) => state.orderCreate)
  const { order, success, error } = orderCreate

  // Calculate prices
  cartCopy.itemsPrice = cartCopy.cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  )

  cartCopy.shippingPrice = cartCopy.itemsPrice > 100 ? 0 : 100

  cartCopy.taxPrice = parseInt(Number(0.15 * cartCopy.itemsPrice))

  cartCopy.totalPrice =
    Number(cartCopy.itemsPrice) +
    Number(cartCopy.shippingPrice) +
    Number(cartCopy.taxPrice)

  // useEffect
  useEffect(() => {
    if (success) {
      navigate(`/order/${order._id}`)
      dispatch(userDetailsReset())
      dispatch(orderCreateReset())
    }
  }, [success, navigate])

  // Handlers and dispatch
  const placeOrderHandler = () => {
    dispatch(
      createOrder({
        orderItems: cartCopy.cartItems,
        shippingAddress: cartCopy.shippingAddress,
        paymentMethod: cartCopy.paymentMethod,
        itemsPrice: cartCopy.itemsPrice,
        shippingPrice: cartCopy.shippingPrice,
        taxPrice: cartCopy.taxPrice,
        totalPrice: cartCopy.totalPrice,
      })
    )
  }

  // Screen
  return (
    <>
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Address:</strong>
                {cart.shippingAddress.address}, {cart.shippingAddress.city}{' '}
                {cart.shippingAddress.postalCode},{' '}
                {cart.shippingAddress.country}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              <strong>Method: </strong>
              {cart.paymentMethod}
            </ListGroup.Item>

            <ListGroupItem>
              <h2>Order Items</h2>
              {cart.cartItems.length === 0 ? (
                <Message>Your cart is empty</Message>
              ) : (
                <ListGroup variant='flush'>
                  {cart.cartItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} x ${item.price} = ${item.qty * item.price}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroupItem>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>${cartCopy.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${cartCopy.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>${cartCopy.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${cartCopy.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                {error && <Message variant='danger'>{error}</Message>}
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  type='button'
                  className='btn-block'
                  disabled={cart.cartItems === 0}
                  onClick={placeOrderHandler}
                >
                  Place Order
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default PlaceOrderScreen

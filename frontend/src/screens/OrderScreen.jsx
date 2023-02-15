import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, useParams, useNavigate } from 'react-router-dom'
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
import { useMercadopago } from 'react-sdk-mercadopago'

import Message from '../components/Message'
import Loader from '../components/Loader'
import {
  getOrderDetails,
  payOrder,
  deliverOrder,
} from '../actions/orderActions'
import { orderPayReset } from '../slices/OrderPay'
import { orderDeliverReset } from '../slices/OrderDeliver'

const OrderScreen = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const orderId = useParams()

  // mercadopago SDK credentials
  const mercadoPago = useMercadopago.v2(
    'TEST-b01fcb36-0499-4281-b363-7f0ef1ec4cef',
    {
      locale: 'es-CO',
    }
  )

  // Get state from redux
  const orderDetails = useSelector((state) => state.orderDetails)
  const { order, loading, error } = orderDetails

  // -- Deep copy --
  const orderDetailsCopy = JSON.parse(JSON.stringify(orderDetails))
  const { order: orderCopy } = orderDetailsCopy

  const orderPay = useSelector((state) => state.orderPay)
  const { loading: loadingPay, success: successPay } = orderPay

  const orderDeliver = useSelector((state) => state.orderDeliver)
  const { loading: loadingDeliver, success: successDeliver } = orderDeliver

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  // Set variables
  const [rendered, setRendered] = useState(false)

  if (!loading) {
    // Calculate prices
    // const addDecimals = (num) => {
    //   return (Math.round(num * 100) / 100).toFixed(2)
    // }
    // order.itemsPrice = addDecimals(
    //   order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    // )
    orderCopy.itemsPrice = order.orderItems.reduce(
      (acc, item) => acc + item.price * item.qty,
      0
    )
  }

  // useEffect
  useEffect(() => {
    if (!userInfo) {
      navigate('/login')
    }

    // mercadopago SDK script
    const mercadoPagoScript = async () => {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }

      const { data: preferenceId } = await axios.post(
        '/api/mp',
        {
          title: 'Total de la compra',
          unit_price: order.totalPrice,
          quantity: 1,
        },
        config
      )

      if (preferenceId) {
        mercadoPago.checkout({
          preference: {
            id: preferenceId.id,
          },
          render: {
            container: '.cho-container',
            label: 'Pagar',
          },
        })
      }
    }

    if (!order || successPay || successDeliver || order._id !== orderId.id) {
      dispatch(orderPayReset())
      dispatch(orderDeliverReset())
      dispatch(getOrderDetails(orderId.id))
    } else if (!order.isPaid && mercadoPago) {
      if (!rendered) {
        mercadoPagoScript()
        setRendered(true)
      }
    }
  }, [dispatch, orderId.id, successPay, successDeliver, order])

  // Handler
  const deliverHandler = () => {
    dispatch(deliverOrder(order))
  }

  // Handlers Paypal
  // const createOrder = (data, actions) => {
  //   return actions.order.create({
  //     purchase_units: [
  //       {
  //         amount: {
  //           value: order.totalPrice,
  //         },
  //       },
  //     ],
  //   })
  // }
  // const onApprove = (data, actions) => {
  //   return actions.order.capture().then((details) => {
  //     console.log(details)
  //     dispatch(payOrder(orderId.id, details))
  //   })
  // }

  // Screen
  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{error}</Message>
  ) : (
    <>
      <h1>Order {order._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Name: </strong>
                {order.user.name}
              </p>
              <p>
                <strong>Email: </strong>
                <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
              </p>
              <p>
                <strong>Address:</strong>
                {order.shippingAddress.address}, {order.shippingAddress.city}{' '}
                {order.shippingAddress.postalCode},{' '}
                {order.shippingAddress.country}
              </p>
              {order.isDelivered ? (
                <Message variant='success'>
                  Delivered on {order.deliveredAt}
                </Message>
              ) : (
                <Message variant='danger'>Not Delivered</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>

              <p>
                <strong>Method: </strong>
                {order.paymentMethod}
              </p>
              {order.isPaid ? (
                <Message variant='success'>Paid on {order.paidAt}</Message>
              ) : (
                <Message variant='danger'>Not Paid</Message>
              )}
            </ListGroup.Item>

            <ListGroupItem>
              <h2>Order Items</h2>
              {order.orderItems.length === 0 ? (
                <Message>Order is empty</Message>
              ) : (
                <ListGroup variant='flush'>
                  {order.orderItems.map((item, index) => (
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
                  <Col>${orderCopy.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${order.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>${order.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${order.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              {!order.isPaid && (
                <ListGroup.Item>
                  <div className='cho-container' />
                  {loadingPay && <Loader />}
                </ListGroup.Item>
              )}
              {loadingDeliver && <Loader />}
              {userInfo &&
                userInfo.isAdmin &&
                order.isPaid &&
                !order.isDelivered && (
                  <ListGroup.Item>
                    <Button
                      type='button'
                      className='btn btn-block'
                      onClick={deliverHandler}
                    >
                      Mark As Delivered
                    </Button>
                  </ListGroup.Item>
                )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default OrderScreen

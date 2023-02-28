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

import Message from '../components/Message'
import Loader from '../components/Loader'
import {
  getOrderDetails,
  //payOrder,
  deliverOrder,
} from '../actions/orderActions'
import { orderPayReset } from '../slices/OrderPay'
import { orderDeliverReset } from '../slices/OrderDeliver'

const OrderScreen = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const orderId = useParams()

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
  const [payUSignature, setPayUSignature] = useState('')
  const [payUConfirmation, setPayUConfirmation] = useState('')

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

    // payU script
    const payUScript = async () => {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }

      const { data } = await axios.post(
        '/api/config/payu',
        {
          merchantId: '508029',
          referenceCode: order._id,
          amount: order.totalPrice,
          currency: 'COP',
        },
        config
      )

      if (data) {
        setPayUSignature(data)
        setPayUConfirmation(
          `https://proshop-89al.onrender.com/api/orders/${orderId.id}/payu`
        )
      }
    }

    if (!order || successPay || successDeliver || order._id !== orderId.id) {
      dispatch(orderPayReset())
      dispatch(orderDeliverReset())
      dispatch(getOrderDetails(orderId.id))
    } else if (!order.isPaid) {
      if (!rendered) {
        payUScript()
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
                  <div>
                    {' '}
                    <form
                      method='post'
                      action='https://sandbox.checkout.payulatam.com/ppp-web-gateway-payu/'
                    >
                      <input name='merchantId' type='hidden' value='508029' />
                      <input name='accountId' type='hidden' value='512321' />
                      <input
                        name='description'
                        type='hidden'
                        value='Valor total de la orden'
                      />
                      <input
                        name='referenceCode'
                        type='hidden'
                        value={order._id}
                      />
                      <input
                        name='amount'
                        type='hidden'
                        value={order.totalPrice}
                      />
                      <input name='tax' type='hidden' value='0' />
                      <input name='taxReturnBase' type='hidden' value='0' />
                      <input name='currency' type='hidden' value='COP' />
                      <input
                        name='signature'
                        type='hidden'
                        value={payUSignature}
                      />
                      <input name='test' type='hidden' value='1' />
                      <input
                        name='buyerEmail'
                        type='hidden'
                        value={order.user.email}
                      />
                      <input
                        name='responseUrl'
                        type='hidden'
                        value='https://proshop-89al.onrender.com/response'
                      />
                      <input
                        name='confirmationUrl'
                        type='hidden'
                        value={payUConfirmation}
                      />
                      <input
                        name='Submit'
                        type='submit'
                        value='Pagar con PayU'
                      />
                    </form>
                  </div>
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

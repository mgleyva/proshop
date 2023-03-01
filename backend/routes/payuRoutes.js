import express from 'express'
import asyncHandler from 'express-async-handler'
import md5 from 'md5'

import Order from '../models/orderModel.js'

const router = express.Router()

// Config
const payuConfirmation = asyncHandler(async (req, res) => {
  const saleId = req.body.reference_sale
  const state = Number(req.body.state_pol)

  //find order by sale id in body.
  const order = await Order.findById(saleId)

  if (order) {
    if (state === 4) {
      order.isPaid = true
      order.paidAt = Date.now()
      // comes from PayU
      order.paymentResult = {
        id: req.body.reference_pol,
        status: req.body.response_message_pol,
        email_address: req.body.email_buyer,
        update_time: req.body.transaction_date,
      }

      const updatedOrder = await order.save()
      res.json(updatedOrder)
    }
  } else {
    res.status(404)
    throw new Error('Order not found')
  }
})

const payuSignature = (req, res) => {
  const data = req.body

  const ApiKey = process.env.PU_API_KEY
  const merchantId = data.merchantId
  const referenceCode = data.referenceCode
  const amount = data.amount
  const currency = data.currency

  const chain = `${ApiKey}~${merchantId}~${referenceCode}~${amount}~${currency}`
  const md5result = md5(chain)

  res.status(200).send(md5result)
}

//Endpoint
router.route('/confirmation').post(payuConfirmation)
router.route('/sign').post(payuSignature)

export default router

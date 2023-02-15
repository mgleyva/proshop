import express from 'express'
import mercadopago from '../config/mp.js'

const router = express.Router()

// Config
const mpRequest = (req, res) => {
  const data = req.body

  let preference = {
    items: [
      {
        title: data.title,
        unit_price: Number(data.unit_price),
        quantity: Number(data.quantity),
      },
    ],
    back_urls: {
      success: 'http://localhost:5000/feedback',
      failure: 'http://localhost:5000/feedback',
      pending: 'http://localhost:5000/feedback',
    },
    notification_url: 'http://localhost:5000/notification',
    auto_return: 'approved',
  }

  mercadopago.preferences
    .create(preference)
    .then(function (response) {
      res.json({
        id: response.body.id,
      })
      console.log(response.body.sandbox_init_point)
    })
    .catch(function (error) {
      console.log(error)
    })
}

//Endpoint
router.route('/').post(mpRequest)

export default router

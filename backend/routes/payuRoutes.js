import express from 'express'
import md5 from 'md5'

const router = express.Router()

// Config
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
router.route('/').post(payuSignature)

export default router

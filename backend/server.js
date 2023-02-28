import path from 'path'
import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import connectDB from './config/db.js'

import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'
import payuRoutes from './routes/payuRoutes.js'

dotenv.config()

// Database connection
connectDB()

const app = express()

// Morgan only in development mode
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

// To accept JSON data in the body
app.use(express.json())

// ROUTES
app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/upload', uploadRoutes)
app.use('/api/config/payu', payuRoutes)

// Make a folder static
const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/build')))

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  )
} else {
  app.get('/', (req, res) => {
    res.send('API is running...')
  })
}
// PayU feedback
app.get('/responsepayu', function (req, res) {
  const data = req.body
  console.log(data)
})

app.post('/confirmationpayu', function (req, res) {
  const data = req.body
  console.log(data)
})

// mercadopago feedback
app.get('/feedback', function (req, res) {
  res.json({
    Payment: req.query.payment_id,
    Status: req.query.status,
    MerchantOrder: req.query.merchant_order_id,
  })
})

app.post('/notification', function (req, res) {
  const data = req.body

  // res.json({
  //   Payment: req.query.payment_id,
  //   Status: req.query.status,
  //   MerchantOrder: req.query.merchant_order_id,
  // })
  console.log(data)
  //res.status(200)
})

// Errors
app.use(notFound)
app.use(errorHandler)

// Env variables
const PORT = process.env.PORT || 5000

// Run server
app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
)

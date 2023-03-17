import path from 'path'
import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import connectDB from './config/db.js'
import fs from 'fs'

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
// if (process.env.NODE_ENV === 'development') {
//   app.use(morgan('dev'))
// }

const __dirname = path.resolve()

// for parsing JSON and urlencoded data in the body
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// MORGAN: begins
let logStream = fs.createWriteStream(path.join(__dirname, '/public/log.txt'), {
  flags: 'a',
})

morgan.token('body', (req) => {
  return JSON.stringify(req.body)
})

app.use(
  morgan(
    ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent" :body',
    {
      stream: logStream,
    }
  )
)
// MORGAN: ends

// ROUTES
app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/upload', uploadRoutes)
app.use('/api/payu', payuRoutes)

// Make a folder static
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

// Make a folder public
app.use(express.static(__dirname + '/public'))

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/build')))

  // app.get('/response', (req, res) =>
  //   res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  // )

  app.get('/api/payu/confirmation', (req, res) => res.send('URL not found'))

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

// server/src/index.ts
import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import authRoutes from './routes/auth'
import userRoutes from './routes/users'

dotenv.config()
const app = express()

const PORT = process.env.PORT || 3001

// Middleware
app.use(cors())
app.use(express.json())

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)

// Mongo Connection
mongoose
  .connect(process.env.MONGO_URI as string)
  .then(() => {
    console.log('🟢 Connected to MongoDB')
    app.listen(PORT, () => {
      console.log(`🚀 Server listening on port ${PORT}`)
    })
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err)
  })

import express, { Request, Response, Router } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import requireAuth from '../middleware/requireAuth'
import {User} from '../models/User'
import { AuthenticatedRequest } from '../middleware/requireAuth' // <-- We'll export this interface to reuse
const router = express.Router()

// POST /api/auth/register
router.post('/register', async (req: Request, res: Response) => {
  console.log('🔁 Received POST /register')
  console.log('📦 req.body:', req.body)
  console.log('🧪 JWT_SECRET present:', !!process.env.JWT_SECRET)

  const { email, password } = req.body

  if (!email || !password) {
    console.log('❌ Missing email or password')
    return res.status(400).json({ message: 'Email and password are required.' })
  }

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      console.log('⚠️ User already exists:', email)
      return res.status(400).json({ message: 'User already exists' })
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // Create and save user
    const newUser = new User({ email, password: hashedPassword })
    await newUser.save()

    // Create JWT token
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET as string, {
      expiresIn: '1h',
    })

    // Respond with token and user info
    res.status(201).json({ token, user: { id: newUser._id, email: newUser.email } })
  } catch (err) {
    console.error('🔥 Server error during registration:', err)
    res.status(500).json({ message: 'Server error during registration' })
  }
})

router.post('/login', async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password required.' })
  }

  try {
    const user = await User.findOne({ email })
    if (!user) return res.status(401).json({ message: 'Invalid credentials' })

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' })

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string, {
      expiresIn: '1h',
    })

    res.json({ token, user: { id: user._id, email: user.email } })
  } catch (err) {
    console.error('🔥 Login error:', err)
    res.status(500).json({ message: 'Server error during login' })
  }
})


export default router

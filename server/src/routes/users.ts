// routes/users.ts
import express from 'express'
import requireAuth from '../middleware/requireAuth'
import {User} from '../models/User'
import { AuthenticatedRequest } from '../middleware/requireAuth'

const router = express.Router()

router.put('/animal', requireAuth, async (req: AuthenticatedRequest, res) => {
  const userId = req.user!.id
  const { animal } = req.body

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { animal },
      { new: true }
    )
    res.json(updatedUser)
  } catch (err) {
    console.error('Error updating animal:', err)
    res.status(500).json({ message: 'Server error updating animal' })
  }
})

router.get('/animal', requireAuth, async (req: AuthenticatedRequest, res) => {
  const userId = req.user!.id

  try {
    const user = await User.findById(userId)
    if (!user) return res.status(404).json({ message: 'User not found' })

    res.json({ animal: user.animal || null })
  } catch (err) {
    console.error('Error fetching animal:', err)
    res.status(500).json({ message: 'Server error fetching animal' })
  }
})

export default router

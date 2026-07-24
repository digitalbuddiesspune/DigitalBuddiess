import { Router } from 'express'
import jwt from 'jsonwebtoken'
import { requireAuth } from '../middleware/auth.js'

const router = Router()

router.post('/login', (req, res) => {
  const { email, password } = req.body || {}

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' })
  }

  const adminEmail = process.env.ADMIN_EMAIL
  const adminPassword = process.env.ADMIN_PASSWORD

  if (email !== adminEmail || password !== adminPassword) {
    return res.status(401).json({ message: 'Invalid credentials' })
  }

  const token = jwt.sign({ email: adminEmail, role: 'admin' }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  })

  res.json({
    token,
    admin: { email: adminEmail },
  })
})

router.get('/me', requireAuth, (req, res) => {
  res.json({ admin: { email: req.admin.email } })
})

export default router

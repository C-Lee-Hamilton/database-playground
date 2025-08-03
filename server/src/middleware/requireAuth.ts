import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'


interface JwtPayload {
  id: string
}

interface AuthenticatedRequest extends Request {
  user?: JwtPayload
}

const requireAuth = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token provided' })
  }

  const token = authHeader.split(' ')[1]

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload
    req.user = decoded
    next()
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' })
  }
}

export default requireAuth
export type { AuthenticatedRequest }
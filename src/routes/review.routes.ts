// src/routes/review.routes.ts
import { Router } from 'express'
import { 
  createReview,
  getReviewsByProvider,
  getReviewsByService
} from '../controllers/review.controller'
import { authenticate, authorize } from '../middlewares/auth.middleware'
import { Role } from '@prisma/client'

const router = Router()

// Rotas públicas
router.get('/provider/:providerId', getReviewsByProvider)
router.get('/service/:serviceId', getReviewsByService)

// Rotas protegidas
router.post('/', authenticate, authorize([Role.CLIENT]), createReview)

export default router

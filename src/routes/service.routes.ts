// src/routes/service.routes.ts
import { Router } from 'express';
import { 
  createService,
  getAllServices,
  getServiceById,
  updateService,
  deleteService
} from '../controllers/service.controller';
import { authenticate, authorize } from '../middlewares/auth.middleware';
import { Role } from '@prisma/client';

const router = Router();

// Rotas públicas
router.get('/', getAllServices);
router.get('/:id', getServiceById);

// Rotas protegidas (apenas para PROVIDERS)
router.post('/', authenticate, authorize([Role.PROVIDER]), createService);
router.put('/:id', authenticate, authorize([Role.PROVIDER]), updateService);
router.delete('/:id', authenticate, authorize([Role.PROVIDER]), deleteService);

export default router;

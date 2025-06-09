import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { Role } from '@prisma/client'

// Declarando o tipo diretamente no arquivo
declare global {
  namespace Express {
    interface Request {
      user?: {
        userId: string
        role: Role
      }
    }
  }
}

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Token não fornecido' })
  }
  const token = authHeader.split(' ')[1]
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET || 'default_secret') as { userId: string, role: Role }
    req.user = payload
    next()
  } catch (err) {
    return res.status(401).json({ error: 'Token inválido' })
  }
}

// Middleware para verificar se o usuário tem a role específica
export const authorize = (roles: Role[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ error: 'Usuário não autenticado' })
    }
    
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Acesso não autorizado' })
    }
    
    next()
  }
}

// Middleware para verificar se o usuário é o dono do recurso
export const isOwner = (paramIdField: string = 'id') => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ error: 'Usuário não autenticado' })
    }
    
    const resourceId = req.params[paramIdField]
    
    // Se o usuário for o dono ou for ADMIN (implementação futura)
    if (req.user.userId === resourceId) {
      return next()
    }
    
    return res.status(403).json({ error: 'Acesso não autorizado' })
  }
} 
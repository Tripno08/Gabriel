// src/controllers/review.controller.ts
import { Request, Response } from 'express';
import prisma from '../config/prisma';
import { z } from 'zod';

// Schema para validação de reviews
const reviewSchema = z.object({
  providerId: z.string().uuid('ID do provedor inválido'),
  serviceId: z.string().uuid('ID do serviço inválido').optional(),
  rating: z.number().min(1, 'Avaliação mínima é 1').max(5, 'Avaliação máxima é 5'),
  comment: z.string().optional()
});

export const createReview = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'Usuário não autenticado' });
    }
    
    const validatedData = reviewSchema.parse(req.body);
    
    // Verificar se o provider existe
    const provider = await prisma.user.findUnique({
      where: { id: validatedData.providerId }
    });
    
    if (!provider) {
      return res.status(404).json({ error: 'Provedor não encontrado' });
    }
    
    // Verificar se o serviço existe, se fornecido
    if (validatedData.serviceId) {
      const service = await prisma.service.findUnique({
        where: { id: validatedData.serviceId }
      });
      
      if (!service) {
        return res.status(404).json({ error: 'Serviço não encontrado' });
      }
      
      // Verificar se o serviço pertence ao provider
      if (service.providerId !== validatedData.providerId) {
        return res.status(400).json({ error: 'O serviço não pertence ao provedor especificado' });
      }
    }
    
    // Criar a review
    const review = await prisma.review.create({
      data: {
        ...validatedData,
        clientId: req.user.userId
      },
      include: {
        client: {
          select: {
            id: true,
            name: true
          }
        },
        provider: {
          select: {
            id: true,
            name: true
          }
        },
        service: validatedData.serviceId ? {
          select: {
            id: true,
            name: true
          }
        } : undefined
      }
    });
    
    return res.status(201).json(review);
  } catch (err) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({ error: err.errors });
    }
    console.error('Erro ao criar review:', err);
    return res.status(500).json({ error: 'Erro ao criar review' });
  }
};

export const getReviewsByProvider = async (req: Request, res: Response) => {
  try {
    const { providerId } = req.params;
    
    // Verificar se o provider existe
    const provider = await prisma.user.findUnique({
      where: { id: providerId }
    });
    
    if (!provider) {
      return res.status(404).json({ error: 'Provedor não encontrado' });
    }
    
    // Buscar todas as reviews do provider
    const reviews = await prisma.review.findMany({
      where: { providerId },
      include: {
        client: {
          select: {
            id: true,
            name: true
          }
        },
        service: {
          select: {
            id: true,
            name: true
          }
        }
      }
    });
    
    // Calcular média das avaliações
    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    const averageRating = reviews.length > 0 ? totalRating / reviews.length : 0;
    
    return res.json({
      reviews,
      averageRating: Number(averageRating.toFixed(1)),
      totalReviews: reviews.length
    });
  } catch (err) {
    console.error('Erro ao buscar reviews:', err);
    return res.status(500).json({ error: 'Erro ao buscar reviews' });
  }
};

export const getReviewsByService = async (req: Request, res: Response) => {
  try {
    const { serviceId } = req.params;
    
    // Verificar se o serviço existe
    const service = await prisma.service.findUnique({
      where: { id: serviceId }
    });
    
    if (!service) {
      return res.status(404).json({ error: 'Serviço não encontrado' });
    }
    
    // Buscar todas as reviews do serviço
    const reviews = await prisma.review.findMany({
      where: { serviceId },
      include: {
        client: {
          select: {
            id: true,
            name: true
          }
        }
      }
    });
    
    // Calcular média das avaliações
    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    const averageRating = reviews.length > 0 ? totalRating / reviews.length : 0;
    
    return res.json({
      reviews,
      averageRating: Number(averageRating.toFixed(1)),
      totalReviews: reviews.length
    });
  } catch (err) {
    console.error('Erro ao buscar reviews:', err);
    return res.status(500).json({ error: 'Erro ao buscar reviews' });
  }
};

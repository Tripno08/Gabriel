import { Request, Response } from 'express';
import prisma from '../config/prisma';
import { z } from 'zod';

// Schema para validação de serviços
const serviceSchema = z.object({
  name: z.string().min(3, 'Nome deve ter pelo menos 3 caracteres'),
  description: z.string().min(10, 'Descrição deve ter pelo menos 10 caracteres'),
  category: z.string().optional(),
  price: z.number().nonnegative().optional()
});

export const createService = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'Usuário não autenticado' });
    }

    const { name, description, category, price } = serviceSchema.parse(req.body);

    const service = await prisma.service.create({
      data: {
        name,
        description,
        category: category || 'Geral',
        price: price || 0,
        providerId: req.user.userId
      }
    });

    return res.status(201).json(service);
  } catch (err) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({ error: err.errors });
    }
    console.error('Erro ao criar serviço:', err);
    return res.status(500).json({ error: 'Erro ao criar serviço' });
  }
};

export const getAllServices = async (req: Request, res: Response) => {
  try {
    const { category, search } = req.query;
    
    const where: any = {};
    
    if (category) {
      where.category = category as string;
    }
    
    if (search) {
      where.OR = [
        { name: { contains: search as string, mode: 'insensitive' } },
        { description: { contains: search as string, mode: 'insensitive' } },
      ];
    }
    
    const services = await prisma.service.findMany({
      where,
      include: {
        provider: {
          select: {
            id: true,
            name: true,
          }
        }
      }
    });
    
    return res.json(services);
  } catch (err) {
    console.error('Erro ao listar serviços:', err);
    return res.status(500).json({ error: 'Erro ao listar serviços' });
  }
};

export const getServiceById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    const service = await prisma.service.findUnique({
      where: { id },
      include: {
        provider: {
          select: {
            id: true,
            name: true,
            email: true,
          }
        },
        reviews: {
          include: {
            client: {
              select: {
                id: true,
                name: true,
              }
            }
          }
        }
      }
    });
    
    if (!service) {
      return res.status(404).json({ error: 'Serviço não encontrado' });
    }
    
    return res.json(service);
  } catch (err) {
    console.error('Erro ao buscar serviço:', err);
    return res.status(500).json({ error: 'Erro ao buscar serviço' });
  }
};

export const updateService = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'Usuário não autenticado' });
    }
    
    const { id } = req.params;
    
    // Verificar se o serviço existe e pertence ao usuário
    const service = await prisma.service.findUnique({
      where: { id }
    });
    
    if (!service) {
      return res.status(404).json({ error: 'Serviço não encontrado' });
    }
    
    if (service.providerId !== req.user.userId) {
      return res.status(403).json({ error: 'Você não tem permissão para editar este serviço' });
    }
    
    const validatedData = serviceSchema.partial().parse(req.body);
    
    const updatedService = await prisma.service.update({
      where: { id },
      data: validatedData
    });
    
    return res.json(updatedService);
  } catch (err) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({ error: err.errors });
    }
    console.error('Erro ao atualizar serviço:', err);
    return res.status(500).json({ error: 'Erro ao atualizar serviço' });
  }
};

export const deleteService = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'Usuário não autenticado' });
    }
    
    const { id } = req.params;
    
    // Verificar se o serviço existe e pertence ao usuário
    const service = await prisma.service.findUnique({
      where: { id }
    });
    
    if (!service) {
      return res.status(404).json({ error: 'Serviço não encontrado' });
    }
    
    if (service.providerId !== req.user.userId) {
      return res.status(403).json({ error: 'Você não tem permissão para excluir este serviço' });
    }
    
    await prisma.service.delete({
      where: { id }
    });
    
    return res.status(204).send();
  } catch (err) {
    console.error('Erro ao excluir serviço:', err);
    return res.status(500).json({ error: 'Erro ao excluir serviço' });
  }
};

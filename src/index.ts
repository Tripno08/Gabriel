import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';
import cookieParser from 'cookie-parser';
import { PrismaClient } from '@prisma/client';

import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';
import serviceRoutes from './routes/service.routes';
import reviewRoutes from './routes/review.routes';

const app = express();
const PORT = process.env.PORT || 3000;

// Configuração do Prisma
export const prisma = new PrismaClient();

// Middlewares
app.use(cors({
  origin: [
    'http://localhost:5173', 
    'http://localhost:5174', 
    'http://localhost:5175',
    'http://localhost:4173',
    'http://192.168.0.2:5173',
    'http://192.168.0.2:5174',
    'http://192.168.0.2:4173',
    'http://192.168.15.173:5173',
    'http://192.168.15.173:5174',
    'http://192.168.15.173:4173',
    'http://10.0.2.2:5173',
    'http://10.0.2.2:5174',
    'http://10.0.2.2:4173',
    'capacitor://localhost',
    'ionic://localhost',
    'http://localhost'
  ],
  credentials: true
}));
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());

// Servir arquivos estáticos
app.use(express.static(path.join(__dirname, '../public')));

// Configuração das rotas da API
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/reviews', reviewRoutes);

// Rota para o SPA React - usando rotas específicas em vez de wildcard
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Middleware para tratamento de erros
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Erro interno do servidor' });
});

// Iniciar servidor
app.listen(Number(PORT), '0.0.0.0', () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});

// Tratamento de exceções não capturadas
process.on('unhandledRejection', (error) => {
  console.error('Unhandled Rejection:', error);
});

// Encerramento gracioso
process.on('SIGINT', async () => {
  await prisma.$disconnect();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  await prisma.$disconnect();
  process.exit(0);
});

import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Iniciando seed...')

  // Limpar dados existentes
  await prisma.review.deleteMany()
  await prisma.service.deleteMany()
  await prisma.user.deleteMany()

  // Criar usuários de teste
  const hashedPassword = await bcrypt.hash('senha123', 10)

  const cliente = await prisma.user.create({
    data: {
      name: 'Cliente Teste',
      email: 'cliente@teste.com',
      password: hashedPassword,
      role: 'CLIENT'
    }
  })

  const prestador = await prisma.user.create({
    data: {
      name: 'Prestador Teste',
      email: 'prestador@teste.com',
      password: hashedPassword,
      role: 'PROVIDER'
    }
  })

  console.log('✅ Usuários criados:', { cliente: cliente.email, prestador: prestador.email })

  // Criar alguns serviços para o prestador
  const servicos = await Promise.all([
    prisma.service.create({
      data: {
        name: 'Desenvolvimento Web',
        description: 'Criação de sites e aplicações web modernas',
        providerId: prestador.id
      }
    }),
    prisma.service.create({
      data: {
        name: 'Design Gráfico',
        description: 'Criação de identidade visual e materiais gráficos',
        providerId: prestador.id
      }
    }),
    prisma.service.create({
      data: {
        name: 'Consultoria de TI',
        description: 'Consultoria especializada em tecnologia da informação',
        providerId: prestador.id
      }
    })
  ])

  console.log('✅ Serviços criados:', servicos.length)

  // Criar algumas avaliações
  const reviews = await Promise.all([
    prisma.review.create({
      data: {
        rating: 5,
        comment: 'Excelente serviço! Muito profissional.',
        clientId: cliente.id,
        providerId: prestador.id
      }
    }),
    prisma.review.create({
      data: {
        rating: 4,
        comment: 'Bom trabalho, recomendo.',
        clientId: cliente.id,
        providerId: prestador.id
      }
    })
  ])

  console.log('✅ Avaliações criadas:', reviews.length)
  console.log('🎉 Seed concluído com sucesso!')
}

main()
  .catch((e) => {
    console.error('❌ Erro no seed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 
# Arquitetura do Sistema

## Visão Geral
Sistema de marketplace de serviços desenvolvido como MVP/prova de conceito, focando em funcionalidades essenciais com experiência mobile nativa através do Capacitor. A arquitetura prioriza adaptabilidade entre web e mobile sem otimizações complexas para grandes volumes.

## Stack Tecnológica
- **Backend**: Node.js + TypeScript + Express
- **ORM**: Prisma
- **Banco de Dados**: PostgreSQL (produção), SQLite (desenvolvimento)
- **Frontend Web**: React + TypeScript + Vite
- **Frontend Mobile**: Capacitor (wrapper nativo)
- **Estilização**: Tailwind CSS
- **Segurança**: bcrypt, JWT, helmet, cookie-parser
- **Validação**: zod
- **Logging**: morgan
- **Mobile Icons**: Lucide React

## Estrutura do Projeto
```
gabriel/
├── docs/               # Documentação do projeto
├── frontend/           # Aplicação frontend React
│   ├── android/        # Build nativo Android (Capacitor)
│   │   ├── app/        # Código nativo Android
│   │   └── gradle/     # Configuração build Android
│   ├── public/         # Arquivos estáticos
│   └── src/            # Código fonte frontend
│       ├── assets/     # Imagens e outros recursos
│       ├── components/ # Componentes React
│       │   ├── layout/ # Componentes de layout adaptativos
│       │   │   ├── MainLayout.tsx       # Layout principal adaptativo
│       │   │   ├── MobileLayout.tsx     # Layout específico mobile
│       │   │   ├── BottomNavigation.tsx # Navegação inferior mobile
│       │   │   ├── SplashScreen.tsx     # Tela de splash nativa
│       │   │   ├── AuthLayout.tsx       # Layout autenticação
│       │   │   ├── Header.tsx           # Cabeçalho web
│       │   │   └── Footer.tsx           # Rodapé (oculto no mobile)
│       │   ├── common/ # Componentes reutilizáveis
│       │   ├── client/ # Componentes específicos cliente
│       │   └── provider/ # Componentes específicos prestador
│       ├── context/    # Contextos React (Auth, etc)
│       └── pages/      # Páginas da aplicação
│           ├── auth/   # Páginas de autenticação responsivas
│           ├── client/ # Páginas específicas para clientes (mobile-first)
│           ├── common/ # Páginas comuns (home, serviços) responsivas
│           └── provider/ # Páginas específicas para prestadores (mobile-first)
├── generated/          # Arquivos gerados pelo Prisma
├── prisma/             # Configuração do banco de dados
├── public/             # Arquivos estáticos do backend
└── src/                # Código fonte do backend
    ├── config/         # Configurações
    ├── controllers/    # Controladores
    ├── middlewares/    # Middlewares
    ├── models/         # Modelos
    ├── routes/         # Rotas
    └── types/          # Tipos TypeScript
```

## Arquitetura Mobile-First

### Detecção de Ambiente
O sistema implementa detecção inteligente do ambiente de execução:

```typescript
const checkMobile = () => {
  const isCapacitor = !!(window as any).Capacitor      // App nativo
  const isMobileUserAgent = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
  const isSmallScreen = window.innerWidth <= 768       // Tela pequena
  
  return isCapacitor || (isMobileUserAgent && isSmallScreen)
}
```

### Layouts Adaptativos

#### MainLayout (Híbrido)
Layout principal que adapta baseado no ambiente:
- **Web Desktop**: Header + Footer + conteúdo central
- **Web Mobile**: Header mobile + navegação inferior
- **App Nativo**: Header compacto + navegação inferior + safe areas

#### MobileLayout (Dedicado)
Layout específico para experiência mobile premium:
- Header com saudação personalizada
- Indicadores de notificação
- Navegação inferior sempre visível
- Background otimizado
- Safe area support

### Sistema de Navegação Mobile

#### BottomNavigation
Navegação adaptativa baseada no role do usuário:

**Clientes (CLIENT)**:
```
[Home] [Buscar] [Pedidos] [Reviews] [Perfil]
  🏠     🔍       💬        ⭐       👤
```

**Prestadores (PROVIDER)**:
```
[Home] [Serviços] [Criar] [Solicitações] [Config]
  🏠      💼      ➕ (✨)      💬        ⚙️
```

## Modelo de Dados

### User
- Representa tanto clientes quanto prestadores de serviços
- Campos principais:
  - id: UUID
  - name: string
  - email: string (único)
  - password: string (hash)
  - role: enum (CLIENT/PROVIDER)
  - createdAt: datetime

### Service
- Serviços oferecidos pelos prestadores
- Campos principais:
  - id: UUID
  - name: string
  - description: string
  - providerId: UUID (ref: User)
  - createdAt: datetime

### Review
- Avaliações dos serviços
- Campos principais:
  - id: UUID
  - providerId: UUID (ref: User)
  - clientId: UUID (ref: User)
  - rating: integer
  - comment: string (opcional)
  - createdAt: datetime

### Request
- Solicitações de serviços
- Campos principais:
  - id: UUID
  - serviceId: UUID (ref: Service)
  - clientId: UUID (ref: User)
  - providerId: UUID (ref: User)
  - status: enum (PENDING/ACCEPTED/REJECTED/COMPLETED)
  - createdAt: datetime

## Componentes de Layout

### SplashScreen
Tela de inicialização para app mobile:
- Duração: 2.5 segundos
- Animações: ícones sparkles e hearts
- Branding: Logo Gabriel + tagline
- Transição suave para dashboard

### AuthLayout
Layout específico para páginas de autenticação:
- Centraliza o conteúdo
- Design limpo e focado
- Responsivo para web e mobile
- Utilizado nas rotas /login e /register

### Adaptive MainLayout
Layout principal com detecção automática:
- **Desktop**: Header completo + Footer + conteúdo central
- **Mobile**: Header compacto + BottomNavigation + background cinza
- **Capacitor**: Comportamento nativo + safe areas + splash screen

## Padrões de Interface Mobile

### Dashboard Design
**Desktop**: Tabelas + cards grandes + métricas detalhadas
**Mobile**: Grid 3 colunas + cards compactos + ações rápidas

### Listagens
**Desktop**: Tabelas com muitas colunas + paginação
**Mobile**: Cards horizontais + scroll infinito + filtros compactos

### Formulários
**Desktop**: Layouts em colunas + labels laterais
**Mobile**: Stack vertical + labels superiores + teclado otimizado

## Fluxos Principais

### Inicialização Mobile
1. **Splash Screen**: Exibição por 2.5s com animações
2. **Token Check**: Verificação de autenticação existente
3. **Redirect**: Dashboard apropriado ou login
4. **Bottom Nav**: Ativação da navegação inferior

### Autenticação
1. Registro de usuário (POST /api/auth/register)
2. Login (POST /api/auth/login)
3. Token JWT retornado para autenticação
4. Redirecionamento para dashboard baseado no role

### Serviços
1. Listagem de serviços (GET /api/services)
   - **Web**: Grid cards + filtros laterais
   - **Mobile**: Lista vertical + filtros compactos
2. Criação de serviço (POST /api/services) - apenas PROVIDERS
3. Detalhes do serviço (GET /api/services/:id)
4. Atualização de serviço (PUT /api/services/:id)
5. Remoção de serviço (DELETE /api/services/:id)

### Reviews
1. Criação de review (POST /api/reviews)
2. Listagem de reviews por serviço (GET /api/services/:id/reviews)
3. Listagem de reviews por provider (GET /api/users/:id/reviews)

### Requests (Solicitações de Serviço)
1. Criação de solicitação (POST /api/requests)
2. Listagem de solicitações por cliente (GET /api/client/requests)
3. Listagem de solicitações por prestador (GET /api/provider/requests)
4. Atualização de status (PUT /api/requests/:id/status)
5. Detalhes da solicitação (GET /api/requests/:id)

## Pipeline de Build Mobile

### Desenvolvimento
```bash
npm run dev          # Frontend web (5173)
npm run preview      # Frontend build (4173)
npx cap sync android # Sincronizar com Capacitor
npx cap run android  # Build + deploy no emulador
```

### Produção
```bash
npm run build        # Build otimizado
npx cap sync android # Sync final
npx cap build android # APK de produção
```

## Considerações de Segurança
- Senhas sempre hasheadas com bcrypt
- Tokens JWT para autenticação
- Validação de entrada com zod
- Headers de segurança com helmet
- CORS configurado apenas para origens permitidas
- Conexão entre frontend e backend via http com validação
- **Mobile**: Token armazenado de forma segura via Capacitor Storage

## Performance Mobile
- **Bundle Size**: ~530KB (otimizado para mobile)
- **Lazy Loading**: Preparado para code splitting
- **Image Optimization**: Formatos responsivos
- **Memory Management**: Limpeza de listeners e recursos
- **Touch Optimization**: Elementos tocáveis ≥44px

## Melhorias Arquiteturais Recentes

### Mobile-First Redesign
- **Layout Adaptativo**: Detecção automática de ambiente
- **Navegação Contextual**: Bottom navigation baseada em role
- **Interface Responsiva**: Cards substituem tabelas em telas pequenas
- **UX Otimizada**: Redução de scroll e ações rápidas destacadas

### Capacitor Integration
- **App Nativo**: Build Android funcional e testado
- **Splash Screen**: Experiência de inicialização profissional
- **Safe Areas**: Suporte a diferentes dispositivos e orientações
- **Native Feel**: Interface sem elementos de navegador

### Arquitetura Componentizada
- **Reusabilidade**: Componentes adaptativos para web e mobile
- **Consistência**: Design system unified entre plataformas
- **Manutenibilidade**: Separação clara entre lógica web e mobile

## Limitações do MVP
- Sem paginação inicial
- Sem cache
- Sem otimizações de consulta
- Sem sistema de pagamentos
- Sem upload de arquivos
- Sem notificações em tempo real
- **Mobile**: Sem funcionalidades nativas avançadas (câmera, GPS, etc.)

## Próximos Passos Arquiteturais

### Capacitor Enhancements
- **Push Notifications**: Implementar notificações nativas
- **Camera Integration**: Upload de fotos via câmera nativa
- **Geolocation**: Busca por serviços próximos
- **Offline Support**: Funcionalidade básica sem internet
- **Deep Linking**: URLs customizadas para o app

### Escalabilidade
- **State Management**: Implementar Redux/Zustand para apps maiores
- **Code Splitting**: Dividir bundle por rotas/features
- **PWA Features**: Service workers e cache strategies
- **Micro-frontends**: Separação por domínio de negócio 
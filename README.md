# Gabriel - Plataforma Mobile de Marketplace de Serviços

## Visão Geral
Gabriel é uma plataforma mobile-first que conecta clientes e prestadores de serviços. O sistema permite que prestadores ofertem seus serviços e que clientes os contratem, realizem avaliações e gerenciem seus pedidos através de uma experiência nativa otimizada para dispositivos móveis.

## 🚀 Guia Rápido de Configuração Local

Para configurar e executar o projeto completo em sua máquina:

```bash
# Clone o repositório
git clone [URL_DO_REPOSITORIO]
cd gabriel

# Configure e execute tudo de uma vez
npm run setup    # Instala dependências, configura DB e seeds
npm run dev:all  # Inicia backend (Docker) e frontend

# Acessar:
# Frontend: http://localhost:5173
# Backend: http://localhost:3000
# iOS/Android: veja LOCAL_SETUP.md
```

📖 **Guia completo**: [LOCAL_SETUP.md](LOCAL_SETUP.md) - Instruções detalhadas para todos os ambientes

## 🚀 Tecnologias Utilizadas

### Backend
- Node.js + TypeScript
- Express
- Prisma ORM
- PostgreSQL / SQLite
- JWT para autenticação
- Bcrypt para criptografia de senhas
- Zod para validação de dados

### Frontend Web & Mobile
- **Framework**: React + TypeScript
- **Build Tool**: Vite
- **Mobile Framework**: Capacitor (app nativo Android)
- **Estilização**: Tailwind CSS (mobile-first)
- **Roteamento**: React Router v6
- **Estado**: Context API
- **Formulários**: React Hook Form + Zod
- **Componentes**: HeadlessUI
- **Ícones**: Heroicons + Lucide React
- **HTTP Client**: Axios

## 📱 Características Mobile

### Experiência Nativa
- **App Android**: Compilado via Capacitor para experiência nativa
- **Splash Screen**: Tela de inicialização com branding Gabriel
- **Bottom Navigation**: Navegação inferior adaptativa por tipo de usuário
- **Touch Optimization**: Elementos tocáveis otimizados (≥44px)
- **Safe Areas**: Suporte completo a diferentes dispositivos

### Interface Adaptativa
- **Detecção Automática**: Identifica ambiente mobile/Capacitor
- **Layouts Responivos**: MainLayout adapta entre web e mobile
- **Cards Mobile**: Substituição de tabelas por cards em mobile
- **Filtros Compactos**: Interface de busca otimizada para touch
- **Dashboard Mobile**: Grid 3 colunas com ações rápidas

### Navegação Contextual
**Clientes**: Home | Buscar | Pedidos | Reviews | Perfil  
**Prestadores**: Home | Serviços | Criar⭐ | Solicitações | Config

## Arquitetura
O projeto segue uma arquitetura cliente-servidor mobile-first com detecção automática de ambiente:

- **Backend**: API RESTful com Express, seguindo padrões MVC
- **Frontend Web**: SPA React responsivo
- **Frontend Mobile**: App nativo via Capacitor com interface otimizada
- **Layouts Adaptativos**: Componentes que detectam e adaptam ao ambiente

Para mais detalhes:
- [Arquitetura Geral](docs/ARCHITECTURE.md)
- [Documentação Frontend](docs/FRONTEND.md)  
- [Arquitetura Mobile](docs/MOBILE.md)

## 🛠️ Instalação e Execução

### Pré-requisitos
- Node.js (v16+)
- npm ou yarn
- Android Studio + SDK (para desenvolvimento mobile)
- Docker e Docker Compose (opcional)

### Desenvolvimento Mobile (Recomendado)

```bash
# Clonar o repositório
git clone https://github.com/seu-usuario/gabriel.git
cd gabriel

# Backend
npm install
npx prisma migrate dev
npm run dev &                    # Inicia backend na porta 3000

# Frontend + Mobile
cd frontend
npm install
npm run build                    # Build de produção
npx cap sync android            # Sincronizar com Capacitor
npx cap run android             # Compilar e rodar no emulador

# O app será instalado automaticamente no emulador Android
```

### Desenvolvimento Web

```bash
# Backend
npm run dev                     # http://localhost:3000

# Frontend (em outro terminal)
cd frontend
npm run dev                     # http://localhost:5173
```

### Usando Docker
```bash
docker-compose up -d
# Frontend: http://localhost:5173
# Backend: http://localhost:3000
```

## 📁 Estrutura de Diretórios

```
gabriel/
├── docs/                    # Documentação completa
│   ├── ARCHITECTURE.md      # Arquitetura geral
│   ├── FRONTEND.md          # Documentação frontend
│   ├── MOBILE.md           # Arquitetura mobile específica
│   └── API.md              # Documentação da API
├── frontend/               # Aplicação React + Mobile
│   ├── android/           # Build nativo Android (Capacitor)
│   ├── src/
│   │   ├── components/
│   │   │   └── layout/    # Layouts adaptativos (MainLayout, MobileLayout, etc)
│   │   └── pages/         # Páginas mobile-first
│   ├── capacitor.config.ts # Configuração Capacitor
│   └── package.json
├── src/                   # Backend API
│   ├── controllers/       # Controladores
│   ├── middlewares/      # Middlewares
│   ├── routes/           # Rotas da API
│   └── types/            # Tipos TypeScript
├── prisma/               # Schema e migrações
└── docker-compose.yml    # Container config
```

## 📱 Funcionalidades Mobile

### Experiência do Cliente
- **Dashboard Compacto**: Cards com estatísticas e ações rápidas
- **Busca Otimizada**: Filtros em cards, resultados horizontais
- **Pedidos em Cards**: Visualização touch-friendly
- **Reviews Simplificadas**: Interface mobile para avaliações

### Experiência do Prestador  
- **Dashboard Business**: Métricas em grid + ações destacadas
- **Gestão Rápida**: Serviços e solicitações em cards
- **Criação Destacada**: Botão criar sempre em evidência
- **Notificações Visuais**: Indicadores de novas solicitações

### Funcionalidades Gerais
- **Splash Screen**: Inicialização com branding (2.5s)
- **Auto-login**: Verificação automática de token
- **Safe Navigation**: Navegação inferior sempre acessível
- **Touch Optimized**: Todos os elementos otimizados para toque

## 🎯 Pipeline de Desenvolvimento Mobile

```bash
# 1. Desenvolvimento web
npm run dev                  # http://localhost:5173

# 2. Build de produção  
npm run build               # Gera /dist otimizado

# 3. Sincronização mobile
npx cap sync android        # Copia build para Android

# 4. Desenvolvimento mobile
npx cap run android         # Compila + instala no emulador

# 5. Build de produção mobile
npx cap build android       # Gera APK/AAB para publicação
```

## 🔧 Configuração do Emulador

```bash
# Verificar emuladores disponíveis
emulator -list-avds

# Iniciar emulador (ajustar nome conforme seu AVD)
emulator -avd gabriel_emulator &

# Verificar dispositivos conectados
adb devices
```

## 📊 Performance Mobile
- **Bundle Size**: ~530KB (otimizado para mobile)
- **Load Time**: <3s em conexões 3G
- **Memory Usage**: Gerenciamento eficiente de recursos
- **Touch Response**: <100ms para todas as interações

## 🚀 Próximos Passos Mobile

### Funcionalidades Nativas
- **Push Notifications**: Notificações via Capacitor
- **Camera Integration**: Upload de fotos nativo
- **Geolocation**: Busca por serviços próximos
- **Offline Support**: Funcionalidade básica offline

### Melhorias de UX
- **Dark Mode**: Tema escuro automático
- **Haptic Feedback**: Vibração em ações importantes
- **Pull to Refresh**: Atualização de listas
- **Infinite Scroll**: Carregamento progressivo

## 📖 Documentação Completa

- **[docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)**: Arquitetura geral do sistema
- **[docs/FRONTEND.md](docs/FRONTEND.md)**: Frontend web e mobile detalhado
- **[docs/MOBILE.md](docs/MOBILE.md)**: Arquitetura mobile específica
- **[docs/API.md](docs/API.md)**: Documentação completa da API

## 🎨 Design System Mobile

### Princípios
1. **Touch First**: Elementos tocáveis adequados
2. **Thumb Navigation**: Controles acessíveis
3. **Visual Hierarchy**: Informações importantes em destaque
4. **Reduced Cognitive Load**: Menos opções por tela
5. **Fast Actions**: Ações importantes sempre visíveis

### Componentes Mobile
- **Bottom Navigation**: Navegação principal
- **Cards**: Containers de informação mobile
- **Quick Actions**: Botões de ação rápida
- **Mobile Forms**: Formulários otimizados
- **Touch Targets**: Elementos ≥44px

## 🤝 Contribuição
Para contribuir com o projeto:

1. Fork do repositório
2. Crie uma branch (`git checkout -b feature/nova-funcionalidade`)
3. Teste em ambiente mobile (`npx cap run android`)
4. Commit das alterações (`git commit -m 'Adiciona nova funcionalidade mobile'`)
5. Push para a branch (`git push origin feature/nova-funcionalidade`)
6. Abra um Pull Request

### Guidelines de Desenvolvimento Mobile
- Sempre testar em emulador/dispositivo real
- Seguir princípios mobile-first
- Otimizar para touch (mín. 44px)
- Considerar diferentes tamanhos de tela
- Validar performance em dispositivos mais lentos

## 📄 Licença
Este projeto está licenciado sob a [MIT License](LICENSE).

---

## 🏆 Marcos do Projeto

- ✅ **MVP Web**: Interface web responsiva completa
- ✅ **Mobile-First**: Redesign com foco em mobile
- ✅ **App Nativo**: Build Android via Capacitor
- ✅ **Splash Screen**: Experiência de inicialização
- ✅ **Bottom Navigation**: Navegação mobile contextual
- ✅ **Dashboard Mobile**: Interface otimizada para touch
- 🔄 **Próximo**: Push notifications e funcionalidades nativas

# ✅ WYN API - Projeto Back-End (Checkpoint)

API desenvolvida em Node.js com TypeScript, Prisma e SQLite para gerenciamento de usuários, serviços e avaliações.  
Faz parte do projeto WYN - um marketplace de serviços, como parte do curso de Análise e Desenvolvimento de Sistemas.

---

## 🚀 Tecnologias Utilizadas

- **Node.js + Express**
- **TypeScript**
- **Prisma ORM**
- **SQLite** (banco leve embutido)
- **Zod** (validação de dados)
- **Docker Ready** (para rodar de qualquer lugar)
- **Nodemon + TS-Node** (ambiente de desenvolvimento)

---

## 📦 Instalação Local

```bash
git clone https://github.com/GabrielFerrazO/CheckpointWyn.git
cd CheckpointWyn
npm install
npx prisma generate
npm run dev

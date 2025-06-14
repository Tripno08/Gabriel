# Prompt para Continuar o Desenvolvimento do Wyn App no Cursor

## Contexto do Projeto

Você está continuando o desenvolvimento de um marketplace de serviços chamado **Wyn** (anteriormente Gabriel). O projeto está em um estágio avançado com frontend React/TypeScript, backend Node.js/Express com Prisma, e app mobile usando Capacitor.

## Estado Atual do Projeto

### 🎨 Identidade Visual
- **Nome**: Wyn
- **Cores principais**: Laranja (primary) - #F97316
- **Logo**: Texto "Wyn" em laranja
- **Design**: Moderno, limpo, com sombras suaves e bordas arredondadas

### 🏗️ Arquitetura
- **Frontend**: React 19 + TypeScript + Vite + TailwindCSS
- **Backend**: Node.js + Express + Prisma + PostgreSQL (rodando em Docker)
- **Mobile**: Capacitor para Android
- **Autenticação**: JWT
- **API**: RESTful

### 📱 Funcionalidades Implementadas

#### Autenticação
- ✅ Login/Registro para Clientes e Prestadores
- ✅ JWT com contexto de autenticação
- ✅ Proteção de rotas por tipo de usuário

#### Área do Cliente
- ✅ Dashboard com estatísticas
- ✅ Busca e visualização de serviços
- ✅ Solicitação de serviços
- ✅ Sistema de mensagens com prestadores
- ✅ Avaliações e reviews
- ✅ Pagamento via PIX com QR Code (simulado)
- ✅ Histórico de pedidos
- ✅ Edição de perfil

#### Área do Prestador
- ✅ Dashboard com métricas
- ✅ Gerenciamento de serviços (CRUD completo)
- ✅ Recebimento e gestão de solicitações
- ✅ Sistema de mensagens com clientes
- ✅ Visualização de avaliações
- ✅ QR Code PIX para recebimento
- ✅ Edição de perfil

#### Funcionalidades Gerais
- ✅ Página inicial responsiva
- ✅ Página de suporte com FAQ
- ✅ Navegação mobile com bottom navigation
- ✅ Service Worker para limpeza de cache
- ✅ Configuração de API dinâmica (localhost/10.0.2.2)

### 🔧 Configurações Importantes

#### API Configuration (frontend/src/config/api.ts)
```typescript
// No Android: http://10.0.2.2:3000/api
// No Browser: http://localhost:3000/api
```

#### Docker Services
- PostgreSQL: porta 5432
- API Backend: porta 3000

#### Capacitor Config
- App ID: com.wyn.app
- App Name: Wyn

### 📂 Estrutura de Pastas
```
/
├── frontend/          # Aplicação React
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   └── config/
│   └── android/      # Projeto Android
├── src/              # Backend Node.js
│   ├── controllers/
│   ├── routes/
│   ├── middlewares/
│   └── models/
├── prisma/           # Schema do banco
└── docker-compose.yml
```

## Como Continuar o Desenvolvimento

### 1. Setup Inicial (Mac Intel)

```bash
# Clone o repositório
git clone https://github.com/Tripno08/gabriel_wyn.git
cd gabriel_wyn

# Instale as dependências do backend
npm install

# Instale as dependências do frontend
cd frontend
npm install

# Volte para a raiz
cd ..

# Inicie os serviços Docker
docker-compose up -d

# Inicie o frontend
cd frontend
npm run dev

# Em outro terminal, para rodar no emulador Android
cd frontend
npm run build
npx cap sync android
npx cap run android
```

### 2. Credenciais de Teste
- **Cliente**: cliente@teste.com / senha123
- **Prestador**: prestador@teste.com / senha123

### 3. Próximos Passos Sugeridos

1. **Implementar Backend Real**
   - Conectar as rotas mockadas com o Prisma
   - Implementar upload real de imagens
   - Sistema de notificações

2. **Melhorias no Frontend**
   - Implementar busca com filtros avançados
   - Sistema de chat em tempo real
   - Modo escuro
   - PWA completo

3. **Funcionalidades de Pagamento**
   - Integração real com gateway de pagamento
   - Histórico de transações
   - Relatórios financeiros

4. **Sistema de Avaliações**
   - Média de estrelas
   - Filtros por avaliação
   - Respostas do prestador

5. **Geolocalização**
   - Busca por proximidade
   - Mapa de prestadores
   - Cálculo de distância

### 4. Comandos Úteis

```bash
# Backend
docker-compose up -d          # Inicia serviços
docker-compose logs -f api    # Logs da API
docker ps                     # Ver containers rodando

# Frontend
npm run dev                   # Desenvolvimento
npm run build                 # Build produção
npx cap sync android         # Sincronizar com Android
npx cap run android          # Rodar no emulador

# Git
git add .
git commit -m "mensagem"
git push origin main
```

### 5. Regras e Padrões do Projeto

#### Código
- TypeScript strict mode
- Componentes funcionais React
- Hooks customizados para lógica complexa
- Tailwind para estilização
- Zod para validação

#### Git
- Commits em português
- Branches: feature/*, fix/*, refactor/*
- Pull requests com descrição detalhada

#### Estilo
- Cores sempre usando as variáveis do Tailwind
- Botões com classe .btn
- Cards com classe .card
- Sombras usando shadow-soft

### 6. Problemas Conhecidos e Soluções

1. **Connection Refused no Emulador**
   - Sempre use 10.0.2.2:3000 no Android
   - Verifique se o Docker está rodando

2. **Erro 404 em rotas**
   - Limpe o cache: npm run build
   - Reinstale no emulador

3. **Service Worker cache**
   - Já implementado sw-clear.js
   - Limpa cache automaticamente

## Instruções para o Cursor AI

Ao trabalhar neste projeto:

1. **Mantenha a consistência visual** - Use sempre as cores laranja definidas e o estilo estabelecido
2. **Siga os padrões de código** - TypeScript, componentes funcionais, Tailwind
3. **Teste no emulador** - Sempre compile e teste mudanças no Android
4. **Documente mudanças** - Comente código complexo e atualize este documento
5. **Preserve funcionalidades** - Não quebre features existentes ao adicionar novas

## Estado dos Dados

- Backend está com dados mockados
- Autenticação funciona mas não persiste no banco real
- Imagens são simuladas (URLs placeholder)
- Pagamentos são simulados

## Objetivo Final

Criar um marketplace funcional onde:
- Clientes encontrem e contratem serviços facilmente
- Prestadores gerenciem seus negócios eficientemente
- Pagamentos sejam seguros e rastreáveis
- Avaliações garantam qualidade
- Interface seja intuitiva em web e mobile

---

**Última atualização**: 14/06/2025
**Desenvolvedor**: Cursor AI + Humano
**Versão**: 1.0.0-beta 
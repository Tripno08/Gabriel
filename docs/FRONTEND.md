# Frontend para Marketplace de Serviços

## Visão Geral
Frontend moderno e responsivo para o marketplace de serviços, com foco especial em experiência mobile nativa através do Capacitor, priorizando usabilidade tanto em web quanto em dispositivos móveis.

## Tecnologias Utilizadas
- **Framework**: React + TypeScript
- **Build Tool**: Vite
- **Estilização**: Tailwind CSS
- **Mobile Framework**: Capacitor (para app nativo)
- **Gerenciamento de Estado**: React Context API
- **Roteamento**: React Router v6
- **Formulários**: React Hook Form
- **Validação**: Zod
- **Componentes UI**: HeadlessUI
- **Ícones**: Heroicons + Lucide React
- **HTTP Client**: Axios

## Estrutura do Projeto

```
frontend/
├── android/                      # Build nativo Android (Capacitor)
├── public/
│   └── assets/
│       └── images/
├── src/
│   ├── components/
│   │   ├── common/
│   │   │   └── ServiceCard.tsx       # Card responsivo de serviço
│   │   ├── layout/
│   │   │   ├── AuthLayout.tsx        # Layout para páginas de autenticação
│   │   │   ├── MainLayout.tsx        # Layout principal adaptativo
│   │   │   ├── MobileLayout.tsx      # Layout específico para mobile
│   │   │   ├── Header.tsx            # Cabeçalho web
│   │   │   ├── Footer.tsx            # Rodapé (oculto no mobile)
│   │   │   ├── BottomNavigation.tsx  # Navegação inferior mobile
│   │   │   ├── ProtectedRoute.tsx    # Proteção de rotas
│   │   │   └── SplashScreen.tsx      # Tela de splash mobile
│   │   ├── forms/
│   │   ├── client/
│   │   └── provider/
│   ├── context/
│   │   └── auth/
│   │       └── AuthContext.tsx       # Contexto de autenticação
│   ├── hooks/
│   ├── pages/
│   │   ├── auth/
│   │   │   ├── LoginPage.tsx         # Login responsivo
│   │   │   └── RegisterPage.tsx      # Registro responsivo
│   │   ├── client/
│   │   │   ├── DashboardPage.tsx     # Dashboard mobile-first
│   │   │   ├── ProfileEditPage.tsx   # Edição responsiva
│   │   │   ├── RequestsPage.tsx      # Lista adaptativa
│   │   │   ├── RequestDetailPage.tsx # Detalhes responsivos
│   │   │   ├── ReviewsPage.tsx       # Avaliações adaptativas
│   │   │   └── ReviewAddPage.tsx     # Adicionar responsivo
│   │   ├── provider/
│   │   │   ├── DashboardPage.tsx     # Dashboard mobile-first
│   │   │   ├── ProfileEditPage.tsx   # Edição responsiva
│   │   │   ├── ServicesPage.tsx      # Gerenciamento adaptativo
│   │   │   ├── ServiceNewPage.tsx    # Criação responsiva
│   │   │   ├── RequestsPage.tsx      # Lista adaptativa
│   │   │   └── RequestDetailPage.tsx # Detalhes responsivos
│   │   └── common/
│   │       ├── HomePage.tsx          # Página inicial responsiva
│   │       ├── ServicesPage.tsx      # Listagem mobile-first
│   │       ├── ServiceDetailPage.tsx # Detalhes responsivos
│   │       ├── ProviderProfilePage.tsx # Perfil responsivo
│   │       └── NotFoundPage.tsx      # Página 404
│   ├── services/
│   │   └── api.ts                    # Serviço de comunicação com a API
│   ├── types/
│   ├── utils/
│   ├── App.tsx                       # Configuração de rotas + Splash
│   ├── main.tsx                      # Ponto de entrada
│   └── index.css                     # Estilos globais + utilitários mobile
├── capacitor.config.ts               # Configuração Capacitor
├── package.json
└── tailwind.config.js
```

## Arquitetura Mobile-First

### Detecção de Ambiente Mobile
O sistema implementa detecção inteligente do ambiente mobile através de:
- **Capacitor Detection**: Verificação da presença do objeto `window.Capacitor`
- **User Agent**: Identificação de dispositivos móveis via `navigator.userAgent`
- **Screen Size**: Detecção de telas pequenas (≤ 768px)

```typescript
const checkMobile = () => {
  const isCapacitor = !!(window as any).Capacitor
  const isMobileUserAgent = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
  const isSmallScreen = window.innerWidth <= 768
  
  return isCapacitor || (isMobileUserAgent && isSmallScreen)
}
```

## Layouts e Componentes

### MainLayout (Adaptativo)
Layout principal que adapta automaticamente entre web e mobile:
- **Web**: Header + Footer + conteúdo central
- **Mobile**: Header mobile + navegação inferior + fundo cinza
- **Auto-detect**: Detecta ambiente e aplica layout apropriado
- **Responsive**: Remove footer automaticamente no mobile
- **Safe Areas**: Respeita áreas seguras dos dispositivos

### MobileLayout (Específico Mobile)
Layout dedicado para experiência mobile nativa:
- Header compacto com saudação personalizada
- Indicador de notificações
- Navegação inferior fixa
- Padding bottom para navegação
- Background otimizado para mobile

### BottomNavigation
Navegação inferior adaptativa por tipo de usuário:

**Clientes**:
- 🏠 Home (Dashboard)
- 🔍 Buscar (Serviços)
- 💬 Pedidos (Solicitações)
- ⭐ Reviews (Avaliações)
- 👤 Perfil

**Prestadores**:
- 🏠 Home (Dashboard)
- 💼 Serviços
- ➕ Criar (Destaque especial)
- 💬 Solicitações
- ⚙️ Configurações

### SplashScreen
Tela de splash animada para app mobile:
- Animação de 2.5 segundos
- Branding Gabriel
- Tagline "Conectando pessoas e serviços"
- Transição suave para app principal
- Ícones animados (sparkles, hearts)

## Páginas Mobile-First

### Dashboard (Cliente & Provider)
Redesign completo para mobile:
- **Grid 3 colunas**: Estatísticas compactas com ícones
- **Ações Rápidas**: Botões destacados para ações principais
- **Cards de Lista**: Substituição de tabelas por cards responsivos
- **Scroll Reduzido**: Conteúdo otimizado para visualização sem scroll excessivo
- **Layout Condicional**: Tabelas no desktop, cards no mobile

### ServicesPage (Listagem)
Interface mobile otimizada:
- **Filtros Compactos**: Busca e categoria em cards
- **Cards Horizontais**: Layout de linha para melhor uso do espaço
- **Preços Destacados**: Valores em destaque visual
- **Truncation**: Textos com limite de linhas (line-clamp)
- **Touch Targets**: Elementos tocáveis otimizados

## Características Mobile Implementadas

### Responsividade Avançada
- **Mobile-First Design**: Prioridade para dispositivos móveis
- **Adaptive Layouts**: Layouts que mudam baseado no dispositivo
- **Touch Optimization**: Elementos tocáveis de tamanho adequado (44px+)
- **Safe Area Support**: Respeito às áreas seguras (notch, home indicator)

### Navegação Intuitiva
- **Bottom Navigation**: Navegação principal sempre acessível
- **Role-Based**: Menus adaptados ao tipo de usuário
- **Active States**: Indicação visual da página atual
- **Quick Actions**: Ações rápidas em destaque

### Performance Mobile
- **Code Splitting**: Carregamento sob demanda (preparado)
- **Image Optimization**: Imagens responsivas
- **Reduced Scrolling**: Menos necessidade de scroll
- **Fast Transitions**: Transições rápidas e suaves

### Experiência de App Nativo
- **Splash Screen**: Carregamento com branding
- **No Browser UI**: Interface sem elementos do navegador
- **Native Feel**: Experiência similar a apps nativos
- **Capacitor Integration**: Acesso a funcionalidades nativas

## Autenticação e Autorização

### AuthContext
Context API melhorado com suporte mobile:
- Estado de autenticação persistente
- Login e registro com feedback visual mobile
- Armazenamento seguro de token JWT
- Verificação de perfil com redirecionamentos móveis
- Integração com SplashScreen

### Rotas Protegidas Mobile
- Verificação de autenticação otimizada
- Redirecionamentos suaves sem flash
- Loading states apropriados para mobile
- Deep linking support preparado

## Fluxos de Usuário Mobile

### Fluxo de Inicialização
1. **SplashScreen**: 2.5s de animação com branding
2. **Auto-login**: Verificação de token existente
3. **Redirecionamento**: Dashboard ou login baseado no estado
4. **Bottom Navigation**: Sempre visível após autenticação

### Fluxo de Cliente Mobile
1. **Dashboard Compacto**: Cards com estatísticas e ações rápidas
2. **Busca Otimizada**: Filtros em cards, resultados em lista horizontal
3. **Pedidos Cards**: Visualização em cards ao invés de tabelas
4. **Reviews Rápidas**: Interface simplificada para avaliações

### Fluxo de Prestador Mobile
1. **Dashboard Business**: Métricas em grid, ações destacadas
2. **Gestão Simplificada**: Serviços e solicitações em cards
3. **Criação Rápida**: Botão de criar serviço sempre em destaque
4. **Notificações Visuais**: Indicadores de novas solicitações

## Utilitários CSS Mobile

### Classes Adicionais
```css
/* Truncation */
.line-clamp-1, .line-clamp-2, .line-clamp-3

/* Safe Areas */
.safe-area-top, .safe-area-bottom

/* Touch Targets */
.touch-target (min 44px)

/* Mobile Specific */
.mobile-card, .mobile-button, .mobile-input
```

## Melhorias Recentes

### Mobile-First Redesign
- **Layout Adaptativo**: MainLayout detecta automaticamente o ambiente
- **Navegação Inferior**: BottomNavigation baseada em role
- **Dashboard Responsivo**: Cards substituem tabelas em mobile
- **Filtros Otimizados**: Interface de busca mobile-first
- **Footer Condicional**: Removido automaticamente no mobile

### Capacitor Integration
- **Build Nativo**: App Android compilado e testado
- **Splash Screen**: Experiência de inicialização nativa
- **Detecção Ambiente**: Comportamento específico para Capacitor
- **Safe Areas**: Suporte a diferentes dispositivos

### Performance e UX
- **Redução de Scroll**: Interfaces mais compactas
- **Cards Inteligentes**: Substituição de tabelas por cards
- **Ações Rápidas**: Botões de ação principal destacados
- **Estados Visuais**: Feedback visual consistente

## Próximos Passos

### Mobile Enhancements
- **Push Notifications**: Notificações nativas via Capacitor
- **Camera Integration**: Upload de fotos via câmera nativa
- **Geolocation**: Busca por serviços próximos
- **Offline Support**: Funcionalidade básica offline
- **App Store**: Publicação nas lojas de aplicativos

### Recursos Avançados
- **Dark Mode**: Tema escuro adaptativo
- **Accessibility**: Melhorias de acessibilidade mobile
- **Animations**: Micro-interações e transições
- **State Management**: Redux ou Zustand para apps maiores
- **PWA Features**: Progressive Web App capabilities

## Considerações Técnicas Mobile
- **Bundle Size**: Otimização para mobile (530kb atual)
- **Memory Management**: Gerenciamento eficiente de memória
- **Touch Events**: Eventos de toque otimizados
- **Viewport Meta**: Configuração adequada para mobile
- **Hot Reload**: Desenvolvimento rápido com Vite + Capacitor 
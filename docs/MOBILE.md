# Arquitetura Mobile - Gabriel Marketplace

## Visão Geral
Documentação da implementação mobile-first do Gabriel Marketplace, utilizando Capacitor para criar uma experiência nativa em dispositivos móveis mantendo compatibilidade total com a versão web.

## Arquitetura Mobile

### Detecção de Ambiente
O sistema implementa detecção inteligente do ambiente de execução:

```typescript
const checkMobile = () => {
  const isCapacitor = !!(window as any).Capacitor      // App nativo via Capacitor
  const isMobileUserAgent = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
  const isSmallScreen = window.innerWidth <= 768       // Tela pequena (<= 768px)
  
  return isCapacitor || (isMobileUserAgent && isSmallScreen)
}
```

### Layouts Adaptativos

#### MainLayout (Híbrido)
Layout principal que adapta automaticamente baseado no ambiente:

**Web Desktop**:
- Header completo com navegação
- Footer com links institucionais  
- Conteúdo central em container

**Web Mobile**:
- Header compacto
- Navegação inferior (BottomNavigation)
- Background cinza (#f9fafb)
- Footer removido automaticamente

**App Nativo (Capacitor)**:
- Header com saudação personalizada
- Navegação inferior sempre visível
- Safe area support
- Splash screen na inicialização

#### MobileLayout (Dedicado)
Layout específico para páginas que precisam de experiência mobile premium:
- Header compacto com indicador de notificações
- Padding bottom para navegação inferior
- Background otimizado para mobile
- Gerenciamento de estado de navegação

### Sistema de Navegação Mobile

#### BottomNavigation
Navegação inferior adaptativa baseada no role do usuário:

**Clientes (CLIENT)**:
```
┌─────────┬─────────┬─────────┬─────────┬─────────┐
│   🏠    │   🔍    │   💬    │   ⭐    │   👤    │
│  Home   │ Buscar  │ Pedidos │ Reviews │ Perfil  │
└─────────┴─────────┴─────────┴─────────┴─────────┘
```

**Prestadores (PROVIDER)**:
```
┌─────────┬─────────┬─────────┬─────────┬─────────┐
│   🏠    │   💼    │   ➕    │   💬    │   ⚙️    │
│  Home   │Serviços │ Criar*  │Solicita.│ Config  │
└─────────┴─────────┴─────────┴─────────┴─────────┘
```
*Botão "Criar" com destaque especial (primary color)

### SplashScreen
Tela de inicialização para app mobile:
- **Duração**: 2.5 segundos
- **Animações**: Ícones sparkles e hearts com fade-in
- **Branding**: Logo "Gabriel" + tagline
- **Transição**: Fade suave para dashboard
- **Loading**: Pontos animados durante carregamento

```tsx
// Estrutura do SplashScreen
<div className="splash-container">
  <div className="logo-section">
    <Sparkles /> Gabriel <Heart />
  </div>
  <p className="tagline">Conectando pessoas e serviços</p>
  <div className="loading-dots">• • •</div>
</div>
```

## Padrões de Interface Mobile

### Dashboard Design

**Desktop Layout**:
- Cards grandes em grid 4 colunas
- Tabelas completas com muitas colunas
- Estatísticas detalhadas
- Ações em texto

**Mobile Layout**:
- Grid 3 colunas compactas
- Cards substituem tabelas
- Estatísticas com ícones
- Ações em botões grandes

```tsx
// Exemplo de adaptação
if (isMobile) {
  return (
    <div className="grid grid-cols-3 gap-3">
      <StatCard icon={TrendingUp} value="3" label="Serviços" />
      <StatCard icon={Clock} value="2" label="Pendentes" />
      <StatCard icon={DollarSign} value="5k" label="Faturamento" />
    </div>
  )
}
```

### Listagens Responsivas

**ServicesPage Mobile**:
- Filtros em cards compactos
- Lista vertical de cards horizontais
- Imagem 24x24 + conteúdo + preço
- Touch targets otimizados

**Dashboard Lists**:
- Máximo 3 itens por seção
- Link "Ver todos" para páginas completas
- Cards clicáveis com hover states
- Informações essenciais apenas

### Formulários Mobile
- Stack vertical sempre
- Labels superiores
- Inputs com padding adequado (44px altura mínima)
- Botões full-width
- Feedback visual aprimorado

## Fluxos de Usuário Mobile

### Inicialização do App
1. **SplashScreen**: 2.5s com animações e branding
2. **Token Verification**: Verificação silenciosa de autenticação
3. **Auto-redirect**: Dashboard apropriado baseado no role
4. **Navigation Setup**: Ativação da navegação inferior

### Navegação Principal

**Cliente Flow**:
```
Home → Buscar Serviços → Ver Detalhes → Fazer Pedido
  ↓
Pedidos → Ver Status → Avaliar Serviço → Reviews
```

**Prestador Flow**:
```
Home → Gerenciar Serviços → Criar Novo
  ↓
Solicitações → Aceitar/Recusar → Completar
```

## Componentes Mobile Específicos

### ServiceCard Mobile
```tsx
<div className="flex bg-white rounded-xl shadow-sm">
  <img className="w-24 h-24 object-cover" />
  <div className="flex-1 p-4">
    <h3 className="font-semibold line-clamp-1">{title}</h3>
    <p className="text-xs text-gray-600 line-clamp-2">{description}</p>
    <div className="flex justify-between items-end">
      <span className="text-xs text-gray-500">Por {provider}</span>
      <span className="font-bold text-primary-600">{price}</span>
    </div>
  </div>
</div>
```

### Quick Actions
```tsx
<div className="grid grid-cols-2 gap-3">
  <ActionButton 
    icon={Plus} 
    label="Criar Serviço" 
    primary 
    to="/provider/services/new" 
  />
  <ActionButton 
    icon={Briefcase} 
    label="Ver Solicitações" 
    to="/provider/requests" 
  />
</div>
```

## Build e Deploy Mobile

### Estrutura de Build
```
frontend/
├── android/                 # Projeto Android nativo
│   ├── app/
│   │   ├── src/main/
│   │   │   ├── assets/
│   │   │   │   └── public/  # Build do React
│   │   │   ├── java/
│   │   │   └── res/
│   │   └── build.gradle
│   └── gradle/
├── dist/                    # Build de produção do React
├── src/                     # Código fonte React
└── capacitor.config.ts      # Configuração Capacitor
```

### Pipeline de Desenvolvimento
```bash
# 1. Desenvolvimento web
npm run dev                  # http://localhost:5173

# 2. Build de produção
npm run build               # Gera /dist

# 3. Sincronização mobile
npx cap sync android        # Copia /dist para /android

# 4. Desenvolvimento mobile
npx cap run android         # Build + deploy no emulador

# 5. Build de produção mobile
npx cap build android       # Gera APK/AAB
```

### Configuração Capacitor
```typescript
// capacitor.config.ts
const config: CapacitorConfig = {
  appId: 'io.github.gabriel',
  appName: 'Gabriel',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  },
  android: {
    allowMixedContent: true
  }
}
```

## Performance Mobile

### Bundle Optimization
- **Tamanho atual**: ~530KB (otimizado)
- **Code splitting**: Preparado para implementação
- **Tree shaking**: Automático via Vite
- **Asset optimization**: Imagens responsivas

### Runtime Performance
- **Memory management**: Cleanup de listeners
- **Touch optimization**: Elementos ≥44px
- **Scroll performance**: Virtual scrolling preparado
- **Image lazy loading**: Implementado

### Network Optimization
- **API calls**: Minimizadas e batched quando possível
- **Caching**: Headers apropriados
- **Offline support**: Preparado para implementação

## Utilitários CSS Mobile

### Classes Customizadas
```css
/* Text truncation */
.line-clamp-1 { /* truncate to 1 line */ }
.line-clamp-2 { /* truncate to 2 lines */ }
.line-clamp-3 { /* truncate to 3 lines */ }

/* Safe areas */
.safe-area-top { padding-top: env(safe-area-inset-top); }
.safe-area-bottom { padding-bottom: env(safe-area-inset-bottom); }

/* Touch targets */
.touch-target { min-height: 44px; min-width: 44px; }

/* Mobile specific */
.mobile-card { @apply bg-white rounded-xl shadow-sm border border-gray-100; }
.mobile-button { @apply px-4 py-3 rounded-lg font-medium touch-target; }
```

## Próximos Passos

### Capacitor Enhancements
- **Push Notifications**: Implementar via @capacitor/push-notifications
- **Camera Integration**: Upload de fotos via @capacitor/camera
- **Geolocation**: Busca por serviços próximos via @capacitor/geolocation
- **Storage**: Dados offline via @capacitor/storage
- **Status Bar**: Customização via @capacitor/status-bar

### UX Improvements
- **Haptic Feedback**: Vibração em ações importantes
- **Pull to Refresh**: Atualização de listas
- **Infinite Scroll**: Carregamento progressivo
- **Swipe Actions**: Ações rápidas em listas
- **Dark Mode**: Tema escuro automático

### Advanced Features
- **Deep Linking**: URLs customizadas (gabriel://service/123)
- **Share API**: Compartilhamento nativo
- **Biometric Auth**: Login com impressão digital
- **App Shortcuts**: Ações rápidas no ícone do app
- **Widget Support**: Widgets para Android

### Performance Optimizations
- **Code Splitting**: Dividir bundle por rotas
- **Service Workers**: Cache avançado
- **Image Optimization**: WebP + lazy loading
- **Virtual Scrolling**: Listas grandes
- **Memory Profiling**: Análise de vazamentos

## Considerações de Design Mobile

### Princípios
1. **Touch First**: Elementos tocáveis adequados
2. **Thumb Navigation**: Controles acessíveis com polegar
3. **Visual Hierarchy**: Informações mais importantes em destaque
4. **Reduced Cognitive Load**: Menos opções por tela
5. **Fast Actions**: Ações importantes sempre visíveis

### Padrões UI
- **Bottom Navigation**: Navegação principal
- **FAB (Floating Action Button)**: Ação primária (Criar)
- **Cards**: Containers de informação
- **Pull-to-Refresh**: Atualização de conteúdo
- **Swipe Gestures**: Ações secundárias

### Acessibilidade Mobile
- **Screen Readers**: Labels apropriados
- **High Contrast**: Cores com contraste adequado
- **Large Text**: Suporte a texto grande
- **Voice Control**: Comandos de voz preparados
- **Motor Impairment**: Controles alternativos 
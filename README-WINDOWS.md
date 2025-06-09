# 🏢 Gabriel - Versão Desenvolvimento Windows

> **Marketplace Mobile-First Platform**  
> *Conectando pessoas e serviços através de aplicativo móvel nativo*

## 🚀 Quick Start Windows

### 1. Pré-requisitos Essenciais
```powershell
# Instalar via chocolatey (recomendado)
choco install nodejs docker-desktop git androidstudio

# Ou baixar manualmente:
# Node.js: https://nodejs.org/
# Docker: https://desktop.docker.com/win/stable/Docker%20Desktop%20Installer.exe
# Git: https://git-scm.com/download/win
# Android Studio: https://developer.android.com/studio
```

### 2. Setup Automatizado
```bash
# Clone o repositório
git clone https://github.com/Tripno08/Gabriel.git
cd Gabriel

# Execute o setup automático
npm run setup:windows

# Ou manualmente
scripts\windows-setup.bat
```

### 3. Iniciar Desenvolvimento
```bash
# Método 1: Script automatizado
npm run dev:windows

# Método 2: Manual
docker-compose up -d db
npx prisma db push
npm run dev
cd frontend && npm run dev
```

## 📱 Desenvolvimento Mobile

### Setup Android
```bash
# Configurar variáveis de ambiente
setx ANDROID_HOME "C:\Users\%USERNAME%\AppData\Local\Android\Sdk"
setx ANDROID_SDK_ROOT "%ANDROID_HOME%"

# Adicionar ao PATH
setx PATH "%PATH%;%ANDROID_HOME%\platform-tools;%ANDROID_HOME%\emulator;%ANDROID_HOME%\tools;%ANDROID_HOME%\tools\bin"

# Script mobile completo
npm run mobile:windows
```

### Build e Deploy
```bash
cd frontend
npm run build
npx cap sync android
npx cap open android

# Build APK
cd android
gradlew assembleDebug
```

## 🛠️ Estrutura do Projeto

```
Gabriel/
├── 📁 backend/                 # API Node.js + Express
│   ├── src/controllers/        # Controllers MVC
│   ├── src/middlewares/        # Auth, Error, Validation
│   ├── src/routes/            # Rotas da API
│   └── prisma/                # Database Schema
├── 📁 frontend/               # React + TypeScript
│   ├── src/components/        # Componentes React
│   ├── src/pages/            # Páginas da aplicação
│   ├── android/              # Projeto Android nativo
│   └── public/               # Assets estáticos
├── 📁 docs/                  # Documentação
├── 📁 scripts/               # Scripts Windows (.bat)
└── 🐳 docker-compose.yml     # Serviços Docker
```

## 🎯 Características Mobile-First

### ✨ Interface Nativa
- **Splash Screen** animado com branding Gabriel
- **Bottom Navigation** adaptável por role (Client/Provider)
- **Cards Touch-Friendly** com feedback tátil
- **Safe Area** otimizado para diferentes dispositivos

### 🔐 Autenticação JWT
- Login/registro seguro
- Tokens com expiração 24h
- Middleware de autenticação
- Controle de acesso por role

### 📊 Dashboard Personalizado
- **Clientes:** Buscar serviços, avaliar providers
- **Providers:** Gerenciar serviços, visualizar reviews
- Estatísticas em tempo real
- Quick actions context-aware

### 🔍 Sistema de Reviews
- Avaliação 1-5 estrelas
- Comentários detalhados
- Histórico completo
- Filtros inteligentes

## 🚀 Scripts Disponíveis

### Backend
```bash
npm run dev              # Desenvolvimento hot-reload
npm run build            # Build TypeScript
npm run start            # Produção
npm run db:reset         # Reset banco de dados
npm run setup:windows    # Setup completo Windows
npm run dev:windows      # Iniciar desenvolvimento
```

### Frontend
```bash
cd frontend
npm run dev              # Servidor desenvolvimento
npm run build            # Build produção
npm run preview          # Preview build
npm run android          # Capacitor Android
npm run mobile:windows   # Script mobile Windows
```

## 🐳 Docker Services

```bash
# Todos os serviços
docker-compose up -d

# Apenas banco
docker-compose up -d db

# Logs
docker-compose logs -f app

# Parar tudo
docker-compose down
```

## 📱 Capacitor Configuration

### capacitor.config.ts
```typescript
{
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

### Build Pipeline
1. **Frontend Build:** Vite → dist/
2. **Capacitor Sync:** dist/ → android/
3. **Android Build:** Gradle → APK
4. **Deploy:** ADB → Emulator/Device

## 🔧 Troubleshooting Windows

### Problema: PowerShell Execution Policy
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### Problema: Node-gyp Windows
```bash
npm install -g node-gyp
npm install -g windows-build-tools
```

### Problema: Android SDK
```bash
# Verificar configuração
echo %ANDROID_HOME%
adb version
emulator -list-avds

# Aceitar licenças
%ANDROID_HOME%\tools\bin\sdkmanager --licenses
```

### Problema: Docker WSL2
```bash
# Instalar WSL2
wsl --install
wsl --set-default-version 2

# Restart Docker Desktop
```

## 📊 Performance Metrics

### Build Times
- **Backend Build:** ~15s
- **Frontend Build:** ~25s  
- **Android Build:** ~45s
- **Full Pipeline:** ~1.5min

### Bundle Sizes
- **Frontend:** ~525KB (gzipped)
- **Android APK:** ~8.5MB
- **Dependencies:** ~140MB (node_modules)

## 🌟 Características Avançadas

### 🎨 Design Mobile-First
- **Material Design 3** components
- **Touch-friendly** 44px+ touch targets
- **Responsive breakpoints** 768px, 1024px
- **Dark/Light mode** support

### 🔔 PWA Features
- **Service Worker** cache strategies
- **Offline mode** basic functionality
- **Install prompt** web-to-app
- **Push notifications** (futuro)

### 🚀 Performance
- **Lazy loading** pages e components
- **Code splitting** automático
- **Bundle optimization** tree-shaking
- **Image optimization** WebP/AVIF

## 📋 Roadmap Windows

### ✅ Versão 1.0 (MVP)
- [x] Backend API completa
- [x] Frontend mobile-first
- [x] App Android nativo
- [x] Autenticação JWT
- [x] Sistema de reviews
- [x] Scripts Windows
- [x] Docker setup

### 🔄 Versão 1.1
- [ ] Testes automatizados
- [ ] CI/CD pipeline
- [ ] Performance monitoring
- [ ] Error tracking
- [ ] Analytics básico

### 🎯 Versão 2.0
- [ ] Push notifications
- [ ] Chat em tempo real
- [ ] Pagamentos integrados
- [ ] Geolocalização
- [ ] Upload de imagens

## 🤝 Contribuição

### Setup para Contribuidores
```bash
git clone https://github.com/Tripno08/Gabriel.git
cd Gabriel
npm run setup:windows
npm run dev:windows
```

### Padrões de Código
- **ESLint + Prettier** configurado
- **TypeScript strict** mode
- **Component-driven** development
- **Mobile-first** responsive design

---

## 📞 Suporte

**Documentação Completa:** [docs/WINDOWS_SETUP.md](docs/WINDOWS_SETUP.md)  
**Mobile Guide:** [docs/MOBILE.md](docs/MOBILE.md)  
**API Documentation:** [docs/API.md](docs/API.md)

---

**Gabriel Platform Windows Edition**  
*Desenvolvido para ambientes Windows com foco em produtividade e facilidade de uso* 
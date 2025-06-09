# Gabriel - Configuração para Desenvolvimento Windows

## 📋 Pré-requisitos

### 1. Node.js
- **Versão:** 18.x ou superior
- **Download:** https://nodejs.org/
- **Instalação:** Baixar o instalador MSI e seguir o wizard
- **Verificação:**
```bash
node --version
npm --version
```

### 2. Git
- **Download:** https://git-scm.com/download/win
- **Configuração:**
```bash
git config --global user.name "Seu Nome"
git config --global user.email "seu.email@exemplo.com"
```

### 3. Docker Desktop
- **Download:** https://desktop.docker.com/win/stable/Docker%20Desktop%20Installer.exe
- **Requisitos:** Windows 10/11 Pro, Enterprise ou Education
- **Instalação:** Seguir wizard e reiniciar sistema
- **Verificação:**
```bash
docker --version
docker-compose --version
```

### 4. Android Studio (Para desenvolvimento mobile)
- **Download:** https://developer.android.com/studio
- **Componentes necessários:**
  - Android SDK
  - Android SDK Platform-Tools
  - Android Emulator
  - Intel HAXM (se CPU Intel)

## 🚀 Configuração do Projeto

### 1. Clone do Repositório
```bash
git clone https://github.com/Tripno08/Gabriel.git
cd Gabriel
```

### 2. Configuração do Backend
```bash
# Instalar dependências
npm install

# Configurar variáveis de ambiente
copy .env.example .env

# Configurar banco de dados
docker-compose up -d db

# Executar migrações
npx prisma generate
npx prisma db push

# Iniciar servidor de desenvolvimento
npm run dev
```

### 3. Configuração do Frontend
```bash
cd frontend
npm install
npm run dev
```

### 4. Configuração Mobile (Android)
```bash
# No diretório frontend
npm run build
npx cap sync android

# Abrir no Android Studio
npx cap open android
```

## 🔧 Variáveis de Ambiente

### Backend (.env)
```env
# Banco de dados
DATABASE_URL="postgresql://user:password@localhost:5432/gabriel"

# JWT
JWT_SECRET="seu-jwt-secret-super-secreto-aqui"

# Servidor
PORT=3000
NODE_ENV=development

# Logs
LOG_LEVEL=debug
```

### Frontend (.env.local)
```env
VITE_API_URL=http://localhost:3000
VITE_APP_NAME=Gabriel
```

## 🛠️ Scripts Disponíveis

### Backend
```bash
npm run dev          # Desenvolvimento com hot reload
npm run build        # Build para produção
npm run start        # Iniciar produção
npm run test         # Executar testes
npm run db:reset     # Reset completo do banco
npm run db:seed      # Popular banco com dados teste
```

### Frontend
```bash
npm run dev          # Servidor desenvolvimento
npm run build        # Build para produção
npm run preview      # Preview do build
npm run android      # Sync e build Android
```

## 📱 Configuração Android

### 1. Variáveis de Ambiente Android
```bash
# Adicionar ao PATH do Windows
ANDROID_HOME=C:\Users\%USERNAME%\AppData\Local\Android\Sdk
ANDROID_SDK_ROOT=%ANDROID_HOME%

# Path completo
%ANDROID_HOME%\tools
%ANDROID_HOME%\tools\bin
%ANDROID_HOME%\platform-tools
%ANDROID_HOME%\emulator
```

### 2. Criação do Emulador
```bash
# Listar AVDs disponíveis
avdmanager list avd

# Criar novo emulador
avdmanager create avd -n GabrielEmulator -k "system-images;android-34;google_apis;x86_64"

# Iniciar emulador
emulator -avd GabrielEmulator
```

### 3. Build e Deploy
```bash
cd frontend/android
./gradlew assembleDebug

# Instalar no emulador
adb install app/build/outputs/apk/debug/app-debug.apk
```

## 🐳 Docker (Alternativo)

### Desenvolvimento completo com Docker
```bash
# Subir todos os serviços
docker-compose up -d

# Apenas banco de dados
docker-compose up -d db

# Ver logs
docker-compose logs -f app

# Parar serviços
docker-compose down
```

## 🔍 Troubleshooting

### Problemas Comuns Windows

#### 1. Erro de Permissão PowerShell
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

#### 2. Erro Node-gyp
```bash
npm install -g node-gyp
npm install -g windows-build-tools
```

#### 3. Erro Android SDK
- Verificar ANDROID_HOME configurado
- Instalar Android SDK 34
- Aceitar licenças: `sdkmanager --licenses`

#### 4. Erro Docker
- Verificar Hyper-V habilitado
- Verificar WSL2 instalado
- Reiniciar Docker Desktop

### Logs Úteis
```bash
# Backend logs
npm run dev -- --verbose

# Frontend logs
npm run dev -- --debug

# Android logs
adb logcat

# Docker logs
docker-compose logs -f
```

## 📦 Estrutura de Arquivos

```
Gabriel/
├── docs/                    # Documentação
├── src/                     # Backend Node.js
│   ├── config/             # Configurações
│   ├── controllers/        # Controllers
│   ├── middlewares/        # Middlewares
│   ├── routes/             # Rotas
│   └── types/              # Tipos TypeScript
├── frontend/               # Frontend React + Mobile
│   ├── src/                # Código React
│   ├── android/            # Projeto Android
│   └── public/             # Assets públicos
├── prisma/                 # Schema banco de dados
├── docker-compose.yml      # Docker services
└── package.json            # Dependências backend
```

## 🎯 Próximos Passos

1. **Configurar ambiente:** Seguir pré-requisitos
2. **Clonar projeto:** Git clone do repositório
3. **Instalar dependências:** npm install em ambos os diretórios
4. **Configurar banco:** Docker-compose up -d db
5. **Executar migrações:** npx prisma db push
6. **Iniciar desenvolvimento:** npm run dev (backend) + npm run dev (frontend)
7. **Testar mobile:** npx cap run android

## 📞 Suporte

Para dúvidas e problemas:
- Verificar [troubleshooting](#troubleshooting)
- Consultar logs dos serviços
- Verificar configurações de ambiente
- Testar componentes individualmente

---

**Gabriel Marketplace Platform**  
*Conectando pessoas e serviços* 
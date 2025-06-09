# 🏢 Gabriel - Instruções Completas Windows

## 📦 Pacote Desenvolvimento Windows - PRONTO!

✅ **Commit realizado com sucesso!**  
🌐 **Repositório:** https://github.com/Tripno08/Gabriel.git  
🌿 **Branch:** `VersaoDevWindows`

---

## 🚀 Como Usar Este Pacote

### 1. Clone do Repositório
```bash
git clone https://github.com/Tripno08/Gabriel.git
cd Gabriel
git checkout VersaoDevWindows
```

### 2. Setup Automático Windows
```bash
# Método 1: Via npm script
npm run setup:windows

# Método 2: Executar script diretamente
scripts\windows-setup.bat
```

### 3. Iniciar Desenvolvimento
```bash
# Método 1: Script automatizado (recomendado)
npm run dev:windows

# Método 2: Manual
docker-compose up -d db
npx prisma db push
npm run dev
cd frontend && npm run dev
```

### 4. Desenvolvimento Mobile
```bash
npm run mobile:windows
```

---

## 📋 Pré-requisitos Windows

### Essenciais
- **Node.js 18+:** https://nodejs.org/
- **Git:** https://git-scm.com/download/win
- **Docker Desktop:** https://desktop.docker.com/win/stable/Docker%20Desktop%20Installer.exe

### Para Mobile (Opcional)
- **Android Studio:** https://developer.android.com/studio
- **Java JDK 11+**
- **Android SDK 34**

### Via Chocolatey (Recomendado)
```powershell
# Instalar Chocolatey primeiro
Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))

# Instalar dependências
choco install nodejs docker-desktop git androidstudio
```

---

## 🛠️ Estrutura do Pacote

```
Gabriel/
├── 📁 docs/                    # Documentação completa
│   ├── WINDOWS_SETUP.md        # Setup detalhado Windows
│   ├── MOBILE.md               # Guia mobile
│   ├── API.md                  # Documentação API
│   └── env-windows-example.txt # Exemplo .env
├── 📁 scripts/                 # Scripts Windows
│   ├── windows-setup.bat       # Setup inicial
│   ├── windows-dev.bat         # Desenvolvimento
│   └── windows-mobile.bat      # Mobile
├── 📁 src/                     # Backend Node.js
├── 📁 frontend/                # React + Android
├── 📁 prisma/                  # Database
├── README-WINDOWS.md           # Quick start
└── package.json                # Scripts Windows
```

---

## 🎯 Scripts Disponíveis

### Backend
```bash
npm run dev              # Desenvolvimento
npm run build            # Build produção
npm run start            # Iniciar produção
npm run db:reset         # Reset banco
npm run setup:windows    # Setup Windows
npm run dev:windows      # Dev Windows
npm run mobile:windows   # Mobile Windows
```

### Frontend
```bash
cd frontend
npm run dev              # Desenvolvimento
npm run build            # Build
npm run android          # Capacitor sync
```

---

## 🔧 Configuração Rápida

### 1. Variáveis de Ambiente
Copie `docs/env-windows-example.txt` para `.env` na raiz:
```env
DATABASE_URL="postgresql://gabriel:gabriel123@localhost:5432/gabriel"
JWT_SECRET="gabriel-windows-dev-secret-key-2024"
PORT=3000
NODE_ENV=development
```

### 2. Android (Se necessário)
```bash
# Configurar variáveis
setx ANDROID_HOME "C:\Users\%USERNAME%\AppData\Local\Android\Sdk"
setx ANDROID_SDK_ROOT "%ANDROID_HOME%"

# Adicionar ao PATH
setx PATH "%PATH%;%ANDROID_HOME%\platform-tools;%ANDROID_HOME%\emulator"
```

---

## 🚀 Características da Plataforma

### ✨ Mobile-First
- **Splash Screen** animado
- **Bottom Navigation** role-based
- **Touch-friendly** interface
- **Responsive** design

### 🔐 Autenticação
- **JWT** tokens
- **Role-based** access (CLIENT/PROVIDER)
- **Middleware** protection
- **Secure** password hashing

### 📱 Mobile App
- **Android nativo** via Capacitor
- **PWA** features
- **Offline** basic support
- **Performance** otimizada

### 🏪 Marketplace
- **Serviços** CRUD completo
- **Reviews** sistema 5 estrelas
- **Dashboard** personalizado
- **Busca** e filtros

---

## 🐳 Docker Services

```bash
# Todos os serviços
docker-compose up -d

# Apenas banco
docker-compose up -d db

# Logs
docker-compose logs -f

# Parar
docker-compose down
```

---

## 📊 URLs de Desenvolvimento

- **Backend API:** http://localhost:3000
- **Frontend Web:** http://localhost:5173
- **Database:** postgresql://localhost:5432/gabriel
- **Prisma Studio:** npx prisma studio

---

## 🔍 Troubleshooting

### PowerShell Execution Policy
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### Node-gyp Windows
```bash
npm install -g node-gyp windows-build-tools
```

### Docker WSL2
```bash
wsl --install
wsl --set-default-version 2
```

### Android SDK
```bash
# Verificar
echo %ANDROID_HOME%
adb version

# Aceitar licenças
%ANDROID_HOME%\tools\bin\sdkmanager --licenses
```

---

## 📚 Documentação Completa

1. **[WINDOWS_SETUP.md](docs/WINDOWS_SETUP.md)** - Setup detalhado
2. **[README-WINDOWS.md](README-WINDOWS.md)** - Quick start
3. **[MOBILE.md](docs/MOBILE.md)** - Desenvolvimento mobile
4. **[API.md](docs/API.md)** - Documentação da API

---

## 🎯 Próximos Passos

1. **Clone** o repositório
2. **Execute** `npm run setup:windows`
3. **Configure** arquivo `.env`
4. **Inicie** com `npm run dev:windows`
5. **Acesse** http://localhost:5173
6. **Desenvolva** sua aplicação!

---

## 📞 Suporte

- **Documentação:** Consulte arquivos em `docs/`
- **Scripts:** Use os `.bat` em `scripts/`
- **Logs:** Verifique saídas dos comandos
- **Issues:** Teste componentes individualmente

---

## ✅ Checklist de Verificação

- [ ] Node.js 18+ instalado
- [ ] Git configurado
- [ ] Docker Desktop rodando
- [ ] Repositório clonado
- [ ] Setup executado
- [ ] Arquivo .env configurado
- [ ] Banco de dados iniciado
- [ ] Backend rodando (porta 3000)
- [ ] Frontend rodando (porta 5173)
- [ ] App mobile testado (opcional)

---

**🎉 Gabriel Marketplace Platform - Versão Windows**  
*Pacote completo para desenvolvimento Windows com scripts automatizados*

**Repositório:** https://github.com/Tripno08/Gabriel.git  
**Branch:** VersaoDevWindows  
**Status:** ✅ PRONTO PARA USO 
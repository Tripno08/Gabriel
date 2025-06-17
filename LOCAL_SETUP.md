# 🚀 Guia de Configuração Local - Projeto Gabriel

Este guia contém todas as instruções necessárias para executar o projeto Gabriel em sua máquina local.

## 📋 Pré-requisitos

### Ferramentas Necessárias

- **Node.js** (v18 ou superior)
- **npm** ou **yarn**
- **Docker** e **Docker Compose**
- **Git**

### Para desenvolvimento mobile (opcional)

- **iOS**: macOS com Xcode 14+ instalado
- **Android**: Android Studio com SDK configurado

## 🛠️ Configuração Inicial

### 1. Clone o repositório

```bash
git clone [URL_DO_REPOSITORIO]
cd gabriel
```

### 2. Configure as variáveis de ambiente

#### Backend (.env)
```bash
# Na raiz do projeto
cp .env.example .env
```

Edite o arquivo `.env` com suas configurações:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/gabriel_db"
JWT_SECRET="your-secret-key-here"
PORT=3000
```

#### Frontend (.env)
```bash
# No diretório frontend
cd frontend
cp .env.example .env
```

Edite o arquivo `frontend/.env`:

```env
VITE_API_URL=http://localhost:3000
```

## 🚀 Executando o Projeto

### Opção 1: Todos os serviços de uma vez (Recomendado)

```bash
# Na raiz do projeto
npm run dev:all
```

Isso iniciará:
- ✅ Backend (Docker) em http://localhost:3000
- ✅ Frontend em http://localhost:5173
- ✅ Banco de dados PostgreSQL

### Opção 2: Serviços individuais

#### Backend (API + Banco de dados)

```bash
# Na raiz do projeto
docker-compose up -d
```

Verificar se está rodando:
```bash
docker ps
```

#### Frontend Web

```bash
cd frontend
npm install
npm run dev
```

Acesse: http://localhost:5173

## 📱 Executando Apps Mobile (Opcional)

### iOS (apenas macOS)

```bash
cd frontend
npx cap run ios
```

Ou abrir no Xcode:
```bash
npx cap open ios
```

### Android

```bash
cd frontend
npx cap run android
```

## 🗄️ Banco de Dados

### Executar migrations

```bash
# Com Docker rodando
docker exec -it gabriel-api npx prisma migrate dev
```

### Popular banco com dados de teste

```bash
# Com Docker rodando
docker exec -it gabriel-api npx prisma db seed
```

### Acessar o Prisma Studio

```bash
docker exec -it gabriel-api npx prisma studio
```

Acesse: http://localhost:5555

## 🔑 Credenciais de Teste

Após executar o seed, você pode usar:

**Cliente:**
- Email: cliente@teste.com
- Senha: senha123

**Prestador:**
- Email: prestador@teste.com  
- Senha: senha123

## 🐛 Solução de Problemas

### Erro: Porta já em uso

Se a porta 5173 estiver em uso:
```bash
# Frontend usará automaticamente 5174
npm run dev
```

### Erro: Docker não está rodando

```bash
# Iniciar Docker
docker-compose up -d

# Verificar logs
docker-compose logs -f
```

### Erro no iOS: "Command PhaseScriptExecution failed"

```bash
cd frontend
rm -rf ios
npx cap add ios
npx cap run ios
```

### Limpar tudo e começar do zero

```bash
# Parar todos os containers
docker-compose down -v

# Limpar node_modules
rm -rf node_modules frontend/node_modules

# Reinstalar
npm install
cd frontend && npm install
```

## 📝 Scripts Úteis

### Na raiz do projeto

```bash
npm run dev          # Inicia o backend com Docker
npm run dev:all      # Inicia backend e frontend
npm run docker:up    # Sobe containers Docker
npm run docker:down  # Para containers Docker
npm run prisma:migrate # Executa migrations
npm run prisma:seed  # Popula banco de dados
```

### No diretório frontend

```bash
npm run dev          # Inicia o frontend
npm run build        # Build de produção
npm run preview      # Preview do build
npm run ios          # Executa no iOS
npm run android      # Executa no Android
```

## 🏗️ Estrutura do Projeto

```
gabriel/
├── src/                  # Código fonte do backend
│   ├── controllers/      # Controladores da API
│   ├── routes/          # Rotas da API
│   ├── middlewares/     # Middlewares
│   └── config/          # Configurações
├── prisma/              # Schema e migrations
├── frontend/            # Aplicação frontend
│   ├── src/            # Código fonte React
│   ├── ios/            # Projeto iOS nativo
│   └── android/        # Projeto Android nativo
├── docker-compose.yml   # Configuração Docker
└── Dockerfile          # Imagem do backend
```

## 🔗 Links Úteis

- **API Documentation**: http://localhost:3000/api-docs (quando implementado)
- **Frontend**: http://localhost:5173
- **Prisma Studio**: http://localhost:5555
- **pgAdmin**: http://localhost:5050 (se configurado)

## 💡 Dicas

1. **Desenvolvimento**: Use o Docker para o backend e banco de dados para manter consistência
2. **Hot Reload**: Tanto backend quanto frontend têm hot reload habilitado
3. **Logs**: Use `docker-compose logs -f gabriel-api` para ver logs em tempo real
4. **Mobile**: Sempre execute `npx cap sync` após alterações no frontend

## ❓ Suporte

Se encontrar problemas:

1. Verifique os logs: `docker-compose logs`
2. Certifique-se de que todas as portas estão livres
3. Verifique se o Docker está rodando
4. Consulte a documentação em `/docs` 
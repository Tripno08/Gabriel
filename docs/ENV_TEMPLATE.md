# Templates de Variáveis de Ambiente

## Backend (.env)

Crie um arquivo `.env` na raiz do projeto com o seguinte conteúdo:

```env
# Database
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/gabriel_db"

# JWT
JWT_SECRET="your-secret-key-here-change-in-production"

# Server
PORT=3000
NODE_ENV=development

# Optional - for production
# CORS_ORIGIN=https://yourdomain.com
```

## Frontend (frontend/.env)

Crie um arquivo `.env` no diretório `frontend` com:

```env
# API URL
VITE_API_URL=http://localhost:3000

# Optional - for production
# VITE_API_URL=https://api.yourdomain.com
```

## Docker Compose (.env)

Para o Docker Compose (opcional, na raiz):

```env
# PostgreSQL
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=gabriel_db

# pgAdmin (opcional)
PGADMIN_DEFAULT_EMAIL=admin@admin.com
PGADMIN_DEFAULT_PASSWORD=admin
```

## Notas Importantes

1. **Segurança**: Nunca commite arquivos `.env` com dados sensíveis
2. **JWT_SECRET**: Use uma chave forte em produção (mínimo 32 caracteres)
3. **DATABASE_URL**: Ajuste conforme seu ambiente
4. **CORS**: Configure adequadamente em produção 
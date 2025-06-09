FROM node:18-alpine

WORKDIR /app

# Copiar arquivos de dependências
COPY package*.json ./
COPY prisma ./prisma/
COPY tsconfig.json ./

# Instalar dependências
RUN npm install

# Gerar cliente Prisma
RUN npx prisma generate

# Copiar código fonte
COPY src ./src
COPY public ./public
COPY nodemon.json ./

# Variáveis de ambiente padronizadas para container
ENV NODE_ENV=production
ENV PORT=3000

# Expor porta
EXPOSE 3000

# Iniciar aplicação
CMD ["npm", "run", "dev"] 
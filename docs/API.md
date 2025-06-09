# Documentação da API

## Autenticação

### POST /api/auth/register
Registra um novo usuário no sistema.

**Request Body:**
```json
{
  "name": "string",
  "email": "string",
  "password": "string",
  "role": "CLIENT" | "PROVIDER"
}
```

**Response (201):**
```json
{
  "id": "uuid",
  "name": "string",
  "email": "string",
  "role": "CLIENT" | "PROVIDER",
  "createdAt": "datetime"
}
```

### POST /api/auth/login
Autentica um usuário existente.

**Request Body:**
```json
{
  "email": "string",
  "password": "string"
}
```

**Response (200):**
```json
{
  "token": "string",
  "user": {
    "id": "uuid",
    "name": "string",
    "email": "string",
    "role": "CLIENT" | "PROVIDER"
  }
}
```

## Serviços

### GET /api/services
Lista todos os serviços disponíveis.

**Query Parameters:**
- category (opcional): filtra por categoria
- search (opcional): busca por nome/descrição

**Response (200):**
```json
{
  "services": [
    {
      "id": "uuid",
      "name": "string",
      "description": "string",
      "provider": {
        "id": "uuid",
        "name": "string"
      },
      "createdAt": "datetime"
    }
  ]
}
```

### POST /api/services
Cria um novo serviço (apenas PROVIDERS).

**Headers:**
- Authorization: Bearer {token}

**Request Body:**
```json
{
  "name": "string",
  "description": "string"
}
```

**Response (201):**
```json
{
  "id": "uuid",
  "name": "string",
  "description": "string",
  "providerId": "uuid",
  "createdAt": "datetime"
}
```

### GET /api/services/:id
Retorna detalhes de um serviço específico.

**Response (200):**
```json
{
  "id": "uuid",
  "name": "string",
  "description": "string",
  "provider": {
    "id": "uuid",
    "name": "string",
    "email": "string"
  },
  "reviews": [
    {
      "id": "uuid",
      "rating": "number",
      "comment": "string",
      "client": {
        "id": "uuid",
        "name": "string"
      },
      "createdAt": "datetime"
    }
  ],
  "createdAt": "datetime"
}
```

### PUT /api/services/:id
Atualiza um serviço existente (apenas o dono do serviço).

**Headers:**
- Authorization: Bearer {token}

**Request Body:**
```json
{
  "name": "string",
  "description": "string"
}
```

**Response (200):**
```json
{
  "id": "uuid",
  "name": "string",
  "description": "string",
  "providerId": "uuid",
  "updatedAt": "datetime"
}
```

### DELETE /api/services/:id
Remove um serviço (apenas o dono do serviço).

**Headers:**
- Authorization: Bearer {token}

**Response (204):**
No content

## Solicitações (Requests)

### POST /api/requests
Cria uma nova solicitação de serviço (apenas CLIENTS).

**Headers:**
- Authorization: Bearer {token}

**Request Body:**
```json
{
  "serviceId": "uuid",
  "message": "string"
}
```

**Response (201):**
```json
{
  "id": "uuid",
  "serviceId": "uuid",
  "clientId": "uuid",
  "providerId": "uuid",
  "status": "PENDING",
  "message": "string",
  "createdAt": "datetime"
}
```

### GET /api/requests/:id
Obtém detalhes de uma solicitação específica.

**Headers:**
- Authorization: Bearer {token}

**Response (200):**
```json
{
  "id": "uuid",
  "service": {
    "id": "uuid",
    "name": "string"
  },
  "client": {
    "id": "uuid",
    "name": "string"
  },
  "provider": {
    "id": "uuid",
    "name": "string"
  },
  "status": "PENDING" | "ACCEPTED" | "REJECTED" | "COMPLETED",
  "message": "string",
  "createdAt": "datetime",
  "updatedAt": "datetime"
}
```

### GET /api/client/requests
Lista todas as solicitações feitas pelo cliente autenticado.

**Headers:**
- Authorization: Bearer {token}

**Response (200):**
```json
{
  "requests": [
    {
      "id": "uuid",
      "service": {
        "id": "uuid",
        "name": "string"
      },
      "provider": {
        "id": "uuid",
        "name": "string"
      },
      "status": "PENDING" | "ACCEPTED" | "REJECTED" | "COMPLETED",
      "createdAt": "datetime"
    }
  ]
}
```

### GET /api/provider/requests
Lista todas as solicitações recebidas pelo prestador autenticado.

**Headers:**
- Authorization: Bearer {token}

**Response (200):**
```json
{
  "requests": [
    {
      "id": "uuid",
      "service": {
        "id": "uuid",
        "name": "string"
      },
      "client": {
        "id": "uuid",
        "name": "string"
      },
      "status": "PENDING" | "ACCEPTED" | "REJECTED" | "COMPLETED",
      "createdAt": "datetime"
    }
  ]
}
```

### PUT /api/requests/:id/status
Atualiza o status de uma solicitação (apenas para o prestador dono do serviço).

**Headers:**
- Authorization: Bearer {token}

**Request Body:**
```json
{
  "status": "ACCEPTED" | "REJECTED" | "COMPLETED"
}
```

**Response (200):**
```json
{
  "id": "uuid",
  "status": "ACCEPTED" | "REJECTED" | "COMPLETED",
  "updatedAt": "datetime"
}
```

## Reviews

### POST /api/reviews
Cria uma nova avaliação (apenas CLIENTS).

**Headers:**
- Authorization: Bearer {token}

**Request Body:**
```json
{
  "providerId": "uuid",
  "rating": "number",
  "comment": "string"
}
```

**Response (201):**
```json
{
  "id": "uuid",
  "rating": "number",
  "comment": "string",
  "providerId": "uuid",
  "clientId": "uuid",
  "createdAt": "datetime"
}
```

### GET /api/users/:id/reviews
Lista todas as avaliações de um usuário (como provider).

**Response (200):**
```json
{
  "reviews": [
    {
      "id": "uuid",
      "rating": "number",
      "comment": "string",
      "client": {
        "id": "uuid",
        "name": "string"
      },
      "createdAt": "datetime"
    }
  ],
  "averageRating": "number"
}
```

## Códigos de Erro

- 400: Bad Request - Dados inválidos
- 401: Unauthorized - Token inválido/expirado
- 403: Forbidden - Sem permissão para a operação
- 404: Not Found - Recurso não encontrado
- 409: Conflict - Conflito (ex: email já existe)
- 500: Internal Server Error - Erro interno do servidor 
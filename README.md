# Vendor Portal MVP

Portal web para gestão de vendedores, produtos, inventário e encomendas.

O projeto foi desenvolvido como um MVP focado em operações de
vendedores, com autenticação, gestão de produtos, controlo de stock,
gestão de encomendas e dashboard operacional.

## Funcionalidades

### Autenticação

- Registo de vendedor
- Login
- Logout
- Sessão autenticada através de JWT em cookie HttpOnly
- Rotas protegidas
- Validação dos dados de entrada
- Passwords protegidas com bcrypt

### Perfil

- Visualização dos dados da empresa
- Edição dos dados da empresa
- Atualização dos dados bancários
- Visualização do estado da conta
- Visualização da data de criação

### Produtos

- Listagem de produtos
- Pesquisa por nome, SKU e categoria
- Criação de produtos
- Edição de produtos
- Ativação/desativação
- Visualização dos detalhes
- Soft delete através de desativação
- Identificação de produtos com stock baixo
- Identificação de produtos sem stock

### Inventário

- Visualização do stock atual
- Entrada de stock
- Saída de stock
- Prevenção de stock negativo
- Controlo de quantidade mínima
- Operações atómicas sobre o stock

### Encomendas

- Criação de encomendas
- Listagem de encomendas
- Pesquisa e filtros por estado
- Visualização dos detalhes
- Confirmação de encomendas
- Atualização do estado
- Cancelamento quando permitido
- Fluxo controlado de estados

Fluxo principal:

```text
Pendente -> Confirmada -> Em processamento -> Enviada -> Entregue
```

## Dashboard

O dashboard apresenta uma visão operacional do portal, incluindo:

- Total de produtos
- Produtos ativos
- Produtos com stock baixo
- Produtos esgotados
- Valor estimado do stock
- Distribuição das encomendas por estado
- Total de encomendas
- Vendas
- Ticket médio
- Últimas encomendas

## Stack

### Frontend

- React
- Vite
- React Router
- Styled Components
- Axios
- React Icons

### Backend

- Node.js
- Express
- MongoDB
- Mongoose
- JWT
- bcryptjs
- Zod
- Helmet
- express-rate-limit
- Morgan
- CORS

## Arquitetura

O projeto está dividido em frontend e backend.

```text
vendor-portal/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── routes/
│   │   ├── services/
│   │   └── styles/
│   ├── .env.example
│   └── package.json
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── utils/
│   │   ├── validators/
│   │   ├── app.js
│   │   └── server.js
│   ├── .env.example
│   └── package.json
│
└── README.md
```

## Modelo de dados

### Vendor

Um vendedor possui:

```text
companyName
companyAddress
contactName
phone
email
password
bankDetails
status
createdAt
updatedAt
```

Os dados bancários são mantidos dentro do documento do vendedor.

### Product

Um produto possui:

```text
vendorId
name
sku
category
price
stock
lowStockThreshold
status
createdAt
updatedAt
```

O SKU possui unicidade dentro do contexto do vendedor.

### Order

Uma encomenda possui:

```text
vendorId
orderName
items
total
status
confirmedAt
createdAt
updatedAt
```

Cada item mantém um snapshot das informações relevantes do produto no
momento da criação da encomenda.

## Concorrência de stock

O controlo de stock é uma das partes críticas da aplicação.

Considere o seguinte cenário:

```text
Stock inicial: 10

Cliente A solicita: 7
Cliente B solicita: 5
```

As operações de decremento utilizam uma atualização atómica condicionada
à disponibilidade:

```text
stock >= quantity
```

Assim, uma operação pode reservar a quantidade disponível, enquanto uma
operação concorrente que já não tenha stock suficiente falha.

Resultado esperado:

```text
Cliente A → sucesso
Cliente B → erro de stock insuficiente

Stock final → 3
```

Esta abordagem evita:

- Stock negativo
- Confirmação acima da disponibilidade
- Condições de corrida em operações simultâneas

## Segurança

Foram adotadas algumas medidas para reduzir riscos comuns:

- JWT armazenado em cookie HttpOnly
- Não utilização de localStorage para o token de autenticação
- Passwords armazenadas através de hash bcrypt
- Helmet para headers de segurança
- CORS configurado
- Rate limiting
- Validação de payloads com Zod
- Password excluída por padrão das consultas através de
  `select: false`
- Recursos sempre associados ao vendedor autenticado
- Validação das transições de estado das encomendas
- Operações de stock condicionadas pela disponibilidade

## Autorização e isolamento dos dados

Os recursos são associados ao vendedor autenticado através de
`vendorId`.

As operações sobre produtos e encomendas utilizam o vendedor presente na
sessão autenticada para limitar os dados acessíveis.

Desta forma, um vendedor não deve conseguir consultar ou alterar
recursos pertencentes a outro vendedor apenas conhecendo o respetivo ID.

## API

A API utiliza o prefixo:

```text
/api
```

### Auth

```text
POST   /api/auth/register
POST   /api/auth/login
POST   /api/auth/logout
GET    /api/auth/me
PATCH  /api/auth
```

### Products

```text
GET    /api/products
POST   /api/products
GET    /api/products/:id
PATCH  /api/products/:id
DELETE /api/products/:id
PATCH  /api/products/:id/stock
```

### Orders

```text
GET    /api/orders
POST   /api/orders
GET    /api/orders/:id
PATCH  /api/orders/:id/status
PATCH  /api/orders/:id/confirm
```

Os endpoints protegidos requerem uma sessão autenticada.

## Variáveis de ambiente

### Backend

Criar um ficheiro `.env` dentro de `backend/`:

```env
PORT=5252
MONGO_URI=
JWT_SECRET=
FRONTEND_URL=http://localhost:5173
```

### Frontend

Criar um ficheiro `.env` dentro de `frontend/`:

```env
VITE_API_URL=http://localhost:5252/api
```

Não versionar ficheiros `.env`.

O projeto inclui ficheiros `.env.example` para referência.

## Instalação

### Backend

```bash
cd backend
npm install
```

Configurar o `.env` e iniciar:

```bash
npm run dev
```

### Frontend

Em outro terminal:

```bash
cd frontend
npm install
```

Configurar o `.env` e iniciar:

```bash
npm run dev
```

Por padrão, o frontend estará disponível em:

```text
http://localhost:5173
```

E o backend em:

```text
http://localhost:5252
```

## Fluxo de utilização

```text
Cadastro -> Login -> Dashboard
   ├── Produtos
   │    ├── Criar
   │    ├── Editar
   │    ├── Atualizar stock
   │    └── Stock baixo
   │
   ├── Encomendas
   │    ├── Criar
   │    ├── Confirmar
   │    ├── Atualizar estado
   │    └── Consultar detalhes
   │
   └── Perfil
        ├── Dados da empresa
        └── Dados bancários
```

## Decisões técnicas

### React + Vite

O frontend utiliza React com Vite para manter uma estrutura simples,
rápida e adequada ao tamanho do MVP.

### Styled Components

A interface utiliza Styled Components para manter os estilos próximos
aos componentes e permitir a utilização centralizada do tema.

### Context API

Os dados de autenticação e os principais recursos da aplicação são
disponibilizados através de Context API, evitando a necessidade de uma
biblioteca adicional de gestão global de estado.

### MongoDB + Mongoose

MongoDB foi utilizado pela flexibilidade do modelo e pela integração
direta com Mongoose.

### Validação com Zod

Os payloads recebidos pela API são validados antes de chegar à lógica
principal da aplicação.

### JWT em HttpOnly Cookie

O token de autenticação não é exposto ao JavaScript do frontend. A
sessão é mantida através de cookie HttpOnly enviado automaticamente nas
requisições autenticadas.

### Stock atómico

O stock não é decrementado através de uma sequência simples de leitura e
escrita. A atualização é condicionada pela quantidade disponível,
reduzindo o risco de race conditions.

## Responsividade

A interface foi desenvolvida para funcionar em desktop e dispositivos
móveis.

Nas listagens principais, as tabelas desktop são substituídas por cards
em ecrãs menores para melhorar a utilização em dispositivos móveis.

## Tratamento de erros

A API utiliza códigos HTTP adequados para diferentes situações,
incluindo:

```text
200 → Operação concluída
201 → Recurso criado
400 → Dados inválidos
401 → Não autenticado
403 → Acesso não permitido
404 → Recurso não encontrado
409 → Conflito
500 → Erro interno
```

As validações e erros são apresentados ao utilizador através de feedback
visual no frontend.

## Possíveis melhorias futuras

Como evolução do MVP, poderiam ser adicionados:

- Paginação completa no frontend
- Filtros avançados
- Histórico de alterações de stock
- Histórico de estados das encomendas
- Notificações
- Recuperação de password
- Gestão de múltiplos utilizadores por vendedor
- Relatórios financeiros
- Exportação de encomendas
- Testes automatizados
- Dashboard com gráficos
- Auditoria de operações
- Deploy com CI/CD

## Teste do cenário de concorrência

Para validar a regra crítica de stock, deve ser testado o seguinte
cenário:

```text
Stock: 10

Request A:
quantity = 7

Request B:
quantity = 5
```

As duas operações devem ser executadas de forma concorrente.

Resultado esperado:

```text
Uma operação → sucesso
Outra operação → stock insuficiente

Stock final → 3
```

O sistema nunca deve terminar com:

```text
stock < 0
```

nem permitir que a quantidade total reservada ultrapasse o stock
disponível.

## Estado do projeto

MVP concluído.

Principais módulos:

```text
✓ Autenticação
✓ Perfil
✓ Produtos
✓ Inventário
✓ Encomendas
✓ Dashboard
✓ Validação
✓ Segurança
✓ Responsividade
✓ Controlo de concorrência de stock
```

## Autor

Desenvolvido como parte de um desafio técnico para a posição de
Desenvolvedor Full Stack.